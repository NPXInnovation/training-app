targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

param mssqlName string = ''
param mssqlDatabasename string = 'main'
@secure()
param sqlAdminPassword string
param appUser string = 'appuser'
@secure()
param appUserPassword string = newGuid()

@description('Flag to use Azure API Management to mediate the calls between the Web frontend and the backend API')
param useAPIM bool = false

@description('Id of the user or app to assign application roles')
param principalId string = ''

@description('The image name for the web service')
param webImageName string = ''

@description('The image name for the migrate service')
param migrateImageName string = ''

@secure()
param nextAuthSecret string = newGuid()

@description('The AZ openAI instance')
// TODO: Find how to get this from the AZ OpenAI Bicep module
@secure()
param openAiApiKey string = ''
param openAiBasePath string = ''
param openAiModel string = ''

@description('The Azure AD client id for the application registration used for authentication')
// TODO: Find how to get this from the Azure AD Bicep module
param azureAdClientId string
@secure()
param azureAdClientSecret string
param azureAdTenantId string = subscription().tenantId

var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var tags = { 'azd-env-name': environmentName, 'az-resource-token': resourceToken, 'az-location': location }
var resourceGroupName = '${abbrs.resourcesResourceGroups}${location}-${environmentName}'
var webContainerAppName = '${abbrs.appContainerApps}${environmentName}-web'
var migrateContainerAppName = '${abbrs.appContainerApps}${environmentName}-migrate'
var corsAcaUrl = 'https://${webContainerAppName}.${containerApps.outputs.defaultDomain}'
var dbName = !empty(mssqlName) ? mssqlName : '${abbrs.sqlServers}${environmentName}'
var containerAppsEnvironmentName = '${abbrs.appManagedEnvironments}${environmentName}'
var containerRegistryName =  replace('${abbrs.containerRegistryRegistries}${environmentName}${resourceToken}', '-','')
var keyVaultName = replace('${abbrs.keyVaults}${environmentName}', '-','')
var logAnalyticsName = '${abbrs.operationalInsightsWorkspaces}${environmentName}'
var applicationInsightsName = '${abbrs.insightsComponents}${environmentName}'
var applicationInsightsDashboardName = '${abbrs.portalDashboards}${environmentName}'

var databaseUrl = 'sqlserver://${dbName}.database.windows.net:1433;database=${mssqlDatabasename};user=sqlAdmin;password=${sqlAdminPassword};encrypt=true'

// Organize resources in a resource group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location
  tags: tags
}

// Container apps host (including container registry)
module containerApps './core/host/container-apps.bicep' = {
  name: 'container-apps'
  scope: rg
  params: {
    name: 'app'
    tags: tags
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    location: location
    logAnalyticsWorkspaceName: monitoring.outputs.logAnalyticsWorkspaceName
  }
}

module web './app/web.bicep' = {
  name: 'web'
  scope: rg
  params: {
    name: webContainerAppName
    location: location
    tags: tags
    imageName: webImageName
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    containerAppsEnvironmentName: containerApps.outputs.environmentName
    containerRegistryName: containerApps.outputs.registryName
    keyVaultName: keyVault.outputs.name
    authUrl: corsAcaUrl
    nextAuthSecret: nextAuthSecret
    openAiApiKey: openAiApiKey
    openAiBasePath: openAiBasePath
    openAiModel: openAiModel
    azureAdTenantId: azureAdTenantId
    azureAdClientId: azureAdClientId
    azureAdClientSecret: azureAdClientSecret
    databaseUrl: databaseUrl
  }
}

module migrate './app/migrate.bicep' = {
  name: 'migrate'
  scope: rg
  params: {
    name: migrateContainerAppName
    location: location
    tags: tags
    imageName: migrateImageName
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    containerAppsEnvironmentName: containerApps.outputs.environmentName
    containerRegistryName: containerApps.outputs.registryName
    keyVaultName: keyVault.outputs.name
    databaseUrl: databaseUrl
  }
}
// Give the API access to KeyVault
module webKeyVaultAccess './core/security/keyvault-access.bicep' = {
  name: 'web-keyvault-access'
  scope: rg
  params: {
    keyVaultName: keyVault.outputs.name
    principalId: web.outputs.SERVICE_WEB_IDENTITY_PRINCIPAL_ID
  }
}

//The application database
module database './app/db.bicep' = {
  name: 'mssql'
  scope: rg
  params: {
    name: dbName
    sqlAdminPassword: sqlAdminPassword
    appUser: appUser
    appUserPassword: appUserPassword
    databaseName: mssqlDatabasename
    location: location
    tags: tags
    keyVaultName: keyVault.outputs.name
  }
}


// Store secrets in a keyvault
module keyVault './core/security/keyvault.bicep' = {
  name: 'keyvault'
  scope: rg
  params: {
    name: keyVaultName
    location: location
    tags: tags
    principalId: principalId
  }
}

// Monitor application with Azure Monitor
module monitoring './core/monitor/monitoring.bicep' = {
  name: 'monitoring'
  scope: rg
  params: {
    location: location
    tags: tags
    logAnalyticsName: logAnalyticsName
    applicationInsightsName: applicationInsightsName
    applicationInsightsDashboardName: applicationInsightsDashboardName
  }
}

// Data outputs
output AZURE_DB_CONNECTION_STRING_KEY string = database.outputs.connectionStringKey
output AZURE_DB_DATABASE_NAME string = database.outputs.databaseName

// App outputs
output API_CORS_ACA_URL string = corsAcaUrl
output APPLICATIONINSIGHTS_CONNECTION_STRING string = monitoring.outputs.applicationInsightsConnectionString
output APPLICATIONINSIGHTS_NAME string = monitoring.outputs.applicationInsightsName
output AZURE_CONTAINER_ENVIRONMENT_NAME string = containerApps.outputs.environmentName
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = containerApps.outputs.registryLoginServer
output AZURE_CONTAINER_REGISTRY_NAME string = containerApps.outputs.registryName
output AZURE_KEY_VAULT_ENDPOINT string = keyVault.outputs.endpoint
output AZURE_KEY_VAULT_NAME string = keyVault.outputs.name
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output SERVICE_WEB_NAME string = web.outputs.SERVICE_WEB_NAME
output SERVICE_MIGRATE_NAME string = migrate.outputs.SERVICE_MIGRATE_NAME
output USE_APIM bool = useAPIM
output NEXTAUTH_URL string = web.outputs.SERVICE_WEB_URI
output AZURE_AD_TENANT_ID string = azureAdTenantId
output AZURE_AD_CLIENT_ID string = azureAdClientId
output AZURE_AD_CLIENT_SECRET string = azureAdClientSecret
output OPENAI_BASE_PATH string = openAiBasePath
output OPENAI_API_KEY string = openAiApiKey
output NEXTAUTH_SECRET string = nextAuthSecret
output OPENAI_MODEL string = openAiModel
output DATABASE_URL string = databaseUrl
