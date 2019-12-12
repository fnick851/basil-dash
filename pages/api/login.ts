import fetch from 'isomorphic-unfetch'
import { NextApiRequest, NextApiResponse } from 'next'
import FetchError from '../../interfaces/FetchError'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = await req.body

  const listOfUsers = [
    {
      username: 'theo',
      password: 'topsecret'
    },
    {
      username: 'noah',
      password: 'hugesecret'
    }
  ]

  try {
    for (let i = 0; i < listOfUsers.length; i++) {
      if (
        listOfUsers[i].username === username &&
        listOfUsers[i].password === password
      ) {
        return res.status(200).json({
          token: `super_secret_${Math.floor(
            Math.random() * Math.floor(1000000)
          )}`
        })
      }
    }
    return res.status(401).json({
      message: 'unauthorized'
    })
  } catch (error) {
    const { response } = error
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(401).json({ message: error.message })
  }
}
