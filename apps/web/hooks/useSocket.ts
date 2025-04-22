import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NDVkYzQxOC05NDNiLTQ0ODUtYjQ3ZS1hODQzODEwNTFkOTIiLCJpYXQiOjE3NDUyNjYwNDR9.CxajXy8ID03zFfLNI9twgg5U24sDgRitpIlM8YpF26s`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}