/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type About = {
  _id: string;
  _type: "about";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  profileImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt: string;
    _type: "image";
  };
  photographerName: string;
  photographerUrl: string;
  fullBio: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  bioSections?: Array<{
    title: string;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    _type: "section";
    _key: string;
  }>;
};

export type Settings = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    metadataBase?: string;
    _type: "image";
  };
};

export type Callout = {
  _type: "callout";
  content?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type PostLink = {
  _type: "postLink";
  displayText: string;
  href: string;
};

export type InfoSection = {
  _type: "infoSection";
  heading?: string;
  subheading?: string;
  content?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      linkType?: "href" | "page" | "post";
      href?: string;
      page?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "page";
      };
      post?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "post";
      };
      openInNewTab?: boolean;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    caption?: string;
    width?: "full" | "large" | "medium" | "small";
    _type: "image";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
    };
    caption?: string;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
    _type: "video";
    _key: string;
  } | {
    url: string;
    caption?: string;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
    _type: "vimeoEmbed";
    _key: string;
  } | {
    url: string;
    caption?: string;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
    _type: "youtubeEmbed";
    _key: string;
  } | {
    url: string;
    caption?: string;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
    _type: "loomEmbed";
    _key: string;
  } | {
    url: string;
    caption?: string;
    _type: "instagramEmbed";
    _key: string;
  } | {
    url: string;
    _type: "twitterEmbed";
    _key: string;
  } | {
    style?: string;
    _type: "divider";
    _key: string;
  } | {
    _key: string;
  } & Callout | {
    url: string;
    isCollapsed?: boolean;
    zoom?: number;
    aspectRatio?: "desktop" | "mobile";
    _type: "iframeEmbed";
    _key: string;
  }>;
};

export type CallToAction = {
  _type: "callToAction";
  heading: string;
  text?: string;
  buttonText?: string;
  link?: Link;
};

export type Link = {
  _type: "link";
  linkType?: "href" | "page" | "post";
  href?: string;
  page?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "page";
  };
  post?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "post";
  };
  openInNewTab?: boolean;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  listItem?: "bullet" | "number";
  markDefs?: Array<{
    linkType?: "href" | "page" | "post";
    href?: string;
    page?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "page";
    };
    post?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "post";
    };
    openInNewTab?: boolean;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  caption?: string;
  width?: "full" | "large" | "medium" | "small";
  _type: "image";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
  };
  caption?: string;
  width?: number;
  hasBorder?: boolean;
  showControls?: boolean;
  _type: "video";
  _key: string;
} | {
  url: string;
  caption?: string;
  width?: number;
  hasBorder?: boolean;
  showControls?: boolean;
  _type: "vimeoEmbed";
  _key: string;
} | {
  url: string;
  caption?: string;
  width?: number;
  hasBorder?: boolean;
  showControls?: boolean;
  _type: "youtubeEmbed";
  _key: string;
} | {
  url: string;
  caption?: string;
  width?: number;
  hasBorder?: boolean;
  showControls?: boolean;
  _type: "loomEmbed";
  _key: string;
} | {
  url: string;
  caption?: string;
  _type: "instagramEmbed";
  _key: string;
} | {
  url: string;
  _type: "twitterEmbed";
  _key: string;
} | {
  style?: string;
  _type: "divider";
  _key: string;
} | {
  _key: string;
} & Callout | {
  url: string;
  isCollapsed?: boolean;
  zoom?: number;
  aspectRatio?: "desktop" | "mobile";
  _type: "iframeEmbed";
  _key: string;
}>;

export type HeaderBioBits = {
  _id: string;
  _type: "headerBioBits";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  content: string;
  order: number;
};

export type LandingSection = {
  _id: string;
  _type: "landingSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  description: string;
  rows?: Array<{
    posts?: Array<{
      post: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "post";
      };
      width: "full" | "2/3" | "1/2" | "1/3";
      _type: "featuredPost";
      _key: string;
    }>;
    _type: "row";
    _key: string;
  }>;
  order: number;
};

export type Location = {
  _id: string;
  _type: "location";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  slug: Slug;
  coordinates?: Geopoint;
  description?: string;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Tag = {
  _id: string;
  _type: "tag";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  slug: Slug;
  description?: string;
};

export type Page = {
  _id: string;
  _type: "page";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  slug: Slug;
  heading: string;
  subheading?: string;
  pageBuilder?: Array<{
    _key: string;
  } & CallToAction | {
    _key: string;
  } & InfoSection>;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  slug: Slug;
  content?: BlockContent;
  excerpt?: string;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  projectLocation: "Google" | "MIT Media Lab" | "Personal Project" | "MIT Class";
  projectYear: "2025" | "2024" | "2023" | "2022" | "2021" | "2020";
  projectTags: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "tag";
  }>;
  date?: string;
  links?: Array<{
    _key: string;
  } & PostLink>;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Slug = {
  _type: "slug";
  current: string;
  source?: string;
};

export type SanityAssistInstructionTask = {
  _type: "sanity.assist.instructionTask";
  path?: string;
  instructionKey?: string;
  started?: string;
  updated?: string;
  info?: string;
};

export type SanityAssistTaskStatus = {
  _type: "sanity.assist.task.status";
  tasks?: Array<{
    _key: string;
  } & SanityAssistInstructionTask>;
};

export type SanityAssistSchemaTypeAnnotations = {
  _type: "sanity.assist.schemaType.annotations";
  title?: string;
  fields?: Array<{
    _key: string;
  } & SanityAssistSchemaTypeField>;
};

export type SanityAssistOutputType = {
  _type: "sanity.assist.output.type";
  type?: string;
};

export type SanityAssistOutputField = {
  _type: "sanity.assist.output.field";
  path?: string;
};

export type SanityAssistInstructionContext = {
  _type: "sanity.assist.instruction.context";
  reference: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "assist.instruction.context";
  };
};

export type AssistInstructionContext = {
  _id: string;
  _type: "assist.instruction.context";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  context?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: null;
    level?: number;
    _type: "block";
    _key: string;
  }>;
};

export type SanityAssistInstructionUserInput = {
  _type: "sanity.assist.instruction.userInput";
  message: string;
  description?: string;
};

export type SanityAssistInstructionPrompt = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  } | {
    _key: string;
  } & SanityAssistInstructionFieldRef | {
    _key: string;
  } & SanityAssistInstructionContext | {
    _key: string;
  } & SanityAssistInstructionUserInput>;
  style?: "normal";
  listItem?: never;
  markDefs?: null;
  level?: number;
  _type: "block";
  _key: string;
}>;

export type SanityAssistInstructionFieldRef = {
  _type: "sanity.assist.instruction.fieldRef";
  path?: string;
};

export type SanityAssistInstruction = {
  _type: "sanity.assist.instruction";
  prompt?: SanityAssistInstructionPrompt;
  icon?: string;
  title?: string;
  userId?: string;
  createdById?: string;
  output?: Array<{
    _key: string;
  } & SanityAssistOutputField | {
    _key: string;
  } & SanityAssistOutputType>;
};

export type SanityAssistSchemaTypeField = {
  _type: "sanity.assist.schemaType.field";
  path?: string;
  instructions?: Array<{
    _key: string;
  } & SanityAssistInstruction>;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | About | Settings | Callout | PostLink | InfoSection | CallToAction | Link | BlockContent | HeaderBioBits | LandingSection | Location | Geopoint | Tag | Page | Post | SanityFileAsset | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | Slug | SanityAssistInstructionTask | SanityAssistTaskStatus | SanityAssistSchemaTypeAnnotations | SanityAssistOutputType | SanityAssistOutputField | SanityAssistInstructionContext | AssistInstructionContext | SanityAssistInstructionUserInput | SanityAssistInstructionPrompt | SanityAssistInstructionFieldRef | SanityAssistInstruction | SanityAssistSchemaTypeField;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./sanity/lib/queries.ts
// Variable: settingsQuery
// Query: *[_type == "settings"][0]
export type SettingsQueryResult = {
  _id: string;
  _type: "settings";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal";
    listItem?: never;
    markDefs?: Array<{
      href: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  ogImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    metadataBase?: string;
    _type: "image";
  };
} | null;
// Variable: getPageQuery
// Query: *[_type == 'page' && slug.current == $slug][0]{    _id,    _type,    name,    slug,    heading,    subheading,    "pageBuilder": pageBuilder[]{      ...,      _type == "callToAction" => {          link {      ...,        _type == "link" => {    "page": page->slug.current,    "post": post->slug.current  }      },      },      _type == "infoSection" => {        content[]{          ...,          markDefs[]{            ...,              _type == "link" => {    "page": page->slug.current,    "post": post->slug.current  }          }        }      },    },  }
export type GetPageQueryResult = {
  _id: string;
  _type: "page";
  name: string;
  slug: Slug;
  heading: string;
  subheading: string | null;
  pageBuilder: Array<{
    _key: string;
    _type: "callToAction";
    heading: string;
    text?: string;
    buttonText?: string;
    link: {
      _type: "link";
      linkType?: "href" | "page" | "post";
      href?: string;
      page: string | null;
      post: string | null;
      openInNewTab?: boolean;
    } | null;
  } | {
    _key: string;
    _type: "infoSection";
    heading?: string;
    subheading?: string;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs: Array<{
        linkType?: "href" | "page" | "post";
        href?: string;
        page: string | null;
        post: string | null;
        openInNewTab?: boolean;
        _type: "link";
        _key: string;
      }> | null;
      level?: number;
      _type: "block";
      _key: string;
    } | {
      _key: string;
      _type: "callout";
      content?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }>;
      markDefs: null;
    } | {
      style?: string;
      _type: "divider";
      _key: string;
      markDefs: null;
    } | {
      url: string;
      isCollapsed?: boolean;
      zoom?: number;
      aspectRatio?: "desktop" | "mobile";
      _type: "iframeEmbed";
      _key: string;
      markDefs: null;
    } | {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      caption?: string;
      width?: "full" | "large" | "medium" | "small";
      _type: "image";
      _key: string;
      markDefs: null;
    } | {
      url: string;
      caption?: string;
      _type: "instagramEmbed";
      _key: string;
      markDefs: null;
    } | {
      url: string;
      caption?: string;
      width?: number;
      hasBorder?: boolean;
      showControls?: boolean;
      _type: "loomEmbed";
      _key: string;
      markDefs: null;
    } | {
      url: string;
      _type: "twitterEmbed";
      _key: string;
      markDefs: null;
    } | {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
      };
      caption?: string;
      width?: number;
      hasBorder?: boolean;
      showControls?: boolean;
      _type: "video";
      _key: string;
      markDefs: null;
    } | {
      url: string;
      caption?: string;
      width?: number;
      hasBorder?: boolean;
      showControls?: boolean;
      _type: "vimeoEmbed";
      _key: string;
      markDefs: null;
    } | {
      url: string;
      caption?: string;
      width?: number;
      hasBorder?: boolean;
      showControls?: boolean;
      _type: "youtubeEmbed";
      _key: string;
      markDefs: null;
    }> | null;
  }> | null;
} | null;
// Variable: sitemapData
// Query: *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {    "slug": slug.current,    _type,    _updatedAt,  }
export type SitemapDataResult = Array<{
  slug: string;
  _type: "page";
  _updatedAt: string;
} | {
  slug: string;
  _type: "post";
  _updatedAt: string;
}>;
// Variable: allPostsQuery
// Query: *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{firstName, lastName, picture},  }
export type AllPostsQueryResult = Array<{
  _id: string;
  status: "draft" | "published";
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  date: string;
  author: null;
}>;
// Variable: morePostsQuery
// Query: *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{firstName, lastName, picture},  }
export type MorePostsQueryResult = Array<{
  _id: string;
  status: "draft" | "published";
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  date: string;
  author: null;
}>;
// Variable: postQuery
// Query: *[_type == "post" && slug.current == $slug][0] {    content[]{      ...,      _type == "vimeoEmbed" => {        ...,        url,        caption      },      _type == "youtubeEmbed" => {        ...,        url,        caption      },      _type == "video" => {        ...,        asset,        caption      },      markDefs[]{        ...,          _type == "link" => {    "page": page->slug.current,    "post": post->slug.current  }      }    },      _id,  "status": select(_originalId in path("drafts.**") => "draft", "published"),  "title": coalesce(title, "Untitled"),  "slug": slug.current,  excerpt,  coverImage,  "date": coalesce(date, _updatedAt),  "author": author->{firstName, lastName, picture},    projectLocation,    projectYear,    "projectTags": projectTags[]->{ _id, name, slug },    "links": links[] {      displayText,      href    }  }
export type PostQueryResult = {
  content: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs: Array<{
      linkType?: "href" | "page" | "post";
      href?: string;
      page: string | null;
      post: string | null;
      openInNewTab?: boolean;
      _type: "link";
      _key: string;
    }> | null;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    _key: string;
    _type: "callout";
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    markDefs: null;
  } | {
    style?: string;
    _type: "divider";
    _key: string;
    markDefs: null;
  } | {
    url: string;
    isCollapsed?: boolean;
    zoom?: number;
    aspectRatio?: "desktop" | "mobile";
    _type: "iframeEmbed";
    _key: string;
    markDefs: null;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    caption?: string;
    width?: "full" | "large" | "medium" | "small";
    _type: "image";
    _key: string;
    markDefs: null;
  } | {
    url: string;
    caption?: string;
    _type: "instagramEmbed";
    _key: string;
    markDefs: null;
  } | {
    url: string;
    caption?: string;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
    _type: "loomEmbed";
    _key: string;
    markDefs: null;
  } | {
    url: string;
    _type: "twitterEmbed";
    _key: string;
    markDefs: null;
  } | {
    asset: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
    } | null;
    caption: string | null;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
    _type: "video";
    _key: string;
    markDefs: null;
  } | {
    url: string;
    caption: string | null;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
    _type: "vimeoEmbed";
    _key: string;
    markDefs: null;
  } | {
    url: string;
    caption: string | null;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
    _type: "youtubeEmbed";
    _key: string;
    markDefs: null;
  }> | null;
  _id: string;
  status: "draft" | "published";
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  date: string;
  author: null;
  projectLocation: "Google" | "MIT Class" | "MIT Media Lab" | "Personal Project";
  projectYear: "2020" | "2021" | "2022" | "2023" | "2024" | "2025";
  projectTags: Array<{
    _id: string;
    name: string;
    slug: Slug;
  }>;
  links: Array<{
    displayText: string;
    href: string;
  }> | null;
} | null;
// Variable: postPagesSlugs
// Query: *[_type == "post" && defined(slug.current)]  {"slug": slug.current}
export type PostPagesSlugsResult = Array<{
  slug: string;
}>;
// Variable: pagesSlugs
// Query: *[_type == "page" && defined(slug.current)]  {"slug": slug.current}
export type PagesSlugsResult = Array<{
  slug: string;
}>;
// Variable: aboutPageQuery
// Query: *[_type == "about"][0]{    profileImage {      asset,      alt,    },    photographerName,    photographerUrl,    fullBio,    bioSections[] {      title,      content    }  }
export type AboutPageQueryResult = {
  profileImage: {
    asset: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    } | null;
    alt: string;
  };
  photographerName: string;
  photographerUrl: string;
  fullBio: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  bioSections: Array<{
    title: string;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
  }> | null;
} | null;
// Variable: allPostsCountQuery
// Query: *[_type == "post"] {    _id,    _type,    title,    "isDraft": _id in path("drafts.**"),    _updatedAt  }
export type AllPostsCountQueryResult = Array<{
  _id: string;
  _type: "post";
  title: string;
  isDraft: boolean;
  _updatedAt: string;
}>;
// Variable: allDocumentsQuery
// Query: *[_type == "post"] {    _id,    title,    _createdAt,    _updatedAt,    "hasCoverImage": defined(coverImage),    "hasSlug": defined(slug.current),    "hasDate": defined(date),    "isPublished": !(_id in path("drafts.**")),    "inDrafts": _id in path("drafts.**")  }
export type AllDocumentsQueryResult = Array<{
  _id: string;
  title: string;
  _createdAt: string;
  _updatedAt: string;
  hasCoverImage: true;
  hasSlug: true;
  hasDate: false | true;
  isPublished: boolean;
  inDrafts: boolean;
}>;
// Variable: projectArchiveQuery
// Query: *[_type == "post"] | order(date desc) {    _id,    title,    "slug": slug.current,    "hasSlug": defined(slug.current),    excerpt,    "coverImage": {      "asset": coalesce(coverImage.asset, {"_ref": "", "_type": "reference"}),      "hotspot": coverImage.hotspot,      "crop": coverImage.crop,      "alt": coverImage.alt,      "_type": "image"    },    "hasCoverImage": defined(coverImage),    "date": coalesce(date, _updatedAt),    "hasDate": defined(date),    "location": projectLocation,    "year": projectYear,    "projectTags": projectTags[]->{ _id, name, slug },    "isPublished": !(_id in path("drafts.**")),    "inDrafts": _id in path("drafts.**"),    _createdAt,    _updatedAt  }
export type ProjectArchiveQueryResult = Array<{
  _id: string;
  title: string;
  slug: string;
  hasSlug: true;
  excerpt: string | null;
  coverImage: {
    asset: {
      _ref: "";
      _type: "reference";
    } | {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot: SanityImageHotspot | null;
    crop: SanityImageCrop | null;
    alt: string | null;
    _type: "image";
  };
  hasCoverImage: true;
  date: string;
  hasDate: false | true;
  location: "Google" | "MIT Class" | "MIT Media Lab" | "Personal Project";
  year: "2020" | "2021" | "2022" | "2023" | "2024" | "2025";
  projectTags: Array<{
    _id: string;
    name: string;
    slug: Slug;
  }>;
  isPublished: boolean;
  inDrafts: boolean;
  _createdAt: string;
  _updatedAt: string;
}>;
// Variable: headerBioBitsQuery
// Query: *[_type == "headerBioBits"] | order(order asc) {    _id,    title,    content,    order  }
export type HeaderBioBitsQueryResult = Array<{
  _id: string;
  title: string;
  content: string;
  order: number;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[_type == \"settings\"][0]": SettingsQueryResult;
    "\n  *[_type == 'page' && slug.current == $slug][0]{\n    _id,\n    _type,\n    name,\n    slug,\n    heading,\n    subheading,\n    \"pageBuilder\": pageBuilder[]{\n      ...,\n      _type == \"callToAction\" => {\n        \n  link {\n      ...,\n      \n  _type == \"link\" => {\n    \"page\": page->slug.current,\n    \"post\": post->slug.current\n  }\n\n      }\n,\n      },\n      _type == \"infoSection\" => {\n        content[]{\n          ...,\n          markDefs[]{\n            ...,\n            \n  _type == \"link\" => {\n    \"page\": page->slug.current,\n    \"post\": post->slug.current\n  }\n\n          }\n        }\n      },\n    },\n  }\n": GetPageQueryResult;
    "\n  *[_type == \"page\" || _type == \"post\" && defined(slug.current)] | order(_type asc) {\n    \"slug\": slug.current,\n    _type,\n    _updatedAt,\n  }\n": SitemapDataResult;
    "\n  *[_type == \"post\" && defined(slug.current)] | order(date desc, _updatedAt desc) {\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{firstName, lastName, picture},\n\n  }\n": AllPostsQueryResult;
    "\n  *[_type == \"post\" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{firstName, lastName, picture},\n\n  }\n": MorePostsQueryResult;
    "\n  *[_type == \"post\" && slug.current == $slug][0] {\n    content[]{\n      ...,\n      _type == \"vimeoEmbed\" => {\n        ...,\n        url,\n        caption\n      },\n      _type == \"youtubeEmbed\" => {\n        ...,\n        url,\n        caption\n      },\n      _type == \"video\" => {\n        ...,\n        asset,\n        caption\n      },\n      markDefs[]{\n        ...,\n        \n  _type == \"link\" => {\n    \"page\": page->slug.current,\n    \"post\": post->slug.current\n  }\n\n      }\n    },\n    \n  _id,\n  \"status\": select(_originalId in path(\"drafts.**\") => \"draft\", \"published\"),\n  \"title\": coalesce(title, \"Untitled\"),\n  \"slug\": slug.current,\n  excerpt,\n  coverImage,\n  \"date\": coalesce(date, _updatedAt),\n  \"author\": author->{firstName, lastName, picture},\n\n    projectLocation,\n    projectYear,\n    \"projectTags\": projectTags[]->{ _id, name, slug },\n    \"links\": links[] {\n      displayText,\n      href\n    }\n  }\n": PostQueryResult;
    "\n  *[_type == \"post\" && defined(slug.current)]\n  {\"slug\": slug.current}\n": PostPagesSlugsResult;
    "\n  *[_type == \"page\" && defined(slug.current)]\n  {\"slug\": slug.current}\n": PagesSlugsResult;
    "\n  *[_type == \"about\"][0]{\n    profileImage {\n      asset,\n      alt,\n    },\n    photographerName,\n    photographerUrl,\n    fullBio,\n    bioSections[] {\n      title,\n      content\n    }\n  }\n": AboutPageQueryResult;
    "\n  *[_type == \"post\"] {\n    _id,\n    _type,\n    title,\n    \"isDraft\": _id in path(\"drafts.**\"),\n    _updatedAt\n  }\n": AllPostsCountQueryResult;
    "\n  *[_type == \"post\"] {\n    _id,\n    title,\n    _createdAt,\n    _updatedAt,\n    \"hasCoverImage\": defined(coverImage),\n    \"hasSlug\": defined(slug.current),\n    \"hasDate\": defined(date),\n    \"isPublished\": !(_id in path(\"drafts.**\")),\n    \"inDrafts\": _id in path(\"drafts.**\")\n  }\n": AllDocumentsQueryResult;
    "\n  *[_type == \"post\"] | order(date desc) {\n    _id,\n    title,\n    \"slug\": slug.current,\n    \"hasSlug\": defined(slug.current),\n    excerpt,\n    \"coverImage\": {\n      \"asset\": coalesce(coverImage.asset, {\"_ref\": \"\", \"_type\": \"reference\"}),\n      \"hotspot\": coverImage.hotspot,\n      \"crop\": coverImage.crop,\n      \"alt\": coverImage.alt,\n      \"_type\": \"image\"\n    },\n    \"hasCoverImage\": defined(coverImage),\n    \"date\": coalesce(date, _updatedAt),\n    \"hasDate\": defined(date),\n    \"location\": projectLocation,\n    \"year\": projectYear,\n    \"projectTags\": projectTags[]->{ _id, name, slug },\n    \"isPublished\": !(_id in path(\"drafts.**\")),\n    \"inDrafts\": _id in path(\"drafts.**\"),\n    _createdAt,\n    _updatedAt\n  }\n": ProjectArchiveQueryResult;
    "\n  *[_type == \"headerBioBits\"] | order(order asc) {\n    _id,\n    title,\n    content,\n    order\n  }\n": HeaderBioBitsQueryResult;
  }
}
