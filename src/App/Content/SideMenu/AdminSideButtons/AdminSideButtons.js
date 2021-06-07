import { Group } from '@vkontakte/vkui'
import React from 'react'
import SideMenuButton from '../SideMenuButtons/SideMenuButton'

const adminPanels = {
    'adminReaders': 'Читатели',
    'adminDebtors': 'Задолжники',
    'adminBanned': 'Без доступа к библиотеке',
    'adminLeaveReaders': 'Выбывшие читатели'
}

const AdminSideButtons = props => (
    <Group mode='plain'>
        {Object.keys(adminPanels).map(panel => <SideMenuButton view='adminContent' key={panel}
            panel={panel} activePanel={props.activePanel}
            onClick={props.onClick} cellText={adminPanels[panel]} />)}
    </Group>
)

export default AdminSideButtons