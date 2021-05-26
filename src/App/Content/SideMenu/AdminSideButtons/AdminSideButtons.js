import { Spacing} from '@vkontakte/vkui'
import React from 'react'
import SideMenuButton from '../SideMenuButtons/SideMenuButton'

const adminPanels = {
    'adminReaders': 'Список читателей',
    "adminAddReader": 'Зарегистрировать читателя',
    "adminAddBook": 'Добавить книгу',
    'adminAddLibraryPoint': 'Добавить библиотечный пункт',
}

const AdminSideButtons = props => {
    return (
        <>
            <Spacing separator size={10}/>
            {Object.keys(adminPanels).map(panel => <SideMenuButton view='adminContent' key={panel}
                                                    panel={panel} activePanel={props.activePanel}
                                                    onClick={props.onClick} cellText={adminPanels[panel]}
                                                    />)}
        </>
    )
}

export default AdminSideButtons