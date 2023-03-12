import React from 'react'
import {
    AiFillGithub,
    AiOutlineTwitter,
    AiFillInstagram,
    AiFillLinkedin
  } from "react-icons/ai";
const Footer = () => {
    let date = new Date()
    let year = date.getFullYear()
  return (
    
    <footer>
        <div className='  bg-slate-100 text-black py-3  flex flex-col justify-center items-center w-full  backdrop-blur'>
            <h3 className=' text-center text-2xl '>Designed and Developed by Hesam Azizpour</h3>
            <h3 className=' flex text-xl'>Copyright © {year} 
                <h3 className=' text-xl ml-3 mt-1 font-signature text-orange-500'>DearBoy</h3> 
            </h3> 

            <ul className='z-10 gap-7 flex w-full justify-center mt-4 mb-3 text-2xl'>
                <li><a target="_blank" href="https://github.com/Hesam-Dearboy" className='hover:text-red-500' ><AiFillGithub/></a></li>
                <li><a target="_blank" href="https://twitter.com/Hesam_injust" className='hover:text-blue-500'><AiOutlineTwitter/></a></li>
                <li><a target="_blank" href="https://instagram.com/hesam_dearboy?igshid=YmMyMTA2M2Y=" className='hover:text-orange-600'><AiFillInstagram/></a></li>
                <li><a target="_blank" className=' hover:text-blue-600' href="https://www.linkedin.com/in/hesam-azizpour-23259b265/"><AiFillLinkedin/></a></li>
                <li></li>
            </ul>

        </div>
    </footer>
  )
}

export default Footer