import { NextApiRequest, NextApiResponse } from 'next'
import spinneys from '../../json/json_spinneys_out.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // if (!('authorization' in req.headers)) {
  //   return res.status(401).send('Not authorized')
  // }

  // const auth = req.headers.authorization

  try {
    // const { token } = JSON.parse(auth as string)

    return res.status(200).json(spinneys)
  } catch (error) {
    const { response } = error
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message })
  }
}
