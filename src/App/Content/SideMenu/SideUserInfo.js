import { IconButton, SimpleCell, Group } from '@vkontakte/vkui'
import React from 'react'
import { Icon24DoorArrowLeftOutline, Icon24UserOutline } from '@vkontakte/icons';


const SideUserInfo = ({user, openUserInfo, onLogout}) => (
    <Group mode='plain' separator='auto'>
        <SimpleCell
            disabled
            multiline
            after={<>
            {openUserInfo ? <IconButton aria-label='Открыть профиль' onClick={openUserInfo}><Icon24UserOutline/></IconButton> : null}

            <IconButton aria-label='Выход' onClick={onLogout}><Icon24DoorArrowLeftOutline /></IconButton>
            </>}
            description={user.Role}
        >
            {`${user.Surname} ${user.Name}`}
        </SimpleCell>
    </Group>
)

export default SideUserInfo;