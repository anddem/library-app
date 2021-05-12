import { Avatar, RichCell } from '@vkontakte/vkui'
import React from 'react'

const SideUserInfo = ({user}) => {
    return (
        <RichCell
            disabled
            multiline
            before={<Avatar size={48} src={user.avatarUrl}/>}
            text={user.name}
            caption={user.role}
        />
    )
}

export default SideUserInfo;