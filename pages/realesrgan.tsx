import {Uploader} from "uploader";
import {UploadDropzone} from "react-uploader";
import {NextPage} from "next";
import React, {useState} from "react";
import Head from "next/head";
import Header from "../components/Header";
import ResizablePanel from "../components/ResizablePanel";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import LoadingDots from "../components/LoadingDots";
import { CompareSlider } from "../components/CompareSlider";
import Footer from "../components/Footer";




const uploader = Uploader({
    apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
        ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
        : "free",
});

const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
    styles: { colors: { primary: "#000" } },
};






const Home: NextPage = () => {
    const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
    const [upscaledPhoto, setUpscaledPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [photoName, setPhotoName] = useState<string | null>(null);

    const UploadDropZone = () => (
        <UploadDropzone
            uploader={uploader}
            options={options}
            onUpdate={(file) => {
                if (file.length !== 0) {
                    setPhotoName(file[0].originalFile.originalFileName);
                    setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
                    generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
                }
            }}
            width="670px"
            height="250px"

        />
    );



    // async function generatePhoto(fileUrl: string) {
    //     setLoading(true);
    //     setError(null);
    //     setUpscaledPhoto(null);
    //     const response = await fetch('/api/realesrgan', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ imageUrl: fileUrl }),
    //     });
    //     let data = await response.json();
    //     setLoading(false);
    //     if (response.ok) {
    //         setLoading(false);
    //         setUpscaledPhoto(data.photoUrl);
    //     } else {
    //         setError(data.message);
    //     }
    // }
    async function generatePhoto(fileUrl: string) {
        setLoading(true);
        setError(null);
        setUpscaledPhoto(null);
        const response = await fetch('/api/realesrgan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: { image: fileUrl, scale: 2, face_enhance: false }}),
        });
        console.log(response)
        if (!response.ok) {
            setLoading(false);
            setError('Error: ' + response.statusText);
            return;
        }

        let data = await response.json();
        setLoading(false);
        if (data.success) {
            setUpscaledPhoto(data.output);
        } else {
            setError(data.message);
        }
    }



    return (
        <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>Real-ESRGAN</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
                <UploadDropZone />
                <ResizablePanel>
                    <AnimatePresence>
                        <motion.div className="flex justify-between items-center w-full flex-col mt-4">
                            <div className="w-full">
                                <div className="flex justify-center items-center w-full">
                                    {originalPhoto && (
                                        <div className="flex flex-col items-center w-full">
                                            <div className="flex flex-col items-center w-full">
                                                <p className="text-lg font-bold text-black dark:text-white">
                                                    Original Image
                                                </p>
                                                <Image
                                                    alt="Original Image"
                                                    src={originalPhoto || ''}
                                                    width={512}
                                                    height={512}
                                                    className="rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {loading && (
                                    <div className="flex justify-center items-center w-full mt-4">
                                        <LoadingDots  color={"black"} style={"large"}/>
                                    </div>
                                )}
                                {upscaledPhoto && (
                                    <div className="flex flex-col items-center w-full mt-4">
                                        <p className="text-lg font-bold text-black dark:text-white">
                                            Upscaled Image
                                        </p>
                                        <Image
                                            alt="Upscaled Image"
                                            src={upscaledPhoto || ''}
                                            width={512}
                                            height={512}
                                            className="rounded-lg"
                                        />
                                    </div>
                                )}
                                {error && (
                                    <div className="flex flex-col items-center w-full mt-4">
                                        <p className="text-lg font-bold text-black dark:text-white">
                                            Error
                                        </p>
                                        <p className="text-lg text-red-500 dark:text-red-400">{error}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </ResizablePanel>
            </main>
            <Footer />
        </div>
    );
}



export default Home;