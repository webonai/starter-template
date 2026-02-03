'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import defaultConfig from '../data/config.json';

const ConfigContext = createContext(defaultConfig);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type !== 'WEBONAI_CONFIG_UPDATE') return;
      setConfig(event.data.payload);
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