import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  STAGE: z.enum(['TEST', 'DEV', 'PROD']),
  MSS_NAME: z.string().optional(),
  AWS_ACCOUNT_ID: z.string().optional(),
  STACK_NAME: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),
  REGION: z.string().optional(),
  ENDPOINT_URL: z.string().optional(),
  DYNAMO_TABLE_NAME: z.string().optional(),
  DYNAMO_PARTITION_KEY: z.string().optional(),
  DYNAMO_SORT_KEY: z.string().optional(),
  CLOUD_FRONT_DISTRIBUTION_DOMAIN: z.string().optional(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid Environment variables! ⚠️\n', _env.error.format())

  throw new Error('Invalid Environment variables!')
}

export const env = _env.data