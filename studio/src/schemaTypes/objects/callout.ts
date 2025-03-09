import {defineType} from 'sanity'

export default defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}) {
      return {
        title: 'Callout',
        subtitle: content && content[0]?.children?.[0]?.text,
      }
    },
  },
})
