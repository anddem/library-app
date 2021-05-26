import { FormLayout } from '@vkontakte/vkui'
import React from 'react'
import FormButton from '../CustomComponents/FormComponents/FormButton'
import InputGroup from '../CustomComponents/FormComponents/InputGroup'

const AuthSideForm = props => {
    return (
        <FormLayout>
            <InputGroup inputs={{
                'username': {
                    'value': props.username,
                    'placeholder': "Имя пользователя",
                    'onChange': props.onUsernameChange,
                    'required': true
                },
                'password': {
                    'value': props.password,
                    'placeholder': "Пароль",
                    'onChange': props.onPasswordChange,
                    'required': true,
                    'type': 'password'
                }
                }
            }/>
            <FormButton text="Вход" mode='primary' stretched onClick={props.onButtonClick}/>
        </FormLayout>
    )
}

export default AuthSideForm;