import React from 'react'
import Head from 'next/head'
import Header from './header'
import { NextPage } from 'next'

import '../styles/main.css'

const Layout: NextPage<{
  children: React.ReactNode
  isLoggedIn: boolean
}> = props => (
  <React.Fragment>
    <Head>
      <title>BasilLabs Demo Dashboard</title>
      <link rel="shortcut icon" href="/favicon.png"></link>
    </Head>
    <Header isLoggedIn={props.isLoggedIn} />
    <main>
      <div>{props.children}</div>
    </main>
  </React.Fragment>
)

export default Layout
