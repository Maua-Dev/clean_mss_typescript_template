import { env } from './env'
import { STAGE } from './domain/enums/stage_enum'
import { IUserRepository } from './domain/repositories/user_repository_interface'
import { UserRepositoryDynamo } from './infra/repositories/user_repository_dynamo'
import { UserRepositoryMock } from './infra/repositories/user_repository_mock'

export class Environments {
  stage: STAGE = STAGE.TEST
  s3BucketName: string = ''
  region: string = ''
  endpointUrl: string = ''
  dynamoTableName: string = ''
  dynamoPartitionKey: string = ''
  dynamoSortKey: string = ''
  cloudFrontGetUserPresenterDistributionDomain: string = ''
  mssName: string = ''

  configureLocal() {
    env.STAGE = env.STAGE || 'TEST'
  }

  loadEnvs() {
    if (!env.STAGE) {
      this.configureLocal()
    }
    
    this.stage = env.STAGE as STAGE
    this.mssName = env.MSS_NAME as string

    if (this.stage === STAGE.TEST) {
      this.s3BucketName = 'bucket-test'
      this.region = 'sa-east-1'
      this.endpointUrl = 'http://localhost:8000'
      this.dynamoTableName = 'user_mss_template-table'
      this.dynamoPartitionKey = 'PK'
      this.dynamoSortKey = 'SK'
      this.cloudFrontGetUserPresenterDistributionDomain = 'https://d3q9q9q9q9q9q9.cloudfront.net'
    } else {
      this.s3BucketName = env.S3_BUCKET_NAME as string
      this.region = env.REGION as string
      this.endpointUrl = env.ENDPOINT_URL as string
      this.dynamoTableName = env.DYNAMO_TABLE_NAME as string
      this.dynamoPartitionKey = env.DYNAMO_PARTITION_KEY as string
      this.dynamoSortKey = env.DYNAMO_SORT_KEY as string
      this.cloudFrontGetUserPresenterDistributionDomain = env.CLOUD_FRONT_DISTRIBUTION_DOMAIN as string
    }
  }

  static getUserRepo(): IUserRepository {
    if (Environments.getEnvs().stage === STAGE.TEST) {
      return new UserRepositoryMock()
    } else if (Environments.getEnvs().stage in [STAGE.DEV, STAGE.PROD]) {
      return new UserRepositoryDynamo()
    } else {
      throw new Error('Invalid STAGE')
    }
  }

  static getEnvs() {
    const envs = new Environments()
    envs.loadEnvs()
    return envs
  }
}
