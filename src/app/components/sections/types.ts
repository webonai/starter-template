import { ElementConfig } from '@/types/schema';

type PostData = {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  content: string;
};

export type BlogProps = {
  data: {
    container: ElementConfig;
    innerWrapper: ElementConfig;
    headerWrapper: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    grid: ElementConfig;
    card: ElementConfig;
    cardImage: ElementConfig;
    cardContent: ElementConfig;
    cardCategory: ElementConfig;
    cardTitle: ElementConfig;
    cardDate: ElementConfig;
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
    innerWrapper: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    button: ElementConfig;
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

type FooterLinks = {
    text: string;
    href: string;
};

export type FooterProps = {
    data: {
        container: ElementConfig;
        innerWrapper: ElementConfig
        text: ElementConfig;
        grid: ElementConfig;
        items: {
          title: string;
          links: FooterLinks[]
        }[];
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