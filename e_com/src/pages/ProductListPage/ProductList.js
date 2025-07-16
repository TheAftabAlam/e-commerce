
import FilterIcon from '../../components/common/FilterIcon'
import Categories from '../../components/Filters/Categories';
import ColorFilter from '../../components/Filters/ColorFilter';
import PriceFilter from '../../components/Filters/PriceFilter';
import SizeFilter from '../../components/Filters/SizeFilter';
import content from '../../data/content.json'
import { useMemo, useState } from 'react'
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../api/fetchProducts';
import { useEffect } from 'react'
import { setLoading } from '../../store/features/common';


const categories = content?.categories;

const ProductList = ({ categoryType }) => {

  const categoryData = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const category = useMemo(() => {
    return categoryData?.find(element => element?.code === categoryType);
  }, [categoryData, categoryType]);



  useEffect(() => {
    dispatch(setLoading(true));
    getAllProducts(category?.id).then((result) => {
      setProducts(result)
    }).catch(err=>{

    }).finally(()=>{
      dispatch(setLoading(false))
    })
  }, [category])


  const categoryContent = useMemo(() => {
    return categories.find((Category) => Category.code === categoryType)
  }, [categoryType]);

  return (
    <div>
      <div className='flex'>
        <div className='w-[20%] p-[10px] border rounded-lg m-[20px]'>
          {/* Filters */}
          <div className='flex justify-between '>
            <p className='text-[16px] text-gray-600'>Filter</p>
            <FilterIcon />

          </div>
          <div>
            {/* Product types */}
            <p className='text-[16px] text-black mt-5'>Categories</p>
            <Categories types={categoryContent?.types} />
            <hr></hr>
          </div>
          {/* Price */}
          <PriceFilter />
          <hr></hr>
          {/* Colors */}
          <ColorFilter colors={categoryContent?.meta_data?.colors} />
          <hr></hr>
          {/* Sizes */}
          <SizeFilter sizes={categoryContent?.meta_data?.sizes} />
        </div>



        <div className='p-[15px]'>
          <p className='text-lg text-black '>{categoryContent?.description}</p>
          {/* Products */}
          <div className='pt-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 px-2'>
            {products && products.length > 0 ? (
              products.map((item, index) => (
                <ProductCard
                  key={item?.id + '_' + index}
                  {...item}
                  title={item?.name}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-10 text-lg">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
