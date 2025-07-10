'use client'

import { useState } from 'react'
import {
  Box,
  Center,
  VStack,
  HStack,
  Text,
  Spinner,
  useBreakpointValue,
  Drawer,
  IconButton,
  Link
} from '@chakra-ui/react'
import { FaBars, FaUser, FaStore, FaChevronDown, FaChevronRight } from 'react-icons/fa'

// Mock category data structure (same as used in navigation)
const mockCategories = {
  id: 'root',
  name: 'Categories',
  c_children: [
    {
      id: 'womens',
      name: "Women's",
      c_children: [
        {
          id: 'womens-clothing',
          name: 'Clothing',
          c_children: [
            { id: 'womens-dresses', name: 'Dresses' },
            { id: 'womens-tops', name: 'Tops & Blouses' },
            { id: 'womens-sweaters', name: 'Sweaters' },
            { id: 'womens-jackets', name: 'Jackets & Coats' }
          ]
        },
        {
          id: 'womens-shoes',
          name: 'Shoes',
          c_children: [
            { id: 'womens-heels', name: 'Heels' },
            { id: 'womens-flats', name: 'Flats' },
            { id: 'womens-boots', name: 'Boots' },
            { id: 'womens-sneakers', name: 'Sneakers' }
          ]
        },
        {
          id: 'womens-accessories',
          name: 'Accessories',
          c_children: [
            { id: 'womens-bags', name: 'Handbags' },
            { id: 'womens-jewelry', name: 'Jewelry' },
            { id: 'womens-scarves', name: 'Scarves' }
          ]
        }
      ]
    },
    {
      id: 'mens',
      name: "Men's",
      c_children: [
        {
          id: 'mens-clothing',
          name: 'Clothing',
          c_children: [
            { id: 'mens-shirts', name: 'Shirts' },
            { id: 'mens-pants', name: 'Pants' },
            { id: 'mens-suits', name: 'Suits' },
            { id: 'mens-outerwear', name: 'Outerwear' }
          ]
        },
        {
          id: 'mens-shoes',
          name: 'Shoes',
          c_children: [
            { id: 'mens-dress-shoes', name: 'Dress Shoes' },
            { id: 'mens-casual-shoes', name: 'Casual Shoes' },
            { id: 'mens-boots', name: 'Boots' },
            { id: 'mens-sneakers', name: 'Sneakers' }
          ]
        }
      ]
    },
    {
      id: 'electronics',
      name: 'Electronics',
      c_children: [
        {
          id: 'computers',
          name: 'Computers',
          c_children: [
            { id: 'laptops', name: 'Laptops' },
            { id: 'desktops', name: 'Desktops' },
            { id: 'tablets', name: 'Tablets' }
          ]
        },
        {
          id: 'phones',
          name: 'Phones',
          c_children: [
            { id: 'smartphones', name: 'Smartphones' },
            { id: 'accessories', name: 'Phone Accessories' }
          ]
        }
      ]
    }
  ]
}

interface Category {
  id: string
  name: string
  c_children?: Category[]
}

// Simple collapsible category list
function CategoryList({
  categories,
  depth = 0,
  onItemClick
}: {
  categories: Category[]
  depth?: number
  onItemClick?: () => void
}) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <VStack align="stretch" gap={0}>
      {categories.map((category) => {
        const hasChildren = category.c_children && category.c_children.length > 0
        const isExpanded = expandedItems[category.id]
        const paddingLeft = depth > 0 ? 8 : 4

        return (
          <Box key={category.id}>
            {hasChildren ? (
              <>
                <HStack
                  justify="space-between"
                  p={3}
                  paddingLeft={paddingLeft}
                  cursor="pointer"
                  _hover={{ bg: 'bg.subtle' }}
                  onClick={() => toggleItem(category.id)}
                >
                  <Text
                    fontSize={depth === 0 ? 'lg' : 'md'}
                    fontWeight={depth === 0 ? 'bold' : 'medium'}
                  >
                    {category.name}
                  </Text>
                  <Box opacity={0.7}>
                    {isExpanded ? (
                      <FaChevronDown size={12} />
                    ) : (
                      <FaChevronRight size={12} />
                    )}
                  </Box>
                </HStack>

                {isExpanded && (
                  <Box>
                    {/* Show "Shop All" option for parent categories */}
                    {depth > 0 && (
                      <Link
                        href={`/category/${category.id}`}
                        display="block"
                        paddingLeft={paddingLeft + 4}
                        py={2}
                        _hover={{ bg: 'bg.subtle' }}
                        onClick={(e) => {
                          e.preventDefault()
                          onItemClick?.()
                        }}
                      >
                        <Text fontSize="md">
                          Shop All
                        </Text>
                      </Link>
                    )}

                    <CategoryList
                      categories={category.c_children || []}
                      depth={depth + 1}
                      onItemClick={onItemClick}
                    />
                  </Box>
                )}
              </>
            ) : (
              <Link
                href={`/category/${category.id}`}
                display="block"
                paddingLeft={paddingLeft}
                py={3}
                _hover={{ bg: 'bg.subtle' }}
                onClick={(e) => {
                  e.preventDefault()
                  onItemClick?.()
                }}
              >
                <Text
                  fontSize={depth === 0 ? 'lg' : 'md'}
                  fontWeight={depth === 0 ? 'bold' : 'medium'}
                >
                  {category.name}
                </Text>
              </Link>
            )}
          </Box>
        )
      })}
    </VStack>
  )
}

// Simple collapsible section
function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Box>
      <HStack
        justify="space-between"
        p={3}
        cursor="pointer"
        _hover={{ bg: 'bg.subtle' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HStack>
          {icon}
          <Text fontWeight="medium">{title}</Text>
        </HStack>
        <Box opacity={0.7}>
          {isOpen ? (
            <FaChevronDown size={12} />
          ) : (
            <FaChevronRight size={12} />
          )}
        </Box>
      </HStack>

      {isOpen && (
        <Box>{children}</Box>
      )}
    </Box>
  )
}

// Separator component
function DrawerSeparator() {
  return (
    <Box paddingTop="6" paddingBottom="6">
      <Box height="1px" bg="border.subtle" />
    </Box>
  )
}

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  onLogoClick?: () => void
}

export default function MobileDrawer({ isOpen, onClose, onLogoClick }: MobileDrawerProps) {
  const [showLoading, setShowLoading] = useState(false)
  const drawerSize = useBreakpointValue({ base: 'xs', md: 'lg' }) || 'xs'
  const isRegistered = false // This would come from auth context in real app

  const handleSignOut = async () => {
    setShowLoading(true)
    // Add sign out logic here
    await new Promise(resolve => setTimeout(resolve, 1000)) // Mock delay
    setShowLoading(false)
    onClose()
  }

  const handleLogoClick = () => {
    onLogoClick?.()
    onClose()
  }

  const handleItemClick = () => {
    onClose()
  }

  return (
        <Drawer.Root open={isOpen} onOpenChange={({ open }) => !open && onClose()} placement="start" size="xs">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header borderBottomWidth="1px">
            <HStack justify="space-between" w="full">
              <IconButton
                variant="ghost"
                aria-label="Brand Logo"
                onClick={handleLogoClick}
              >
                <FaBars />
              </IconButton>
              <Drawer.CloseTrigger asChild>
                <IconButton 
                  variant="ghost" 
                  aria-label="Close"
                  fontSize="xl"
                >
                  ×
                </IconButton>
              </Drawer.CloseTrigger>
            </HStack>
          </Drawer.Header>

          <Drawer.Body p={0}>
            <Box
              id="category-nav"
              aria-live="polite"
              aria-atomic="true"
              p={4}
            >
              {showLoading && (
                <Center p="8">
                  <Spinner size="xl" />
                </Center>
              )}

              {/* Category Navigation */}
              <Box>
                <CategoryList
                  categories={mockCategories.c_children || []}
                  onItemClick={handleItemClick}
                />
              </Box>

              <DrawerSeparator />

                              {/* Application Actions */}
                <VStack align="stretch" gap={0}>
                  {isRegistered ? (
                    <CollapsibleSection
                      title="My Account"
                      icon={<FaUser />}
                    >
                      <VStack align="stretch" gap={0}>
                      <Link
                        href="/account"
                        display="block"
                        paddingLeft={8}
                        py={2}
                        _hover={{ bg: 'bg.subtle' }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleItemClick()
                        }}
                      >
                        <Text>Account Details</Text>
                      </Link>
                      <Link
                        href="/account/orders"
                        display="block"
                        paddingLeft={8}
                        py={2}
                        onClick={(e) => {
                          e.preventDefault()
                          handleItemClick()
                        }}
                      >
                        <Text>Order History</Text>
                      </Link>
                      <Link
                        href="/account/addresses"
                        display="block"
                        paddingLeft={8}
                        py={2}
                        onClick={(e) => {
                          e.preventDefault()
                          handleItemClick()
                        }}
                      >
                        <Text>Addresses</Text>
                      </Link>
                      <Box
                        as="button"
                        paddingLeft={8}
                        py={2}
                        onClick={handleSignOut}
                        textAlign="left"
                        width="100%"
                      >
                        <Text>Sign Out</Text>
                      </Box>
                    </VStack>
                  </CollapsibleSection>
                ) : (
                  <Link
                    href="/login"
                    display="block"
                    py={3}
                    px={4}
                    _hover={{ bg: 'bg.subtle' }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleItemClick()
                    }}
                  >
                    <HStack>
                      <FaUser />
                      <Text>Sign In</Text>
                    </HStack>
                  </Link>
                )}

                {/* Store Locator */}
                <Link
                  href="/store-locator"
                  display="block"
                  py={3}
                  px={4}
                  _hover={{ bg: 'bg.subtle' }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleItemClick()
                  }}
                >
                  <HStack>
                    <FaStore />
                    <Text>Store Locator</Text>
                  </HStack>
                </Link>
              </VStack>

              <DrawerSeparator />

              {/* Support Links */}
                             <CollapsibleSection title="Customer Support">
                 <VStack align="stretch" gap={0}>
                                    <Link
                    href="/contact-us"
                    display="block"
                    paddingLeft={8}
                    py={2}
                    _hover={{ bg: 'bg.subtle' }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleItemClick()
                    }}
                  >
                      <Text>Contact Us</Text>
                    </Link>
                    <Link
                      href="/shipping-returns"
                      display="block"
                      paddingLeft={8}
                      py={2}
                      onClick={(e) => {
                        e.preventDefault()
                        handleItemClick()
                      }}
                    >
                      <Text>Shipping & Returns</Text>
                  </Link>
                </VStack>
              </CollapsibleSection>
            </Box>
          </Drawer.Body>

          <Drawer.Footer borderTopWidth="1px" p={4}>
            <Text fontSize="sm" opacity={0.7}>
              © 2025 PWA Kit
            </Text>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  )
}