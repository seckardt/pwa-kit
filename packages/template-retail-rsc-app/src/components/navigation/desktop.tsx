import {useServerContext} from '@/lib/serverContext'
import {fetchNavCategories} from '@/lib/api/commerce-client.server'
import {CommerceServerContext} from '@/app/providers/commerce.server'
import HydratedQueryProvider from '@/app/providers/hydrated-query'
import NavigationDesktopClient from './desktop.client'

export default async function NavigationDesktop() {
    const context = useServerContext(CommerceServerContext)
    if (!context?.session) {
        throw new Error('Unexpected State: No commerce context provided.')
    }

    const [resolve, dehydrate] = fetchNavCategories(context.session)
    const category = await resolve()
    const state = dehydrate()

    return (
        <HydratedQueryProvider state={state}>
            <NavigationDesktopClient category={category} />
        </HydratedQueryProvider>
    )
}
