import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  icon: HomeIcon,
  // Since this is a singleton, we don't want it to be createable
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photographerName',
      title: 'Photographer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photographerUrl',
      title: 'Photographer URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bioSections',
      title: 'Bio Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{type: 'block'}],
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})
