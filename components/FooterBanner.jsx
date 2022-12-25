import React from 'react'
import { urlFor } from '../lib/client'

const FooterBanner = ({ footerBanner: { largeText1, largeText2, smallText, midText, desc, image } }) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
      <div className='left'>
        {/* <p>{discount}</p> */}
        <h3>{largeText1}</h3>
        <h3>{largeText2}</h3>
        {/* <p>{saleTime}</p> */}
      </div>

      <div className='right'>
        <p>{smallText}</p>
        <h3>{midText}</h3>
        <p>{desc}</p>
        {/* <Link href={`/product/${product}`}>
          <button type='button'>{buttonText}</button>
        </Link> */}
      </div>

      <img className='footer-banner-image' src={urlFor(image)} alt="Footer Banner" />

      </div>
    </div>
  )
}

export default FooterBanner