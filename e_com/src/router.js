import Shop from "./Shop";
import {createBrowserRouter} from 'react-router-dom'
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import ProductList from "./pages/ProductListPage/ProductList";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails";
import loadProductBySlug from "./routes/products";


export const router = createBrowserRouter([
    {
    path: '/',
    element: <ShopApplicationWrapper />,
    children: [
      { index: true,
        element: <Shop /> 
      },
      { path: 'women',
        element: <ProductList categoryType={'WOMEN'}/> 
      },
       { path:'men',
        element: <ProductList categoryType={'MEN'}/> 
      },
      { path:'kids',
        element: <ProductList categoryType={'KIDS'}/> 
      },
       { path:'/product/:slug',
        loader:loadProductBySlug,
        element: <ProductDetails/> 
      },
    ]
  }

])