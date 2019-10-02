import { TemplateColumn } from '@line/bot-sdk'

export default (): TemplateColumn[] => {
  const items = [
    {
      text: 'テックニュース',
    },
    {
      text: 'マーケティング',
    },
    {
      text: '美容・コスメ',
    },
  ]

  return items.map(item => {
    return {
      text: item.text,
      actions: [
        {
          type: 'postback',
          label: 'チェック!',
          data: 'checkTechNews',
          displayText: 'チェックします',
        },
      ],
    }
  })
}
