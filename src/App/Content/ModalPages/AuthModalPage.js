import { FormLayout, Input, ModalPage, ModalPageHeader } from '@vkontakte/vkui'
import React, { useState } from 'react'
import FormButton from '../CustomComponents/FormComponents/FormButton'
import FormInput from '../CustomComponents/FormComponents/FormInput'

const AuthModalPage = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onButtonClick = () => {
        props.onLogin(username, password)
    }

    return (
        <ModalPage id={props.id}>
            <ModalPageHeader>
                Форма авторизации
            </ModalPageHeader>
            <FormLayout>
                <FormInput
                    name='username' placeholder='Введите имя пользователя'
                    value={username} onChange={setUsername}
                />
                <FormInput
                    name='password' placeholder='Введите пароль' type='password'
                    value={password} onChange={setPassword}
                />
                <FormButton
                    size='l' stretched onClick={onButtonClick}
                    mode='primary'
                />
            </FormLayout>
        </ModalPage>
    )
}

export default AuthModalPage