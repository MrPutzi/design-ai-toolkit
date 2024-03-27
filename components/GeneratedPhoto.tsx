import React, { useState, useEffect } from 'react';
import Image from "next/image";
import downloadPhoto from "../utils/downloadPhoto";

interface GeneratedPhotoProps {
    photoUrl?: string;
}

const GeneratedPhoto: React.FC<GeneratedPhotoProps> = ({ photoUrl }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (photoUrl) {
            setLoading(true);
            setError(null);
            const image = new Image();
            image.src = photoUrl;
            image.onload = () => setLoading(false);
            image.onerror = () => {
                setError('Failed to load image');
                setLoading(false);
            };
        }
    }, [photoUrl]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <span>Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <span>Error: {error}</span>
            </div>
        );
    }

    if (!photoUrl) {
        return (
            <div className="flex items-center justify-center h-full">
                <span>Image not available</span>
            </div>
        );
    }

    return (
        <div>
            <Image
                src={photoUrl}
                alt="Generated Image"
                width={512}
                height={512}
                className="rounded-lg"
            />
            <div className="flex items-center justify-center mt-4">
                <button
                    onClick={() => downloadPhoto(photoUrl, 'generatedPhoto.png')}
                    className="bg-black rounded-full text-white font-medium px-4 py-2"
                >
                    Download Image
                </button>
            </div>
        </div>
    );
};

export default GeneratedPhoto;