'use client'

import {type PropsWithChildren, createContext} from 'react'
import type {CommerceContext} from './commerce'

export const CommerceClientContext = createContext<CommerceContext>({} as CommerceContext);

export default function CommerceClientProvider({
    children,
    context
}: PropsWithChildren<{context: CommerceContext}>) {
    return <CommerceClientContext.Provider value={context}>{children}</CommerceClientContext.Provider>
}
