import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from '../context/UserContext';

export default function Header() {
    const userContext = useContext(UserContext);
    const user = userContext?.user;

    return (
        <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
            <Link href="/">
                <div className="flex space-x-2">
                    <Image
                        alt="header text"
                        src="/imageIcon.png"
                        className="sm:w-14 sm:h-14 w-9 h-9"
                        width={36}
                        height={36}
                    />
                    <h1 className="sm:text-5xl text-3xl font-bold ml-2 tracking-tight antialiased ">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-800">
                            DESIGN+ AI Toolkit
                        </span>
                    </h1>
                </div>
            </Link>
            <div className="flex space-x-4">
                {user ? (
                    <>
                        <img src="/profile-icon.png" alt="Profile" />
                        <span>{user.email}</span>
                    </>
                ) : (
                    <>
                        <LoginLink>
                            <button
                                className="bg-gradient-to-r from-pink-700 to-violet-800 hover:bg-gradient-to-tl text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Login
                            </button>
                        </LoginLink>
                        <RegisterLink>
                            <button
                                className="bg-gradient-to-r from-pink-700 to-violet-800 hover:bg-gradient-to-tl text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Register
                            </button>
                        </RegisterLink>
                    </>
                )}
            </div>
            <a
                href="https://github.com/MrPutzi/design-ai-toolkit"
                target="_blank"
                rel="noreferrer"
            >
                <Image
                    alt="Vercel Icon"
                    src="/vercelLogo.png"
                    className="sm:w-10 sm:h-[34px] w-8 h-[28px]"
                    width={32}
                    height={28}
                />
            </a>
        </header>
    );
}