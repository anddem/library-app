import { Root } from '@vkontakte/vkui'
import React from 'react'
import AdminContent from './AdminContent/AdminContent';
import PublicContent from './PublicContent/PublicContent';

const ContentView = props => {
    const userIsAdmin = props.user.Role === 'Администратор'

    return (
        <Root activeView={props.activeView}>
            <PublicContent
                user={props.user}
                id='publicContent'
                activePanel={props.activePanel}
                activeModal={props.activeModal}
                setActiveModal={props.setActiveModal}
            />
            {userIsAdmin ?
                <AdminContent
                    user={props.user}
                    id='adminContent'
                    activePanel={props.activePanel}
                    activeModal={props.activeModal}
                    setActiveModal={props.setActiveModal}
                /> : null
            }
        </Root>
    )
}

export default ContentView;