import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'content', title: 'Content', type: 'blockContent'}),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A brief description of the post for previews and SEO',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectLocation',
      title: 'Project Location',
      type: 'string',
      options: {
        list: [
          {title: 'Google', value: 'Google'},
          {title: 'MIT Media Lab', value: 'MIT Media Lab'},
          {title: 'Personal Project', value: 'Personal Project'},
          {title: 'MIT Class', value: 'MIT Class'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectYear',
      title: 'Project Year',
      type: 'string',
      options: {
        list: [
          {title: '2025', value: '2025'},
          {title: '2024', value: '2024'},
          {title: '2023', value: '2023'},
          {title: '2022', value: '2022'},
          {title: '2021', value: '2021'},
          {title: '2020', value: '2020'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectTags',
      title: 'Project Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({name: 'links', title: 'Links', type: 'array', of: [{type: 'postLink'}]}),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {title: 'title', date: 'date', media: 'coverImage'},
    prepare({title, media, date}) {
      const subtitles = [date ? `on ${format(parseISO(date), 'LLL d, yyyy')}` : '']
      return {title, media, subtitle: subtitles.join(' '), icon: DocumentTextIcon}
    },
  },
})
