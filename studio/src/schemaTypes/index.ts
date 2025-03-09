import {blockContent} from './objects/blockContent'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {link} from './objects/link'
import {postLink} from './objects/postLink'
import {page} from './documents/page'
import {post} from './documents/post'
import {settings} from './singletons/settings'
import {tag} from './documents/tag'
import {location} from './documents/location'
import {landingSection} from './documents/landingSection'
import {about} from './singletons/about'
import {headerBioBits} from './documents/headerBioBits'
import callout from './objects/callout'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Document types
  page,
  post,
  tag,
  location,
  landingSection,
  headerBioBits,
  // Object types
  blockContent,
  callToAction,
  infoSection,
  link,
  postLink,
  callout,
  // Singleton types
  settings,
  about,
]
