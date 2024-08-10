"use client";
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import axios from 'axios'; // Import axios if not already imported
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [loggedin, setLoggedin] = useState(false);
    const [data, setData] = useState(null); // Change initial state to null
    const menunav = useRef();
    const router = useRouter();
    const toggleMenu = () => {
        try {
            menunav.current.classList.toggle('hidden');
            setMenu(!menu);
        } catch (error) {
            console.log(error);
        }
    };

    const checkLoggedin = async () => {
        try {
            const res = await axios.post('/api/users/me');
            if (res.data) {
                setLoggedin(true);
                setData(res.data); // Set the data with the user information
                console.log("resnav: ",res.data);
            } else {
                setLoggedin(false);
                setData(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkLoggedin();
    }, []);

    return (
        <nav className='rounded-b-lg p-4 flex justify-between items-center'>
            <h1 className='text-3xl font-bold sm:mx-10 cursor-default selection:bg-none'>
                <Link href="/">THE BLOG</Link>
            </h1>
            <ul className='sm:flex hidden gap-5 mx-10 justify-center items-center'>
                <li className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>
                    <Link className='px-3 py-1 font-bold text-xl' href="/">Home</Link>
                </li>
                {!loggedin && (
                    <>
                        <li className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>
                            <Link className='px-3 py-1 font-bold text-xl' href="/login">Login</Link>
                        </li>
                        <li className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>
                            <Link className='px-3 py-1 font-bold text-xl' href="/signup">Signup</Link>
                        </li>
                    </>
                )}
                {loggedin && data && (
                    <>
                    <li className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>
                        <Link className='px-3 py-1 font-bold text-xl' href={`/profile/${data.name}`}>Profile</Link>
                    </li>
                   <li onClick={() => setLoggedin(false)} className='cursor-pointer transition-all duration-150 hover:scale-110 hover:text-gray-500 px-3 py-1 font-bold text-xl'>Logout</li>
                    </>
                )}
                <li className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>
                    <Link className='px-3 py-1 font-bold text-xl' href="/">Explore</Link>
                </li>
            </ul>
            <div onClick={toggleMenu} className='sm:hidden'>
                <IoMenu size={40} />
            </div>
            <div ref={menunav} className='sm:hidden absolute block bg-black text-white bg-opacity-45 w-full h-full top-0 left-0'>
                <div onClick={toggleMenu} className='p-4 bg-amber-500 flex justify-end'>
                    <IoMdCloseCircle size={40} />
                </div>
                <ul className='flex flex-col items-center h-[80%] gap-5 my-4'>
                    <li className='transition-all duration-150 hover:text-gray-500'>
                        <Link className='px-3 py-1 font-bold text-xl' href="/">Home</Link>
                    </li>
                    {!loggedin && (
                        <>
                            <li className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>
                                <Link className='px-3 py-1 font-bold text-xl' href="/login">Login</Link>
                            </li>
                            <li className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>
                                <Link className='px-3 py-1 font-bold text-xl' href="/signup">Signup</Link>
                            </li>
                        </>
                    )}
                    {loggedin && data && (
                        <>
                            <li className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>
                                <Link className='px-3 py-1 font-bold text-xl' href={`/profile/${data.name}`}>Profile</Link>
                            </li>
                            <li onClick={() => setLoggedin(false)} className='transition-all duration-150 hover:scale-110 hover:text-gray-500'>Logout</li>
                        </>
                    )}
                    <li className='transition-all duration-150 hover:text-gray-500'>
                        <Link className='px-3 py-1 font-bold text-xl' href="/">Explore</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
