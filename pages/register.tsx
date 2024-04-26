import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { Testimonials } from "../components/Testimonials";
import ModelComponent from "../components/ModelComponent";
import RegisterForm from "../components/RegisterForm";
import NadpisAI from "../components/NadpisAI";

const Home: NextPage = () => {
    // const models = [
    //   { title: 'Face restoration', description: 'Image-to-image generation/restoration', imageUrl: '/path/to/image1.jpg' },
    //   { title: 'Image generation', description: 'Text-to-image generation', imageUrl: '/path/to/image2.jpg' }
    //   // Add more models here...
    // ];
    return (
        <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>DESGIN + AI Toolkit</title>
            </Head>

            <Header />
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">

                <NadpisAI />


                <div className="flex justify-center space-x-4">
                    {/*<Link*/}
                    {/*    className="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"*/}
                    {/*    href="/register"*/}
                    {/*>*/}
                    {/*    Zaregistrujte sa*/}
                    {/*</Link>*/}
                    <RegisterForm />
                </div>

                <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
                    <div className="flex flex-col space-y-10 mt-4 mb-16">
                        <div className="flex sm:space-x-2 sm:flex-row flex-col">
                            <div>
                                {/*<ModelList models={models} />*/}
                                {/*<h2 className="mb-1 font-medium text-lg">Original Photo</h2>*/}
                                {/*  <Image*/}
                                {/*    alt="Original photo of my bro"*/}
                                {/*    src="/michael.jpg"*/}
                                {/*    className="w-96 h-96 rounded-2xl"*/}
                                {/*    width={400}*/}
                                {/*    height={400}*/}
                                {/*  />*/}
                                {/*</div>*/}
                                {/*<div className="sm:mt-0 mt-8">*/}
                                {/*  <h2 className="mb-1 font-medium text-lg">Restored Photo</h2>*/}
                                {/*  <Image*/}
                                {/*    alt="Restored photo of my bro"*/}
                                {/*    width={400}*/}
                                {/*    height={400}*/}
                                {/*    src="/michael-new.jpg"*/}
                                {/*    className="w-96 h-96 rounded-2xl sm:mt-0 mt-2"*/}
                                {/*  />*/}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Home;
