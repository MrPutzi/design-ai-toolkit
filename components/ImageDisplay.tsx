import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../utils/firebaseConfig';

interface ImageDisplayProps {
    folderPath: string; // Path to the folder in Firebase Storage
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ folderPath }) => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const storage = getStorage(initializeApp(firebaseConfig));

        const fetchImages = async () => {
            try {
                const listRef = ref(storage, folderPath);
                const res = await listAll(listRef);
                const imageUrls = await Promise.all(
                    res.items.map((item: any) => getDownloadURL(item))
                );
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [folderPath]);

    return (
        <div className="image-display">
            {images.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Generated Image ${index}`} />
            ))}
        </div>
    );
};

export default ImageDisplay;