import React, { useState, FormEvent } from 'react'
import fetch from 'isomorphic-unfetch'
import { NextPage } from 'next'
import nextCookie from 'next-cookies'
import Router from 'next/router'

import Layout from '../components/layout'
import { login } from '../utils/auth'
import FetchError from '../interfaces/FetchError'

const Login: NextPage<{ isLoggedIn: boolean }> = props => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    error: ''
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setUserData(Object.assign({}, userData, { error: '' }))

    const username = userData.username
    const password = userData.password
    const url = '/api/login'

    try {
      const response = await fetch(url, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (response.status === 200) {
        const { token } = await response.json()
        login({ token })
      } else {
        console.error('Login failed.')
        // https://github.com/developit/unfetch#caveats
        let error: FetchError = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      console.error('You have an error in your code or there are Network issues.', error)

      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      )
    }
  }

  return (
    <Layout isLoggedIn={props.isLoggedIn}>
      <div className="w-full max-w-xs mx-auto mt-32">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="username"
              name="username"
              value={userData.username}
              placeholder="username"
              onChange={event => setUserData(Object.assign({}, userData, { username: event.target.value }))}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="password"
              name="password"
              placeholder="password"
              value={userData.password}
              onChange={event => setUserData(Object.assign({}, userData, { password: event.target.value }))}
            />
          </div>

          <button
            className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          {userData.error && <p className="mt-5 text-red-400">Error: {userData.error}</p>}
        </form>
        Log in with - <br />
        username: demo <br />
        password: password
      </div>
    </Layout>
  )
}

Login.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  let isLoggedIn = false
  if (token) {
    Router.push('/')
    isLoggedIn = true
  }

  return {
    isLoggedIn
  }
}

export default Login
