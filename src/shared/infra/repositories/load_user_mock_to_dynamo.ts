/* eslint-disable @typescript-eslint/no-unused-vars */
import * as AWS from 'aws-sdk'

import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DynamoDBClient, waitUntilTableExists, ListTablesCommand, CreateTableCommand } from '@aws-sdk/client-dynamodb'

import { Environments } from '../../environments'
import { UserRepositoryMock } from './user_repository_mock'
import { UserRepositoryDynamo } from './user_repository_dynamo'

async function setupDynamoTable(): Promise<void> {
  const dynamoTableName = 'user_mss_template-Table'
  const endpointUrl = 'http://localhost:8000'
  // JS SDK v3 does not support global configuration.
  // Codemod has attempted to pass values to each service client in this file.
  // You may need to update clients outside of this file, if they use global config.
  AWS.config.update({ region: 'sa-east-1' })

  console.log('Setting up DynamoDB table...')

  const dynamoClient = new DynamoDBClient({
    // The transformation for endpoint is not implemented.
    // Refer to UPGRADING.md on aws-sdk-js-v3 for changes needed.
    // Please create/upvote feature request on aws-sdk-js-codemod for endpoint.
    endpoint: endpointUrl,
    region: 'sa-east-1',
  })
  console.log('DynamoDB client created')

  const tables = (await dynamoClient.send(new ListTablesCommand({}))).TableNames || []

  if (!tables.includes(dynamoTableName)) {
    console.log('Creating table...')
    await dynamoClient.send(
      new CreateTableCommand({
        TableName: dynamoTableName,
        AttributeDefinitions: [
          { AttributeName: 'PK', AttributeType: 'S' },
          { AttributeName: 'SK', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'PK', KeyType: 'HASH' },
          { AttributeName: 'SK', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      })
    )

    console.log('Waiting for table to be created...')

    // Adicione um atraso aqui antes de verificar se a tabela existe.
    await new Promise(resolve => setTimeout(resolve, 10000)) // Ajuste o tempo conforme necessário.

    await waitUntilTableExists({
      client: dynamoClient,
      maxWaitTime: 200,
    }, { TableName: dynamoTableName })

    console.log('Loading table...')

    const dynamoDB = DynamoDBDocument.from(dynamoClient)

    console.log('Adding counter to table')

    await dynamoDB
      .put({
        TableName: dynamoTableName,
        Item: {
          PK: 'COUNTER',
          SK: 'COUNTER',
          'COUNTER': 0,
        },
      })

    console.log('Table "user_mss_template-table" created!')
  } else {
    console.log('Table already exists!')
  }
}

async function loadMockToLocalDynamo() {
  const mock = new UserRepositoryMock()
  const dynamoRepo = new UserRepositoryDynamo()

  const count = 0
  console.log('Loading mock to local DynamoDB...')

  // await dynamoRepo.deleteUser(2)

  // const users = await mock.getAllUsers()

  // for(const user of users) {
  //   console.log(`Loading user ${user.id} | ${user.name} to dynamoDB...`)
  //   await dynamoRepo.createUser(user)
  //   count += 1
  // }

  // const users = await dynamoRepo.getAllUsers()
  const user = await dynamoRepo.getUser(1)

  // console.log('users - [LOAD_MOCK_TO_LOCAL_DYNAMO] - ', users)
  console.log('user - [LOAD_MOCK_TO_LOCAL_DYNAMO] - ', user)

  // console.log('Mock loaded to local DynamoDB with success! [' + count + ' users]')
}

async function loadMockToRealDynamo() {
  const mock = new UserRepositoryMock()
  const dynamoRepo = new UserRepositoryDynamo()

  let count = 0
  const dynamoDB = DynamoDBDocument.from(new DynamoDBClient({
    region: Environments.getEnvs().region,
    endpoint: Environments.getEnvs().endpointUrl,
  }))

  dynamoDB
    .put({
      TableName: Environments.getEnvs().dynamoTableName,
      Item: {
        PK: 'COUNTER',
        SK: 'COUNTER',
        'COUNTER': 0,
      },
    })
  
  console.log('Loading mock to real DynamoDB...')
  const users = await mock.getAllUsers()

  for(const user of users) {
    console.log(`Loading user ${user.id} | ${user.name} to dynamoDB...`)
    await dynamoRepo.createUser(user)
    count += 1
  }

  console.log(`${count} users loaded to real DynamoDB`)
  
}

if (require.main === module) {
  (async () => {
    await setupDynamoTable()
    await loadMockToLocalDynamo()
  })()
}