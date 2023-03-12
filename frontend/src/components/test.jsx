import React from 'react'

const numbers = ['hello', 'world']

function Test() {
  return (
    <div>

      {numbers.map(num => {
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci vitae cum sint exercitationem ad enim similique ullam debitis? Recusandae asperiores totam dolores rem odio ab animi ratione, ad neque incidunt?
          <li className=' text-black'>{num.toLocaleString()}</li>
        </div>
      })}
      
    </div>
  )
}

export default Test