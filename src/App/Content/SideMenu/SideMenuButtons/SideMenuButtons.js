import React from 'react';
import AdminSideButtons from '../AdminSideButtons/AdminSideButtons';
import PublicSideButtons from './PublicSideButtons';


const SideMenuButtons = ({activePanel, onClick, userIsAdmin}) => {
    return (
        <>
            <PublicSideButtons activePanel={activePanel} onClick={onClick}/>
            {userIsAdmin ? <AdminSideButtons activePanel={activePanel} onClick={onClick}/> : null} 
        </>
    )
}

export default SideMenuButtons