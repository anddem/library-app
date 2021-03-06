import { Group } from '@vkontakte/vkui';
import React from 'react';
import AdminSideButtons from '../AdminSideButtons/AdminSideButtons';
import PublicSideButtons from './PublicSideButtons';


const SideMenuButtons = ({activePanel, onClick, userIsAdmin}) => {
    return (
        <Group mode='plain' separator='auto'>
            <PublicSideButtons activePanel={activePanel} onClick={onClick}/>
            {userIsAdmin ? <AdminSideButtons activePanel={activePanel} onClick={onClick}/> : null} 
        </Group>
    )
}

export default SideMenuButtons