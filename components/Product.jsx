import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}> {/* File base routing =  Ordner "product" => [slug].js*/}
        <div className='product-card'>
          <img className='product-image' src={urlFor(image && image[0])} width={250} height={250} alt="Headphones" />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product