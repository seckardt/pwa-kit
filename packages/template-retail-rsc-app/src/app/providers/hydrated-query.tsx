'use client'

import type {PropsWithChildren} from 'react'
import {type DehydratedState, HydrationBoundary, QueryClientProvider} from '@tanstack/react-query'
import {getQueryClient} from '@/lib/api/commerce-client'

export default function HydratedQueryProvider({
    children,
    state
}: PropsWithChildren<{state: DehydratedState}>) {
    const queryClient = getQueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={state}>{children}</HydrationBoundary>
        </QueryClientProvider>
    )
}
