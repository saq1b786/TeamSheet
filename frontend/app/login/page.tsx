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


}