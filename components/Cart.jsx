import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus,  AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai' 
import { TiDeleteOutline } from 'react-icons/ti'
import toast  from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice,  totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  function Truncated() {
    const truncated = Math.floor(totalPrice * 100) / 100;
    return truncated;
  }

  const handleCheckout = async () => {
    const stripe = await getStripe(); 

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    const data = await response.json();

    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button className='cart-heading' type='button' onClick={() => setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Dein Warenkorb</span>
          <span className='cart-num-items'>{totalQuantities} Waren</span>
        </button>

        {/* Wenn keine Items im Cart drin sind, dann zeige das: */}
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            <h3>Dein Warenkorb ist leer.</h3>
            <Link href='/'>
              <button className='btn' type='button' onClick={() => setShowCart(false)}>Weiter shoppen</button>
            </Link>
          </div>
        )}

        {/* Wenn Items im Cart drin sind, dann zeige das: */}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item._id}>

              {/* Ein Produkt => Links: Img, Rechts: Text */}
              <img className='cart-product-image' src={urlFor(item?.image[0])} alt="Item Image" />
              <div className='item-desc'>
                <div className='flex top'>
                  <h4>{item.name}</h4>
                  <h4>{item.price}€</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={() => toggleCartItemQuantity(item._id, "dec")}><AiOutlineMinus/></span>
                        <span className='num'>{item.quantity}</span>
                        <span className='plus' onClick={() => toggleCartItemQuantity(item._id, "inc")}><AiOutlinePlus/></span>
                    </p>
                  </div>
                  <button className='remove-item' type='button' onClick={() => onRemove(item)}>
                    <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gesamtsumme */}
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Gesamt:</h3>
              <h3>{Truncated()}€</h3>
            </div>
            <div className='btn-container'>
              <button className='btn' type='button' onClick={handleCheckout}>Mit Stripe bezahlen</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart