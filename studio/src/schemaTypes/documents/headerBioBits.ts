import {defineField, defineType} from 'sanity'

export const headerBioBits = defineType({
  name: 'headerBioBits',
  title: 'Header Bio Bits',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Section title (e.g., NOW, BEFORE, SPEAKING)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'The content text for this bio section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this section should appear (lower numbers appear first)',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({title, content}) {
      return {
        title: title,
        subtitle: content,
      }
    },
  },
})
