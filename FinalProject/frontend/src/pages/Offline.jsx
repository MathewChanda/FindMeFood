import React from 'react'; 
import { useNavigate } from "react-router-dom";  

export default function Offline() {
    const navigate = useNavigate(); 
    return (
        <div>
            <h1>You're offline.</h1>
            <Button onClick={() => navigate("/")}>Go Back Home</Button>
        </div>
    )
}