import React from 'react'
import { IoSearch } from 'react-icons/io5'


export default function Searchbox(props) {
    return (
        <section>
            <form
                onSubmit={props.onSubmit}
                className="flex relative items-center justify-center h-10"
            >
                <input
                    type="text"
                    value={props.value}
                    onChange={props.onChange}
                    placeholder="Search location.."
                    className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none  focus:border-blue-500 h-full"
                />
                <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600  h-full">
                    <IoSearch />
                </button>
            </form>
        </section>
    )
}
