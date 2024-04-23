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



    // interface FormData {
    //     width: number;
    //     height: number;
    //     prompt: string;
    //     scheduler: string;
    //     numInterferenceSteps: number;
    //     refine: string;
    //     lora_scale: number;
    //     guidance_scale: number;
    //     apply_watermark: boolean;
    //     high_noise_frac: number;
    //     negative_prompt: string;
    //     prompt_strength: number;
    //     num_inference_steps: number;
    //     num_outputs: number;
    // }

    // const InputForm: React.FC = () => {
    //     const [formData, setFormData] = useState<FormData>({
    //         numInterferenceSteps: 0,
    //         width: 768,
    //         height: 768,
    //         prompt: '',
    //         refine: 'expert_ensemble_refiner',
    //         scheduler: 'K_EULER',
    //         lora_scale: 0.6,
    //         num_outputs: 1,
    //         guidance_scale: 7.5,
    //         apply_watermark: false,
    //         high_noise_frac: 0.8,
    //         negative_prompt: '',
    //         prompt_strength: 0.8,
    //         num_inference_steps: 25
    //     });

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


        // const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        //     setFormData({
        //         ...formData,
        //         [event.target.name]: event.target.type === 'number' ?
        //             parseInt(event.target.value, 10) : event.target.value,
        //     });
        // };


        // async function generatePhoto() {
        //     await new Promise((resolve) => setTimeout(resolve, 10));
        //     if (!inputPrompt) {
        //         setError('Please enter a description for your image.');
        //         return;
        //     }
        //     setLoading(true);
        //     setError(null);
        //     setGeneratedPhoto(undefined);
        //     const response = await fetch('/api/generate', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({prompt: inputPrompt}),
        //     });
        //     let data = await response.json();
        //     setLoading(false);
        //     if (response.ok) {
        //         setGeneratedPhoto(data.photoUrl);
        //     } else {
        //         setError(data.message);
        //     }
        // }

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