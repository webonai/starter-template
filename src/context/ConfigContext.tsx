'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import defaultConfigFile from '../data/config.json';
import { SiteConfig } from '@/types/configTypes';

export const CONFIG_MESSAGE_TYPE = 'WEBONAI_CONFIG_UPDATE';
export const SELECT_ELEMENT_MESSAGE_TYPE = 'WEBONAI_SELECT_ELEMENT';
export const SET_MODE_MESSAGE_TYPE = 'WEBONAI_SET_MODE';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

const DEFAULT_CONFIG = defaultConfigFile as unknown as SiteConfig;
const DEFAULT_TEMPLATE_KEY = 'default';
const TEMPLATE_QUERY_PARAM = 'template';
const TEMPLATE_STORAGE_KEY = 'webonai_template';

function sanitizeTemplateKey(value?: string | null): string | null {
  if (!value) return null;
  const key = value.trim().toLowerCase();
  return /^[a-z0-9-]+$/.test(key) ? key : null;
}

function getRequestedTemplateKey(): string {
  if (typeof window === 'undefined') {
    return sanitizeTemplateKey(process.env.NEXT_PUBLIC_SITE_TEMPLATE || process.env.NEXT_PUBLIC_SITE_CONFIG) || DEFAULT_TEMPLATE_KEY;
  }

  const queryValue = new URLSearchParams(window.location.search).get(TEMPLATE_QUERY_PARAM);
  const storageValue = window.localStorage.getItem(TEMPLATE_STORAGE_KEY);
  const envValue = process.env.NEXT_PUBLIC_SITE_TEMPLATE || process.env.NEXT_PUBLIC_SITE_CONFIG;

  return (
    sanitizeTemplateKey(queryValue) ||
    sanitizeTemplateKey(storageValue) ||
    sanitizeTemplateKey(envValue) ||
    DEFAULT_TEMPLATE_KEY
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isObject(base) || !isObject(override)) {
    return (override as T) ?? base;
  }

  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = (base as Record<string, unknown>)[key];

    if (Array.isArray(value)) {
      result[key] = value;
      continue;
    }

    if (isObject(baseValue) && isObject(value)) {
      result[key] = deepMerge(baseValue, value);
      continue;
    }

    result[key] = value;
  }

  return result as T;
}

function withInitialPosts(config: SiteConfig, initialPosts?: any[]): SiteConfig {
  if (!initialPosts || initialPosts.length === 0) return config;

  const blogSection = config?.sections?.blog ?? {};
  return {
    ...config,
    sections: {
      ...config.sections,
      blog: {
        ...(blogSection as Record<string, unknown>),
        posts: initialPosts,
      },
    },
  };
}

async function loadTemplateConfig(templateKey: string): Promise<SiteConfig> {
  if (templateKey === DEFAULT_TEMPLATE_KEY) return DEFAULT_CONFIG;

  try {
    const response = await fetch(`/templates/${templateKey}.json`, { cache: 'no-store' });
    if (!response.ok) return DEFAULT_CONFIG;

    const override = (await response.json()) as Record<string, unknown>;
    return deepMerge(DEFAULT_CONFIG, override);
  } catch {
    return DEFAULT_CONFIG;
  }
}

const initialConfig: SiteConfig = DEFAULT_CONFIG;
const ConfigContext = createContext<SiteConfig>(initialConfig);

export function ConfigProvider({ children, initialPosts }: { children: React.ReactNode; initialPosts?: any[] }) {
  const [config, setConfig] = useState<SiteConfig>(() => withInitialPosts(DEFAULT_CONFIG, initialPosts));

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const templateKey = getRequestedTemplateKey();
      const loadedConfig = await loadTemplateConfig(templateKey);
      if (!cancelled) {
        setConfig(withInitialPosts(loadedConfig, initialPosts));
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [initialPosts]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // Config update
      if (event.data?.type === CONFIG_MESSAGE_TYPE && event.data?.payload && Object.keys(event.data.payload).length > 0) {
        setConfig(event.data.payload as SiteConfig);
      }
      
      // Edit mode toggle from visual editor
      if (event.data?.type === SET_MODE_MESSAGE_TYPE) {
        setIsEditMode(event.data.mode === 'edit');
      }
    };

    window.addEventListener('message', handler);
    
    // Auto-detect if we're in iframe
    const inIframe = window.self !== window.top;
    setIsEditMode(inIframe);
    
    // Send ready signal to parent
    if (inIframe) {
      window.parent.postMessage({ type: 'WEBONAI_READY' }, '*');
    }
    
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Only intercept in edit mode
      if (!isEditMode) return;
      
      const target = (e.target as HTMLElement).closest('[data-path]');
      
      if (target) {
        e.preventDefault();
        e.stopPropagation();

        const path = target.getAttribute('data-path');
        const type = target.getAttribute('data-type');
        const rect = target.getBoundingClientRect();

        window.parent.postMessage({
          type: SELECT_ELEMENT_MESSAGE_TYPE,
          path,
          dataType: type,
          rect: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            bottom: rect.bottom
          }
        }, '*');

        // Clear previous selection
        document.querySelectorAll('[data-editing="true"]').forEach((el) => {
           el.removeAttribute('data-editing');
        });
        target.setAttribute('data-editing', 'true');
      }
    };

    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick, true);
  }, [isEditMode]);

  return (
    <ConfigContext.Provider value={config}>
      {children}
      {isEditMode && (
        <style jsx global>{`
          [data-path] {
            cursor: pointer;
            position: relative;
            transition: outline 0.15s ease;
          }
          [data-path]:hover {
            outline: 2px dashed rgba(59, 130, 246, 0.5);
            outline-offset: 2px;
          }
          [data-editing="true"] {
            outline: 2px solid rgb(59, 130, 246) !important;
            outline-offset: 2px;
          }
        `}</style>
      )}
    </ConfigContext.Provider>
  );
}

export const useConfig = (): SiteConfig => useContext(ConfigContext);
