import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  //useref Hook

  const passwordref = useRef(null)




  //used to generaye random password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-[]{}~`";
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    //passing the generated password to the setPassword that is commiing from the usestate
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

//for coping the rwxt
  const copyPasswordToClipboard = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])






  useEffect(()=>{passwordGenerator();},[length, numberAllowed, charAllowed,passwordGenerator])






  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 my-8 text-orange-500 bg-gray-700 text-center">Test
        <div className="flex shadow rounded-lg overflow-hidden mb-4 py-5">
        <input type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordref} />



        <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0">copy</button>



      </div>


      <div className="flex text-sm gap-x-1 ">


        <div className="flex items-center gap-x-1">
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}/>

          <label > Length:{length}</label>

        </div>



        <div className="flex items-center gap-x-1">

          <input type="checkbox" 
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{ setNumberAllowed((prev)=>!prev)}} />
          <label htmlFor="numberInput">Numbers</label>

          <input type="checkbox" 
          defaultChecked={charAllowed}
          id="charactersInput"
          onChange={()=>{ setCharAllowed((prev)=>!prev)}} />
          <label htmlFor="charactersInput">Characters</label>

        </div>





      </div>


      </div>

    
    </>
  );
}

export default App;
