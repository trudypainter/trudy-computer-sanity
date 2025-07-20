import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const landingSection = defineType({
  name: 'landingSection',
  title: 'Landing Section',
  icon: DocumentIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description that appears below the title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rows',
      title: 'Featured Post Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          title: 'Row',
          fields: [
            {
              name: 'posts',
              title: 'Posts',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'featuredPost',
                  title: 'Featured Post',
                  fields: [
                    {
                      name: 'post',
                      title: 'Post',
                      type: 'reference',
                      to: [{type: 'post'}],
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: 'width',
                      title: 'Width',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Full Width', value: 'full'},
                          {title: 'Two Thirds', value: '2/3'},
                          {title: 'Half Width', value: '1/2'},
                          {title: 'One Third', value: '1/3'},
                        ],
                      },
                      validation: (rule) => rule.required(),
                    },
                  ],
                  preview: {
                    select: {title: 'post.title', width: 'width'},
                    prepare({title = 'No title', width}) {
                      return {title, subtitle: `Width: ${width}`, media: DocumentIcon}
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {posts: 'posts'},
            prepare({posts = []}) {
              return {
                title: `Row with ${posts.length} post${posts.length === 1 ? '' : 's'}`,
                media: DocumentIcon,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'The order in which this section appears on the landing page (lower numbers appear first)',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', rows: 'rows'},
    prepare({title, rows = []}) {
      const totalPosts = rows.reduce((sum: number, row: any) => sum + (row.posts?.length || 0), 0)
      return {
        title,
        subtitle: `${totalPosts} featured post${totalPosts === 1 ? '' : 's'} in ${rows.length} row${rows.length === 1 ? '' : 's'}`,
        media: DocumentIcon,
      }
    },
  },
})
