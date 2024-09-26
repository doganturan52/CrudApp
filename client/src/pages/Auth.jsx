import React, { useState } from 'react'
import { loginAction, registerAction } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

function Auth() {
    const [signUp, setSignUp] = useState(true);
    const [authData, setAuthData] = useState({ username: '', email: '', password: '' })
    const dispatch = useDispatch();

    const setHandleInputs = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value })
    }

    const authFunc = () => {
        if (signUp) {
            dispatch(registerAction(authData));
        }
        else {
            dispatch(loginAction(authData));
        }
    }

    return (
        <div className='w-full h-screen bg-gray-200 flex items-center justify-center fixed'>
            <div className='w-1/3 bg-white p-3 rounded-md'>
                <h1 className='text-2xl text-indigo-700'>{signUp ? "Kayıt Ol" : "Oturum Aç"}</h1>

                <div className='flex flex-col space-y-3 my-5'>
                    {signUp && <input onChange={setHandleInputs} value={authData.username} className='input-style' type="text" name="username" placeholder='Kullanıcı Adı' />}
                    <input onChange={setHandleInputs} value={authData.email} className='input-style' type="text" name="email" placeholder='E-Posta' />
                    <input onChange={setHandleInputs} value={authData.password} className='input-style' type="password" name="password" placeholder='Şifre' />
                </div>
                <div className='text-red-500 text-xs cursor-pointer mb-4'>
                    {
                        signUp ? <span onClick={() => setSignUp(false)}>Daha önce giriş yaptınız mı?</span> : <span onClick={() => setSignUp(true)}>Kayıt olmak için tıklayınız</span>

                    }
                </div>
                <div onClick={authFunc} className='cursor-pointer hover:bg-indigo-800 w-full p-2 text-center bg-indigo-600 text-white rounded-md'>{signUp ? "Kayıt Ol" : "Giriş Yap"}</div>
            </div>
        </div>
    )
}

export default Auth