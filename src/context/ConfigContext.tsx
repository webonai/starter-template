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

const initialConfig: SiteConfig = (defaultConfigFile as unknown as SiteConfig);
const ConfigContext = createContext<SiteConfig>(initialConfig);

export function ConfigProvider({ children, initialPosts }: { children: React.ReactNode; initialPosts?: any[] }) {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const baseConfig = (defaultConfigFile as unknown as SiteConfig);
    if (initialPosts && initialPosts.length > 0) {
        const blogSection = baseConfig?.sections?.blog ?? {};
        return {
            ...baseConfig,
            sections: {
                ...baseConfig.sections,
                blog: {
                    ...(blogSection as Record<string, unknown>),
                    posts: initialPosts
                }
            }
        };
    }
    return baseConfig;
  });

  const [isEditMode, setIsEditMode] = useState(false);

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