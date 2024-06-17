import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import CountUp from "react-countup";
import { CompareSlider } from "../components/CompareSlider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Toggle from "../components/Toggle";
import appendNewToName from "../utils/appendNewToName";
import downloadPhoto from "../utils/downloadPhoto";
import va from "@vercel/analytics";
import GeneratedPhoto from "../components/GeneratedPhoto";
import InputForm from "../components/InputForm";

const Home = () => {


        const [generatedPhoto, setGeneratedPhoto] = useState<string | undefined>(undefined); // State for generated photo URL
        const [loading, setLoading] = useState<boolean>(false);
        const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
        const [sideBySide, setSideBySide] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);
        const [inputPrompt, setInputPrompt] = useState<string>(''); // State for text prompt
        const [width, setWidth] = useState<number>(512);
        const [height, setHeight] = useState<number>(512);
        const [numOutputs, setNumOutputs] = useState<number>(1);
        const [scheduler, setScheduler] = useState<string>('K_EULER');
        const [numInterferenceSteps, setNumInterferenceSteps] = useState<number>(25);




        function onImageLoadError() {
            setError('Failed to load image.');
            setGeneratedPhoto(undefined);
        }

        return (
            <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
                <Head>
                    <title>Generate Photos</title>
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
                                            Vyskúšajte svetoznámy model generovania fotiek Stable Diffusion
                                        </h1>
                                        <p className=" antialiased text-slate-500 pb-32">
Vložte textový popis a model vygeneruje fotografiu na základe vášho popisu.
                                        </p>
                                        <InputForm/>
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

export default Home;