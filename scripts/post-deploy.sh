#!/bin/bash

## Debugging variable ##
locDebug=true

## Needs to install containerapp extension without prompt
az config set extension.use_dynamic_install=yes_without_prompt

## Get necessary variables
ENV_NAME=$(grep -oP '"defaultEnvironment":"\K[^"]+' "./.azure/config.json")
ENV_LOCATION=$(grep -oP 'AZURE_LOCATION="\K[^"]+' "./.azure/$ENV_NAME/.env")
RESOURCE_GROUP_NAME="rg-$ENV_LOCATION-$ENV_NAME"
CONTAINER_APP_NAME="ca-$ENV_NAME-web"
AZURE_AD_CLIENT_ID=$(grep -oP 'AZURE_AD_CLIENT_ID="\K[^"]+' ".env")

## Get container app address
CONTAINER_APP_URL=$(az containerapp show --resource-group $RESOURCE_GROUP_NAME --name $CONTAINER_APP_NAME --query properties.configuration.ingress.fqdn -o tsv)

if [ $locDebug == true ] 
then
    echo "ENV_NAME              : $ENV_NAME"
    echo "ENV_LOCATION          : $ENV_LOCATION"
    echo "RESOURCE_GROUP_NAME   : $RESOURCE_GROUP_NAME"
    echo "CONTAINER_APP_NAME    : $CONTAINER_APP_NAME"
    echo "AZURE_AD_CLIENT_ID    : $AZURE_AD_CLIENT_ID"
    echo "CONTAINER_APP_URL     : $CONTAINER_APP_URL"
fi

## Set callback uri (Redirect URI in App Registration)
az ad app update --id $AZURE_AD_CLIENT_ID --web-redirect-uris "https://$CONTAINER_APP_URL/api/auth/callback/azure-ad"

echo "-- Deployment Complete --"