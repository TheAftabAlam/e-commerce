import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FilterIcon from '../../components/common/FilterIcon';
import Categories from '../../components/Filters/Categories';
import ColorFilter from '../../components/Filters/ColorFilter';
import PriceFilter from '../../components/Filters/PriceFilter';
import SizeFilter from '../../components/Filters/SizeFilter';
import ProductCard from './ProductCard';

import content from '../../data/content.json';
import { getAllProducts } from '../../api/fetchProducts';
import { fetchCategories } from '../../api/fetchCategories';
import { setLoading } from '../../store/features/common';
import { loadCategories } from '../../store/features/category';

const categoriesFromContent = content?.categories;

const ProductList = ({ categoryType }) => {
  const dispatch = useDispatch();
  const fetchedCategories = useSelector((state) => state?.categoryState?.categories);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        let categoriesData = fetchedCategories;

        // Fetch categories if not already available
        if (!categoriesData || categoriesData.length === 0) {
          categoriesData = await fetchCategories();
          dispatch(loadCategories(categoriesData));
        }

        // Find the matching category
        const selectedCategory = categoriesData.find(
          (element) => element?.code === categoryType
        );

        if (!selectedCategory) {
          setProducts([]);
          return;
        }

        // Fetch products for the selected category
        const result = await getAllProducts(selectedCategory.id);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, categoryType, fetchedCategories]);

  const categoryContent = useMemo(() => {
    return categoriesFromContent.find((Category) => Category.code === categoryType);
  }, [categoryType]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 py-8 bg-gray-50 min-h-screen">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-1/4 bg-white shadow-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
          <FilterIcon />
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium text-gray-800 mb-2">Categories</h3>
          <Categories types={categoryContent?.types} />
        </div>
        <hr className="my-4" />

        <div className="mb-6">
          <PriceFilter />
        </div>
        <hr className="my-4" />

        <div className="mb-6">
          <ColorFilter colors={categoryContent?.meta_data?.colors} />
        </div>
        <hr className="my-4" />

        <div className="mb-2">
          <SizeFilter sizes={categoryContent?.meta_data?.sizes} />
        </div>
      </aside>

      {/* Product List */}
      <main className="flex-1">
        {categoryContent?.description && (
          <p className="text-xl font-semibold text-gray-800 mb-6">
            {categoryContent.description}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && products.length > 0 ? (
            products.map((item) => (
              <ProductCard key={item?.id} {...item} title={item?.name} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg py-10">
              No products found.
            </div>
          )}
        </div>
      </main>
    </div>

  );
};

export default ProductList;
