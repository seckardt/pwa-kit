'use client'

import {Link} from 'react-router'
import type {ShopperProductsTypes} from 'commerce-sdk-isomorphic'

interface NavigationDropdownProps {
    category: ShopperProductsTypes.Category
    isLoading?: boolean
}

interface CategoryLinksProps {
    category: ShopperProductsTypes.Category
}

const CategoryLinks = ({category}: CategoryLinksProps) => {
    const {id, name, categories: subCategories} = category

    const categoryLink = {
        href: `/category/${id}`,
        text: name,
        className: 'text-md mb-2 font-bold'
    }

    const subCategoryLinks = subCategories
        ? subCategories
              .filter((sub) => sub.c_showInMenu)
              .map((subCategory) => ({
                  href: `/category/${subCategory.id}`,
                  text: subCategory.name,
                  className: 'text-md py-3 text-gray-700 hover:text-gray-900'
              }))
        : []

    return (
        <div className="min-w-0 flex-[0_0_21%]">
            <Link
                to={categoryLink.href}
                className={`block ${categoryLink.className}`}
            >
                {categoryLink.text}
            </Link>

            {subCategoryLinks.map((link) => (
                <Link
                    key={link.href}
                    to={link.href}
                    className={`block ${link.className} hover:no-underline`}
                >
                    {link.text}
                </Link>
            ))}
        </div>
    )
}

const LoadingIndicator = () => (
    <div className="min-w-0 flex-[0_0_21%] animate-pulse">
        <div className="h-5 bg-gray-200 rounded mb-2"></div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded"></div>
            <div className="h-4 bg-gray-100 rounded"></div>
            <div className="h-4 bg-gray-100 rounded"></div>
        </div>
    </div>
)

export default function NavigationDesktopDropdown({category, isLoading = false}: NavigationDropdownProps) {
    const subCategories = category.categories?.filter((cat) => cat.c_showInMenu) || []
    const maxColumns = 5
    const columnsToShow = subCategories.length > maxColumns ? maxColumns : subCategories.length

    if (subCategories.length === 0 && !isLoading) {
        return null
    }

    return (
        <div
            className="fixed left-0 right-0 z-50 bg-white shadow-xl"
            style={{top: 'var(--header-height, 65px)'}}
        >
            <div className="w-full pt-3 pr-4 pb-4 pl-4">
                <div className="max-w-screen-2xl mx-auto pt-0 pb-8">
                    <div
                        className="grid gap-8 justify-start ml-[68px] xl:ml-24"
                        style={{
                            gridTemplateColumns: `repeat(${Math.max(columnsToShow, 2)}, minmax(0, 21%))`
                        }}
                    >
                        {isLoading ? (
                            // Show loading placeholders
                            Array.from({length: Math.max(columnsToShow, 2)}).map((_, index) => (
                                <LoadingIndicator key={`loading-${index}`} />
                            ))
                        ) : (
                            // Show actual subcategories
                            subCategories.map((subCategory) => (
                                <CategoryLinks
                                    key={subCategory.id}
                                    category={subCategory}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
