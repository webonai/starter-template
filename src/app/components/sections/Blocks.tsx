'use client';

import Image from 'next/image';
import Link from 'next/link';
import { editable } from '@/lib/editable';

type LinkItem = {
  text?: string;
  href?: string;
  className?: string;
  icon?: string;
  iconClassName?: string;
};

type BlockItem = {
  enabled?: boolean;
  type:
    | 'heading'
    | 'paragraph'
    | 'image'
    | 'imageGrid'
    | 'buttonRow'
    | 'cards'
    | 'divider'
    | 'spacer'
    | 'group'
    | 'split'
    | 'heroOverlay'
    | 'navBar'
    | 'headerBar'
    | 'formRow'
    | 'linkList'
    | 'socialIcons'
    | 'statsRow'
    | 'faqList'
    | 'postGrid';
  className?: string;
  text?: string;
  level?: 1 | 2 | 3;
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center';
  id?: string;
  items?: Array<{
    src?: string;
    alt?: string;
    caption?: string;
    href?: string;
    title?: string;
    text?: string;
    icon?: string;
    iconClassName?: string;
    meta?: string;
    linkText?: string;
    avatarSrc?: string;
    avatarAlt?: string;
  }>;
  buttons?: Array<{
    text?: string;
    href?: string;
    variant?: 'primary' | 'secondary';
    className?: string;
  }>;
  blocks?: BlockItem[];
  leftBlocks?: BlockItem[];
  rightBlocks?: BlockItem[];
  links?: LinkItem[];
  brandText?: string;
  brandHref?: string;
  brandImageSrc?: string;
  brandImageSvg?: string;
  brandImageAlt?: string;
  brandImageClassName?: string;
  brandTextClassName?: string;
  ctaText?: string;
  ctaHref?: string;
  ctaClassName?: string;
  noteText?: string;
  noteClassName?: string;
  leftNoteText?: string;
  leftNoteClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
  minHeightClassName?: string;
  inputPlaceholder?: string;
  inputType?: string;
  inputName?: string;
  buttonText?: string;
  buttonHref?: string;
  ratio?: '1:1' | '2:1' | '1:2';
  statItems?: Array<{
    icon?: string;
    value?: string;
    label?: string;
  }>;
  faqItems?: Array<{
    q?: string;
    a?: string;
  }>;
  postItems?: Array<{
    image?: string;
    alt?: string;
    category?: string;
    date?: string;
    title?: string;
    excerpt?: string;
    author?: string;
    href?: string;
    readMore?: string;
  }>;
};

type BlocksData = {
  container?: any;
  innerWrapper?: any;
  blocks?: BlockItem[];
};

function maxWidthClass(size?: BlockItem['size']) {
  if (size === 'sm') return 'max-w-2xl';
  if (size === 'lg') return 'max-w-6xl';
  return 'max-w-4xl';
}

function alignClass(align?: BlockItem['align']) {
  return align === 'left' ? 'text-left' : 'text-center';
}

function alignWrapperClass(align?: BlockItem['align']) {
  return align === 'left' ? 'ml-0 mr-auto' : 'mx-auto';
}

function isSvgMarkup(value?: string) {
  return Boolean(value && value.trim().startsWith('<svg'));
}

function renderBlocks(blocks: BlockItem[], pathPrefix: string) {
  return blocks
    .filter((b) => b.enabled !== false)
    .map((block, index) => renderBlock(block, `${pathPrefix}.${index}`, index));
}

function renderBlock(block: BlockItem, blockPath: string, key: number | string) {
  if (block.type === 'heading') {
    const HeadingTag = block.level === 1 ? 'h1' : block.level === 3 ? 'h3' : 'h2';
    return (
      <div key={key} className={`${alignWrapperClass(block.align)} ${maxWidthClass(block.size)} ${alignClass(block.align)}`}>
        <HeadingTag
          {...editable(
            block,
            blockPath,
            'headline',
            'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground'
          )}
        >
          {block.text}
        </HeadingTag>
      </div>
    );
  }

  if (block.type === 'paragraph') {
    return (
      <div key={key} className={`${alignWrapperClass(block.align)} ${maxWidthClass(block.size)} ${alignClass(block.align)}`}>
        <p
          {...editable(
            block,
            blockPath,
            'text',
            'text-base sm:text-lg leading-8 text-muted-foreground'
          )}
        >
          {block.text}
        </p>
      </div>
    );
  }

  if (block.type === 'image' && block.src) {
    return (
      <div key={key} className={`mx-auto ${maxWidthClass(block.size)}`}>
        <div
          {...editable(
            block,
            blockPath,
            'image',
            'relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted'
          )}
        >
          <Image src={block.src} alt={block.alt || 'Section image'} fill className="object-cover" />
        </div>
      </div>
    );
  }

  if (block.type === 'imageGrid' && block.items && block.items.length > 0) {
    return (
      <div key={key} className={`mx-auto ${maxWidthClass(block.size || 'lg')}`}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item, itemIndex) => (
            <article key={itemIndex} className="space-y-2">
              {item.src ? (
                <div
                  {...editable(
                    item,
                    `${blockPath}.items.${itemIndex}`,
                    'image',
                    'relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted'
                  )}
                >
                  <Image src={item.src} alt={item.alt || 'Gallery image'} fill className="object-cover" />
                </div>
              ) : null}
              {item.caption ? (
                <p
                  {...editable(
                    item,
                    `${blockPath}.items.${itemIndex}.caption`,
                    'text',
                    'text-sm text-muted-foreground'
                  )}
                >
                  {item.caption}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'buttonRow' && block.buttons && block.buttons.length > 0) {
    const justifyClass = block.align === 'left' ? 'justify-start' : 'justify-center';
    return (
      <div key={key} className={`${alignWrapperClass(block.align)} ${maxWidthClass(block.size)} ${alignClass(block.align)}`}>
        <div className={`flex flex-wrap items-center gap-4 ${justifyClass}`}>
          {block.buttons.map((button, btnIndex) => {
            const buttonClass =
              button.variant === 'secondary'
                ? 'rounded-lg border-2 border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all duration-200'
                : 'rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md transition-all duration-200';
            return (
              <Link
                key={btnIndex}
                {...editable(
                  button,
                  `${blockPath}.buttons.${btnIndex}`,
                  'button',
                  button.className || buttonClass
                )}
              >
                {button.text}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  if (block.type === 'cards' && block.items && block.items.length > 0) {
    return (
      <div key={key} className={`mx-auto ${maxWidthClass(block.size || 'lg')}`}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item, itemIndex) => (
            <article
              key={itemIndex}
              className="group relative rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/50"
            >
              {item.icon ? (
                isSvgMarkup(item.icon) ? (
                  <div className={item.iconClassName || "mb-3 inline-flex items-center gap-1"} dangerouslySetInnerHTML={{ __html: item.icon }} />
                ) : (
                  <div className={item.iconClassName || "mb-3 text-lg"}>{item.icon}</div>
                )
              ) : null}
              {item.src ? (
                <div className="mb-4 relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-muted">
                  <Image src={item.src} alt={item.alt || item.title || 'Card image'} fill className="object-cover" />
                </div>
              ) : null}
              {item.title ? <h3 className="text-xl font-semibold text-card-foreground">{item.title}</h3> : null}
              {item.text ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p> : null}
              {item.avatarSrc || item.meta ? (
                <div className="mt-4 flex items-center gap-3">
                  {item.avatarSrc ? (
                    <img
                      src={item.avatarSrc}
                      alt={item.avatarAlt || item.title || 'Avatar'}
                      className="h-8 w-8 rounded-full border border-border object-cover"
                    />
                  ) : null}
                  {item.meta ? <p className="text-xs text-muted-foreground">{item.meta}</p> : null}
                </div>
              ) : null}
              {item.href ? (
                <Link href={item.href} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline transition-colors">
                  {item.linkText || 'Learn more'}
                  <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'group') {
    return (
      <div key={key} {...editable(block, blockPath, 'container', 'space-y-6')}>
        {block.blocks ? renderBlocks(block.blocks, `${blockPath}.blocks`) : null}
      </div>
    );
  }

  if (block.type === 'split') {
    const ratioClass =
      block.ratio === '2:1' ? 'lg:grid-cols-[2fr_1fr]' : block.ratio === '1:2' ? 'lg:grid-cols-[1fr_2fr]' : 'lg:grid-cols-2';
    return (
      <div key={key} {...editable(block, blockPath, 'container', `grid grid-cols-1 gap-10 ${ratioClass}`)}>
        <div className="space-y-6">{block.leftBlocks ? renderBlocks(block.leftBlocks, `${blockPath}.leftBlocks`) : null}</div>
        <div className="space-y-6">{block.rightBlocks ? renderBlocks(block.rightBlocks, `${blockPath}.rightBlocks`) : null}</div>
      </div>
    );
  }

  if (block.type === 'navBar') {
    return (
      <div key={key} {...editable(block, blockPath, 'container', 'flex items-center justify-between gap-6')}>
        <Link href={block.brandHref || '/'} className="inline-flex items-center gap-3">
          {block.brandImageSvg ? (
            <span
              aria-hidden="true"
              className={block.brandImageClassName || 'inline-flex h-8 w-auto text-primary [&>svg]:h-full [&>svg]:w-auto'}
              dangerouslySetInnerHTML={{ __html: block.brandImageSvg }}
            />
          ) : null}
          {!block.brandImageSvg && block.brandImageSrc ? (
            <img src={block.brandImageSrc} alt={block.brandImageAlt || block.brandText || 'Brand'} className={block.brandImageClassName || "h-8 w-auto"} />
          ) : null}
          {block.brandText ? <span className={block.brandTextClassName || "text-sm font-semibold tracking-[0.12em] uppercase"}>{block.brandText}</span> : null}
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {block.links?.map((link, linkIndex) => (
            <Link key={linkIndex} href={link.href || '#'} className={link.className || 'text-sm font-medium text-foreground/70 hover:text-foreground transition-colors'}>
              {link.text}
            </Link>
          ))}
          {block.ctaText ? (
            <Link href={block.ctaHref || '#'} className={block.ctaClassName || 'rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200'}>
              {block.ctaText}
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  if (block.type === 'headerBar') {
    return (
      <div key={key} {...editable(block, blockPath, 'container', 'grid grid-cols-[auto_1fr_auto] items-center gap-6')}>
        <Link href={block.brandHref || '/'} className="inline-flex items-center gap-3">
          {block.brandImageSvg ? (
            <span
              aria-hidden="true"
              className={block.brandImageClassName || 'inline-flex h-8 w-auto text-primary [&>svg]:h-full [&>svg]:w-auto'}
              dangerouslySetInnerHTML={{ __html: block.brandImageSvg }}
            />
          ) : null}
          {!block.brandImageSvg && block.brandImageSrc ? (
            <img
              src={block.brandImageSrc}
              alt={block.brandImageAlt || block.brandText || 'Brand'}
              className={block.brandImageClassName || 'h-8 w-auto'}
            />
          ) : null}
          {block.brandText ? (
            <span className={block.brandTextClassName || 'text-sm font-semibold tracking-[0.12em] uppercase'}>
              {block.brandText}
            </span>
          ) : null}
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-6">
          {block.links?.map((link, linkIndex) => (
            <Link key={linkIndex} href={link.href || '#'} className={link.className || 'text-sm font-medium text-foreground/70 hover:text-foreground transition-colors'}>
              {link.text}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end">
          {block.ctaText ? (
            <Link
              href={block.ctaHref || '#'}
              className={
                block.ctaClassName ||
                'rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200'
              }
            >
              {block.ctaText}
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  if (block.type === 'heroOverlay' && block.src) {
    return (
      <div
        key={key}
        {...editable(
          block,
          blockPath,
          'container',
          `relative overflow-hidden ${block.minHeightClassName || 'min-h-screen'}`
        )}
      >
        <div className="absolute inset-0 z-0">
          <Image src={block.src} alt={block.alt || 'Hero image'} fill className="object-cover" priority />
        </div>
        <div className={block.overlayClassName || 'absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-black/20 to-black/50'} />

        {block.noteText ? (
          <div className={block.noteClassName || 'pointer-events-none absolute right-6 top-24 z-20 border-t border-white/70 pt-2 text-right text-[11px] uppercase tracking-[0.18em] text-white/90 sm:right-10'}>
            {block.noteText}
          </div>
        ) : null}

        {block.leftNoteText ? (
          <div className={block.leftNoteClassName || 'pointer-events-none absolute left-6 top-24 z-20 text-[11px] uppercase tracking-[0.18em] text-white/90 sm:left-10'}>
            {block.leftNoteText}
          </div>
        ) : null}

        <div className={block.contentClassName || 'relative z-20 container mx-auto min-h-screen px-6 lg:px-10 flex items-end pb-16 sm:pb-20'}>
          <div className="max-w-2xl space-y-5">{block.blocks ? renderBlocks(block.blocks, `${blockPath}.blocks`) : null}</div>
        </div>
      </div>
    );
  }

  if (block.type === 'formRow') {
    return (
      <form key={key} {...editable(block, blockPath, 'container', 'flex w-full max-w-md items-center gap-2')} onSubmit={(e) => e.preventDefault()}>
        <input
          {...editable(
            {
              type: block.inputType || 'email',
              name: block.inputName || 'email',
              placeholder: block.inputPlaceholder || 'Your email address',
              className: 'h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow',
            },
            `${blockPath}.input`,
            'input',
            ''
          )}
        />
        {block.buttonHref ? (
          <Link href={block.buttonHref} className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-200 inline-flex items-center">
            {block.buttonText || 'Submit'}
          </Link>
        ) : (
          <button type="submit" className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-200">
            {block.buttonText || 'Submit'}
          </button>
        )}
      </form>
    );
  }

  if (block.type === 'linkList') {
    return (
      <div key={key} {...editable(block, blockPath, 'container', 'flex flex-wrap items-center gap-x-6 gap-y-3')}>
        {block.links?.map((link, linkIndex) => (
          <Link key={linkIndex} href={link.href || '#'} className={link.className || 'text-sm text-current/90 hover:text-current transition-colors'}>
            <span className="inline-flex items-center gap-2">
              {link.icon ? (
                isSvgMarkup(link.icon) ? (
                  <span
                    className={link.iconClassName || 'inline-flex h-4 w-4 shrink-0'}
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: link.icon }}
                  />
                ) : (
                  <span className={link.iconClassName || 'inline-flex'} aria-hidden="true">
                    {link.icon}
                  </span>
                )
              ) : null}
              <span>{link.text}</span>
            </span>
          </Link>
        ))}
      </div>
    );
  }

  if (block.type === 'socialIcons' && block.items && block.items.length > 0) {
    return (
      <div key={key} {...editable(block, blockPath, 'container', 'flex items-center gap-4')}>
        {block.items.map((item, idx) => (
          <a
            key={idx}
            href={item.href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-5 w-5 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label={item.title || 'Social'}
            dangerouslySetInnerHTML={{ __html: item.icon || '' }}
          />
        ))}
      </div>
    );
  }

  if (block.type === 'statsRow' && block.statItems && block.statItems.length > 0) {
    const justifyClass = block.align === 'left' ? 'justify-start' : 'justify-center';
    return (
      <div key={key} className={`${alignWrapperClass(block.align)} ${maxWidthClass(block.size || 'lg')} ${alignClass(block.align)}`}>
        <div className={`flex flex-wrap items-center gap-x-8 gap-y-3 ${justifyClass}`}>
          {block.statItems.map((stat, idx) => (
            <div key={idx} className="inline-flex items-center gap-2 text-sm">
              {stat.icon ? (
                isSvgMarkup(stat.icon) ? (
                  <span
                    className="inline-flex h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: stat.icon }}
                  />
                ) : (
                  <span>{stat.icon}</span>
                )
              ) : null}
              {stat.value ? <span className="font-semibold text-foreground">{stat.value}</span> : null}
              {stat.label ? <span className="text-muted-foreground">{stat.label}</span> : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'faqList' && block.faqItems && block.faqItems.length > 0) {
    return (
      <div key={key} className={`mx-auto ${maxWidthClass(block.size || 'lg')}`}>
        <div className="space-y-3">
          {block.faqItems.map((item, idx) => (
            <details key={idx} className="group rounded-xl border border-border bg-card px-6 py-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 ease-in-out group-open:rotate-180 group-open:bg-primary/10 group-open:text-primary"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{
                    __html:
                      "<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'></path></svg>",
                  }}
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'postGrid' && block.postItems && block.postItems.length > 0) {
    return (
      <div key={key} className={`mx-auto ${maxWidthClass(block.size || 'lg')}`}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {block.postItems.map((post, idx) => (
            <article key={idx} className="group rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30">
              {post.image ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image src={post.image} alt={post.alt || post.title || 'Post image'} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
              ) : null}
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {post.category ? (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                      {post.category}
                    </span>
                  ) : null}
                  {post.date ? <time dateTime={post.date}>{post.date}</time> : null}
                </div>
                {post.title ? <h3 className="mt-3 text-lg font-semibold text-foreground leading-snug">{post.title}</h3> : null}
                {post.excerpt ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{post.excerpt}</p> : null}
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                    {post.author ? <span>{post.author}</span> : null}
                    {post.author ? <span aria-hidden="true">|</span> : null}
                    <span>5 min read</span>
                  </div>
                  {post.href ? (
                    <Link href={post.href} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline transition-colors">
                      {post.readMore || 'Read article'}
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'divider') return <div key={key} className="mx-auto max-w-6xl border-t border-border" />;
  if (block.type === 'spacer') return <div key={key} className={block.size === 'lg' ? 'h-24' : block.size === 'sm' ? 'h-8' : 'h-14'} />;

  return null;
}

export default function Blocks({ data, dataPath }: { data: BlocksData; dataPath?: string }) {
  if (!data) return null;

  const basePath = dataPath || 'sections.blocks';
  const blocks = (data.blocks || []).filter((b) => b.enabled !== false);

  return (
    <section
      data-section="blocks"
      {...editable(data.container, `${basePath}.container`, 'section', 'relative py-20 sm:py-24 lg:py-28')}
    >
      <div
        {...editable(
          data.innerWrapper,
          `${basePath}.innerWrapper`,
          'container',
          'container mx-auto px-6 lg:px-8 space-y-10'
        )}
      >
        {renderBlocks(blocks, `${basePath}.blocks`)}
      </div>
    </section>
  );
}
