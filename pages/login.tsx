import React, { useState, FormEvent } from 'react'
import fetch from 'isomorphic-unfetch'
// @ts-ignore
import Layout from '../components/layout'
import { login } from '../utils/auth'
import FetchError from '../interfaces/FetchError'

function Login() {
  const [userData, setUserData] = useState({ username: '', error: '' })

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setUserData(Object.assign({}, userData, { error: '' }))

    const username = userData.username
    const url = '/api/login'

    try {
      const response = await fetch(url, {
        method: 'POST',

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      })
      if (response.status === 200) {
        const { token } = await response.json()
        login({ token })
      } else {
        console.log('Login failed.')
        // https://github.com/developit/unfetch#caveats
        let error: FetchError = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )

      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message,
        })
      )
    }
  }

  return (
    <Layout>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">GitHub username</label>

          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={event =>
              setUserData(
                Object.assign({}, userData, { username: event.target.value })
              )
            }
          />

          <button type="submit">Login</button>

          {userData.error && <p className="error">Error: {userData.error}</p>}
        </form>
      </div>
      <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        form {
          display: flex;
          flex-flow: column;
        }

        label {
          font-weight: 600;
        }

        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
      `}</style>
    </Layout>
  )
}

export default Login
