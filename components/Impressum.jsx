import React from 'react'
import { useStateContext } from '../context/StateContext'
import { AiOutlineLeft } from 'react-icons/ai';

const Impressum = () => {
    const { setShowImpressum } = useStateContext();

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button className='cart-heading' type='button' onClick={() => setShowImpressum(false)}>
            <AiOutlineLeft/>
        </button>

        <h3>Impressum</h3>
        <br />
        <p>Xiaobox GmbH</p>
        <p>Mustermann Str. 10</p>
        <p>12345 Berlin</p>
        <br />
        <br />
        <p>E-Mail: info[at]xiaobox.de</p>
        <p>Internet: www.xiaobox.de</p>
        <br />
        <br />
        <p>Vertretungsberechtigter Geschäftsführer: Hu, Andy</p>
        <p>HR-Gericht: Berlin Charlottenburg</p>
        <p>Handelsregister-Nr.: HRB 12345</p>
        <p>Umsatzsteuer-Identifikationsnummer</p>
        <p>gemäß § 27 a Umsatzsteuergesetz: DE 123456789</p>
      </div>
    </div>
  )
}

export default Impressum