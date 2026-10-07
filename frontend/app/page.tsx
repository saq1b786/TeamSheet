"use client";
import { useState } from "react";

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">TeamSheet</h1>
            <p className="text-gray-400 mb-6">Clicked: {count} times</p>
            <button 
                onClick={() => setCount(count + 1)}
                className="bg-blue-600 px-6 py-3 rounded-lg text-white font-bold hover:bg-blue-700"
            >
                Click me
            </button>
        </div>
    );
}