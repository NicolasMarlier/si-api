const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
const storage = new Storage()
// {
//   keyFilename: 'auth/api-project-851963513698-30d997cddaa0.json',
// });

const bucketName = 'si-api';

const basePath = ""

const upload = async(url, size) => {
    const filename = url.split("/").slice(-1)
    const localPath = `${basePath}tmp/${filename}`
    const localTransformedPath = `${basePath}tmp/${size || "o"}-${filename}`
    const bucketPath = `invader-images/${size || "o"}-${filename}`
    console.log("Downloading...")
    await downloadToLocalPath(url, localPath)
    console.log(`Downloading done to ${localPath}.`)
    if(size) {
        console.log("Resizing...")
        await resize(localPath, localTransformedPath, size)
        console.log(`Resized from ${localPath} to ${localTransformedPath} done.`)
    }
    else {
        fs.copyFileSync(localPath, localTransformedPath)
    }
    console.log("Uploading...")
    const hosted_url = await uploadFromLocalPath(localTransformedPath, bucketPath)
    console.log("Uploading done.")
    console.log("Removing local files...")
    fs.unlinkSync(localPath)
    fs.unlinkSync(localTransformedPath)
    console.log("Done.")
    return hosted_url
}

const downloadToLocalPath = (url, downloadPath, callback) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(downloadPath);
        https.get(url, response => {
            response.pipe(file);
            response.on('end', resolve);
        });    
    });
}

const resize = (srcPath, dstPath, width) => sharp(srcPath)
    .resize(width)
    .jpeg({ mozjpeg: true })
    .toFile(dstPath);

const uploadFromLocalPath = (localPath, bucketPath, callback) => {
    return new Promise((resolve, reject) => {
        storage.bucket(bucketName).upload(
            localPath,
            {
                destination: bucketPath
            },
            (err, file) => {
                if (err) {
                    reject(err);
                }
                resolve(file.publicUrl())
            }
        );
    })
}

module.exports = {
    upload
}