/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from '../src/shared/env'
import * as cdk from 'aws-cdk-lib'
import { TemplateStack } from './iac/template_stack'
import { adjustLayerDirectory } from './adjust_layer_directory'

console.log('Starting the CDK')

console.log('Adjusting the layer directory')
adjustLayerDirectory()
console.log('Finished adjusting the layer directory')

const app = new cdk.App()

const awsRegion = env.REGION
const awsAccount = env.AWS_ACCOUNT_ID
const stackName = env.STACK_NAME

let stage = ''

if (stackName === 'prod') {
  stage = 'PROD'
} else if (stackName === 'homolog') {
  stage = 'HOMOLOG'
} else if (stackName === 'dev') {
  stage = 'DEV'
} else if (stackName === 'test') {
  stage = 'TEST'
}

const tags = {
  'project': 'Template',
  'stage': 'dev',
  'stack': 'BACK',
  'owner': 'Digao'
}

new TemplateStack(app, stackName as string, {
  env: {
    region: awsRegion,
    account: awsAccount
  },
  tags: tags
})

app.synth()
