param name string
param location string = resourceGroup().location
param currentTime string = utcNow()
param tags object = {}
param keyVaultName string

@description('The name of the managed identity resource.')
param managedIdentityName string

@description('The Azure location where the managed identity should be created.')

var redirectUri = 'https://${name}.azurewebsites.net/.auth/login/aad/callback'

@description('This is the built-in Owner role. See https://docs.microsoft.com/azure/role-based-access-control/built-in-roles#key-vault-administrator')
resource OwnerRoleDefinition 'Microsoft.Authorization/roleDefinitions@2018-01-01-preview' existing = {
  scope:  subscription()
  name: '8e3af657-a8ff-443c-a75c-2fe8c4bcb635'
}

resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: managedIdentityName
  location: location
  tags: tags
}

resource OwnerRoleAssignment 'Microsoft.Authorization/roleAssignments@2020-04-01-preview' = {
  name: guid(managedIdentityName, managedIdentityName, OwnerRoleDefinition.id)
  properties: {
    roleDefinitionId: OwnerRoleDefinition.id
    principalId: managedIdentity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

resource script 'Microsoft.Resources/deploymentScripts@2019-10-01-preview' = {
  name: name
  location: location
  tags: tags
  kind: 'AzureCLI'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${managedIdentity.id}': {}
    }
  }
  properties: {
    azCliVersion: '2.44.1'
    environmentVariables: [
      {
        name: 'DISPLAY_NAME'
        value: name
      }
      {
        name: 'REDIRECT_URI'
        secureValue: redirectUri
      }
    ]
    scriptContent: '''
      #!/bin/bash
      set -e

      # Create app registration in AD
      az ad app create --display-name \"${DISPLAY_NAME}\" --web-redirect-uris \"${REDIRECT_URI}\" --output json  > app.json

      # Get app ID
      appId=$(jq -r .appId app.json)

      # Create secret from app id
      az ad app credential reset --id $appId --credential-description "azd-deploy" > secret.json

      # Get client ID and secret
      clientId=$(jq -r .appId secret.json)
      clientSecret=$(jq -r .password secret.json)  
      jq -n --arg clientId $clientId --arg clientSecret $clientSecret --arg appId $appId '{"clientId":"\($cliendId)", "clientSecret":"\($clientSecret)", "appId":"\($appId)"}' > $AZ_SCRIPTS_OUTPUT_PATH'    
    '''
    cleanupPreference: 'OnSuccess'
    retentionInterval: 'P1D'
    forceUpdateTag: currentTime // ensures script will run every time
  }
}


resource kvazureAdClientIdSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'SERVICE_WEB_AZURE_AD_CLIENT_ID'
  properties: {
    value: script.properties.outputs.clientId
  }
}

resource kvazureAdClientSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'SERVICE_WEB_AZURE_AD_CLIENT_SECRET'
  properties: {
    value: script.properties.outputs.clientSecret
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output clientId string = script.properties.outputs.clientId
output clientSecret string = script.properties.outputs.clientSecret

@description('The resource ID of the user-assigned managed identity.')
output managedIdentityResourceId string = managedIdentity.id

@description('The ID of the Azure AD application associated with the managed identity.')
output managedIdentityClientId string = managedIdentity.properties.clientId

@description('The ID of the Azure AD service principal associated with the managed identity.')
output managedIdentityPrincipalId string = managedIdentity.properties.principalId
