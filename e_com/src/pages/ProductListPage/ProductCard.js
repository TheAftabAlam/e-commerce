import { Link } from 'react-router-dom'
import SvgFavourite from '../../components/common/SvgFavourite'

const ProductCard = ({ id, title, description, price, discount, rating, brand, thumbnail, slug }) => {
  console.log(slug);
  return (
    <div className="relative group transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white rounded-2xl overflow-hidden border border-gray-200">
      {/* Favorite Button */}
      <button
        onClick={() => console.log("Click button")}
        className="absolute top-3 right-3 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
      >
        <SvgFavourite />
      </button>

      {/* Product Image */}
      <Link to={`/product/${slug}`}>
        <img
          className="h-[380px] w-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
          src={thumbnail}
          alt={title}
        />
      </Link>

      {/* Product Info */}
      <div className="p-4 flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-md font-medium text-gray-800 truncate">{title}</p>
          {description && (
            <p className="text-sm text-gray-500">{brand}</p>
          )}
        </div>
        <p className="text-lg font-semibold text-gray-900">${price}</p>
      </div>
    </div>

  )
}

export default ProductCard
