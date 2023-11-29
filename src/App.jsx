/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassWord] = useState("");
  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 8);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += '~!@#$%^&*(){}[]""?/';

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassWord(pass);
  }, [numAllowed, charAllowed, length, setPassWord]);

  useEffect(() => {
    passwordGenerator();
  }, [numAllowed, charAllowed, length, passwordGenerator]);

  return (
    <>
      <div className="px-1">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          <div className="flex shadow rounded-lg oveflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />

            <button
              onClick={copyPasswordToClipBoard}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 "
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer w-24"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={numAllowed}
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="characterInput"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput">Charactors</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
