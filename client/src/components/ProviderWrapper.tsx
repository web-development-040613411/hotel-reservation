'use client';
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function ProviderWrapper(prop: { children: React.ReactNode }) {
   return (
      <>
         <QueryClientProvider client={new QueryClient()}>
            {prop.children}
         </QueryClientProvider>
      </>
   );
}

export default ProviderWrapper;
