#!/usr/bin/env node
//
// Fetch missing images from the noun project
//

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const util = require('util')
const fs = require('fs')
const NounProject = require('the-noun-project')
const Downloader = require('nodejs-file-downloader')
const path = require('path')
const uuid = require('uuid')

const dataDir = path.resolve(__dirname, '../data')
const imagesDir = path.resolve(__dirname, '../images')

const argv = yargs(hideBin(process.argv))
  .option('key', {
    alias: 'k',
    type: 'string',
    description: 'Noun Project API Key'
  })
  .option('secret', {
    alias: 's',
    type: 'string',
    description: 'Noun Project API Secret'
  })
  .demandOption(['key', 'secret'], 'Both key and secret options required')
  .help()
  .argv

const nounProject = new NounProject({
  key: argv.key,
  secret: argv.secret
})

const getIconById = util.promisify(nounProject.getIconById)

async function downloadIcon (url) {
  if (!fs.existsSync(path.resolve(imagesDir, getFilename(url)))) {
    const downloader = new Downloader({
      url: url,
      directory: imagesDir
    })
    await downloader.download()
  }
}

function getFilename (url) {
  let name = url

  name = url.substring(url.lastIndexOf('/') + 1)

  if (name.includes('svg')) {
    const params = name.indexOf('?')
    if (params !== -1) {
      name = name.substring(0, params)
    }
  }
  return name
}

(async function () {
  const data = JSON.parse(fs.readFileSync(path.resolve(dataDir, '01.json')))

  for (const word of data.list) {
    if (!word.uuid) {
      word.uuid = uuid.v4()
    }

    if (word.image && fs.existsSync(path.resolve(imagesDir, word.image))) {
      continue
    }

    if (!word.nounProjectIconId) {
      console.log('ID needed for ' + word.english)
      continue
    }

    try {
      const request = await getIconById(word.nounProjectIconId)

      const icon = request.icon
      const url = icon.attribution_preview_url ? icon.attribution_preview_url : icon.icon_url
      try {
        await downloadIcon(url)
        word.image = getFilename(url)

        // Incrementally update the file
        fs.writeFileSync(path.resolve(dataDir, '01.json'), JSON.stringify(data))
        console.log('Image downloaded for ' + word.english)
      } catch (error) {
        console.warn('Download failed for ' + word.english, error)
      }
    } catch (error) {
      if (error === '403 HTTP response code') {
        console.warn(error + '. Check your API details.')
        break
      }
      console.warn('Get icon icon for', word.english)
      console.warn(error)
    }
  }

  fs.writeFileSync(path.resolve(dataDir, '01.json'), JSON.stringify(data))
  console.log('All Done.')
})()
