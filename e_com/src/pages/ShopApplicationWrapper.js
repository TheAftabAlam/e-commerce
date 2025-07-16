import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'
import { useSelector } from 'react-redux'
import { DialogProvider } from '../components/CommonDialog/DialogContext.js';

const ShopApplicationWrapper = () => {

  const isLoading = useSelector((state) => state?.commonState?.loading);

  return (
    <div>
      <DialogProvider>
        <Navigation />
        <Outlet />
        {isLoading && <Spinner />}
      </DialogProvider>
    </div>
  )
}

export default ShopApplicationWrapper
