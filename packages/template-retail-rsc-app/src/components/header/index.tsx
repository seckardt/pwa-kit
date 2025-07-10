'use client'

import {
  Box,
  Flex,
  IconButton,
  Badge,
  Input
} from '@chakra-ui/react'
import { 
  FiUser, 
  FiShoppingCart, 
  FiMenu, 
  FiSearch, 
  FiHeart, 
  FiMapPin 
} from 'react-icons/fi'
import { type ReactNode, useState } from 'react'
import MobileDrawer from '../mobile-drawer'

// Brand logo placeholder - in real app this would be imported from assets
const BrandLogo = () => (
  <Box
    width="120px"
    height="40px"
    bg="gray.700"
    borderRadius="md"
    display="flex"
    alignItems="center"
    justifyContent="center"
    color="white"
    fontSize="sm"
    fontWeight="bold"
  >
    BRAND
  </Box>
)

// Search component
const SearchBar = () => {
  return (
    <Box maxW="md" position="relative">
      <Input
        placeholder="Search for products..."
        bg="white"
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          borderColor: 'blue.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
        }}
        pr="2.5rem"
      />
      <Box
        position="absolute"
        right="3"
        top="50%"
        transform="translateY(-50%)"
        pointerEvents="none"
      >
        <FiSearch size={16} />
      </Box>
    </Box>
  )
}

interface HeaderProps {
  children?: ReactNode
  onMenuClick?: () => void
  onLogoClick?: () => void
  onMyAccountClick?: () => void
  onMyCartClick?: () => void
  onWishlistClick?: () => void
  onStoreLocatorClick?: () => void
}

const Header = ({
  children,
  onMenuClick,
  onLogoClick,
  onMyAccountClick,
  onMyCartClick,
  onWishlistClick,
  onStoreLocatorClick
}: HeaderProps) => {
  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  
  // Mock cart items count - in real app this would come from commerce SDK
  const cartItemsCount = 3

  const handleMenuClick = () => {
    setIsMobileDrawerOpen(true)
    onMenuClick?.()
  }

  const handleMobileDrawerClose = () => {
    setIsMobileDrawerOpen(false)
  }

  return (
    <>
      <Box
        as="header"
        role="banner"
        position="sticky"
        top={0}
        zIndex={10}
        bg="white"
        boxShadow="sm"
        borderBottom="1px"
        borderColor="border.subtle"
      >
      <Box maxW="7xl" mx="auto" px={4}>
        <Flex
          align="center"
          justify="space-between"
          h={16}
          wrap="wrap"
          gap={4}
        >
          {/* Mobile menu button */}
          <IconButton
            aria-label="Open menu"
            variant="ghost"
            onClick={handleMenuClick}
            hideFrom="lg"
          >
            <FiMenu size={20} />
          </IconButton>

          {/* Logo */}
          <Box cursor="pointer" onClick={onLogoClick}>
            <BrandLogo />
          </Box>

          {/* Navigation Menu - passed as children */}
          <Box flex={1} hideBelow="lg">
            {children}
          </Box>

          {/* Search Bar - Desktop */}
          <Box hideBelow="lg">
            <SearchBar />
          </Box>

          {/* Icons */}
          <Flex align="center" gap={2}>
            <IconButton
              aria-label="My Account"
              variant="ghost"
              onClick={onMyAccountClick}
            >
              <FiUser size={20} />
            </IconButton>
            
            <IconButton
              aria-label="Wishlist"
              variant="ghost"
              onClick={onWishlistClick}
            >
              <FiHeart size={20} />
            </IconButton>
            
            <IconButton
              aria-label="Store Locator"
              variant="ghost"
              onClick={onStoreLocatorClick}
            >
              <FiMapPin size={20} />
            </IconButton>
            
            <Box position="relative">
              <IconButton
                aria-label={`My cart, ${cartItemsCount} items`}
                variant="ghost"
                onClick={onMyCartClick}
              >
                <FiShoppingCart size={20} />
              </IconButton>
              {cartItemsCount > 0 && (
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  colorScheme="red"
                  borderRadius="full"
                  minW="5"
                  h="5"
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Box>
          </Flex>
        </Flex>

        {/* Mobile Search Bar */}
        <Box pb={4} hideFrom="lg">
          <SearchBar />
        </Box>
      </Box>
    </Box>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={handleMobileDrawerClose}
        onLogoClick={onLogoClick}
      />
    </>
  )
}

export default Header 