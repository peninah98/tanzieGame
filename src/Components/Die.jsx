import React from 'react'

const Die =(props)=> {
    const styles = {
        backgroundColor: props.isHeld ? "#C66600" : "white"
    }
  return (
    <div 
            className="h-14 w-14 shadow-md rounded-lg flex justify-center items-center cursor-pointer bg-white  hover:bg-orange-700 "
            style={styles}
            onClick={props.holdDice}
            >
            <h2 className="text-2xl text-bold">{props.value}</h2>
    </div>
  )
}

export default Die