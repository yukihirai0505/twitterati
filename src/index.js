import { router, get } from 'micro-fork'
import micro from 'micro'

const getAll = async (req, res) => {
  return 'Hello'
}

const notFound = (req, res) => micro.send(res, 404, 'Not found route')

const handler = router()(get('/', getAll), get('/*', notFound))

const server = micro(handler)

server.listen()
