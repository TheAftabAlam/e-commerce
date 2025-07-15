import { fetchCategories } from './api/fetchCategories';
import './App.css';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection';
import Category from './components/Sections/Category/Category';
import NewArrivals from './components/Sections/NewArrivals';
import content from './data/content.json'
import { useEffect } from 'react'
import { loadCategories } from './store/features/category';
import { useDispatch } from 'react-redux';
import { setLoading } from './store/features/common';



function Shop() {

   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true))
    fetchCategories().then((result) => {
      dispatch(loadCategories(result))
    }).catch(err=>{

    }).finally(()=>{
      dispatch(setLoading(false))
    });
  }, [dispatch])

  return (
    <div>
      <HeroSection />
      <NewArrivals />
      {
        content && content?.pages?.shop?.sections?.map((ele, index) => {
          return (
            <Category key={index} title={ele?.title} data={ele?.data} />
          )
        })
      }
      <Footer content={content?.footer} />
    </div>
  );
}

export default Shop;
