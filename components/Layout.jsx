import React from 'react'
import Head from 'next/head'
import { Navbar, Footer } from '../components'

const Layout = ({ children }) => { //children = Das was in dem <Layout> gewrapped ist
  return (
    <div>
      <Head>
        <title>Xiaobox</title>
      </Head>
      <header>
        <Navbar/>
      </header>

      <main className='main-container'>
        {children}
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout