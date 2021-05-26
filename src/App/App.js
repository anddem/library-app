import "@vkontakte/vkui/dist/vkui.css";
import React, { useEffect, useState } from 'react'
import Auth from './Auth/Auth';
import Content from './Content/Content';

async function getUserId(username, password) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/users`, {
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
    const data = await response.json()

    return data.userId
}

async function getUser (userId) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/users/${userId}`)
    const data = await response.json()
    return data.user;
}

const App = () => {
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (!userId) setUser(null)
        else getUser(userId).then(user => setUser(user))
    }, [userId])

    function onLogin (username, password) {
        getUserId(username, password).then(userId => {
            localStorage.setItem('userId', userId)
            setUserId(userId)
        })
    }

    function onLogout() {
        localStorage.removeItem('userId');
        setUser(null)
        setUserId(null);
    }

    return (
        user ? <Content onLogout={onLogout} user={user}/> : <Auth onButtonClick={onLogin} style={{justifyContent: 'center'}}/>
    )
  }
  
  export default App