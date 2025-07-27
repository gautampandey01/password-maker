import { useState, useCallback, useEffect,useRef } from 'react';
function App() {
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [character, setcharacter] = useState(false);
  const [password, setpassword] = useState("");

  const passwordref=useRef(null)
  const copypswd=useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password) }
  ,[password])
  
  const pswdgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "~`!@#$%^&*()-=_+[]\\;',./<>?:{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass)
  }, [length, number, character]);

  useEffect(()=>{

            pswdgen();
  },[length,number,character,setpassword])


  return (
    <>
      <br />
      <div
        style={{ backgroundColor: "rgb(163, 230, 246)" }}
        className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-white"
      >
        <h1 className="text-4xl text-center text-black">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordref}
          />
          <button 
          onClick={copypswd}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 flex-wrap">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={() => setnumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={character}
              id="characterInput"
              onChange={() => setcharacter((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
