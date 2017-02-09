import aws from 'aws-sdk';

const s3 = new aws.S3();
const S3_BUCKET = process.env.S3_BUCKET;
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const genRandomString = n => Array.apply(null, Array(n)).map(() => {
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}).join('');

const makeParams = ({ name, type }) => ({
  Bucket: S3_BUCKET,
  Key: makeKey(name),
  Expires: 60,
  ContentType: type,
  ACL: 'public-read'
});

const makeKey = name => genRandomString(4) + '/' + name;

exports.handler = (event, context) => {
  console.log('event: ', event);

  const key = makeKey(event.name);
  const params = makeParams(event);

  s3.getSignedUrl('putObject', params, (err, data) => {
    if (err) {
      return console.error(err);
    }
    var response = {
      signed_request: data,
      url: S3_BUCKET + '/' + key
    };
    context.succeed(response);
  });
};