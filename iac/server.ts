import express from 'express'

import { Router, Request, Response } from 'express'

const app = express()

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' },)
})

app.use(route)

app.listen(3333, () => console.log( '\u001b[1;31mServer running on port \u001b[1;32m3333⚡' ))
