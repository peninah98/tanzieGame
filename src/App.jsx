import Die from './Components/Die'
import { useState,useEffect } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
}



function rollDice() {
  if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
  } else {
      setTenzies(false)
      setDice(allNewDice())
  }
}

function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
}

const diceElements = dice.map(die => (
    <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
    />
))
  return (
    <main className="bg-[#F5F5F5] rounded-lg p-10 w-full h-full flex flex-col">
       {tenzies && <Confetti />}
      <h1 className="text-bolder text-4xl text-center">Tenzies</h1>
      <p className="text-center leading-5 m-10">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="grid grid-cols-5 gap-10 m-auto ">
      {diceElements}
      </div>
      <button onClick={rollDice} className='text-white bg-green-600 px-6 py-2  rounded-sm text-xl items-center m-10 w-40 mx-auto'>  {tenzies ? "New Game" : "Roll"}</button>
  </main>
  )
}

export default App
