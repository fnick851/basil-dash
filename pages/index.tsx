import React from 'react'
import nextCookie from 'next-cookies'
import Layout from '../components/layout'
import { withAuthSync } from '../utils/auth'
import { NextPage } from 'next'

const Dashboard: NextPage<any> = props => {
  return (
    <Layout isLoggedIn={props.isLoggedIn}>
      <h1>Login protected dashboard.</h1>
    </Layout>
  )
}

Dashboard.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)

  let isLoggedIn = false
  token ? (isLoggedIn = true) : null
  return { isLoggedIn }
}

export default withAuthSync(Dashboard)
