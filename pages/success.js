import React, { useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, []);

    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill/>
                </p>
                <h2>Vielen Dank für deine Bestellung</h2>
                <p className='email-msg'>Checke dein Email Postfach nach Benachrichtigungen</p>
                <p className='description'>Falls du Fragen hast, dann schreibe eine Mail an <a className='email' href='mailto:huandy01@gmail.com'>huandy01@gmail.com</a></p>
                <Link href='/'>
                    <button className='btn' type='button' width='300px'>Weiter einkaufen</button>
                </Link>
            </div>
        </div>
    )
}

export default Success