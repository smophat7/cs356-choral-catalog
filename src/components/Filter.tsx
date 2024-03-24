import React from "react";

import { Box, Text, Title } from "@mantine/core";

interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Filter: React.FC<Props> = ({ title, subtitle, children }) => (
  <Box>
    <Title order={4}>{title}</Title>
    <Text size="sm" mb={5}>
      {subtitle}
    </Text>
    {children}
  </Box>
);

export default Filter;
