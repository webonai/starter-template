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
    container: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    grid: ElementConfig;
    items: FeatureItem[];
  };
};

type FooterLinks = {
    text: string;
    href: string;
};

export type FooterProps = {
    data: {
        container: {
          className?: string;
        };
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
    logo: {
        src: string;
        alt: string;
        href: string;
        className?: string;
    };
    nav: {
        links: NavLink[];
        className?: string;
    };
    ctaButton: {
        text: string;
        href: string;
        className?: string;
    };
};

export type HeroData = {
  container: ElementConfig;
  innerWrapper: ElementConfig;
  headline: ElementConfig;
  subtext: ElementConfig;
  heroImage?: ElementConfig;
  primaryButton: ElementConfig;
};


export type ReviewItem = {
  container: ElementConfig;
  quote: ElementConfig;
  author: ElementConfig;
  role: ElementConfig;
};

export type TestimonialsProps = {
  data: {
    container: ElementConfig;
    innerWrapper: ElementConfig;
    header: ElementConfig;
    headline: ElementConfig;
    subtext: ElementConfig;
    grid: ElementConfig;
    items?: ReviewItem[];
  };
};