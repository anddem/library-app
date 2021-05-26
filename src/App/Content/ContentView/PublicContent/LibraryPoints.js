import { Group, Panel, PanelHeader, SimpleCell } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'

const RenderPointsList = props => {
    return (
        <Group>
        {props.data.map(
            point => <SimpleCell disabled={props.disabled} onClick={() => props.openPointInfo(point)} indicator={point.Can_issue_books ? 'Может выдавать книги' : ''} key={point.Name}>{point.Name}</SimpleCell>)}
        </Group>
    )
}

const LibraryPoints = props => {
    const [points, setPoints] = useState(null)
    const userIsAdmin = props.user.Role === 'Администратор'

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + '/library')
        .then(response => response.json())
        .then(({data}) => setPoints(data))
    }, [])

    return (
        <Panel id={props.id}>
            <PanelHeader >
                Библиотечные пункты
            </PanelHeader>
            {points ? <RenderPointsList disabled={!userIsAdmin} openPointInfo={props.openPointInfo} data={points}/> : null}
        </Panel>
    )
}

export default LibraryPoints