'use client';

import Image from 'next/image';
import Link from 'next/link';
import { editable } from '@/lib/editable';

type LinkItem = {
  text?: string;
  href?: string;
  className?: string;
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
    | 'formRow'
    | 'linkList';
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
  brandImageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
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
            'text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground'
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
        <div className={`flex flex-wrap items-center gap-3 ${justifyClass}`}>
          {block.buttons.map((button, btnIndex) => {
            const buttonClass =
              button.variant === 'secondary'
                ? 'rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors'
                : 'rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors';
            return (
              <Link key={btnIndex} {...editable(button, `${blockPath}.buttons.${btnIndex}`, 'button', buttonClass)}>
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
            <article key={itemIndex} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              {item.title ? <h3 className="text-xl font-semibold text-card-foreground">{item.title}</h3> : null}
              {item.text ? <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p> : null}
              {item.href ? (
                <Link href={item.href} className="mt-4 inline-flex text-sm font-medium text-primary hover:underline">
                  Learn more
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
          {block.brandImageSrc ? <img src={block.brandImageSrc} alt={block.brandImageAlt || block.brandText || 'Brand'} className="h-8 w-auto" /> : null}
          {block.brandText ? <span className="text-sm font-semibold tracking-[0.12em] uppercase">{block.brandText}</span> : null}
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {block.links?.map((link, linkIndex) => (
            <Link key={linkIndex} href={link.href || '#'} className={link.className || 'text-xs uppercase tracking-[0.14em] text-current/90 hover:text-current'}>
              {link.text}
            </Link>
          ))}
          {block.ctaText ? (
            <Link href={block.ctaHref || '#'} className="rounded-full border border-current/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-white/10">
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
              className: 'h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground',
            },
            `${blockPath}.input`,
            'input',
            ''
          )}
        />
        {block.buttonHref ? (
          <Link href={block.buttonHref} className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 inline-flex items-center">
            {block.buttonText || 'Submit'}
          </Link>
        ) : (
          <button type="submit" className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
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
          <Link key={linkIndex} href={link.href || '#'} className={link.className || 'text-sm text-current/90 hover:text-current'}>
            {link.text}
          </Link>
        ))}
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
