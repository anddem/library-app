import React from 'react'
import {Group, Panel} from '@vkontakte/vkui'
import SideMenuButtons from './SideMenuButtons/SideMenuButtons'
import SideUserInfo from './SideUserInfo.js'

const SideMenu = props => {

    const userIsAdmin = props.user.Role === 'Администратор'

    return (
        <Panel>
            <Group separator='auto'>
                <SideUserInfo user={props.user} onLogout={props.onLogout}/>
                <SideMenuButtons activePanel={props.activePanel} onClick={props.onClick} userIsAdmin={userIsAdmin}/>
            </Group>
        </Panel>
    )
}

export default SideMenu