import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        const displayName = user?.user?.displayName;
        const currentUser = {
            email: email,
            name: displayName
        };

        console.log('from inside useToken');

        if (email) {
            fetch(`https://gear-up-ecommerce-server.onrender.com/create-user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(currentUser),
            })
                .then(res => res.json())
                .then(data => {
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }

    }, [user])
    return [token];
}

export default useToken;