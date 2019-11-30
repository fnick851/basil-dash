import fetch from 'isomorphic-unfetch'
import { NextApiRequest, NextApiResponse } from 'next'
import FetchError from '../../interfaces/FetchError'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = await req.body
  console.log('username', username)
  const url = `https://api.github.com/users/${username}`

  try {
    const response = await fetch(url)

    if (response.ok) {
      const { id } = await response.json()
      return res.status(200).json({ token: id })
    } else {
      // https://github.com/developit/unfetch#caveats
      const error: FetchError = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    const { response } = error
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message })
  }
}