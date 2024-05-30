import React, { useEffect, useState } from 'react';
import { getImage, getImagesIds } from '../utils/storageHandler';
import {NextPage} from "next";

const Home: NextPage = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const imageIds = getImagesIds();

        const fetchedImages = imageIds.map(id => {
            const image = getImage({ id, url: '' });
            return URL.createObjectURL(new Blob([image]));
        });

        setImages(fetchedImages);
    }, []);

    return (
        <div>
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Generated Image ${index + 1}`} />
            ))}
        </div>
    );
};

export default Home;