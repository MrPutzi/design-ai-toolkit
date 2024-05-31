import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../utils/firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Home = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const imagesRef = ref(storage, 'myFolder'); // replace 'myFolder' with your folder name
            const { items } = await listAll(imagesRef);
            const urlPromises = items.map((item) => getDownloadURL(item));
            const urls = await Promise.all(urlPromises);
            setImageUrls(urls);
        };

        fetchImages();
    }, []);

    return (
        <div>
            {imageUrls.map((url, index) => (
                <img key={index} src={url} alt="From Firebase" />
            ))}
        </div>
    );
};

export default Home;