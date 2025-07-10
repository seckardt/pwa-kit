'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <Container maxW="container.xl" py={{ base: 8, lg: 12 }}>
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to PWA Kit RSC
          </Heading>
          <Text fontSize="lg" opacity={0.8}>
            This is the migrated PWA Kit retail template using React Server
            Components (RSC) with Vite and Chakra UI. It demonstrates how to 
            set up a modern e-commerce application with RSC patterns.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
