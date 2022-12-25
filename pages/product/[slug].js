//[slug].js = es ist dynamisch (z.B. /product/headphones oder /product/speaker)

import React, { useState } from 'react'
import { urlFor, client } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product
    const [index,  setIndex] = useState(0);
    const { decreaseQty, increaseQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img className='product-detail-image' src={urlFor(image && image[index])} alt="Product detail main image" />
                </div>
                <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img className={i === index ? 'small-image selected-image' : 'small-image'}
                        key={i}
                        onMouseEnter={() => setIndex(i)}
                        src={urlFor(item)}
                        alt="Product detail other image" />
                    ))}
                </div>
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <h4>Details:</h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Anzahl: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decreaseQty}><AiOutlineMinus/></span>
                        <span className='num'>{qty}</span>
                        <span className='plus' onClick={increaseQty}><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button className='add-to-cart' type='button' onClick={() => onAdd(product, qty)}>Hinzufügen</button>
                    <button className='buy-now' type='button' onClick={handleBuyNow}>Jetzt kaufen</button>
                </div>
            </div>
        </div>

        <div className='maylike-products-wrapper'>
            <h2>Das könnte Ihnen auch gefallen</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

//Fetching mit Next.js statt React.js
export const getStaticPaths = async () => {
    //Gib mir alle Produkte, aber nur mit den richtigen current-slug
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query); //Hier sind die Produkte mit dem slug

    const paths = products.map((product) => ({
        //Return a object
        params: {
            slug: product.slug.current
        }
    }))

    return { paths, fallback: 'blocking' /* blocking als fallback */ }
}

export const getStaticProps = async ({ params: { slug } }) => {

    const query = `*[_type == "product" && slug.current == '${slug}'][0]`; //Nimm das Produkt, dass mit dem slug gleich ist (nur das erste)
    const productsQuery = '*[_type == "product"]' //Nimm alle Produkte vom Sanity Dashboard
    const product = await client.fetch(query); //Gehe zum richtigen Client und fetche nur das Produkt mit dem slug
    const products = await client.fetch(productsQuery); //Gehe zum richtigen Client und fetche alle Produkte
  
    return {
      props: { product, products }
    }
  }

export default ProductDetails