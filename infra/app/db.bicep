param name string
param location string = resourceGroup().location
param tags object = {}

param databaseName string = ''
param keyVaultName string

param appUser string
@secure()
param sqlAdminPassword string
@secure()
param appUserPassword string

// Because databaseName is optional in main.bicep, we make sure the database name is set here.
var defaultDatabaseName = 'npx-database'
var actualDatabaseName = !empty(databaseName) ? databaseName : defaultDatabaseName

module mssql '../core/database/mssql.bicep' = {
  name: name
  params: {
    sqlserverName: name
    sqlAdministratorLoginPassword: sqlAdminPassword
    appUser: appUser
    appUserPassword: appUserPassword
    databaseName: actualDatabaseName
    location: location
    keyVaultName: keyVaultName
    tags: tags
  }
}

output connectionStringKey string = mssql.outputs.connectionStringKey
output databaseName string = mssql.outputs.databaseName
