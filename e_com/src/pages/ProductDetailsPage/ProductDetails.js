import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import content from '../../data/content.json'
import Rating from '../../components/Rating/Rating';
import SizeFilter from '../../components/Filters/SizeFilter'
import ProductColors from './ProductColors';
import CartIcon from '../../components/common/CartIcon';
import SvgCreditCard from '../../components/common/SvgCreditCard'
import SvgCloth from '../../components/common/SvgCloth';
import SvgShipping from '../../components/common/SvgShipping';
import SvgReturn from '../../components/common/SvgReturn';
import SectionHeading from '../../components/Sections/SectionHeading/SectionHeading'
import ProductCard from '../ProductListPage/ProductCard';
import { useSelector } from 'react-redux';

const categories = content?.categories;

const extraSections = [
  {
    icon: <SvgCreditCard />,
    lable: 'Secure Payment'
  },
  {
    icon: <SvgCloth />,
    lable: 'Size & Fit'
  },
  {
    icon: <SvgShipping />,
    lable: 'Free Shipping'
  },
  {
    icon: <SvgReturn />,
    lable: 'Free Shipping & Return'
  }
]


const ProductDetails = () => {


  const categoryData = useSelector((state)=>state?.categoryState?.categories);


  const { product } = useLoaderData();
  const [image, setImage] = useState(product?.thumbnail);
  const [breadCrumbLinks, setBreadCrumbLink] = useState([]);

  const similarProduct = useMemo(() => {
    return content?.products?.filter((item) => item.type_id === product.type_id && item?.id !== product.id)
  }, [product])

  const productCategory = useMemo(() => {
    return categoryData?.find((category) => category.id === product.category_id);
  }, [product]);


   useEffect(() => {
    setImage(product?.thumbnail);
    setBreadCrumbLink([]);
    const arrayLinks = [{ title: 'Shop', path: '/' }, {
      title: productCategory?.name,
      path: productCategory?.name
    }];

    const categoryType = categoryData

    // const productType = productCategory?.categoryTypes?.find((item)=> item?.id === product?.categoryTypeId);
    
    // if(productType){
    //   arrayLinks?.push({
    //     title: productType?.name,
    //     path: productType?.name
    //   })
    // }
    setBreadCrumbLink(arrayLinks);
  }, [productCategory, product]);


  return (
    <>
      <div className='flex flex-col md:flex-row p-10'>
        <div className='w-[100%] lg:w-[50%] md:w-[40%]'>
          {/* Image */}
          <div className='flex flex-col md:flex-row'>
            <div className='w-[100%] md:w-[20%] justify-center h-[100%] md:h-[420px] mt-20'>
              {/* Stack images */}
              <div className='flex flex-row md:flex-col justify-center h-full pl-5 bg-#F6F6F6'>
                {
                  product?.images?.map((item, index) => {
                    return (
                      <button key={index} onClick={() => setImage(item)} className='rounded-lg w-fit p-1 mb-2 border-2 border-transparent hover:border-blue-300 hover:scale-105 transition duration-200 ease-in-out'>
                        <img
                          src={item}
                          className='h-[70px] w-[70px] rounded-lg bg-cover bg-center hover:scale-105 hover:border'
                          alt={'sample-' + index}
                        />
                      </button>
                    );
                  })
                }
              </div>

            </div>
            <div className='w-full md:w-[80%] flex justify-center md:pt-0 pt-10'>
              <img src={image} className='max-h-[785px] w-[520px] object-contain rounded-lg' alt={product?.name} />
            </div>
          </div>

        </div>

        <div className='w-[60%] px-[10]'>
          <Breadcrumb links={breadCrumbLinks} />
          <p className='text-3xl pt-4'>{product?.title}</p>
          <Rating rating={product?.rating} />
          <p className='text-xl bold py-2'>${product?.price}</p>
          <div className='flex flex-wrap'>
            <div className='flex gap-2'>
              <p className='text-sm bold'>Select Size</p>
              <Link target="_blank" to={'https://en.wikipedia.org/wiki/Clothing_sizes#:~:text=Clothing%20sizes%20are%20the%20sizes,tops%2C%20skirts%2C%20and%20trousers.'} className='text-sm bold text-gray-500 hover:text-green-900'>Size Guide</Link>
            </div>
          </div>
          <div className='mt-2'><SizeFilter sizes={product?.size} hidleTitle /></div>

          <div>
            <p className='text-lg bold'>Colors Available</p>
            <ProductColors colors={product?.color} />
          </div>

          <div className='flex py-4'>
            <button className='bg-black rounded-lg w-[155px] px-2'>
              <div className='flex items-center bg-black rounded-lg text-white' >
                <CartIcon bgColor={'black'} /> Add to Cart
              </div>
            </button>
          </div>

          <div className='grid md:grid-cols-2 gap-4 pt-4'>
            {
              extraSections?.map((section, index) => (
                <div key={index} className='flex items-center'>
                  {section?.icon}
                  <p className='px-2'>{section?.lable}</p>
                </div>
              ))
            }

          </div>

        </div>
      </div>

      {/* Product Description */}
      <SectionHeading title={'Product Description'} />
      <div className='md:w-[50%] w-full p-2'>

        <p className='px-8'>{product?.description}</p>
      </div>

      <SectionHeading title={'Similar Products'} />
      <div className='flex px-10'>

        <div className='pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8 px-2 pb-10'>
          {similarProduct?.map((item, index) => {
            return <ProductCard key={index} {...item} />;
          })}
          {!similarProduct?.length && <p>No Products Found!</p>}
        </div>

      </div>
    </>

  )
}

export default ProductDetails
