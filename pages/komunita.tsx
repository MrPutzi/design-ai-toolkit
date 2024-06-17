// File: /pages/komunita.tsx

import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { app, auth, onAuthStateChanged } from '../utils/firebaseConfig';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Komunita = () => {
    const [images, setImages] = useState<string[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            if (isAuthenticated) {
                const storage = getStorage(app);
                const imageRef = ref(storage, 'generatedImages');

                try {
                    const res = await listAll(imageRef);
                    const imageUrls = await Promise.all(
                        res.items.map((item) => getDownloadURL(item))
                    );
                    setImages(imageUrls);
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            }
        };

        fetchImages();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center">
                <Header />
                <main className="flex flex-1 flex-col items-center justify-center py-6">
                    <h1 className="text-3xl font-bold mb-6">Please log in to view the images.</h1>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-1 flex-col items-center justify-center py-6">
                <h1 className="text-3xl font-bold mb-6">Photo Showcase</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Generated Image ${index}`}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Komunita;
