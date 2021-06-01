import "@vkontakte/vkui/dist/vkui.css";
import React, { useEffect, useState } from 'react'
import Auth from './Auth/Auth';
import Content from './Content/Content';

async function authUser(username, password) {
    const response = await fetch(process.env.REACT_APP_API_HOST + '/users/auth', {
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })

    const data = await response.json()
    
    return data.data[0]
}

const App = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + '/users/auth', {method: 'GET'})
        .then(response => response.json())
        .then(({data}) => {
            if (data) setUser(data)
        })
    }, [user])

    const onLogin = (username, password) => authUser(username, password).then(user => setUser(user))

    const onLogout = () => setUser(null)

    return (
        user
        ? <Content onLogout={onLogout} user={user}/>
        : <Auth onButtonClick={onLogin} style={{justifyContent: 'center'}}/>
    )
}

export default App