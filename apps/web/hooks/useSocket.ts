import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNWYyM2QzMS1iZThhLTQ5MjAtODYzZS02YTM4ODM3MWFhOGEiLCJpYXQiOjE3NDUzOTA3MzF9.SxC3Jxsgpd20i02uPaDOvc4oL5DfjxgslaCpVynNjKE`);
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