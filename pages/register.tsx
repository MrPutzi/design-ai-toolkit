import { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import NadpisAI from "../components/NadpisAI";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";

const Home: NextPage = () => {
    return (
        <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>DESIGN + AI Toolkit</title>
            </Head>
            <Header />
            <NadpisAI />
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Vytvorte si účet a získajte prístup k nástrojom pre dizajn a umelú inteligenciu.
                    </h2>
                </div>
                <div className="flex justify-center space-x-4">
                    <RegisterForm/>
                </div>
                <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
                    <div className="flex flex-col space-y-10 mt-4 mb-16">
                        <div className="flex sm:space-x-2 sm:flex-row flex-col">
                            <div>
                                {/* Placeholder for additional content such as models or images */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Home;