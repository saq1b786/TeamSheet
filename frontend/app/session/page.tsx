'use client';
import { useState } from "react";

export default function SessionPage(){ 
    const [arrivalMessage, setArrivalMessage] = useState('')
    const [paymentMessage, setPaymentMessage] = useState('')

    const handleArrival = async () => { 
        const response = await fetch('http://localhost:8000/arrivals', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                session_id: 1,
                player_id: 1,
            })
        });
        const data = await response.json(); 
        setArrivalMessage(JSON.stringify(data));

    }

    const handlePayment = async () => { 
        const response = await fetch('http://localhost:8000/payments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                session_id: 1,
                player_id: 1,
                
            })
        });
        const data = await response.json(); 
        setPaymentMessage(JSON.stringify(data));
    }
        return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">TeamSheet</h1>
                    <p className="text-gray-500 mt-1">Match Day</p>
                </div>

                <button
                    onClick={handleArrival}
                    className="w-full bg-green-600 text-white p-4 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-3 text-lg"
                >
                    I'm Here
                </button>

                {arrivalMessage && (
                    <p className="mb-4 text-sm text-gray-400">{arrivalMessage}</p>
                )}

                <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                >
                    I've Paid
                </button>

                {paymentMessage && (
                    <p className="mt-4 text-sm text-gray-400">{paymentMessage}</p>
                )}
            </div>
        </div>
    );
}