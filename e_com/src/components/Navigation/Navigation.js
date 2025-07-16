import WishListIcon from '../common/WishListIcon'
import AccountIcon from '../common/AccountIcon'
import CartIcon from '../common/CartIcon'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
            {/* Logo */}
            <div className="text-3xl font-bold text-black tracking-tight">
                <a href="/">ShopEase</a>
            </div>

            {/* Navigation Links */}
            <ul className="flex gap-12 text-gray-600 text-md font-medium">
                {['/', '/men', '/women', '/kids'].map((path, idx) => {
                    const labels = ['Shop', 'Men', 'Women', 'Kids'];
                    return (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-black font-semibold border-b-2 border-black pb-1'
                                        : 'hover:text-black transition-colors duration-200'
                                }
                            >
                                {labels[idx]}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

            {/* Right Section: Search + Icons */}
            <div className="flex items-center gap-10">
                {/* Search Bar */}
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 hover:shadow-md transition">
                    <svg
                        className="h-4 w-4 text-gray-500"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search"
                        className="ml-2 outline-none text-sm bg-transparent placeholder:text-gray-400"
                    />
                </div>

                {/* Action Icons */}
                <ul className="flex items-center gap-6 text-gray-600 text-lg">
                    <li>
                        <button
                            className="hover:text-black transition-colors duration-200"
                            aria-label="Wishlist"
                        >
                            <WishListIcon />
                        </button>
                    </li>
                    <li>
                        <button
                            className="hover:text-black transition-colors duration-200"
                            aria-label="Account"
                        >
                            <AccountIcon />
                        </button>
                    </li>
                    <li>
                        <button
                            className="hover:text-black transition-colors duration-200"
                            aria-label="Cart"
                        >
                            <CartIcon />
                        </button>
                    </li>
                </ul>
            </div>
        </nav>



    )
}

export default Navigation
