'use client'

import {lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useLocation} from 'react-router'
import type {ShopperProductsTypes} from 'commerce-sdk-isomorphic'
import {useNavSubCategories} from '@/lib/api/commerce-client.client'
import NavigationDesktopItem from './desktop-item'

const NavigationDesktopDropdown = lazy(() => import('./desktop-dropdown'))

export default function NavigationDesktopClient({
    category
}: {
    category: ShopperProductsTypes.Category
}) {
    const location = useLocation()
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
    const activeCategoryRef = useRef<ShopperProductsTypes.Category | null>(null)
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const rootCategories = useMemo(() => {
        // Filter categories that should show in menu
        return (category?.categories ?? []).filter((c) => c.c_showInMenu)
    }, [category])

    // Fetch detailed subcategories for the hovered category
    const {
        data: detailedSubCategories,
        isLoading: isLoadingSubCategories,
        isFetching: isFetchingSubCategories
    } = useNavSubCategories(
        activeCategoryId,
        activeCategoryRef.current?.onlineSubCategoriesCount > 0
    )

    activeCategoryRef.current = useMemo(() => {
        const baseCategory = activeCategoryId
            ? rootCategories.find((cat) => cat.id === activeCategoryId)
            : undefined
        if (baseCategory && detailedSubCategories) {
            // If we have detailed subcategories for this category, use them
            return {
                ...baseCategory,
                ...detailedSubCategories,
                categories: detailedSubCategories.categories || baseCategory.categories
            }
        }
        return baseCategory ?? null
    }, [activeCategoryId, rootCategories, detailedSubCategories])

    const clearCloseTimeout = useCallback((): void => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
    }, [])

    const setCloseTimeout = useCallback(
        (categoryId: string | null = null): void => {
            clearCloseTimeout()
            closeTimeoutRef.current = setTimeout(() => {
                setActiveCategoryId(categoryId)
                closeTimeoutRef.current = null
            }, 150)
        },
        [clearCloseTimeout]
    )

    const handleMouseEnter = useCallback(
        (categoryId: string) => {
            setCloseTimeout(categoryId)
        },
        [setCloseTimeout]
    )

    const handleNavigationLeave = useCallback(() => {
        setCloseTimeout()
    }, [setCloseTimeout])

    const handleDropdownEnter = useCallback((): void => {
        clearCloseTimeout()
    }, [clearCloseTimeout])

    const handleDropdownLeave = useCallback(() => {
        setCloseTimeout()
    }, [setCloseTimeout])

    useEffect(() => {
        handleNavigationLeave()
    }, [location, handleNavigationLeave])

    return (
        <div className="hidden lg:flex relative" onMouseLeave={handleNavigationLeave}>
            <nav className="flex" aria-label="Main navigation" role="navigation">
                <div className="flex flex-row items-start justify-start pl-4 w-full min-w-xs">
                    <div className="flex flex-row whitespace-nowrap flex-wrap space-x-0">
                        {rootCategories.map((category) => (
                            <NavigationDesktopItem
                                key={category.id}
                                category={category}
                                isActive={activeCategoryId === category.id}
                                onMouseEnter={() => handleMouseEnter(category.id)}
                            />
                        ))}
                    </div>
                </div>
            </nav>

            {/* Navigation dropdown */}
            {activeCategoryRef.current && activeCategoryRef.current.onlineSubCategoriesCount > 0 ? (
                <div onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
                    <Suspense fallback={<></>}>
                        <NavigationDesktopDropdown
                            category={activeCategoryRef.current}
                            isLoading={isLoadingSubCategories || isFetchingSubCategories}
                        />
                    </Suspense>
                </div>
            ) : null}
        </div>
    )
}
