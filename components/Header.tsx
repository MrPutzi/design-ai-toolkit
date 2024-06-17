import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useContext, useState } from "react";
import { UserContext } from '../context/UserContext';
import {UserType} from "../context/types";
import SquigglyLines from "./SquigglyLines";

export default function Header() {
    const userContext = useContext(UserContext);
    const user = userContext ? userContext.user : null;
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const isActive = (pathname: string) => router.pathname === pathname;

    return (
        <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md" data-show-menu={showMenu}>
            <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2 lg:px-0">
                <div className="flex items-center justify-start w-1/4 h-full pr-4">
                    <Link href="/" legacyBehavior>
                        <a className="inline-flex items-center w-auto px-6 py-4 md:py-0">
                            <span className="p-1 text-2xl font-black leading-none text-gray-900">design</span>
                            <span className=" text-2xl font-black leading-none text-indigo-600">+</span>
                        </a>
                    </Link>
                </div>
                <div className={`top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex ${showMenu ? 'flex fixed' : 'hidden'}`}>
                    <div
                        className="pl-12 flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
                        <Link href="/" legacyBehavior>
                            <a className={`inline-block w-full h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden ${isActive('/') ? 'active' : ''}`}>
                                Tails<span className="text-indigo-600">.</span>
                            </a>
                        </Link>
                        <div
                            className="mr-40 ml-52 flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
                            <Link href="/" legacyBehavior>
                                <a className={`inline-block w-full py-2 mx-0 ml-6 font-medium text-left ${isActive('/') ? 'active' : 'text-gray-700'} md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center`}>Domov</a>
                            </Link>
                            <Link href="/komunita" legacyBehavior>
                                <a className={`inline-block w-full py-2 mx-0 font-medium text-left ${isActive('/komunita') ? 'active' : 'text-gray-700'} md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center`}>Komunita</a>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <a className={`inline-block w-full py-2 mx-0 font-medium text-left ${isActive('/modely') ? 'active' : 'text-gray-700'} md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center`}>Modely</a>
                            </Link>
                        </div>
                        <div
                            className="pl-64 ml-64 flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
                            {user ? (
                                <>
                                    <img src="/profile-icon.png" alt="Profile" className="w-8 h-8 rounded-full" />
                                    <span className="ml-2 text-gray-700">{user.email}</span>
                                    <span className="ml-2 text-gray-700">Credit: {user.credit}</span>
                                </>
                            ) : (
                                <>
                                    {/*<Link href="/login" legacyBehavior>*/}
                                    {/*    <a className="inline-block w-auto px-6 py-2 mx-0 font-medium text-center text-white bg-indigo-600 rounded-lg md:mx-2 lg:mx-3">Login</a>*/}
                                    {/*</Link>*/}
                                    {/*<Link href="/register" legacyBehavior>*/}
                                    {/*    <a className="inline-block w-auto px-6 py-2 mx-0 font-medium text-center text-indigo-600 bg-white rounded-lg md:mx-2 lg:mx-3">Register</a>*/}
                                    {/*</Link>*/}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}