import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Rating from '../../components/Rating/Rating';
import SizeFilter from '../../components/Filters/SizeFilter';
import ProductColors from './ProductColors';
import SvgCreditCard from '../../components/common/SvgCreditCard';
import SvgCloth from '../../components/common/SvgCloth';
import SvgShipping from '../../components/common/SvgShipping';
import SvgReturn from '../../components/common/SvgReturn';
import ProductCard from '../ProductListPage/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getAllProducts } from '../../api/fetchProducts';
import SectionHeading from '../../components/Sections/SectionHeading/SectionHeading';


const extraSections = [
  {
    icon: <SvgCreditCard />,
    label: 'Secure payment'
  },
  {
    icon: <SvgCloth />,
    label: 'Size & Fit'
  },
  {
    icon: <SvgShipping />,
    label: 'Free shipping'
  },
  {
    icon: <SvgReturn />,
    label: 'Free Shipping & Returns'
  }
]

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { product } = useLoaderData();
  const [image, setImage] = useState();
  const [breadCrumbLinks, setBreadCrumbLink] = useState([]);
  const [similarProduct, setSimilarProducts] = useState([]);
  const categories = useSelector((state) => state?.categoryState?.categories);
  const [selecteSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');


  const productCategory = useMemo(() => {
    return categories?.find((category) => category?.id === product?.categoryId);
  }, [product, categories]);

  useEffect(() => {
    getAllProducts(product?.categoryId, product?.categoryTypeId).then(res => {
      const excludedProduct = res?.filter((item) => item?.id !== product?.id);
      setSimilarProducts(excludedProduct);
    }).catch(() => [

    ])
  }, [product?.categoryId, product?.categoryTypeId, product?.id]);

  useEffect(() => {
    setImage(product?.thumbnail);
    setBreadCrumbLink([]);
    const arrayLinks = [{ title: 'Shop', path: '/' }, {
      title: productCategory?.name,
      path: productCategory?.name
    }];
    const productType = productCategory?.categoryTypes?.find((item) => item?.id === product?.categoryTypeId);

    if (productType) {
      arrayLinks?.push({
        title: productType?.name,
        path: productType?.name
      })
    }
    setBreadCrumbLink(arrayLinks);
  }, [productCategory, product]);

  const addItemToCart = useCallback(() => {

    console.log("inside addItemToCart")

  }, [dispatch, product, selecteSize]);

  useEffect(() => {
    if (selecteSize) {
      setError('');
    }
  }, [selecteSize]);

  const colors = useMemo(() => {
    const colorSet = _.uniq(_.map(product?.variants, 'color'));
    return colorSet

  }, [product]);

  const sizes = useMemo(() => {
    const sizeSet = _.uniq(_.map(product?.variants, 'size'));
    return sizeSet

  }, [product]);


  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 px-6 py-10 bg-gray-50">
        {/* Left Column: Images */}
        <div className="w-full md:w-[45%] flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnail Stack */}
            <div className="w-full md:w-[20%] flex justify-center">
              <div className="flex md:flex-col gap-2 overflow-auto md:overflow-visible">
                {product?.productResources?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setImage(item?.url)}
                    className="rounded-lg overflow-hidden border hover:scale-105 transition-transform"
                  >
                    <img
                      src={item?.url}
                      className="h-[60px] w-[60px] object-cover"
                      alt={'sample-' + index}
                    />
                  </button>
                ))}
              </div>
            </div>


            {/* Main Image */}
            <div className="flex-1 flex justify-center items-center border rounded-lg overflow-hidden bg-white">
              <img
                src={image}
                alt={product?.name}
                className="w-full max-h-[520px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="w-full md:w-[55%] space-y-6">
          <Breadcrumb links={breadCrumbLinks} />
          <h1 className="text-3xl font-semibold text-gray-800">{product?.name}</h1>
          <Rating rating={product?.rating} />

          <p className="text-2xl font-bold text-gray-900">${product?.price}</p>

          {/* Size Selector */}
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-gray-700">Select Size:</p>
            <Link
              to="https://en.wikipedia.org/wiki/Clothing_sizes"
              target="_blank"
              className="text-sm text-blue-600 hover:underline"
            >
              Size Guide →
            </Link>
          </div>
          <SizeFilter
            onChange={(values) => setSelectedSize(values?.[0] ?? '')}
            sizes={sizes}
            hidleTitle
            multi={false}
          />

          {/* Color Options */}
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">Colors Available:</p>
            <ProductColors colors={colors} />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addItemToCart}
            className="bg-black text-white w-[160px] h-[42px] flex items-center justify-center gap-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-white"
            >
              <path
                d="M1.5 1.333H2.005c.85 0 1.564.64 1.656 1.486l.676 6.195c.092.846.806 1.486 1.656 1.486h7.21c.762 0 1.426-.516 1.614-1.254l1.15-4.51c.269-1.054-.527-2.079-1.614-2.079H4.5M4.521 13.521h.625M4.521 14.146h.625M13.687 13.521h.625M13.687 14.146h.625M5.667 13.833a.833.833 0 11-1.667 0 .833.833 0 011.667 0ZM14.833 13.833a.833.833 0 11-1.667 0 .833.833 0 011.667 0Z"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Add to cart
          </button>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Extra Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {extraSections?.map((section, index) => (
              <div key={index} className="flex items-center text-gray-700">
                {section?.icon}
                <span className="ml-2">{section?.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="px-6 py-6">
        <SectionHeading title="Product Description" />
        <div className="bg-white p-6 rounded-lg shadow-sm md:w-[50%] w-full mx-8">
          <p className="text-gray-700">{product?.description}</p>
        </div>
      </div>

      {/* Similar Products */}
      <div className="px-6 py-6">
        <SectionHeading title="Similar Products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 mx-8">
          {similarProduct?.length > 0 ? (
            similarProduct.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No Products Found!</p>
          )}
        </div>
      </div>
    </>

  )
}

export default ProductDetails