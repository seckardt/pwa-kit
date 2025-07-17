import 'server-only'
import {cache, type ReactElement, type ReactNode} from 'react'

type ServerContext<T> = {
    Provider: ({children, value}: {children: ReactNode; value: T}) => ReactElement
    Consumer: ({children}: {children: (context: T) => ReactNode}) => ReactNode
    _storage: () => {value: T}
    _defaultValue: T
}

const {hasOwnProperty} = Object.prototype

export function createServerContext<T>(defaultValue: T): ServerContext<T> {
    const getCache = cache<() => {value?: T}>(() => ({}))
    const obj = {} as ServerContext<T>
    Object.defineProperty(obj, 'Provider', {
        enumerable: true,
        value: ({children, value}: {children: ReactNode; value: T}) => {
            getCache().value = value
            return children as ReactElement
        }
    })
    Object.defineProperty(obj, 'Consumer', {
        enumerable: true,
        value: ({children}: {children: (context: T) => ReactNode}) => {
            const store = getCache()
            return children(
                store && hasOwnProperty.call(store, 'value') ? (store.value as T) : defaultValue
            )
        }
    })
    Object.defineProperty(obj, '_storage', {value: getCache})
    Object.defineProperty(obj, '_defaultValue', {value: defaultValue})
    return obj
}

/**
 * @see {@link https://github.com/markomitranic/nextjs-server-context-workshop/blob/main/src/CreateServerContext/createServerContext.ts}
 * @see {@link https://medium.com/homullus/cursed-server-context-patterns-in-next-js-14-64407c90fdd4}
 */
export function useServerContext<T>({_storage, _defaultValue}: ServerContext<T>): T {
    const store = _storage?.()
    return store && hasOwnProperty.call(store, 'value') ? store.value : _defaultValue
}
