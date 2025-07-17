import {type FetchQueryOptions, QueryClient, isServer} from '@tanstack/react-query'
import type {ShopperProductsTypes} from 'commerce-sdk-isomorphic'
import {ShopperBaskets, ShopperProducts, ShopperSearch} from 'commerce-sdk-isomorphic'
import {getApiConfig, type SessionData} from './commerce-api'

// Base client factory with authentication
async function createClient<T>(
    ClientClass: new (config: any) => T,
    session: SessionData
): Promise<T> {
    const {clientId, organizationId, shortCode, siteId, currency, locale, proxy} = getApiConfig()
    return new ClientClass({
        parameters: {
            clientId,
            organizationId,
            shortCode,
            siteId,
            currency,
            locale
        },
        headers: {
            authorization: `Bearer ${session.accessToken}`
        },
        throwOnBadResponse: true,
        proxy
    })
}

export const createShopperProductsClient = (session: SessionData) =>
    createClient(ShopperProducts, session)

export const createShopperBasketClient = (session: SessionData) =>
    createClient(ShopperBaskets, session)

export const createShopperSearchClient = (session: SessionData) =>
    createClient(ShopperSearch, session)

let queryClient: QueryClient | undefined = undefined

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false
            }
        }
    })
}

export function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    }
    if (!queryClient) {
        queryClient = makeQueryClient()
    }
    return queryClient
}

export const createNavCategoriesQuery = (
    session: SessionData,
    parameters: Record<string, any>
): FetchQueryOptions<ShopperProductsTypes.Category> => {
    return {
        queryKey: ['navCategories', parameters],
        queryFn: async (): Promise<ShopperProductsTypes.Category> => {
            const client = await createShopperProductsClient(session)
            return client.getCategory({parameters})
        }
    }
}

export const createNavSubCategoriesQuery = (
    session: SessionData,
    parameters: Record<string, any>
): FetchQueryOptions<ShopperProductsTypes.Category> => {
    return {
        queryKey: ['subCategories', parameters],
        queryFn: async (): Promise<ShopperProductsTypes.Category> => {
            const client = await createShopperProductsClient(session)
            return client.getCategory({parameters})
        }
    }
}
