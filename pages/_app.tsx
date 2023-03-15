import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";

import NavigationBar from "@/components/NavigationBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NextNProgress options={{ showSpinner: false }} />
      <NavigationBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
