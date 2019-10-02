import axios from 'axios'
import { TemplateColumn } from '@line/bot-sdk'

export default async (): Promise<TemplateColumn[]> => {
  const topstories = await axios.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  )
  return await Promise.all(
    topstories.data.slice(0, 10).map(async (id: number) => {
      const item = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      )
      const { title, url } = item.data
      return {
        text: title,
        actions: [
          {
            type: 'uri',
            label: 'リンクをみる',
            uri: url,
          },
        ],
      }
    })
  )
}
