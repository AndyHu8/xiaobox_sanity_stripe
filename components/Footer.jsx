import React from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiFillGithub, AiFillYoutube } from 'react-icons/ai'
import { FaDiscord } from 'react-icons/fa'
import { TbWorld } from 'react-icons/tb'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>Some Rights Reserved</p>
      <p>Designed und entwickelt von Xiaohu 2022</p>
      <p className='icons'>
        <AiFillInstagram onClick={() => window.open("https://www.instagram.com/xiaohu_chn")} style={{cursor: "pointer"}}/>
        <AiOutlineTwitter onClick={() => window.open("https://twitter.com/xiaohu_chn")} style={{cursor: "pointer"}}/>
        <AiFillGithub onClick={() => window.open("https://github.com/AndyHu8")} style={{cursor: "pointer"}}/>
        <TbWorld onClick={() => window.open("https://xiaohu.netlify.app/")} style={{cursor: "pointer"}}/>
        <FaDiscord onClick={() => window.open("https://discord.gg/GKruQgG6an")} style={{cursor: "pointer"}}/>
        <AiFillYoutube onClick={() => window.open("https://www.youtube.com/channel/UCm_LK9R9h0h_Kw6MWG3H7RQ")} style={{cursor: "pointer"}}/>
      </p>
    </div>
  )
}

export default Footer