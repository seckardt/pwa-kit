'use client'

import {
  Box,
  Flex,
  HStack,
  Link,
  Container,
  Stack,
  Spinner,
  Center
} from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { useState } from 'react'

// Mock category data structure - in real app this would come from Commerce SDK
interface Category {
  id: string
  name: string
  categories?: Category[]
  c_showInMenu?: boolean
}

interface NavigationProps {
  categories?: Category[]
  onCategoryClick?: (categoryId: string) => void
}

// Component for subcategory links group
const CategoryLinksList = ({ 
  category, 
  onCategoryClick 
}: { 
  category: Category
  onCategoryClick?: (categoryId: string) => void 
}) => {
  const subcategories = category.categories || []
  
  return (
    <Stack gap={2}>
      {/* Main category header */}
      <Link
        href={`/category/${category.id}`}
        fontSize="md"
        fontWeight="semibold"
        _hover={{ color: 'blue.600', textDecoration: 'none' }}
        marginBottom={2}
        onClick={(e) => {
          e.preventDefault()
          onCategoryClick?.(category.id)
        }}
      >
        {category.name}
      </Link>
      
      {/* Subcategories */}
      {subcategories.map((subcat) => (
        <Link
          key={subcat.id}
          href={`/category/${subcat.id}`}
          fontSize="md"
          opacity={0.8}
          _hover={{ color: 'blue.600', textDecoration: 'none' }}
          paddingY={1.5}
          onClick={(e) => {
            e.preventDefault()
            onCategoryClick?.(subcat.id)
          }}
        >
          {subcat.name}
        </Link>
      ))}
    </Stack>
  )
}

// Full-width dropdown content for subcategories
const NavigationDropdown = ({ 
  category, 
  onCategoryClick,
  onClose 
}: { 
  category: Category
  onCategoryClick?: (categoryId: string) => void
  onClose: () => void
}) => {
  const subcategories = category.categories || []
  
  return (
    <Box
      position="fixed"
      top="16" // Height of header (h-16 = 64px = 4rem)
      left={0}
      right={0}
      width="100vw"
      bg="white"
      boxShadow="lg"
      borderTop="1px"
      borderColor="border.subtle"
      zIndex={50}
      onMouseLeave={onClose}
    >
      <Container maxW="7xl" mx="auto" py={8}>
        <Flex 
          gap={12}
          justify="flex-start"
          wrap="wrap"
          align="flex-start"
        >
          {subcategories.map((subcat, index) => (
            <Box key={subcat.id} minW="200px" flex="0 0 auto">
              <CategoryLinksList
                category={subcat}
                onCategoryClick={onCategoryClick}
              />
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  )
}

// Individual category trigger with popover
const CategoryTrigger = ({ 
  category, 
  onCategoryClick 
}: { 
  category: Category
  onCategoryClick?: (categoryId: string) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasSubcategories = category.categories && category.categories.length > 0

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  if (!hasSubcategories) {
    // Simple link for categories without subcategories
    return (
      <Link
        href={`/category/${category.id}`}
        fontSize="md"
        fontWeight="bold"
        color="black"
        _hover={{ textDecoration: 'underline' }}
        paddingX={4}
        paddingY={2}
        onClick={(e) => {
          e.preventDefault()
          onCategoryClick?.(category.id)
        }}
      >
        {category.name}
      </Link>
    )
  }

  return (
    <Box position="relative" onMouseLeave={handleClose}>
      {/* Category trigger */}
      <HStack
        gap={1}
        cursor="pointer"
        onMouseEnter={handleOpen}
        paddingX={4}
        paddingY={2}
      >
        <Link
          href={`/category/${category.id}`}
          fontSize="md"
          fontWeight="bold"
          color="black"
          _hover={{ textDecoration: 'underline' }}
          onClick={(e) => {
            e.preventDefault()
            onCategoryClick?.(category.id)
          }}
        >
          {category.name}
        </Link>
        <Box 
          as={FiChevronDown} 
          boxSize="14px" 
          color="black"
          transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
          transition="transform 0.2s"
        />
      </HStack>
      
      {/* Dropdown content */}
      {isOpen && (
        <NavigationDropdown
          category={category}
          onCategoryClick={onCategoryClick}
          onClose={handleClose}
        />
      )}
    </Box>
  )
}

const Navigation = ({ categories = [], onCategoryClick }: NavigationProps) => {
  // Filter categories that should be shown in menu
  const visibleCategories = categories.filter(category => 
    category.c_showInMenu !== false
  )

  if (!visibleCategories.length) {
    return (
      <Center p={4}>
        <Spinner size="sm" />
      </Center>
    )
  }

  return (
    <Box as="nav" role="navigation" aria-label="Main navigation" position="relative">
      <HStack gap={0} align="center" justify="center">
        {visibleCategories.map((category) => (
          <CategoryTrigger
            key={category.id}
            category={category}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </HStack>
    </Box>
  )
}

export default Navigation 