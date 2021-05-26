import React from 'react';
import { Group, SimpleCell, InfoRow } from '@vkontakte/vkui';

function TimestampToDate (timestamp) {
    let date = new Date(timestamp * 1000)
    return `${date.getDate()}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
}

const Infraction = ({ infraction, indicator }) => (
    <Group mode='card'>
        <SimpleCell multiline disabled indicator={indicator}>
            <InfoRow header='Нарушение' style={{ marginBottom: 10 }}>{infraction.Infraction}</InfoRow>
            <InfoRow header='Дата выдачи'>{TimestampToDate(infraction.Issue_date)}</InfoRow>
        </SimpleCell>
    </Group>
);
const RenderInfractionsList = ({ list }) => (
    <Group>
        {list.data.map(infraction => <Infraction key={infraction.Num} infraction={infraction} indicator={infraction.Is_active ? 'Активно' : ''} />)}
    </Group>
);

export default RenderInfractionsList