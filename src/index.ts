import micro, { send, json } from 'micro'
import { router, get, post, ServerResponse, ServerRequest } from 'microrouter'
import { handleWebHookEvent } from './webhook'

const webHookEvent = async (req: ServerRequest, res: ServerResponse) => {
  const data: any = await json(req)
  await Promise.all(data.events.map(handleWebHookEvent))
  return send(res, 200, 'ok')
}

const notFound = (_: ServerRequest, res: ServerResponse) =>
  send(res, 404, 'Not found route')

const handler = router(
  get('/', async () => 'Hello World!'),
  post('/', webHookEvent),
  get('/*', notFound)
)

const server = micro(handler)

server.listen()
