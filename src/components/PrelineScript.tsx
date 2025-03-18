'use client';

import { useEffect } from 'react';

export default function PrelineScript() {
  useEffect(() => {
    // Dynamically import Preline only on the client side
    const loadPreline = async () => {
      try {
        await import('preline/preline');
      } catch (error) {
        console.error('Error loading Preline:', error);
      }
    };
    
    loadPreline();
  }, []);

  return null;
} 