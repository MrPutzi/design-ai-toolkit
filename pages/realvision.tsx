import React, {useState} from "react";
import LoadingDots from "../components/LoadingDots";
import Head from "next/head";
import Header from "../components/Header";
import ResizablePanel from "../components/ResizablePanel";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import Footer from "../components/Footer";

const Home = () => {

    const [inputPrompt, setInputPrompt] = useState('');
    const [generatedPhoto, setGeneratedPhoto] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function generatePhoto() {
        await new Promise((resolve) => setTimeout(resolve, 10));
        if (!inputPrompt) {
            setError('Please enter a description for your image.');
            return;
        }
        setLoading(true);
        setError(null);
        setGeneratedPhoto(undefined);
        const response = await fetch('/api/realvision', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: inputPrompt }),
        });
        let data = await response.json();
        setLoading(false);
        if (response.ok) {
            setGeneratedPhoto(data.output);
        } else {
            setError(data.message);
        }
    }

    function onImageLoadError() {
        setError('Failed to load image.');
        setGeneratedPhoto(undefined);
    }

    return (
        <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>Generate Photos</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">

                <ResizablePanel>
                    <AnimatePresence>
                        <motion.div className="flex justify-between items-center w-full flex-col mt-4">
                            <div className="w-full">
                                {generatedPhoto ? (
                                    <a href={generatedPhoto} target="_blank" rel="noreferrer">
                                        <Image
                                            alt="Generated Image"
                                            src={generatedPhoto}
                                            width={512}
                                            height={512}
                                            className="rounded-lg"
                                            onLoadingComplete={() => setLoading(false)}
                                            onError={onImageLoadError}
                                        />
                                    </a>
                                ) : null}
                                {error && <p className="text-red-500">{error}</p>}
                                <input
                                    type="text"
                                    placeholder="Describe your image"
                                    value={inputPrompt}
                                    onChange={(e) => setInputPrompt(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-5"
                                />


                                <button
                                    onClick={generatePhoto}
                                    disabled={loading}
                                    className="bg-black rounded-full text-white font-medium px-4 pt-2 pb-3 w-40"
                                >
                                    {loading ? (
                                        <span className="pt-4">
                                            <LoadingDots color="white" style="large"/>
                                        </span>
                                    ) : 'Generate Image'}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </ResizablePanel>
            </main>
            <Footer/>
        </div>


    );
}
export default Home;