import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from '../components/layout'
// @ts-ignore
import { withAuthSync } from '../utils/auth'
import getHost from '../utils/get-host'
import { NextPage } from 'next'

const Profile: NextPage<{
  data: {
    name: string,
    login: string,
    bio: string,
    avatarUrl: string,
  }
}> = (
  {
    data
  }) => {
    const { name, login, bio, avatarUrl } = data

    return (
      <Layout>
        <img src={avatarUrl} alt="Avatar" />
        <h1>{name}</h1>
        <p className="lead">{login}</p>
        <p>{bio}</p>

        <style jsx>{`
        img {
          max-width: 200px;
          border-radius: 0.5rem;
        }

        h1 {
          margin-bottom: 0;
        }

        .lead {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 300;
          color: #666;
        }

        p {
          color: #6a737d;
        }
      `}</style>
      </Layout>
    )
  }

Profile.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx)
  const apiUrl = getHost(ctx) + '/api/profile'

  const redirectOnError = () =>
    typeof window !== 'undefined' ?
      Router.push('/login') :
      ctx.res ?
        ctx.res.writeHead(302, { Location: '/login' }).end() :
        null

  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token }),
      },
    })

    if (response.ok) {
      const js = await response.json()
      console.log('js', js)
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

export default withAuthSync(Profile)
