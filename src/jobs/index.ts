import { ListObjectsOutput, Object } from 'aws-sdk/clients/s3'
import cron from 'node-cron'
import prisma from '../config/prisma'
import S3 from '../config/s3'
import { logger } from '../services'

const { AWS_S3_BUCKET } = process.env

const deleteOldFiles = (files: Object[] | undefined) => {
  if (!files) return

  const oldFiles = files.filter((file) => {
    const LastModified = file?.LastModified

    const now = new Date()

    const difference = now.getTime() - (LastModified?.getTime() || 0)
    const treeMonthsInMilliseconds = 1000 * 60 * 60 * 24 * 30 * 3

    return difference > treeMonthsInMilliseconds
  })

  oldFiles.forEach((file) => {
    const Key = file?.Key

    if (!Key) return

    S3.deleteObject({
      Key,
      Bucket: AWS_S3_BUCKET as string,
    }).promise()
  })
}

const deleteIndexes = async () => {
  const now = new Date()
  const treeMonthsInMilliseconds = 1000 * 60 * 60 * 24 * 30 * 3
  const threeMonthsAgo = new Date(now.getTime() - treeMonthsInMilliseconds)

  await prisma.animals.deleteMany({
    where: { createdAt: { lt: threeMonthsAgo } },
  })
}

cron.schedule('0 6 * * *', () => {
  logger.info('Running job delete old files')

  deleteIndexes()

  const bucketParams = {
    Bucket: AWS_S3_BUCKET as string,
  }

  S3.listObjects(bucketParams, (err: Error, data: ListObjectsOutput) => {
    if (err) {
      logger.error(`Error: ${err}`)
    } else {
      deleteOldFiles(data.Contents as Object[])
    }
  })
})
