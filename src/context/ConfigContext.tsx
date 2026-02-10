'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import defaultConfigFile from '../data/config.json';
import { SiteConfig } from '@/types/configTypes';

export const CONFIG_MESSAGE_TYPE = 'WEBONAI_CONFIG_UPDATE';
export const SELECT_ELEMENT_MESSAGE_TYPE = 'WEBONAI_SELECT_ELEMENT';

// Fix for TypeScript error regarding <style jsx>
declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}


// Ensure defaultConfigFile is treated as SiteConfig
const initialConfig: SiteConfig = (defaultConfigFile as unknown as SiteConfig);

const ConfigContext = createContext<SiteConfig>(initialConfig);

export function ConfigProvider({ children, initialPosts }: { children: React.ReactNode; initialPosts?: any[] }) {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const baseConfig = (defaultConfigFile as unknown as SiteConfig);
    if (initialPosts && initialPosts.length > 0) {
        return {
            ...baseConfig,
            sections: {
                ...baseConfig.sections,
                blog: {
                    ...baseConfig?.sections?.blog,
                    posts: initialPosts
                }
            }
        };
    }
    return baseConfig;
  });

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
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = (): SiteConfig => useContext(ConfigContext);