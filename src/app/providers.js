'use client'

import UserProvider from '@/context/userContext'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'rgb(53, 53, 53)',
      },
    },
  },
});

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={customTheme}>
        <UserProvider>
          {children}
        </UserProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}