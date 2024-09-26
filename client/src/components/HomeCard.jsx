import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deletePostAction } from '../redux/actions/post';
import { toast } from 'react-toastify';

function HomeCard({ post }) {
    const dispatch = useDispatch();

    const deletePost = (id) => {
        dispatch(deletePostAction(id))
        // window.location.reload();
        toast("Silme işlemi başarılı", {
            position: "top-right",
            autoClose: 5000
        })
    }

    const updatePost = (id) => {
        dispatch({ type: 'MODAL', payload: {open: true, updateId: id} })
        

    }


    return (
        <div className='relative w-1/3 border p-3 rounded-md bg-gray-50 mx-5'>
            <div className='text-xl'>{post?.title}</div>
            <div className='text-gray-600 text-sm'>{post?.description}</div>
            <div className='flex items-center justify-between mt-4'>
                <span className='font-bold text-xs text-gray-400'>{post?.user}</span>
                <span className=' text-xs text-gray-400'>{(post?.date)?.substring(0, 10)}</span>
            </div>
            <div className='absolute -top-3 -right-3 flex items-center space-x-3'>
                <MdDelete onClick={() => deletePost(post._id)} className='bg-red-500 rounded-full text-white p-1 cursor-pointer' size={25} />
                <MdEditDocument onClick={() => updatePost(post._id)} className='bg-yellow-500 rounded-full text-white p-1 cursor-pointer' size={25} />
            </div>
        </div>
    )
}

export default HomeCard