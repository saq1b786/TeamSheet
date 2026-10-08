'use client'; 
import { useState } from "react";

export default function RegisterPage(){ 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleRegister = async () => {
        const response = await fetch('http://localhost:8000/players', { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            password: password,
        })

        }); 
        const data = await response.json(); 
        setMessage(JSON.stringify(data));


    }
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">TeamSheet</h1>
                    <p className="text-gray-500 mt-1">Create your account</p>
                </div>

                <div className="flex gap-3 mb-3">
                    <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    />
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
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Create Account
                </button>

                {message && (
                    <p className="mt-4 text-sm text-gray-400">{message}</p>
                )}

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:text-blue-400">Sign in</a>
                </p>
            </div>
        </div>
    );

}