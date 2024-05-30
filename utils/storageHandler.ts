import path from 'path'

interface Image {
    id: number;
    url: string;
}

// download the image into a folder and save the path to the storage
export async function saveImage(url: string) {
    const fs = require('fs');
    const imagesFolderPath = path.join(process.cwd(), 'public', 'generatedImages')
    if (!fs.existsSync(imagesFolderPath)) {
        fs.mkdirSync(imagesFolderPath)
    }
    const imageId = Date.now()
    const imageFilePath = path.join(imagesFolderPath, `${imageId}.png`)
    fs.writeFileSync
    (imageFilePath, url)
    return imageId
}

export async function getImagesIds() {
    //get the ids of the images from the whole folder
    const fs = require('fs');
    const imagesFolderPath = path.join(process.cwd(), 'public', 'generatedImages')
    const images = fs.readdirSync(imagesFolderPath)
    return images.map(image => image.split('.')[0])
}

export function getImage(image: { id: string; url: string }) {
    const fs = require('fs');
    const imagesFolderPath = path.join(process.cwd(), 'public', 'generatedImages')
    const imageFilePath = path.join(imagesFolderPath, `${image.id}.png`)
    return fs.readFileSync(imageFilePath)
}