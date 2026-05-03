"use client";

import { EStatus } from "@/types";
import { Badge, Card, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";
import { STATUS_TITLES } from "../config/status-titles";
import { STATUS_COLORS } from "../config/status-colors";
import { useRouter } from "next/navigation";

type TTodoCardProps = {
  id: number;
  title: string;
  status: EStatus;
  description?: string;
  actionSlots?: ReactNode[];
};

export const TodoCard = ({
  id,
  title,
  status,
  description,
  actionSlots,
}: TTodoCardProps) => {
  const router = useRouter();

  return (
    <Card w="100%" padding={16} bg="#F5F5F5" radius="md" onClick={() => router.push(`/edit/${id}`)}>
      <Stack w="100%" gap="md">
        <Group justify="between" w="100%">
          <Title order={4}>{title}</Title>
          <Group gap="sm">{actionSlots?.map((action) => action)}</Group>
        </Group>
        <Text size="md" c="gray">
          {description}
        </Text>
        <Divider />
        <Badge color={STATUS_COLORS[status as EStatus]}>{STATUS_TITLES[status as EStatus]}</Badge>
      </Stack>
    </Card>
  );
};
