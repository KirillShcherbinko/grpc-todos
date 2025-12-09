import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "gRPC Todos",
  description: "Using gRPC for client-server communication",
};

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { MainLayout } from "@/components/main-layout";
import { ReactQueryProvider } from "./providers/react-query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <ReactQueryProvider>
          <MantineProvider>
            <MainLayout>{children}</MainLayout>
          </MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
