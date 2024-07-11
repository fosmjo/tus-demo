import fs from "fs"
import * as tus from 'tus-js-client'
import {FileUrlStorage} from 'tus-js-client/lib.es5/node/index.js'


// const path = `${__dirname}/README.md`
const path = "/home/fosmjo/nas/silo/羊毛战记.Silo.S01E01.Freedom.Day.mp4"
const file = fs.createReadStream(path)

const options = {
  endpoint: 'http://localhost:8080/files/',
  urlStorage: new FileUrlStorage("url_store.json"),
  metadata: {
    filename: '羊毛战记.Silo.S01E01.Freedom.Day.mp4',
    filetype: 'viedo/mp4',
  },
  onError(error) {
    console.error('An error occurred:')
    console.error(error)
    process.exitCode = 1
  },
  onProgress(bytesUploaded, bytesTotal) {
    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
    console.log(bytesUploaded, bytesTotal, `${percentage}%`)
  },
  onSuccess() {
    console.log('Upload finished:', upload.url)
  },
}

const upload = new tus.Upload(file, options)


upload.findPreviousUploads().then(function (previousUploads) {
    // Found previous uploads so we select the first one.
    console.log("previousUploads.length:", previousUploads.length)
    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0])
    }

    // Start the upload
    upload.start()
  })
