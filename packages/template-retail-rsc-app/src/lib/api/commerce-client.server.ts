import 'server-only'

import {dehydrate, type DehydratedState} from '@tanstack/react-query'
import type {ShopperProductsTypes} from 'commerce-sdk-isomorphic'
import type {SessionData} from '@/lib/api/commerce-api'
import {createNavCategoriesQuery, getQueryClient} from '@/lib/api/commerce-client'

export function fetchNavCategories(
    session: SessionData
): [() => Promise<ShopperProductsTypes.Category>, () => DehydratedState] {
    const parameters = {
        id: 'root',
        levels: 1
    }
    const queryClient = getQueryClient()
    const query = createNavCategoriesQuery(session, parameters)
    return [
        (): Promise<ShopperProductsTypes.Category> => queryClient.fetchQuery(query),
        () => dehydrate(queryClient)
    ]
}
