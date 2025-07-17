import {Link} from 'react-router'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import NavigationDesktop from '@/components/navigation/desktop'

export default function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-primary-600">
                        Commerce Storefront
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationDesktop />

                    {/* Search, Cart */}
                    <div className="flex items-center space-x-4">
                        <SearchBar />
                        <CartIcon />
                    </div>
                </div>
            </div>
        </header>
    )
}
