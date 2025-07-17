import type {PropsWithChildren} from 'react'
import {createServerContext} from '@/lib/serverContext'
import type {CommerceContext} from './commerce'

export const CommerceServerContext = createServerContext<CommerceContext>({} as CommerceContext)

export default function CommerceServerProvider({
    children,
    context
}: PropsWithChildren<{context: CommerceContext}>) {
    return (
        <CommerceServerContext.Provider value={context}>{children}</CommerceServerContext.Provider>
    )
}
