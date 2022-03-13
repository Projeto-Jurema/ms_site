import AWS from 'aws-sdk'

const S3 = new AWS.S3({
  apiVersion: '2006-03-01',
})

export default S3
