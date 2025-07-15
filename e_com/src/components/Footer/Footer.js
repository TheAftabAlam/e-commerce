import React from 'react'
import FbIcon from '../common/FbIcon'
import InstaIcon from '../common/InstaIcon'

const Footer = ({ content }) => {
  return (
    <div className='bg-black text-white py-8'>
      <div className='flex justify-around flex-wrap'>
        {content?.items && content.items.map((item, index) => (
          <div key={index} className='flex flex-col mb-4'>
            <p className='text-[16px] pb-[10px]'>{item?.title}</p>
            {item?.list && item.list.map((listItem, listIndex) => (
              <a
                key={`${listItem?.path}-${listIndex}`}
                className='flex flex-col text-[12px] py-2'
                href={listItem?.path}
              >
                {listItem?.label}
              </a>
            ))}

            {item?.description && <p>{item.description}</p>}
          </div>
        ))}
      </div>
      <div className='flex gap-2 items-center justify-center py-4'>
        <a href='/fb' target="_blank" rel="noopener noreferrer"><FbIcon /></a>
        <a href='/insta' target="_blank" rel="noopener noreferrer"><InstaIcon /></a>
      </div>
      <p className='text-sm text-white text-center'>{content?.copyright}</p>
    </div>
  )
}

export default Footer
