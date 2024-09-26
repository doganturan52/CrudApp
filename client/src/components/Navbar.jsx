import React from 'react'
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from 'react-redux';

function Navbar() {

    const dispatch = useDispatch();

    const logoutFunc = () => {
        localStorage.clear();
        window.location = '/auth';
    }

    const openModal = () => {
        dispatch({
            type: 'MODAL',
            payload: true
        })
    }


    return (
        <div className='h-20 bg-indigo-600 flex items-center justify-between px-5'>
            <div className='text-white text-2xl cursor-pointer font-thin'>CrudApp</div>
            <div className='flex items-center space-x-5'>
                <input className='p-2 outline-none rounded-md' type="text" name="" id="" placeholder='ara' />
                <div onClick={openModal} className='w-36 border p-2 rounded-md text-center text-white cursor-pointer hover:bg-indigo-800'>Post Oluştur</div>
                <BiLogOut onClick={logoutFunc} className='text-white cursor-pointer' size={30} />
            </div>
        </div>
    )
}

export default Navbar