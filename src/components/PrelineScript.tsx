'use client';

import { useEffect } from 'react';
import 'preline/preline';

export default function PrelineScript() {
  useEffect(() => {
    import('preline/preline');
  }, []);

  return null;
} 