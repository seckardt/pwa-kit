import 'client-only'
import {useContext} from 'react'
import {useQuery} from '@tanstack/react-query'
import {CommerceClientContext} from '@/app/providers/commerce.client'
import {createNavCategoriesQuery, createNavSubCategoriesQuery} from '@/lib/api/commerce-client'

export const useNavCategories = () => {
    const {session} = useContext(CommerceClientContext)
    return useQuery(
        createNavCategoriesQuery(session, {
            ids: 'root',
            levels: 3
        })
    )
}

export const useNavSubCategories = (categoryId: string | null, enabled = true) => {
    const {session} = useContext(CommerceClientContext)
    return useQuery({
        ...createNavSubCategoriesQuery(session, {
            id: categoryId,
            levels: 2 // Fetch 2 additional levels of subcategories
        }),
        enabled: enabled && !!categoryId,
    })
}
