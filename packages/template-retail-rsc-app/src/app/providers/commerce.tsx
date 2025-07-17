import {type PropsWithChildren} from 'react'
import CommerceServerProvider from './commerce.server'
import CommerceClientProvider from './commerce.client'
import type {SessionData} from '@/lib/api/commerce-api'

export type CommerceContext = {
    session: SessionData
}

/**
 * Isomorphic provider for the commerce context.
 */
export default function CommerceProvider({
    children,
    context
}: PropsWithChildren<{context: CommerceContext}>) {
    return (
        <CommerceServerProvider context={context}>
            <CommerceClientProvider context={context}>{children}</CommerceClientProvider>
        </CommerceServerProvider>
    )
}
