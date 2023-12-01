/* eslint-disable @typescript-eslint/no-explicit-any */
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Resource, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { Duration } from 'aws-cdk-lib'

export class LambdaStack extends Construct {
  functionsThatNeedDynamoPermissions: lambda.Function[] = []
  lambdaLayer: lambda.LayerVersion

  getUserFunction: lambda.Function
  getAllUsersFunction: lambda.Function
  createUserFunction: lambda.Function
  deleteUserFunction: lambda.Function
  updateUserFunction: lambda.Function

  createLambdaApiGatewayIntegration(moduleName: string, method: string, mssStudentApiResource: Resource, environmentVariables: Record<string, any>) {
    const modifiedModuleName = moduleName.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    
    const lambdaFunction = new lambda.Function(this, modifiedModuleName, {
      functionName: `${modifiedModuleName}`,
      code: lambda.Code.fromAsset(`../src/modules/${moduleName}`),
      handler: `app/${moduleName}_presenter.lambda_handler`,
      runtime: lambda.Runtime.NODEJS_14_X,
      layers: [this.lambdaLayer],
      environment: environmentVariables,
      timeout: Duration.seconds(15),
      memorySize: 512
    })

    mssStudentApiResource.addResource(moduleName.replace('_','-')).addMethod(method, new LambdaIntegration(lambdaFunction))
    
    return lambdaFunction
  }

  constructor(scope: Construct, apiGatewayResource: Resource, environmentVariables: Record<string, any>) {
    super(scope, 'Template_Lambdas')

    this.lambdaLayer = new lambda.LayerVersion(this, 'Template_Layer', {
      code: lambda.Code.fromAsset('./shared'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
    })

    this.getUserFunction = this.createLambdaApiGatewayIntegration('get_user', 'GET', apiGatewayResource, environmentVariables)
    this.getAllUsersFunction = this.createLambdaApiGatewayIntegration('get_all_users', 'GET', apiGatewayResource, environmentVariables)
    this.createUserFunction = this.createLambdaApiGatewayIntegration('create_user', 'POST', apiGatewayResource, environmentVariables)
    this.deleteUserFunction = this.createLambdaApiGatewayIntegration('delete_user', 'POST', apiGatewayResource, environmentVariables)
    this.updateUserFunction = this.createLambdaApiGatewayIntegration('update_user', 'POST', apiGatewayResource, environmentVariables)

    this.functionsThatNeedDynamoPermissions = [this.getUserFunction, this.createUserFunction, this.deleteUserFunction, this.updateUserFunction, this.getAllUsersFunction]
  }
}