"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from 'react'
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        password: ""
    })
    const [buttondis, setButtondis] = useState(false)
    const [load, setLoad] = useState(false)
    const onSignup = async () => {
        try {
            setLoad(true)
            const res=await axios.post("/api/users/signup", user);
            console.log(res.data);
            console.log("success");
            router.push("/login");
            
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        if (user.name && user.password) {
            setButtondis(true)
        } else {
            setButtondis(false)
        }
    }, [user])
    return (
        <div className="h-[90vh] text-white">
            <>{load && <div className='loader'></div>}</>
            <div className=" h-full mx-auto w-[70%]">
                <div className=" h-full relative">
                    <div className=" absolute top-[28%] border-t-2 border-black border-opacity-45 shadow-xl shadow-black p-5 left-[33%] flex flex-col mx-auto justify-center w-[39%] h-[50%] rounded-xl items-end gap-5">
                    <h1 className=" w-full text-4xl font-bold text-black text-center">Sign Up</h1>

                        <div className="">
                            <label htmlFor="name" className="text-black text-xl font-bold">Username: </label>
                            <input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} type="text" placeholder="Username" className="px-4 placeholder:text-gray-300 py-2 font-semibold bg-black bg-opacity-35" name="name" id="name" required autoComplete="off" />
                        </div>
                        <div className="">
                            <label htmlFor="password" className="text-black text-xl font-bold">Password: </label>
                            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" className="px-4 placeholder:text-gray-300 py-2 font-semibold bg-black bg-opacity-35" name="password" id="password" required autoComplete="off" />
                        </div>
                        <div className="flex flex-col w-full items-center gap-5">
                            <button onClick={onSignup} disabled={!buttondis || load} className="rounded-full font-bold hover:scale-110 hover:bg-opacity-65 transition-all duration-150 w-full bg-amber-500 shadow-md shadow-black py-3">Sign Up</button>
                            <Link href="/login" className="text-black font-bold hover:text-blue-900 transition-all duration-200 hover:underline">Already have an account? Login</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page
