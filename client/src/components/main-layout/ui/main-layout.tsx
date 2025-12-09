"use client";

import { AppShell, Button, Group, Stack, Text } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import styles from "./main-layout.module.css";

type TMainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: TMainLayoutProps) => {
  const pinned = useHeadroom({ fixedAt: 120 });
  const router = useRouter();

  return (
    <AppShell
      header={{ height: 64, collapsed: !pinned, offset: false }}
      className={styles.appShell}
    >
      <AppShell.Header pos="sticky" className={styles.headerContainer}>
        <Stack align="center" justify="center" maw={1280} w="100%" p={16}>
          <Group justify="space-between" w="100%">
            <Link href="/" className={styles.noUnderline}>
              <Text fz={28} c="dark" fw={700}>
                GRPC TODOS
              </Text>
            </Link>
            <Button onClick={() => router.push("/create")}>Создать +</Button>
          </Group>
        </Stack>
      </AppShell.Header>
      <AppShell.Main className={styles.mainContent}>{children}</AppShell.Main>
    </AppShell>
  );
};
