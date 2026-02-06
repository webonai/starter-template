'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfigListener() {
  const router = useRouter();

  useEffect(() => {
    const handleConfigChange = () => {
      router.refresh();
    };

    window.addEventListener('WEBONAI_CONFIG_UPDATE', handleConfigChange);
    window.addEventListener('webonai_config_update', handleConfigChange);

    return () => {
      window.removeEventListener('WEBONAI_CONFIG_UPDATE', handleConfigChange);
        window.removeEventListener('webonai_config_update', handleConfigChange);
    };
  }, [router]);

  return null; 
}