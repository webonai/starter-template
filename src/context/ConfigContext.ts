'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. IMPORT YOUR JSON (Double check this path matches your file structure!)
// If your file is in "src/data", use '@/data/config.json'
// If your file is in "data" (root), use '../../data/config.json' or similar
import defaultConfigFile from '@/data/config.json'; 

// 2. SAFETY FALLBACK (If the file is empty/missing, use this)
const SAFE_DEFAULTS = {
  meta: { siteName: "Fallback Site" },
  theme: { primary: "#000000" },
  layout: { order: [] },
  sections: {} // This prevents the infinite loading loop
};

// Merge imported file with safe defaults
const initialConfig = defaultConfigFile || SAFE_DEFAULTS;

const ConfigContext = createContext(initialConfig);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState(initialConfig);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // 3. FILTER MESSAGES CAREFULLY
      // Only update if it's OUR message type AND has a payload
      if (
        event.data?.type === 'WEBONAI_CONFIG_UPDATE' && 
        event.data?.payload &&
        Object.keys(event.data.payload).length > 0 // Don't accept empty objects
      ) {
        console.log("Context Received Update:", event.data.payload);
        setConfig(event.data.payload);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);