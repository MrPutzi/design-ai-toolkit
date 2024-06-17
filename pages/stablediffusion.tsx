import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import InputFormStableDiffusion from "../components/Sd3InputForm";

const StableDiffusion3 = () => {
    const [generatedPhoto, setGeneratedPhoto] = useState<string | undefined>(undefined); // State for generated photo URL
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    function onImageLoadError() {
        setError('Failed to load image.');
        setGeneratedPhoto(undefined);
    }

    return (
        <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>Stable Diffusion 3</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main
                className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
                <ResizablePanel>
                    <AnimatePresence>
                        <motion.div className="flex justify-between items-center w-full flex-col mt-4">
                            <div className="flex w-full">
                                <div className="w-full">
                                    <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl mb-5 text-center ">
                                        Try the world-renowned Stable Diffusion 3 model
                                    </h1>
                                    <p className=" antialiased text-slate-500 pb-32">
                                        Enter a text description and the model will generate a photo based on your description.
                                    </p>
                                    <InputFormStableDiffusion/>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </ResizablePanel>
            </main>
            <Footer/>
        </div>
    );
}

export default StableDiffusion3;