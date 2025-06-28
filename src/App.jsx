import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}~`";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    passwordRef.current.classList.add("animate-pulse");
    setTimeout(() => {
      passwordRef.current.classList.remove("animate-pulse");
    }, 500);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-gray-900 animate-gradient">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-lg text-white shadow-2xl animate-fade-in">
        <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide">
          🔐 Password Generator
        </h1>

        <div className="flex shadow-lg rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full px-4 py-3 text-black text-lg font-semibold focus:scale-105 transition-transform duration-300"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-orange-500 hover:bg-orange-700 text-white px-6 transition-all duration-300"
          >
            Copy
          </button>
        </div>

        <div className="space-y-6 text-white text-sm">
          <div className="flex items-center space-x-4">
            <label>Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full accent-orange-500"
            />
          </div>

          <div className="flex items-center gap-x-6">
            <label className="flex items-center gap-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="accent-orange-500"
              />
              Numbers
            </label>

            <label className="flex items-center gap-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="accent-orange-500"
              />
              Symbols
            </label>
          </div>
        </div>

        <p className="text-xs text-gray-300 text-center mt-6 animate-fade-in delay-300">
          © 2025 Pankaj’s Secure Password Generator
        </p>
      </div>
    </div>
  );
}

export default App;
