import React from 'react'

const DescriptionBox = () => {
    return (
        <div className='px-6 md:px-0'>
            <div className='flex'>
                <div className='border border-gray-400 font-semibold p-4'>Description</div>
                <div className='border border-gray-400 font-semibold p-4'>Reviews (62)</div>
            </div>
            <div className='border border-gray-400 p-8'>
                <p>"The best shopping app out there. I've never had an issue with a purchase, and their customer service is top-notch. A truly user-friendly experience from start to finish."</p>
               
            </div>
        </div>
    )
}

export default DescriptionBox
