'use client';
import { useEffect, useState } from "react";

export default function DashboardPage(){ 
    const [players, setPlayers] = useState<any[]>([]);
    const [flagged, setFlagged] = useState<any[]>([]);
    const [sessionId, setSessionId] = useState("");
    const [sessionDetails, setSessionDetails] = useState<any>(null);

    useEffect (() => {
        fetchPlayers(); 
        fetchFlagged(); 
        fetchSessionDetails();

    }, [])

    const fetchPlayers = async () => {
        const response = await fetch("http://localhost:8000/players"); 
        const data = await response.json(); 
        setPlayers(data)

    }

    const fetchFlagged = async () => {
        const response = await fetch("http://localhost:8000/players/flagged"); 
        const data = await response.json()
        setFlagged(data)

    }

    const fetchSessionDetails = async () => {
    const response = await fetch(`http://localhost:8000/sessions/${sessionId}`);
    const data = await response.json();
    setSessionDetails(data);
};

    return (
        <div className="min-h-screen bg-gray-950 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">TeamSheet Admin</h1>
                    <p className="text-gray-500 mt-1">Dashboard</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-bold text-white mb-4">All Players</h2>
                    {players.length === 0 ? (
                        <p className="text-gray-500">No players registered yet</p>
                    ) : (
                        players.map((player, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border-b border-gray-800">
                                <span className="text-white">{player.first_name} {player.last_name}</span>
                                <span className="text-gray-500">Tallies: {player.tallies}</span>
                            </div>
                        ))
                    )}
                </div>

                                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-bold text-white mb-4">Session Details</h2>
                    <div className="flex gap-3 mb-4">
                        <input
                            type="number"
                            placeholder="Session ID"
                            value={sessionId}
                            onChange={(e) => setSessionId(e.target.value)}
                            className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <button
                            onClick={fetchSessionDetails}
                            className="bg-blue-600 text-white px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            View
                        </button>
                    </div>

                    {sessionDetails && (
                        <div>
                            <div className="mb-4">
                                <h3 className="text-white font-semibold mb-2">RSVPs</h3>
                                {sessionDetails.rsvps.map((rsvp: any, index: number) => (
                                    <div key={index} className="flex justify-between p-2 border-b border-gray-800">
                                        <span className="text-gray-400">Player {rsvp.player_id}</span>
                                        <span className={rsvp.is_coming ? "text-green-400" : "text-red-400"}>
                                            {rsvp.is_coming ? "Yes" : "No"}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-4">
                                <h3 className="text-white font-semibold mb-2">Arrivals</h3>
                                {sessionDetails.arrivals.map((arrival: any, index: number) => (
                                    <div key={index} className="flex justify-between p-2 border-b border-gray-800">
                                        <span className="text-gray-400">Player {arrival.player_id}</span>
                                        <span className={arrival.is_late ? "text-red-400" : "text-green-400"}>
                                            {arrival.arrival_time} {arrival.is_late ? "(Late)" : "(On time)"}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">Payments</h3>
                                {sessionDetails.payments.map((payment: any, index: number) => (
                                    <div key={index} className="flex justify-between p-2 border-b border-gray-800">
                                        <span className="text-gray-400">Player {payment.player_id}</span>
                                        <span className={payment.paid_late ? "text-red-400" : "text-green-400"}>
                                            {payment.paid_at} {payment.paid_late ? "(Late)" : "(On time)"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-red-400 mb-4">Flagged Players (3+ strikes)</h2>
                    {flagged.length === 0 ? (
                        <p className="text-gray-500">No flagged players</p>
                    ) : (
                        flagged.map((player, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border-b border-gray-800">
                                <span className="text-red-400">{player.first_name} {player.last_name}</span>
                                <span className="text-red-400 font-bold">{player.tallies} tallies</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

}