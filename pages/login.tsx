import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { Testimonials } from "../components/Testimonials";
import ModelComponent from "../components/ModelComponent";
import { div } from "@tensorflow/tfjs";
import {useState} from "react";
import NadpisAI from "../components/NadpisAI";

const Home: NextPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()

        if (data.token) {
            localStorage.setItem('token', data.token)
            // Redirect the user to the home page or dashboard
        } else {
            // Handle error
        }
    }

    return (
        <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>DESGIN + AI Toolkit</title>
            </Head>

            <Header />
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
                <NadpisAI />

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Prihláste sa do svojho účtu
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                </label>
                                <label style={{display: 'block', marginBottom: '10px'}}>
                                    Email:
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{display: 'block', width: '100%', padding: '10px'}}
                                    />
                                </label>
                                <label style={{display: 'block', marginBottom: '10px'}}>
                                    Heslo:
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{display: 'block', width: '100%', padding: '10px'}}
                                    />
                                </label>
                                <button type="submit">Login</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Nie ste u nás registrovaný ?{' '}
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Zaregistrujte sa tu a získajte zdarma <b>30 kreditov</b>.{' '}
                            </a>
                        </p>
                    </div>

                </div>
            </main>
        </div>
)
}



export default Home;