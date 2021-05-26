import { Panel, PanelHeader } from '@vkontakte/vkui'
import React from 'react'

const AddBookPanel = props => {
    return (
        <Panel id={props.id}>
            <PanelHeader>Добавление книг</PanelHeader>
        </Panel>
    )
}

export default AddBookPanel