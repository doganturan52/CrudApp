import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction, updatePostAction } from '../redux/actions/post';
import { toast } from 'react-toastify';

function Modal() {
    const [postData, setPostData] = useState({ user: '', title: '', description: '' });
    const dispatch = useDispatch();
    const { modal } = useSelector(state => state.modal);

    const setHandleInputs = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value })
    }

    const postCreate = () => {
        if (modal?.updateId) {
            dispatch(updatePostAction(modal?.updateId, postData));
        }
        else {
            dispatch(createPostAction(postData));
        }


        dispatch({ type: 'MODAL', payload: false })

        toast("Post oluşturma işlemi başarılı", {
            position: "top-right",
            autoClose: 5000
        })
    }

    return (
        <div className='w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'>
            <div className='bg-white w-1/3 p-2 rounded-md'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-thin text-2xl'>{modal?.updateId ? "POST GÜNCELLE" : "POST PAYLAŞ" }</h1>
                    <IoMdClose onClick={() => dispatch({ type: 'MODAL', payload: false })} size={25} className='cursor-pointer hover:text-indigo-400' />
                </div>
                <div className='my-4 flex flex-col space-y-3'>
                    <input value={postData.user} name='user' onChange={setHandleInputs} className='input-style' type="text" placeholder='User' />
                    <input value={postData.title} name='title' onChange={setHandleInputs} className='input-style' type="text" placeholder='Title' />
                    <input value={postData.description} name='description' onChange={setHandleInputs} className='input-style' type="text" placeholder='Description' />
                </div>
                <div onClick={postCreate} className='w-full rounded-md p-2 text-center bg-indigo-600 text-white cursor-pointer hover:bg-indigo-800'>{modal?.updateId ? "Güncelle" : "Paylaş"}</div>
            </div>
        </div>
    )
}

export default Modal