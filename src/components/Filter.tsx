import React from "react";

import { Box, Text } from "@mantine/core";

interface Props {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Filter: React.FC<Props> = ({ title, subtitle, children }) => (
  <Box>
    {title && <Text>{title}</Text>}
    {subtitle && (
      <Text size="sm" mb={5}>
        {subtitle}
      </Text>
    )}
    {children}
  </Box>
);

export default Filter;
