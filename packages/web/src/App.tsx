import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Cookie from "js-cookie";

function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState<any | null>(null);
  const [todos, setTodos] = useState<any[] | null>(null);

  const getSession = async () => {
    const token = Cookie.get("session");
    if (token) {
      setSession(token);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) {
      Cookie.set("session", token, {
        expires: 7,
        secure: true,
        sameSite: "None",
      });
      window.location.replace(window.location.origin);
    }
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/todo`, {
        headers: {
          Authorization: `Bearer ${Cookie.get("session")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={fetchTodos}>Fetch Todos</button>
        {todos && <pre>{JSON.stringify(todos, null, 2)}</pre>}
      </div>

      <div className="card">
        {session ? (
          <div>
            <h2>Session</h2>
            <p>{session}</p>
          </div>
        ) : (
          <h2>Not Logged In</h2>
        )}

        <a
          href={`${import.meta.env.VITE_APP_API_URL}/auth/google/authorize`}
          rel="noreferrer"
        >
          <button>Sign in with Google</button>
        </a>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
