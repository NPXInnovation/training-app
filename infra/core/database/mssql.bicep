param sqlserverName string
param location string = resourceGroup().location
param tags object = {}

param appUser string = 'appUser'
param databaseName string
param keyVaultName string
param sqlAdministratorLogin string = 'sqlAdmin'
param connectionStringKey string = 'sql-connection-string'

@secure()
param sqlAdministratorLoginPassword string
@secure()
param appUserPassword string

var connectionString = 'sqlserver://${sqlServer.properties.fullyQualifiedDomainName}; Database=${databaseName}; User=${appUser}'

resource sqlServer 'Microsoft.Sql/servers@2022-08-01-preview' = {
  name: sqlserverName
  location: location
  tags: tags
  properties: {
    administratorLogin: sqlAdministratorLogin
    administratorLoginPassword: sqlAdministratorLoginPassword
    version: '12.0'
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2022-08-01-preview' = {
  parent: sqlServer
  name: databaseName
  location: location
  tags: {
    displayName: 'Database'
  }
  sku: {
    name: 'Basic'
  }
}

resource allowAllWindowsAzureIps 'Microsoft.Sql/servers/firewallRules@2022-08-01-preview' = {
  parent: sqlServer
  name: 'AllowAllWindowsAzureIps'
  properties: {
    endIpAddress: '0.0.0.0'
    startIpAddress: '0.0.0.0'
  }
}


resource sqlDeploymentScript 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: '${sqlserverName}-deployment-script'
  dependsOn: [
    sqlDatabase
    allowAllWindowsAzureIps
  ]
  location: location
  kind: 'AzureCLI'
  properties: {
    azCliVersion: '2.37.0'
    retentionInterval: 'PT1H' // Retain the script resource for 1 hour after it ends running
    timeout: 'PT5M' // Five minutes
    cleanupPreference: 'OnSuccess'
    environmentVariables: [
      {
        name: 'APPUSERNAME'
        value: appUser
      }
      {
        name: 'APPUSERPASSWORD'
        secureValue: appUserPassword
      }
      {
        name: 'DBNAME'
        value: databaseName
      }
      {
        name: 'DBSERVER'
        value: sqlServer.properties.fullyQualifiedDomainName
      }
      {
        name: 'SQLCMDPASSWORD'
        secureValue: sqlAdministratorLoginPassword
      }
      {
        name: 'SQLADMIN'
        value: sqlAdministratorLogin
      }
    ]

    scriptContent: '''
      wget https://github.com/microsoft/go-sqlcmd/releases/download/v0.15.4/sqlcmd-v0.15.4-linux-x64.tar.bz2

      tar x -f sqlcmd-v0.15.4-linux-x64.tar.bz2 -C .

      cat <<SCRIPT_END > ./initDb.sql
      drop user ${APPUSERNAME}
      go
      create user ${APPUSERNAME} with password = '${APPUSERPASSWORD}'
      go
      alter role db_owner add member ${APPUSERNAME}
      go
      SCRIPT_END

      ./sqlcmd -S ${DBSERVER} -d ${DBNAME} -U ${SQLADMIN} -i ./initDb.sql
    '''
  }
}

resource sqlAdminPasswordSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'sqlAdminPassword'
  properties: {
    value: sqlAdministratorLoginPassword
  }
}


resource appUserSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'appUser'
  properties: {
    value: appUser
  }
}

resource appUserPasswordSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'appUserPassword'
  properties: {
    value: appUserPassword
  }
}

resource sqlAzureConnectionStringSercret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: connectionStringKey
  properties: {
    value: '${connectionString}; Password=${appUserPassword}'
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

output connectionStringKey string = connectionStringKey
output databaseName string = databaseName
