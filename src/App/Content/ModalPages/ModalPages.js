import { ModalRoot } from '@vkontakte/vkui'
import React from 'react'
import AuthModalPage from './AuthModalPage';

const ModalPages = props => {
    return (
        <ModalRoot activeModal={props.activeModal}>
            <AuthModalPage id='authModalPage' onLogin={props.onLogin} onClose={props.onClose}/>
        </ModalRoot>
    )
}

export default ModalPages;