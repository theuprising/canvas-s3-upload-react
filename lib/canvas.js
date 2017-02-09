import upload from './s3'
const debug = require('debug')('canvas-s3-upload-react:canvas')

const makeCanvas = ({width, height}) => {
  debug('making canvas')
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  console.log({canvas})
  return canvas
}

const getCanvasContext = canvas => canvas.getContext('2d')

export const nameTagToCanvas = nameTag => {
  debug('making nameTag canvas')
  const canvas = makeCanvas(nameTag)
  const ctx = getCanvasContext(canvas)
  const { name } = nameTag
  ctx.fillStyle = 'red'
  ctx.font = '48px serif'
  ctx.fillRect(100, 100, 20, 20)
  ctx.fillText(name, 30, 50)
  return canvas
}

export const canvasToDataUrl = canvas => canvas.toDataURL('image/jpeg')

export const dataUrlToBlob = dataUrl => {
  debug('making blob from', {dataUrl})
  const byteString = window.atob(dataUrl.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const arr = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    arr[i] = byteString.charCodeAt(i)
  }
  return new window.Blob([arr], {type: 'image/jpeg'})
}

const blobToFile = ({name, type}) => blob => {
  debug('making file')
  blob.name = name
  return blob
}

const blobToNameTagFile = blobToFile({
  name: 'nameTag.jpg',
  type: 'image/jpeg'
})

export const nameTagToS3Url = async nameTag => {
  debug('doing pipeline')
  const canvas = nameTagToCanvas(nameTag)
  const dataUrl = canvasToDataUrl(canvas)
  const blob = dataUrlToBlob(dataUrl)
  const file = blobToNameTagFile(blob)
  const s3Url = await upload(file)
  return s3Url
}

