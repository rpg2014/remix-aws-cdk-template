import { useEffect, useState } from "react";
// import { add } from "~/rust.client";
// importing this other wasm project b/c building the rust for the browser breaks it on the server, so you'll need to split up the server and browser packages
// This can be done by just creating another rust project in addition to rust-functions, and removing the --target nodejs from the new build script
import { Universe } from "roadhouse-wasm";

export default function ClientSideRustAddition() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result] = useState(0);
  useEffect(() => {
    console.log(`a: ${a} + b: ${b}`);
  }, [a, b]);
  useEffect(() => {
    try {
      const universe = Universe.new(64, 64);
      console.log(universe.width());

      const cellsPtr = universe.cells();
      console.log(cellsPtr);
    } catch (e) {
      throw new Error("Remix's bundler(?) currently doesn't support wasm on the client side: " + e.message);
    }
  }, []);
  return (
    <div className="additionForm">
      <p className="additionDiv">
        <label>
          <span>Number 1</span>
          <input type="number" name="a" onChange={e => setA(e.target.valueAsNumber)}></input>
        </label>
        <div style={{ textAlign: "center" }}>+</div>
        <label>
          <span>Number 2</span>
          <input type="number" name="b" onChange={e => setB(e.target.valueAsNumber)}></input>
        </label>
      </p>
      <button>Add</button>
      <p>Result: {result}</p>
    </div>
  );
}
