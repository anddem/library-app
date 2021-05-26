import { IconButton, SimpleCell, Group } from '@vkontakte/vkui'
import React from 'react'
import { Icon24DoorArrowLeftOutline } from '@vkontakte/icons';


const SideUserInfo = ({user, onLogout}) => (
    <Group>
        <SimpleCell
            disabled
            multiline
            after={<IconButton aria-label='Выход' onClick={onLogout}><Icon24DoorArrowLeftOutline /></IconButton>}
            description={user.Role}
        >
            {`${user.Surname} ${user.Name}`}
        </SimpleCell>
    </Group>
)

export default SideUserInfo;