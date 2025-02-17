import { PortableTextBlock } from "@portabletext/types";

export interface AboutPage {
  profileImage: {
    asset: {
      _ref: string;
    };
    alt: string;
  };
  photographerName: string;
  photographerUrl: string;
  fullBio: PortableTextBlock[];
  bioSections: BioSection[];
}

export interface BioSection {
  title: string;
  content: PortableTextBlock[];
}
