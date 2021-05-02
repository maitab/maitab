// require modules
const fs = require('fs')
const archiver = require('archiver')

// create a file to stream archive data to.
const output = fs.createWriteStream('packed.zip')
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
})

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes')
  console.log('archiver has been finalized and the output file descriptor has closed.')
})

archive.on('error', function (err) {
  throw err
})

// pipe archive data to the file
archive.pipe(output)

// append files from a sub-directory, putting its contents at the root of archive
archive.directory('build/', false)

archive.finalize()
