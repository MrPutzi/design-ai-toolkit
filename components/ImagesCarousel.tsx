import React, { useEffect, useState } from 'react';
import {getImage, getImagesIds} from '../utils/storageHandler';
import path from "path";
import fs from "fs";

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {

        getImagesIds().map(id => {
            const image = getImage({ id, url: '' });
            return URL.createObjectURL(new Blob([image]));
        }
        )
        setImages(images);
    }
    , []);



    return (
        <div>
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Generated Image ${index + 1}`} />
            ))}
        </div>
    );
};

export default ImageGallery;