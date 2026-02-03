// src/context/ConfigContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import defaultConfig from '@/data/config.json';

const ConfigContext = createContext(defaultConfig);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    // 1. Listen for the message (Theirs is robust, let's use it)
    const handler = (event: MessageEvent) => {
      if (event.data?.type !== 'WEBONAI_CONFIG_UPDATE') return;
      setConfig(event.data.payload);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // 2. AUTO-UPDATE CSS VARIABLES (Theirs is better here)
  useEffect(() => {
    const root = document.documentElement;
    // We need to dig into 'theme' because our config is nested
    const theme = config.theme || {}; 
    
    if (theme.primary) root.style.setProperty('--primary', theme.primary);
    if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
    if (theme.accent) root.style.setProperty('--accent', theme.accent);
    // Add fonts and radius...
    if (theme.radius) root.style.setProperty('--radius', theme.radius);
  }, [config]);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);