import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from './firebaseConfig';
import axios from "axios";

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (image: File) => {
    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);
};

//download
export const getImage = async ({ id, url }: { id: string; url: string }) => {
    const storageRef = ref(storage, `images/${id}`);
    const imageUrl = url || await getDownloadURL(storageRef);
    return imageUrl;
}

//save the image locally and than upload it to the storage
export const saveImage = async (imageUrl: string, id: string) => {
    // Download the image data
    const fs = require("fs");
    const path = require("path");
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Save the image data to a file
    const imagePath = path.join(process.cwd(), 'public', 'images', id);
    fs.writeFileSync(imagePath, imageBuffer);

    // Upload the image data to Firebase Storage
    const storageRef = ref(storage, `images/${id}`);
    await uploadBytes(storageRef, imageBuffer);
};