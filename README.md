## Deploy

```
$ now secret add line-channel-access-token ""
$ now secret add line-channel-secret ""
$ yarn deploy
```

## Local Development

```
$ mv .env.sample .env
$ vi .env # edit environment variables
$ yarn start
```

## Testing WebHook Event

```js
(async () => {
  const response = await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{
               "events": [
                 {
                   "type": "message",
                   "replyToken": "hoge",
                   "source": {
                     "userId": "hoge",
                     "type": "user"
                   },
                   "timestamp": 1569991632077,
                   "message": { "type": "text", "id": "hoge", "text": "か" }
                 }
               ],
               "destination": "hoge"
             }
`,
  })
  console.log(response.json())
})()
```
