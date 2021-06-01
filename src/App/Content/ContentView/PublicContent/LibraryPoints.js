import { Group, Header, Panel, PanelHeader, SimpleCell } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import { Icon24NotebookCheckOutline } from '@vkontakte/icons';

const RenderPointsList = props => {
    return (
        <Group mode='plain' header={<Header>Найдено: {props.data?.count}</Header>}>
        {props.data?.data.map(
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
        .then(data => setPoints(data))
    }, [])

    return (
        <Panel id={props.id}>
            <PanelHeader>
                Библиотечные пункты
            </PanelHeader>
            <Group>
                {userIsAdmin ? <SimpleCell onClick={props.openStatistics} indicator={<Icon24NotebookCheckOutline/>}>Статистика по библиотеке</SimpleCell> : null}
                {points ? <RenderPointsList disabled={!userIsAdmin} openPointInfo={props.openPointInfo} data={points}/> : null}
            </Group>
        </Panel>
    )
}

export default LibraryPoints