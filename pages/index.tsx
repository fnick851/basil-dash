import React from 'react'
import Layout from '../components/layout'
import Link from 'next/link'

const Home = () => (
  <Layout>
    <h1>Cookie-based authentication</h1>
    <h2>Notes:</h2>
    <ol>
      <li>Click login and enter your GitHub username.</li>
      <li>
        Click home and click profile again, notice how your session is being
        used through a token stored in a cookie.
      </li>
      <li>
        Click logout and try to go to profile again. You'll get redirected to
        the `/login` route.
      </li>
      <li>
        API endpoint serving Spinneys data:{' '}
        <Link href="/api/spinneys">
          <a>/api/spinneys</a>
        </Link>
      </li>
    </ol>

    <style jsx>{`
      li {
        margin-bottom: 0.5rem;
      }
    `}</style>
  </Layout>
)

export default Home
