import React from 'react'
import { colorSelector } from '../../components/Filters/ColorFilter';

const ProductColors = ({colors}) => {
  return (
    <div className='flex pt-2'>
        {colors?.map((color,index)=>(
            <div key={index} className={`rounded-[50%] w-4 h-4 mx-2`} style={{background:colorSelector[color]}}></div>
        ))}
    </div>
  )
}

export default ProductColors