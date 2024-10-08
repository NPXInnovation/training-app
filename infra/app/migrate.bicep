param name string
param location string = resourceGroup().location
param tags object = {}

param applicationInsightsName string
param containerAppsEnvironmentName string
param containerRegistryName string
param imageName string = ''
param keyVaultName string
param serviceName string = 'migrate'

@secure()
param databaseUrl string

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

output SERVICE_MIGRATE_IDENTITY_PRINCIPAL_ID string = app.outputs.identityPrincipalId
output SERVICE_MIGRATE_NAME string = app.outputs.name
output SERVICE_MIGRATE_URI string = app.outputs.uri
output SERVICE_MIGRATE_IMAGE_NAME string = app.outputs.imageName
