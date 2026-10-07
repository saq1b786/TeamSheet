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
    <div>
        <h1>TeamSheet Login</h1>

        <input
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>{message}</p>
    </div>
);


}