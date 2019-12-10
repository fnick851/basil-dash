import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from '../components/layout'
import { withAuthSync } from '../utils/auth'
import getHost from '../utils/get-host'
import { NextPage } from 'next'

const Dashboard: NextPage = (js: any) => {
  return (
    <Layout>
      <h1>Logged in to see dashboard.</h1>
    </Layout>
  )
}

Dashboard.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const apiUrl = getHost(ctx) + '/api/profile'

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res
      ? ctx.res.writeHead(302, { Location: '/login' }).end()
      : null

  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token })
      }
    })

    if (response.ok) {
      const js = await response.json()
      return js
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

export default withAuthSync(Dashboard)
