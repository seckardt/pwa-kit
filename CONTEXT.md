# PWA Kit RSC Migration Context

## Project Overview
This document contains context for migrating the official PWA Kit retail template (`template-retail-react-app`) to use React Server Components (RSC) in the new `template-retail-rsc-app`. The goal is to rebuild the existing e-commerce functionality using modern RSC patterns with React Router v7, Vite, and Chakra UI v3.

## Current Architecture

### template-retail-react-app
The existing PWA Kit template is a comprehensive e-commerce application with the following characteristics:

#### Core Technologies
- **React**: 18.2.0 (stable)
- **React Router**: 5.3.4 (older version)
- **Build System**: PWA Kit Dev (@salesforce/pwa-kit-dev)
- **UI Framework**: Chakra UI v2
- **State Management**: React Query (TanStack Query) v4
- **Commerce Integration**: @salesforce/commerce-sdk-react v3.4.0
- **Styling**: Chakra UI with custom theme system
- **SSR**: Custom PWA Kit SSR implementation

#### Project Structure
```
template-retail-react-app/
├── app/
│   ├── components/          # 66 component directories
│   │   ├── header/         # Navigation components
│   │   ├── footer/         # Footer components
│   │   ├── product-tile/   # Product display components
│   │   ├── cart/           # Shopping cart components
│   │   ├── forms/          # Form components
│   │   ├── shared/         # Shared UI components
│   │   └── ...
│   ├── pages/              # 13 page directories
│   │   ├── home/           # Homepage
│   │   ├── product-detail/ # Product details
│   │   ├── product-list/   # Product listing/search
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout process
│   │   ├── account/        # User account pages
│   │   └── ...
│   ├── hooks/              # 62 custom hooks
│   ├── utils/              # 26 utility modules
│   ├── contexts/           # React contexts
│   ├── constants.js        # App constants
│   ├── routes.jsx          # Route definitions
│   ├── ssr.js              # SSR configuration
│   └── main.jsx            # Client entry point
├── config/
│   ├── default.js          # Default configuration
│   └── sites.js            # Site configuration
└── translations/           # i18n translations (18 locales)
```

#### Key Features
1. **E-commerce Functionality**:
   - Product catalog browsing
   - Product search and filtering
   - Shopping cart management
   - Checkout process
   - User authentication
   - Account management
   - Wishlist functionality
   - Order management

2. **PWA Kit Specific Features**:
   - Server-side rendering (SSR)
   - Service worker registration
   - Commerce Cloud integration
   - Einstein recommendations
   - Data Cloud integration
   - Multi-site support
   - Internationalization (i18n)

3. **Authentication & Commerce**:
   - Social login (Google, Apple)
   - Passwordless login
   - Password reset functionality
   - Commerce Cloud SLAS integration
   - Guest checkout
   - Registered user flows

#### Route Structure
```javascript
// Core routes from routes.jsx
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/registration', component: Registration },
    { path: '/reset-password', component: ResetPassword },
    { path: '/account', component: Account },
    { path: '/cart', component: Cart },
    { path: '/checkout', component: Checkout },
    { path: '/checkout/confirmation/:orderNo', component: CheckoutConfirmation },
    { path: '/product/:productId', component: ProductDetail },
    { path: '/search', component: ProductList },
    { path: '/category/:categoryId', component: ProductList },
    { path: '/account/wishlist', component: Wishlist },
    { path: '/store-locator', component: StoreLocator },
    { path: '*', component: PageNotFound }
];
```

#### Commerce SDK Integration
The app heavily uses `@salesforce/commerce-sdk-react` hooks:
- `useProductSearch()` - Product search and filtering
- `useProduct()` - Individual product details
- `useBasket()` - Shopping cart operations
- `useCustomer()` - Customer management
- `useAuthHelper()` - Authentication flows
- `usePromotions()` - Promotional content
- `useCategories()` - Category navigation

#### Custom Hooks (62 total)
Key custom hooks include:
- `use-current-basket.js` - Basket state management
- `use-auth-modal.js` - Authentication modal handling
- `use-navigation.js` - Navigation utilities
- `use-product-view-modal.js` - Product modals
- `use-einstein.js` - Einstein recommendations
- `use-datacloud.js` - Data Cloud integration
- `use-multi-site.js` - Multi-site functionality
- `use-toast.js` - Toast notifications

#### Component Architecture
- **66 component directories** organized by feature
- Heavy use of Chakra UI components
- Custom theme system in `theme/`
- Responsive design patterns
- Accessibility-first approach
- Component testing with Jest/React Testing Library

### template-retail-rsc-app
The new RSC template is minimal but represents the target architecture:

#### Core Technologies
- **React**: 0.0.0-experimental-06e89951-20250620 (experimental for RSC)
- **React Router**: 0.0.0-experimental-14b5858e8 (experimental for RSC)
- **Build System**: Vite 6.3.5 with @hiogawa/vite-rsc
- **UI Framework**: Chakra UI v3 (modern React 19 compatible version)
- **Server**: Express.js v5
- **TypeScript**: Full TypeScript support

#### Project Structure
```
template-retail-rsc-app/
├── src/
│   ├── routes/
│   │   ├── root/
│   │   ├── home/
│   │   ├── about/
│   │   └── routes.tsx       # Route definitions
│   ├── browser.tsx          # Client entry point
│   ├── server.tsx           # RSC server entry
│   └── prerender.tsx        # SSR prerendering
├── public/                  # Static assets
├── server.js               # Express server
├── vite.config.ts          # Vite configuration
└── package.json
```

#### RSC Architecture
- **Server Components**: Components that run on the server
- **Client Components**: Components that run in the browser (marked with 'use client')
- **Streaming**: Server-side rendering with streaming
- **React Router v7**: File-based routing with RSC support
- **Vite RSC Plugin**: @hiogawa/vite-rsc for RSC compilation

## Migration Strategy

### Phase 1: Foundation Setup
1. **Environment Setup**:
   - Set up Vite configuration for RSC
   - Configure TypeScript
   - Set up Chakra UI v3 with React 19 RSC compatibility
   - Configure modern CSS-in-JS for Chakra UI v3
   - Configure Express server

2. **Core Infrastructure**:
   - Port PWA Kit configuration system
   - Set up Commerce Cloud API integration
   - Configure authentication system
   - Set up error handling and logging

### Phase 2: Core Components
1. **Layout Components**:
   - Port Header component
   - Port Footer component
   - Port Layout wrapper
   - Port Navigation components

2. **UI Foundation**:
   - Configure Chakra UI v3 with RSC
   - Port existing theme system to v3 semantic tokens
   - Adapt shared UI components for RSC patterns
   - Maintain existing responsive utilities
   - Preserve accessibility patterns

### Phase 3: Commerce Integration
1. **Commerce SDK Adaptation**:
   - Port Commerce SDK React hooks to RSC patterns
   - Adapt authentication flows
   - Set up basket/cart functionality
   - Configure product search

2. **Core Pages**:
   - Port Home page
   - Port Product Detail page
   - Port Product List page
   - Port Cart page

### Phase 4: Advanced Features
1. **User Management**:
   - Port authentication pages
   - Port account management
   - Port checkout process
   - Port order management

2. **Enhanced Features**:
   - Port Einstein recommendations
   - Port Data Cloud integration
   - Port store locator
   - Port wishlist functionality

## Key Considerations

### RSC Patterns
- **Server Components**: Use for data fetching, SEO content, and static layouts
- **Client Components**: Use for interactive elements, forms, and state management
- **Streaming**: Implement progressive loading for better UX
- **Suspense**: Use for loading states and data fetching

### Commerce Cloud Integration
- **API Calls**: Move to Server Components where possible
- **Authentication**: Adapt SLAS integration for RSC
- **Caching**: Implement proper caching strategies
- **Error Handling**: Adapt error boundaries for RSC

### Chakra UI v3 + RSC Integration
- **Provider Setup**: Configure ChakraProvider as a Client Component with v3 system
- **Component Boundaries**: Most Chakra UI components will need to be Client Components
- **Server Components**: Use Server Components for layout and data fetching, wrap with Client Components for UI
- **Theme System**: Port existing theme configuration to v3 semantic tokens
- **Responsive Design**: Maintain existing responsive patterns with v3 improvements
- **Accessibility**: Preserve Chakra UI's built-in accessibility features
- **Modern Styling**: Leverage v3's improved CSS-in-JS performance
- **React 19 Compatibility**: Full compatibility with experimental React 19 features

### Performance Optimization
- **Bundle Splitting**: Leverage RSC for automatic code splitting
- **Hydration**: Minimize client-side JavaScript
- **Streaming**: Implement progressive loading
- **Caching**: Use proper HTTP caching headers

### Migration Challenges
1. **React Query Migration**: Adapt from React Query to RSC data fetching
2. **Chakra UI + RSC Integration**: Ensure Chakra UI components work properly with RSC (client vs server component boundaries)
3. **Routing**: Migrate from React Router v5 to v7 with RSC
4. **State Management**: Adapt from client-side state to RSC patterns
5. **Authentication**: Adapt auth flows for RSC
6. **Testing**: Set up testing for RSC components

## Technical Specifications

### Dependencies to Port
- `@salesforce/commerce-sdk-react` - Commerce integration
- `@salesforce/pwa-kit-runtime` - Runtime utilities
- `@chakra-ui/react` - UI framework (v3.3.0+)
- `react-icons` - Icon components (replaces @chakra-ui/icons)
- `@emotion/react` - Chakra UI v3 styling dependency (simplified)
- `react-intl` - Internationalization
- `react-hook-form` - Form handling
- `lodash` - Utility functions

### Configuration System
- Port `config/default.js` configuration
- Adapt site configuration
- Port Commerce API configuration
- Adapt Einstein/Data Cloud config

### Build System
- Replace PWA Kit build with Vite
- Configure RSC compilation
- Set up TypeScript compilation
- Configure Chakra UI v3 with Vite (no emotion-specific plugins needed)
- Configure modern CSS-in-JS optimizations
- Configure asset optimization

### Testing Strategy
- Jest for unit testing
- React Testing Library for component testing
- Playwright for E2E testing
- Adapt existing test patterns for RSC

## Development Guidelines

### File Organization
- Follow RSC routing conventions
- Separate Server and Client components
- Maintain feature-based organization
- Use TypeScript throughout

### Component Patterns
- Use 'use client' directive sparingly
- Favor Server Components for data fetching
- Implement proper error boundaries
- Use Suspense for loading states

### Performance Best Practices
- Minimize client-side JavaScript
- Use proper caching strategies
- Implement progressive loading
- Optimize bundle sizes

## Benefits of Migrating to Chakra UI v3

### React 19 Compatibility
- **No prop-types Dependency**: Eliminates React 19 compatibility issues
- **Modern React Features**: Full support for experimental React 19 features
- **Performance**: Improved CSS-in-JS performance and bundle size
- **Future-Proof**: Built for modern React ecosystem

### Technical Advantages
- **Simplified Installation**: Single package installation (`@chakra-ui/react`)
- **Improved Performance**: Removed framer-motion dependency reduces bundle size
- **Better TypeScript**: Enhanced TypeScript support and inference
- **Semantic Tokens**: More flexible and maintainable theming system
- **25+ New Components**: Additional pre-built components reduce development effort

### Migration Benefits
- **Accessibility**: Enhanced accessibility features and ARIA compliance
- **Component Library**: Expanded set of modern components
- **Developer Experience**: Improved CLI tools and component snippets
- **Community**: Growing ecosystem with active development

### Architecture Alignment
With Chakra UI v3, the team can focus on:
- RSC architecture patterns without prop-types conflicts
- Commerce Cloud integration with modern components
- Performance optimization with smaller bundle sizes
- Data fetching strategies with React 19 features
- Authentication flows with modern patterns

### Chakra UI v3 Specific Features
- **Component Snippets**: CLI-generated component setup
- **Improved Color Mode**: Better dark/light mode support
- **System Architecture**: More modular and tree-shakeable
- **CSS Variables**: Better runtime theming capabilities

This context document should be referenced throughout the migration process to ensure consistency and completeness of the RSC implementation while leveraging the modern Chakra UI v3 design system optimized for React 19.