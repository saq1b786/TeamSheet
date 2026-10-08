'use client'; 
import { useState } from "react";

export default function LoginPage(){
    const [phoneNumber, setPhoneNumber]= useState('');
    const [password, setPassword] = useState(''); 
    const [message, setMessage] = useState(''); 

    const handleLogin = async() => {
        const response = await fetch("http://localhost:8000/login", {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                phone_number: phoneNumber, 
                password: password,
            })
            
        }); 
        const data = await response.json(); 
        setMessage(JSON.stringify(data));


    };

    
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">TeamSheet</h1>
                    <p className="text-gray-500 mt-1">Sign in to continue</p>
                </div>

                <input
                    type="text"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-3 mb-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-6 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
                />

                <button 
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Login
                </button>

                {message && (
                    <p className="mt-4 text-sm text-gray-400">{message}</p>
                )}

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:text-blue-400">Register</a>
                </p>
            </div>
        </div>
    );



}