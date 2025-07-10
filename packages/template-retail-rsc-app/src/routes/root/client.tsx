"use client";

import {
  Box,
  Container,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';
import {
  isRouteErrorResponse,
  useNavigation,
  useRouteError,
} from "react-router";
import Header from "../../components/header";
import Navigation from "../../components/navigation";

// Mock category data - in real app this would come from Commerce SDK
const mockCategories = [
  {
    id: "womens",
    name: "Women's",
    c_showInMenu: true,
    categories: [
      { 
        id: "womens-clothing", 
        name: "Clothing", 
        c_showInMenu: true,
        categories: [
          { id: "womens-dresses", name: "Dresses", c_showInMenu: true },
          { id: "womens-tops", name: "Tops & Blouses", c_showInMenu: true },
          { id: "womens-pants", name: "Pants & Jeans", c_showInMenu: true },
          { id: "womens-outerwear", name: "Outerwear", c_showInMenu: true },
        ]
      },
      { 
        id: "womens-shoes", 
        name: "Shoes", 
        c_showInMenu: true,
        categories: [
          { id: "womens-heels", name: "Heels", c_showInMenu: true },
          { id: "womens-flats", name: "Flats", c_showInMenu: true },
          { id: "womens-sneakers", name: "Sneakers", c_showInMenu: true },
          { id: "womens-boots", name: "Boots", c_showInMenu: true },
        ]
      },
      { 
        id: "womens-accessories", 
        name: "Accessories", 
        c_showInMenu: true,
        categories: [
          { id: "womens-handbags", name: "Handbags", c_showInMenu: true },
          { id: "womens-jewelry", name: "Jewelry", c_showInMenu: true },
          { id: "womens-scarves", name: "Scarves", c_showInMenu: true },
        ]
      },
    ]
  },
  {
    id: "mens",
    name: "Men's",
    c_showInMenu: true,
    categories: [
      { 
        id: "mens-clothing", 
        name: "Clothing", 
        c_showInMenu: true,
        categories: [
          { id: "mens-shirts", name: "Shirts", c_showInMenu: true },
          { id: "mens-pants", name: "Pants & Jeans", c_showInMenu: true },
          { id: "mens-suits", name: "Suits", c_showInMenu: true },
          { id: "mens-outerwear", name: "Outerwear", c_showInMenu: true },
        ]
      },
      { 
        id: "mens-shoes", 
        name: "Shoes", 
        c_showInMenu: true,
        categories: [
          { id: "mens-dress-shoes", name: "Dress Shoes", c_showInMenu: true },
          { id: "mens-sneakers", name: "Sneakers", c_showInMenu: true },
          { id: "mens-boots", name: "Boots", c_showInMenu: true },
        ]
      },
    ]
  },
  {
    id: "electronics",
    name: "Electronics",
    c_showInMenu: true,
    categories: [
      {
        id: "phones-tablets",
        name: "Phones & Tablets",
        c_showInMenu: true,
        categories: [
          { id: "smartphones", name: "Smartphones", c_showInMenu: true },
          { id: "tablets", name: "Tablets", c_showInMenu: true },
          { id: "phone-accessories", name: "Accessories", c_showInMenu: true },
        ]
      },
      {
        id: "computers",
        name: "Computers",
        c_showInMenu: true,
        categories: [
          { id: "laptops", name: "Laptops", c_showInMenu: true },
          { id: "desktops", name: "Desktops", c_showInMenu: true },
          { id: "monitors", name: "Monitors", c_showInMenu: true },
        ]
      }
    ]
  },
  {
    id: "home",
    name: "Home & Garden",
    c_showInMenu: true,
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    c_showInMenu: true,
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();

  const handleCategoryClick = (categoryId: string) => {
    console.log('Category clicked:', categoryId);
    // In real app, this would navigate to category page
  };

  const handleMenuClick = () => {
    console.log('Mobile menu clicked');
  };

  const handleLogoClick = () => {
    console.log('Logo clicked');
  };

  const handleMyAccountClick = () => {
    console.log('My account clicked');
  };

  const handleMyCartClick = () => {
    console.log('My cart clicked');
  };

  const handleWishlistClick = () => {
    console.log('Wishlist clicked');
  };

  const handleStoreLocatorClick = () => {
    console.log('Store locator clicked');
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>
        <Header
          onMenuClick={handleMenuClick}
          onLogoClick={handleLogoClick}
          onMyAccountClick={handleMyAccountClick}
          onMyCartClick={handleMyCartClick}
          onWishlistClick={handleWishlistClick}
          onStoreLocatorClick={handleStoreLocatorClick}
        >
          <Navigation 
            categories={mockCategories}
            onCategoryClick={handleCategoryClick}
          />
        </Header>

        {navigation.state !== "idle" && (
          <Box position="fixed" top="4" right="4" zIndex={20}>
            <HStack gap={2} bg="white" p={2} borderRadius="md" boxShadow="sm">
              <Spinner size="sm" />
              <Text fontSize="sm">Loading...</Text>
            </HStack>
          </Box>
        )}

        {children}
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = status === 404 ? "Page not found." : error.statusText || message;
  }

  return (
    <Container maxW="container.xl" py={{ base: 8, lg: 12 }}>
      <Box textAlign="center">
        <Text fontSize="6xl" fontWeight="bold" color="red.500">
          {status}
        </Text>
        <Text fontSize="xl" opacity={0.8}>
          {message}
        </Text>
      </Box>
    </Container>
  );
}
