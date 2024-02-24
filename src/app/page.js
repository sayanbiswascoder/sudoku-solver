"use client"
import Image from "next/image";
import SudokuBox from "./components/SudokuBox";
import { useState, useEffect } from "react";
import Solver from "./controls/solver";

export default function Home() {
  const [solved, setSolved] = useState(false)
  const [gameArray, setGameArray] = useState([])

  useEffect(()=> {
    const func = async() => {
      if(gameArray.length != 0){
        console.log(gameArray)
        let game = new Solver(gameArray);
        // console.log(game.noteOfCell)
        let res = game.solve()
        setGameArray(res)
        setSolved(true)
      }
    }
    func()
  },[gameArray])
  return (
    <main className="h-[100vh] flex flex-col items-center justify-center">
      <SudokuBox solved={solved} setGameArray={setGameArray}/>
      <div className="h-[15%]"></div>
    </main>
  );
}
