import WishListIcon from '../common/WishListIcon'
import AccountIcon from '../common/AccountIcon'
import CartIcon from '../common/CartIcon'
import { NavLink } from 'react-router-dom'
import {useState} from 'react'
import './Navigation.css'

const Navigation = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Shop', path: '/' },
        { label: 'Men', path: '/men' },
        { label: 'Women', path: '/women' },
        { label: 'Kids', path: '/kids' },
    ];

    return (
        <nav className="bg-white shadow-sm px-6 md:px-10 py-5 sticky top-0 z-50">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl md:text-3xl font-bold text-black">
                    <a href="/">ShopEase</a>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-10 text-gray-600 text-base font-medium">
                    {navLinks.map(({ label, path }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-black font-semibold border-b-2 border-black pb-1 transition'
                                        : 'hover:text-black transition-colors duration-200'
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Right Icons */}
                <div className="flex items-center gap-5 md:gap-8">
                    {/* Search (Desktop only) */}
                    <div className="hidden md:flex items-center border border-gray-300 rounded-md px-3 py-1 hover:shadow-sm">
                        <svg
                            className="h-4 w-4 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            className="ml-2 outline-none text-sm bg-transparent placeholder:text-gray-400 w-[160px]"
                        />
                    </div>

                    <ul className="flex items-center gap-4 text-gray-600 text-lg">
                        <li><button className="hover:text-black" aria-label="Wishlist"><WishListIcon /></button></li>
                        <li><button className="hover:text-black" aria-label="Account"><AccountIcon /></button></li>
                        <li><button className="hover:text-black" aria-label="Cart"><CartIcon /></button></li>
                    </ul>

                    {/* Hamburger Icon (Mobile Only) */}
                    <button
                        className="md:hidden text-gray-700 hover:text-black"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                            viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <ul className="md:hidden mt-4 space-y-4 text-gray-700 text-base font-medium">
                    {navLinks.map(({ label, path }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'block text-black font-semibold'
                                        : 'block hover:text-black transition'
                                }
                                onClick={() => setMobileMenuOpen(false)} // close menu on click
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Navigation;
