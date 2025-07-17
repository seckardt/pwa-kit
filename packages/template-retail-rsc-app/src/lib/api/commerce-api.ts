import {helpers, ShopperLogin, type ShopperLoginTypes} from 'commerce-sdk-isomorphic'
import type {Session} from 'react-router'
import {createCookieSessionStorage} from 'react-router'

export type CommerceApiProviderProps = {
    clientId: string
    organizationId: string
    siteId: string
    shortCode: string
    locale: string
    currency: string
    proxy: string
    redirectURI: string
}

export type SessionData = {
    accessToken?: string
    accessTokenExpiry?: number
    refreshToken?: string
    refreshTokenExpiry?: number
}

type SessionFlashData = {
    error: string
}

type ApiTokenStatus = 'new' | 'valid' | 'refreshed'

/**
 * Salesforce Commerce API client configuration.
 * This sets up the connection to the Salesforce B2C Commerce API.
 */
export const getApiConfig = (): CommerceApiProviderProps => {
    return {
        clientId: import.meta.env.VITE_COMMERCE_API_CLIENT_ID || '',
        organizationId: import.meta.env.VITE_COMMERCE_API_ORG_ID || '',
        shortCode: import.meta.env.VITE_COMMERCE_API_SHORT_CODE || '',
        siteId: import.meta.env.VITE_COMMERCE_API_SITE_ID || '',
        locale: import.meta.env.VITE_SITE_LOCALE || 'en-US',
        currency: import.meta.env.VITE_SITE_CURRENCY || 'USD',
        proxy: `${import.meta.env.VITE_COMMERCE_API_URL || ''}${
            import.meta.env.VITE_COMMERCE_API_PROXY || ''
        }`,
        redirectURI: `${import.meta.env.VITE_COMMERCE_API_URL || ''}${
            import.meta.env.VITE_COMMERCE_API_CALLBACK || ''
        }`
    }
}

const {getSession: _getSession, commitSession: _commitSession} = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        maxAge: 60,
        path: '/',
        sameSite: 'lax',
        secrets: ['s3cret1'], // TODO: Make this an env variable!
        secure: true
    }
})
const getSession = (request: Request): Promise<Session<SessionData, SessionFlashData>> =>
    _getSession(request.headers.get('Cookie'))
const commitSession = (session: Session<SessionData, SessionFlashData>) =>
    _commitSession(session, {
        expires: new Date(session.get('refreshTokenExpiry') as number)
    })

const getSlasClient = (): ShopperLogin<CommerceApiProviderProps> => {
    const parameters = getApiConfig()
    return new ShopperLogin({
        parameters,
        throwOnBadResponse: true,
        proxy: parameters.proxy
    })
}

function updateSession(
    session: Session<SessionData, SessionFlashData>,
    {
        access_token,
        expires_in,
        refresh_token,
        refresh_token_expires_in
    }: ShopperLoginTypes.TokenResponse
): void {
    const now = Date.now()
    session.set('accessToken', access_token)
    session.set('accessTokenExpiry', now + expires_in * 1_000 * 0.95) // 95% of actual expiry time for safety
    session.set('refreshToken', refresh_token)
    session.set('refreshTokenExpiry', now + refresh_token_expires_in * 1_000 * 0.99) // 99% of actual expiry time for safety
}

export const getCommerceApiToken = async (
    request: Request
): Promise<[Session<SessionData, SessionFlashData>, typeof commitSession, ApiTokenStatus]> => {
    const session = await getSession(request)
    const accessToken = session.get('accessToken')
    const accessTokenExpiry = session.get('accessTokenExpiry')
    const now = Date.now()
    if (accessToken && typeof accessTokenExpiry === 'number' && accessTokenExpiry >= now) {
        // console.log('Using existing access token:', accessToken)
        return [session, commitSession, 'valid']
    }

    const slasClient = getSlasClient()
    const refreshToken = session.get('refreshToken')
    const refreshTokenExpiry = session.get('refreshTokenExpiry')
    if (refreshToken && typeof refreshTokenExpiry === 'number' && refreshTokenExpiry >= now) {
        try {
            console.log('Refreshing access token...')
            return helpers
                .refreshAccessToken(slasClient, {refreshToken})
                .then((response: ShopperLoginTypes.TokenResponse) => {
                    console.log('Retrieved refreshed access token:', response.access_token)
                    updateSession(session, response)
                    return [session, commitSession, 'refreshed']
                })
        } catch (error) {
            session.flash('error', 'Retrieving refreshed access token failed')
            console.error('Error retrieving refreshed access token:', error)
            throw error
        }
    }

    // Otherwise, get a new token
    try {
        console.log('Retrieving new access token...')
        const {redirectURI} = getApiConfig()
        return helpers
            .loginGuestUser(slasClient, {
                redirectURI
            })
            .then((response: ShopperLoginTypes.TokenResponse) => {
                console.log('Retrieved new access token:', response.access_token)
                updateSession(session, response)
                return [session, commitSession, 'new']
            })
    } catch (error) {
        session.flash('error', 'Retrieving new access token failed')
        console.error('Error retrieving new access token:', error)
        throw error
    }
}
