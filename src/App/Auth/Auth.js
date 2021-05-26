import { Placeholder, Spacing, SplitCol, SplitLayout } from '@vkontakte/vkui'
import React, { useState } from 'react'
import AuthSideForm from './SideAuthForm'
import { Icon56ErrorOutline } from '@vkontakte/icons';

const Auth = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onButtonClick = () => props.onButtonClick(username, password)
    
    return (
        <SplitLayout style={props.style}>
            <SplitCol width='250px' maxWidth='250px'>
                <Spacing/>
                <AuthSideForm username={username} password={password} onUsernameChange={setUsername} onPasswordChange={setPassword} onButtonClick={onButtonClick}/>
            </SplitCol>
            <SplitCol
                animate={false}
                spaced={true}
                width='560px'
                maxWidth='900px'
            >
                <Placeholder icon={<Icon56ErrorOutline/>} stretched header='Для доступа к приложению необходимо авторизоваться'/>
            </SplitCol>
        </SplitLayout>
    )
}

export default Auth;