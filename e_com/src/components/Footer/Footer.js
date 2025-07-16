import React from 'react'
import FbIcon from '../common/FbIcon'
import InstaIcon from '../common/InstaIcon'

const Footer = ({ content }) => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20 my-4">
      {/* Footer Content */}
      <div className="flex flex-wrap justify-between gap-10">
        {content?.items?.map((item, index) => (
          <div key={index} className="min-w-[140px]">
            <h3 className="text-lg font-semibold mb-3">{item?.title}</h3>
            {item?.list?.map((listItem, listIndex) => (
              <a
                key={`${listItem?.path}-${listIndex}`}
                href={listItem?.path}
                className="text-sm text-gray-400 hover:text-white block mb-2 transition"
              >
                {listItem?.label}
              </a>
            ))}
            {item?.description && (
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <a
          href="/fb"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <FbIcon />
        </a>
        <a
          href="/insta"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
        >
          <InstaIcon />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-500 mt-6">
        {content?.copyright}
      </p>
    </footer>
  )
}

export default Footer
