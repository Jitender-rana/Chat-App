export const BACKEND_URL="http://backend:3001";
export const WS_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "ws://localhost:8090"
    : "ws://ws:8090";
