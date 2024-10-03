param name string
param location string = resourceGroup().location
param tags object = {}

param applicationInsightsName string
param containerAppsEnvironmentName string
param containerRegistryName string
param imageName string = ''
param keyVaultName string
param serviceName string = 'web'

param authUrl string
param azureAdTenantId string
@secure()
param nextAuthSecret string
@secure()
param openAiApiKey string
param openAiBasePath string
param openAiModel string

param azureAdClientId string
@secure()
param azureAdClientSecret string

@secure()
param databaseUrl string

// var managedIdentityName = '${name}-identity'

// module appregistration '../core/ad/app-register.bicep' = {
//   name: name
//   params: {
//     name: name
//     tags: tags
//     location: location
//     keyVaultName: keyVaultName
//     managedIdentityName: managedIdentityName
//   }
// }

module app '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    name: name
    location: location
    tags: union(tags, { 'azd-service-name': serviceName })
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    env: [
      {
        name: 'NEXTAUTH_URL'
        value: authUrl
      }
      {
        name: 'NEXTAUTH_SECRET'
        value: nextAuthSecret
      }
      {
        name: 'AZURE_AD_CLIENT_ID'
        value: azureAdClientId
      }
      {
        name: 'AZURE_AD_CLIENT_SECRET'
        value: azureAdClientSecret
      }
      {
        name: 'AZURE_AD_TENANT_ID'
        value: azureAdTenantId
      }
      {
        name: 'OPENAI_API_KEY'
        value: openAiApiKey
      }
      {
        name: 'OPENAI_BASE_PATH'
        value: openAiBasePath
      }
      {
        name: 'OPENAI_MODEL'
        value: openAiModel
      }
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: applicationInsights.properties.ConnectionString
      }
      {
        name: 'DATABASE_URL'
        value: databaseUrl
      }
    ]
    imageName: !empty(imageName) ? imageName : 'nginx:latest'
    keyVaultName: keyVault.name
    targetPort: 3000
  }
}

// resource kvnextAuthUrlSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'NEXTAUTH_URL'
//   properties: {
//     value: 'authUrl'
//   }
// }

// resource kvnextAuthSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'NEXTAUTH_SECRET'
//   properties: {
//     value: 'nextAuthSecret'
//   }
// }

// resource kvazureAdClientIdSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'AZURE_AD_CLIENT_ID'
//   properties: {
//     value: 'azureAdClientId'
//   }
// }

// resource kvazureAdClientSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'AZURE_AD_CLIENT_SECRET'
//   properties: {
//     value: 'azureAdClientSecret'
//   }
// }

// resource kvazureAdTenantIdSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'AZURE_AD_TENANT_ID'
//   properties: {
//     value: 'azureAdTenantId'
//   }
// }

// resource kvopenAiApiKeySecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'OPENAI_API_KEY'
//   properties: {
//     value: 'openAiApiKey'
//   }
// }

// resource kvopenAiBasePathSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'OPENAI_BASE_PATH'
//   properties: {
//     value: 'openAiBasePath'
//   }
// }

// resource kvopenAiModelSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'OPENAI_MODEL'
//   properties: {
//     value: 'openAiModel'
//   }
// }

// resource kvdatabaseUrlSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
//   parent: keyVault
//   name: 'DATABASE_URL'
//   properties: {
//     value: 'databaseUrl'
//   }
// }

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output SERVICE_WEB_IDENTITY_PRINCIPAL_ID string = app.outputs.identityPrincipalId
output SERVICE_WEB_NAME string = app.outputs.name
output SERVICE_WEB_URI string = app.outputs.uri
output SERVICE_WEB_IMAGE_NAME string = app.outputs.imageName
