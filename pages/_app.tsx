import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import NavigationBar from "@/components/NavigationBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <NavigationBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
