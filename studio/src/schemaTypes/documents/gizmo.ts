import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Gizmo schema. Pocket gizmos featured above the project archive on the home page.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const gizmo = defineType({
  name: 'gizmo',
  title: 'Gizmo',
  icon: PlayIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Share Link',
      type: 'url',
      description: 'Pocket share link, e.g. https://www.madewithpocket.com/p/...',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video Thumbnail',
      type: 'file',
      description: '7:10 portrait video. Autoplays muted on the home page.',
      options: {accept: 'video/*'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first',
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'url'},
  },
})
