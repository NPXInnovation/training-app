#!/bin/bash

## Debugging variable ##
locDebug=true

## Configure pipeline with Azure
azd pipeline config

## Database URL
ENV_NAME=$(grep -oP '"defaultEnvironment":"\K[^"]+' "./.azure/config.json")
SQL_ADMIN_PASSWORD=$(uuidgen)
DATABASE_URL="sqlserver://sql-$ENV_NAME.database.windows.net:1433;database=main;user=sqlAdmin;password=$SQL_ADMIN_PASSWORD;encrypt=true"

## Generate Nextauth secret (URL remains the same)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"

## Get Azure credentials
AZURE_AD_SUBSCRIPTION_ID=$(az account show --query id -o tsv)
AZURE_AD_CLIENT_ID=$(az ad sp create-for-rbac --name $ENV_NAME --query appId -o tsv)
AZURE_AD_CLIENT_SECRET=$(az ad sp credential reset --id $AZURE_AD_CLIENT_ID --query "password" -o tsv)
AZURE_AD_TENANT_ID=$(az account show --query tenantId -o tsv)

## Leave Empty for now
OPENAI_API_KEY=""

if [ $locDebug == true ] 
then
    echo "DATABASE_URL          : $DATABASE_URL"
    echo "NEXTAUTH_SECRET       : $NEXTAUTH_SECRET"
    echo "NEXTAUTH_URL          : $NEXTAUTH_URL"
    echo "AZURE_AD_CLIENT_ID    : $AZURE_AD_CLIENT_ID"
    echo "AZURE_AD_CLIENT_SECRET: $AZURE_AD_CLIENT_SECRET"
    echo "AZURE_AD_TENANT_ID    : $AZURE_AD_TENANT_ID"
    echo "OPENAI_API_KEY        : $OPENAI_API_KEY"
fi

## Create .env file with all necessary environment variables
cat << EOF > .env
DATABASE_URL="$DATABASE_URL"
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
NEXTAUTH_URL="$NEXTAUTH_URL"
AZURE_AD_CLIENT_ID="$AZURE_AD_CLIENT_ID"
AZURE_AD_CLIENT_SECRET="$AZURE_AD_CLIENT_SECRET"
AZURE_AD_TENANT_ID="$AZURE_AD_TENANT_ID"
OPENAI_API_KEY="$OPENAI_API_KEY"
EOF

## Add env to github secrets
gh secret set AZURE_AD_CLIENT_ID --body $AZURE_AD_CLIENT_ID
gh secret set AZURE_AD_CLIENT_SECRET --body $AZURE_AD_CLIENT_SECRET
gh secret set SQL_ADMIN_PASSWORD --body $SQL_ADMIN_PASSWORD

## Run Github Actions Workflow
gh workflow run azure-dev.yml
sleep 5s        # Make sure there is enough time for the deployment to be detected
gh run watch

## Run post-deployment script (Add callback uri to the app registration)
./scripts/post-deploy.sh