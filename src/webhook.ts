import * as line from '@line/bot-sdk'
import menu from './menu'
import getTop10 from './hackernews'

const { LINE_CHANNEL_ACCESS_TOKEN, LINE_CHANNEL_SECRET } = process.env

const config = {
  channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: LINE_CHANNEL_SECRET!,
}

const client = new line.Client(config)

export const handleWebHookEvent = async (event: line.WebhookEvent) => {
  console.log(JSON.stringify(event))
  switch (event.type) {
    case 'message': {
      if (event.message.type === 'text') {
        // const { text } = event.message
        return client.replyMessage(event.replyToken, {
          type: 'template',
          altText: 'checkTechNews',
          template: {
            type: 'carousel',
            columns: menu(),
          },
        })
      }
      break
    }
    case 'postback': {
      const { data } = event.postback
      if (data === 'checkTechNews') {
        // TODO: get good tweet for tech (grater than 5 retweet)
        // カラムは最大10なので11個以上あるときは複数メッセージに分割
        // メッセージは最大5まで分割可能
        // 1回で送れるのは10*5=50
        return client.replyMessage(event.replyToken, {
          type: 'template',
          altText: 'checkTechNews',
          template: {
            type: 'carousel',
            columns: await getTop10(),
          },
        })
      }
      break
    }
    default:
      return Promise.resolve(null)
  }
}
