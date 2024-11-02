import React from 'react';
import { MdSunny } from 'react-icons/md'
import Searchbox from './Searchbox';


export default function Navbar() {
    return (
        <nav className="shadow-sm sticky top-0 left-0 bg-white">
            <div className="h-[80px] w-full flex justify-between items-center px-3 max-w-7xl mx-auto">
                <p className="flex items-center justify-center gap-2">
                    <h2 className="text-gray-500 text-3xl">
                        weather
                    </h2>
                    <MdSunny className='text-yellow-300 text-3xl mt-1'/>
                </p>
                {/* */}
                <Searchbox/>
            </div>
        </nav>
    )
}
