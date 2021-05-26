import { Panel, PanelHeader } from '@vkontakte/vkui'
import React from 'react'

const AddLibraryPointPanel = props => {
    return (
        <Panel id={props.id}>
            <PanelHeader>Новый библиотечный пункт</PanelHeader>
        </Panel>
    )
}

export default AddLibraryPointPanel