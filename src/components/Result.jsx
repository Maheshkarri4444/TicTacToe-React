import React from 'react'

const Result = ({result, onPlayAgain}) => {
  return (
    <div>
        <h2 id="results" className='text-2xl font-bold mb-4'>{result}</h2>
        <button id="play-again" onClick={onPlayAgain} className='hidden cursor-pointer bg-[#FF2E63] text-[1.2rem] px-[25px] py-[10px] rounded-md border-none hover:bg-[#08D9D6] hover:text-black hover:px-[40px]' >Play Again</button>
    </div>
  )
}

export default Result