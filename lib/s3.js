import config from '../config'

import axios from 'axios'
const debug = require('debug')('canvas-s3-upload-react:s3')

const getSignedRequest = async file => {
  debug('getting signed request', file)
  const response = await axios.post(
    config.signatoryUrl,
    {name: file.name, type: file.type}
  )
  debug('got signed request', response.data)
  return response.data
}

const uploadSignedRequest = async (file, signedRequest) => {
  debug('uploading signed request', signedRequest, file)
  const response = await axios.put(
    signedRequest,
    file,
    {
      headers: {
        'Content-Type': file.type
      }
    }
  )
  return response.data
}

const upload = async file => {
  const {signedRequest, url} = await getSignedRequest(file)
  const result = await uploadSignedRequest(file, signedRequest)
  debug('done!', result)
  return url
}

export default upload

