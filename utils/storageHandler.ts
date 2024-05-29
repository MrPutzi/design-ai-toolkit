import fs from 'fs'
import path from 'path'

interface Image {
    id: number;
    url: string;
}

export function getImages() {
    const imagesFilePath = path.join(process.cwd(), 'generatedImages.json')
    const imagesFile = fs.readFileSync(imagesFilePath, 'utf8')
    const images: Image[] = imagesFile ? JSON.parse(imagesFile) : []
    return images.map((image) => image.url)
}

export function saveImage(image: Image) {
    const imagesFilePath = path.join(process.cwd(), 'generatedImages.json')
    const imagesFile = fs.readFileSync(imagesFilePath, 'utf8')
    const images: Image[] = imagesFile ? JSON.parse(imagesFile) : []
    images.push(image)
    fs.writeFileSync(imagesFilePath, JSON.stringify(images))
}

