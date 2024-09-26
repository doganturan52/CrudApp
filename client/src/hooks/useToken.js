import React, { useEffect, useState } from 'react'

function useToken() {
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('auth')));
    }, [])

    return [token];
}

export default useToken