import {defineArrayMember, defineType, defineField} from 'sanity'
import {
  PlayIcon,
  VideoIcon,
  ImageIcon,
  DocumentIcon,
  BlockquoteIcon,
  LinkIcon,
  EarthGlobeIcon,
  ThListIcon,
} from '@sanity/icons'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'linkType',
                title: 'Link Type',
                type: 'string',
                initialValue: 'href',
                options: {
                  list: [
                    {title: 'URL', value: 'href'},
                    {title: 'Page', value: 'page'},
                    {title: 'Post', value: 'post'},
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                hidden: ({parent}) => parent?.linkType !== 'href' && parent?.linkType != null,
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'href' && !value) {
                      return 'URL is required when Link Type is URL'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'page',
                title: 'Page',
                type: 'reference',
                to: [{type: 'page'}],
                hidden: ({parent}) => parent?.linkType !== 'page',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'page' && !value) {
                      return 'Page reference is required when Link Type is Page'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'post',
                title: 'Post',
                type: 'reference',
                to: [{type: 'post'}],
                hidden: ({parent}) => parent?.linkType !== 'post',
                validation: (Rule) =>
                  Rule.custom((value, context: any) => {
                    if (context.parent?.linkType === 'post' && !value) {
                      return 'Post reference is required when Link Type is Post'
                    }
                    return true
                  }),
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    // Image
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          initialValue: 'image upload',
          validation: (Rule) =>
            Rule.custom((value) => {
              if (!value) return 'Image upload'
              return true
            }),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the image',
        }),
        defineField({
          name: 'width',
          type: 'string',
          title: 'Width',
          description: 'Optional width size (default is full width)',
          options: {
            list: [
              {title: 'Full Width', value: 'full'},
              {title: 'Large (75%)', value: 'large'},
              {title: 'Medium (50%)', value: 'medium'},
              {title: 'Small (33%)', value: 'small'},
            ],
          },
          initialValue: 'full',
        }),
      ],
    }),
    // Video Upload
    defineArrayMember({
      name: 'video',
      type: 'file',
      title: 'Video',
      icon: VideoIcon,
      options: {
        accept: 'video/*',
      },
      fields: [
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the video',
        }),
        defineField({
          name: 'width',
          type: 'number',
          title: 'Width',
          description: 'Set the width as a percentage (0.1 to 1.0, where 1.0 is full width)',
          initialValue: 1.0,
          validation: (Rule) => Rule.min(0.1).max(1).precision(1),
        }),
        defineField({
          name: 'hasBorder',
          type: 'boolean',
          title: 'Add Border',
          description: 'Add a light gray border around the video',
          initialValue: false,
        }),
        defineField({
          name: 'showControls',
          type: 'boolean',
          title: 'Show Controls',
          description: 'Display video playback controls (default is off)',
          initialValue: false,
        }),
      ],
    }),
    // Vimeo Embed
    defineArrayMember({
      name: 'vimeoEmbed',
      type: 'object',
      title: 'Vimeo Embed',
      icon: PlayIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Vimeo URL',
          description: 'Paste the Vimeo video URL here',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the video',
        }),
        defineField({
          name: 'width',
          type: 'number',
          title: 'Width',
          description: 'Set the width as a percentage (0.1 to 1.0, where 1.0 is full width)',
          initialValue: 1.0,
          validation: (Rule) => Rule.min(0.1).max(1).precision(1),
        }),
        defineField({
          name: 'hasBorder',
          type: 'boolean',
          title: 'Add Border',
          description: 'Add a light gray border around the video',
          initialValue: false,
        }),
        defineField({
          name: 'showControls',
          type: 'boolean',
          title: 'Show Controls',
          description: 'Display video playback controls (default is off)',
          initialValue: false,
        }),
      ],
    }),
    // YouTube Embed
    defineArrayMember({
      name: 'youtubeEmbed',
      type: 'object',
      title: 'YouTube Embed',
      icon: PlayIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'YouTube URL',
          description: 'Paste the YouTube video URL here',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the video',
        }),
        defineField({
          name: 'width',
          type: 'number',
          title: 'Width',
          description: 'Set the width as a percentage (0.1 to 1.0, where 1.0 is full width)',
          initialValue: 1.0,
          validation: (Rule) => Rule.min(0.1).max(1).precision(1),
        }),
        defineField({
          name: 'hasBorder',
          type: 'boolean',
          title: 'Add Border',
          description: 'Add a light gray border around the video',
          initialValue: false,
        }),
        defineField({
          name: 'showControls',
          type: 'boolean',
          title: 'Show Controls',
          description: 'Display video playback controls (default is off)',
          initialValue: false,
        }),
      ],
    }),
    // Loom Embed
    defineArrayMember({
      name: 'loomEmbed',
      type: 'object',
      title: 'Loom Embed',
      icon: PlayIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Loom URL',
          description: 'Paste the Loom share URL here',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the video',
        }),
        defineField({
          name: 'width',
          type: 'number',
          title: 'Width',
          description: 'Set the width as a percentage (0.1 to 1.0, where 1.0 is full width)',
          initialValue: 1.0,
          validation: (Rule) => Rule.min(0.1).max(1).precision(1),
        }),
        defineField({
          name: 'hasBorder',
          type: 'boolean',
          title: 'Add Border',
          description: 'Add a light gray border around the video',
          initialValue: false,
        }),
        defineField({
          name: 'showControls',
          type: 'boolean',
          title: 'Show Controls',
          description: 'Display video playback controls (default is off)',
          initialValue: false,
        }),
      ],
    }),
    // Instagram Embed
    defineArrayMember({
      name: 'instagramEmbed',
      type: 'object',
      title: 'Instagram Embed',
      icon: DocumentIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Instagram URL',
          description: 'Paste the Instagram post URL here',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption to display below the post',
        }),
      ],
    }),
    // Twitter Embed
    defineArrayMember({
      name: 'twitterEmbed',
      type: 'object',
      title: 'Twitter/X Embed',
      icon: DocumentIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Tweet URL',
          description: 'Paste the Tweet URL here',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    // Divider
    defineArrayMember({
      name: 'divider',
      type: 'object',
      title: 'Divider',
      icon: ThListIcon,
      fields: [
        defineField({
          name: 'style',
          type: 'string',
          initialValue: 'default',
          hidden: true,
        }),
      ],
      preview: {
        prepare() {
          return {
            title: '───────────',
          }
        },
      },
    }),
    // Callout
    defineArrayMember({
      name: 'callout',
      type: 'callout',
      title: 'Callout',
      icon: BlockquoteIcon,
    }),
    // Iframe Embed
    defineArrayMember({
      name: 'iframeEmbed',
      type: 'object',
      title: 'Website Embed',
      icon: EarthGlobeIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Website URL',
          description: 'Paste the website URL here',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'isCollapsed',
          type: 'boolean',
          title: 'Collapsed',
          description: 'Whether the iframe is collapsed or expanded',
          initialValue: false,
        }),
        defineField({
          name: 'zoom',
          type: 'number',
          title: 'Zoom Level',
          description: 'Set the zoom level (e.g., 0.5 for 50%, 1 for 100%, 2 for 200%)',
          initialValue: 1,
          validation: (Rule) => Rule.min(0.1).max(3),
        }),
        defineField({
          name: 'aspectRatio',
          type: 'string',
          title: 'Aspect Ratio',
          description: 'Choose between desktop (16:9) or mobile (9:16) view',
          options: {
            list: [
              {title: 'Desktop (16:9)', value: 'desktop'},
              {title: 'Mobile (9:16)', value: 'mobile'},
            ],
          },
          initialValue: 'desktop',
        }),
      ],
      preview: {
        select: {
          url: 'url',
          isCollapsed: 'isCollapsed',
          zoom: 'zoom',
          aspectRatio: 'aspectRatio',
        },
        prepare({url, isCollapsed, zoom, aspectRatio}) {
          return {
            title: 'Website Embed',
            subtitle: `${url} ${isCollapsed ? '(collapsed)' : ''} - ${zoom * 100}% - ${aspectRatio}`,
          }
        },
      },
    }),
  ],
})
