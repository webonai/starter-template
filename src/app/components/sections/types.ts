import { ElementConfig } from '@/types/schema';

// Nested post format (from config.json or after normalization)
type NestedPostData = {
  enabled?: boolean;
  slug?: string;
  title?: {
    enabled?: boolean;
    text?: string;
  };
  titleLink?: ElementConfig;
  meta?: ElementConfig;
  excerpt?: {
    enabled?: boolean;
    text?: string;
  };
  href?: string;
  author?: {
    enabled?: boolean;
    name?: string;
    avatar?: {
      enabled?: boolean;
      src?: string;
      alt?: string;
    };
  };
  category?: {
    text?: string;
    enabled?: boolean;
  };
  image?: {
    enabled?: boolean;
    src?: string;
    alt?: string;
  };
  imageLink?: ElementConfig;
  content?: string;
  date?: {
    enabled?: boolean;
    text?: string;
    datetime?: string;
  };
  readTime?: {
    enabled?: boolean;
    text?: string;
  };
  readMore?: {
    enabled?: boolean;
    text?: string;
    href?: string;
  };
};

// Flat post format (from content/posts/posts.json)
type FlatPostData = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  tags?: string[];
  content: string;
  href?: string;
};

// Posts can be either format — Blog component normalizes them
type PostData = NestedPostData | FlatPostData;

export type BlogProps = {
  data: {
    container: ElementConfig;
    innerWrapper: ElementConfig;
    headerContent: ElementConfig;
    header: ElementConfig;
    eyebrow: ElementConfig;
    headline: ElementConfig;
    viewAllButton: ElementConfig;
    subtext: ElementConfig;
    grid: ElementConfig;
    maxPosts?: number;
    posts: PostData[];
  };
};

export type FaqProps = {
    data: { 
        container: ElementConfig;
        innerWrapper: ElementConfig;
        headerWrapper: ElementConfig;
        subtext: ElementConfig;
        list: ElementConfig;
        header: ElementConfig;
        questions: {
            q: ElementConfig;
            a: ElementConfig;
        }[]
    }
};

export type ctaProps = {
  data: {
    container: ElementConfig;
    background: ElementConfig;
    pattern: ElementConfig;
    content: ElementConfig;
    eyebrow: ElementConfig;
    buttonWrapper: ElementConfig;
    primaryButton: ElementConfig;
    secondaryButton: ElementConfig;
    innerWrapper: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    featuresWrapper: ElementConfig;
    features?: Array<{
      enabled?: boolean;
      icon?: string;
      text?: string;
    }>;
  };
};


export type FeatureItem = {
  container: ElementConfig;
  icon?: ElementConfig; 
  title: ElementConfig;
  description: ElementConfig;
};

export type FeaturesProps = {
  data: {
  container?: ElementConfig;
  background?: ElementConfig & { enabled: boolean };
  innerWrapper?: ElementConfig;
  header?: ElementConfig;
  eyebrow?: ElementConfig & { text: string; enabled: boolean };
  headline?: ElementConfig & { text: string; enabled: boolean };
  subtext?: ElementConfig & { text: string; enabled: boolean };
  grid?: ElementConfig;
  items?: Array<ElementConfig & {
    enabled: boolean;
    icon?: ElementConfig & { enabled: boolean; emoji?: string; svg?: string; alt?: string; };
    iconEmoji?: ElementConfig;
    iconSvg?: ElementConfig;
    title?: ElementConfig & { text: string; enabled: boolean };
    description?: ElementConfig & { text: string; enabled: boolean };
    link?: ElementConfig & { text?: string; href?: string; enabled: boolean };
  }>;
  ctaWrapper?: ElementConfig;
  cta?: ElementConfig & { text?: string; href?: string; enabled: boolean };
  };
};

type FooterLink = {
    enabled?: boolean;
    text: string;
    href: string;
};

type FooterLinkColumn = {
    enabled?: boolean;
    title?: ElementConfig & { text?: string };
    links?: FooterLink[];
};

type SocialLink = {
    enabled?: boolean;
    platform?: string;
    label?: string;
    href?: string;
    icon?: string;
};

export type FooterProps = {
    data: {
        container: ElementConfig;
        innerWrapper: ElementConfig;
        mainContent: ElementConfig;
        brandColumn: ElementConfig;
        logo: ElementConfig & { src?: string; alt?: string; href?: string };
        tagline: ElementConfig & { text?: string };
        socialWrapper: ElementConfig;
        socialLinks?: SocialLink[];
        linkColumns?: FooterLinkColumn[];
        bottomBar: ElementConfig;
        copyright: ElementConfig & { text?: string };
        bottomLinksWrapper: ElementConfig;
        bottomLinks?: FooterLink[];
    };
};


type NavLink = {
    text: string;
    href: string;
};

export type HeaderProps = {
    container: ElementConfig;
    innerWrapper: ElementConfig;
    logo: ElementConfig;
    logoImage: ElementConfig;
    actions: { 
      enabled: boolean;
    };
    nav: {
        links: NavLink[];
        className?: string;
    };
    ctaButton: ElementConfig;
    logoWrapper: ElementConfig;
    wrapper: ElementConfig;
    mobileMenuButton: ElementConfig;
    mobileMenuInner: ElementConfig;
    mobileMenu: ElementConfig;
    hamburgerIcon: ElementConfig;
    closeIcon: ElementConfig;
    srText: ElementConfig;
    mobileCTA: ElementConfig;
};

export type HeroData = {
  container: ElementConfig;
  innerWrapper: ElementConfig;
  backgroundGradient: ElementConfig;
  contentWrapper: ElementConfig;
  eyebrow?: ElementConfig;
  headline: ElementConfig;
  subtext: ElementConfig;
  buttonWrapper: ElementConfig;
  primaryButton?: ElementConfig;
  secondaryButton?: ElementConfig;
  imageWrapper: ElementConfig;
  imageInner: ElementConfig;
  imageGlow: ElementConfig;
  heroImage?: ElementConfig;
  statsContainer?: ElementConfig;
  stats?: Array<ElementConfig & { 
    iconWrapper?: ElementConfig; 
    valueWrapper?: ElementConfig; 
    labelWrapper?: ElementConfig; 
    value: string; 
    label: string; 
    icon?: string; 
  }>;
};


export type ReviewItem = {
  container: ElementConfig;
  quote: ElementConfig;
  author: ElementConfig;
  role: ElementConfig;
};

export type TestimonialsProps = {
  data: {
  container?: ElementConfig;
  innerWrapper?: ElementConfig;
  header?: ElementConfig;
  eyebrow?: ElementConfig & { text: string; enabled: boolean };
  headline?: ElementConfig & { text: string; enabled: boolean };
  subtext?: ElementConfig & { text: string; enabled: boolean };
  grid?: ElementConfig;
  showQuoteIcon?: boolean;
  items?: Array<ElementConfig & {
    enabled: boolean;
    quote?: ElementConfig & { text: string; enabled: boolean };
    quoteIcon?: ElementConfig;
    authorWrapper?: ElementConfig;
    avatarWrapper?: ElementConfig;
    avatar?: ElementConfig & { src?: string; alt?: string; enabled: boolean };
    authorDetails?: ElementConfig;
    author?: ElementConfig & { text: string; enabled: boolean };
    role?: ElementConfig & { text: string; enabled: boolean };
    company?: ElementConfig & { text: string; enabled: boolean };
    roleCompany?: ElementConfig;
    rating?: ElementConfig & { value?: number; enabled: boolean };
    ratingWrapper?: ElementConfig;
  }>;
  };
};