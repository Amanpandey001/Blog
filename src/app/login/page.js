"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", password: "" });
    const [data, setData] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const getUserDetails = async () => {
        try {
            const res = await axios.post('/api/users/me');
            console.log("res:",res.data);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const onLogin = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/login", user);
            console.log("loginres:",res.data);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.name && user.password) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [user]);

    return (
        <div className="h-[90vh] text-white">
            {loading && <div className='loader'></div>}
            <div className="h-full mx-auto w-[70%]">
                <div className="h-full relative">
                    <div className="absolute top-[28%] border-t-2 border-black border-opacity-45 shadow-xl shadow-black p-5 left-[33%] flex flex-col mx-auto justify-center w-[39%] h-[50%] rounded-xl items-end gap-5">
                        <h1 className=" w-full text-4xl font-bold text-black text-center">Login</h1>
                        <div>
                            <label htmlFor="name" className="text-black text-xl font-bold">Username: </label>
                            <input 
                                value={user.name} 
                                onChange={(e) => setUser({ ...user, name: e.target.value })} 
                                type="text" 
                                placeholder="Username" 
                                className="px-4 placeholder:text-gray-300 py-2 font-semibold bg-black bg-opacity-35" 
                                name="name" 
                                id="name" 
                                required 
                                autoComplete="off" 
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-black text-xl font-bold">Password: </label>
                            <input 
                                value={user.password} 
                                onChange={(e) => setUser({ ...user, password: e.target.value })} 
                                type="password" 
                                placeholder="Password" 
                                className="px-4 placeholder:text-gray-300 py-2 font-semibold bg-black bg-opacity-35" 
                                name="password" 
                                id="password" 
                                required 
                                autoComplete="off" 
                            />
                        </div>
                        <div className="flex flex-col w-full items-center gap-5">
                            <button 
                                onClick={onLogin} 
                                disabled={!buttonDisabled || loading} 
                                className="rounded-full font-bold hover:scale-110 hover:bg-opacity-65 transition-all duration-150 w-full bg-amber-500 shadow-md shadow-black py-3"
                            >
                                <Link href={`/profile/[name]`} as={`/profile/${user.name}?id=${data?.data?._id}`} >
                                Login
                                </Link>
                            </button>
                            <Link href="/signup" className="text-black font-bold hover:text-blue-900 transition-all duration-200 hover:underline">
                                Don't have an account? Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
