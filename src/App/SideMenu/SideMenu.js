import React from 'react'
import {Panel} from '@vkontakte/vkui'
import SideMenuButtons from './SideMenuButtons/SideMenuButtons'
import SideUserInfo from './SideUserInfo.js'

const SideMenu = ({user, panels, activePanel, onClick}) => {
    return (
        <Panel>
            <SideUserInfo user={user}/>
            <SideMenuButtons panels={panels} activePanel={activePanel} onClick={onClick}/>
        </Panel>
    )
}

export default SideMenu