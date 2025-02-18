import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const postLink = defineType({
  name: 'postLink',
  title: 'Link',
  icon: LinkIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'displayText',
      title: 'Display Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'displayText',
      subtitle: 'href',
    },
  },
})
