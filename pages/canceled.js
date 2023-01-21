import React, { useEffect } from 'react'
import Link from 'next/link'
import { useStateContext } from '../context/StateContext'

const Canceled = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
    }, []);

    return (
        <div className='success-wrapper'>
            <div className='success'>
                <h2>Etwas ist schief gelaufen :(</h2>
                <p className='description'>Falls du Fragen hast, dann schreibe eine Mail an <a className='email' href='mailto:huandy01@gmail.com'>huandy01@gmail.com</a></p>
                <Link href='/'>
                    <button className='btn' type='button' width='300px'>Zurück zum Shop</button>
                </Link>
            </div>
        </div>
    )
}

export default Canceled