'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import defaultConfigFile from '../data/config.json';

// 1. DEFINE THE TYPES
export interface SiteConfig {
  meta: {
    siteName: string;
    description?: string;
    favicon?: string;
  };
  theme: {
    primary: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
    fontHeading?: string;
    fontBody?: string;
    radius?: string;
    mode?: string;
  };
  layout: {
    order: string[];
  };
  sections: Record<string, any>; // Changed to any to allow flexible section types
  logo?: {
    src?: string;
    text?: string;
    styles?: Record<string, string | number>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export const CONFIG_MESSAGE_TYPE = 'WEBONAI_CONFIG_UPDATE';
export const SELECT_ELEMENT_MESSAGE_TYPE = 'WEBONAI_SELECT_ELEMENT';

// Fix for TypeScript error regarding <style jsx>
declare module 'react' {
  interface StyleHTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

// 2. TYPE-SAFE DEFAULTS
const SAFE_DEFAULTS: SiteConfig = {
  meta: { siteName: "Loading..." },
  theme: { primary: "#000000" },
  layout: { order: [] },
  sections: {}
};

// Ensure defaultConfigFile is treated as SiteConfig
const initialConfig: SiteConfig = (defaultConfigFile as unknown as SiteConfig) || SAFE_DEFAULTS;

const ConfigContext = createContext<SiteConfig>(initialConfig);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (
        event.data?.type === CONFIG_MESSAGE_TYPE && 
        event.data?.payload &&
        Object.keys(event.data.payload).length > 0 
      ) {
        setConfig(event.data.payload as SiteConfig);
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
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

        document.querySelectorAll('[data-editing="true"]').forEach((el) => {
           el.removeAttribute('data-editing');
        });
        target.setAttribute('data-editing', 'true');
      }
    };

    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      <style jsx global>{`
        [data-editing="true"] {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          cursor: pointer;
        }
        [data-path]:hover {
          outline: 1px dashed #94a3b8;
          cursor: pointer;
        }
      `}</style>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = (): SiteConfig => useContext(ConfigContext);