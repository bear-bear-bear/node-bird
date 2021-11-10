const path = require('path');
const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // 'bearsns'
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/example_abc.png
  const basename = path.basename(Key);
  const ext = basename.split('.').pop();
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;

  console.log({ Bucket, Key, basename, ext, requiredFormat });

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log('original', s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body)
                                  .resize(400, 400, { fit: 'inside' })
                                  .toFormat(requiredFormat)
                                  .toBuffer();
    
    await s3.putObject({
      Bucket,
      Key: `thumb/${basename}`,
      Body: resizedImage,
    }).promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${basename}`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
}