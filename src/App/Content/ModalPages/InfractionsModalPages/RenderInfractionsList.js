import React from 'react';
import { Group, SimpleCell} from '@vkontakte/vkui';

export function TimestampToDate (timestamp) {
    let date = new Date(timestamp * 1000)
    return `${date.getDate()}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
}

const Infraction = ({ infraction, indicator }) => (
    <Group mode='card'>
        <Group mode='plain'>
        <SimpleCell disabled indicator={indicator}>{infraction.Infraction}</SimpleCell>
        <SimpleCell disabled description='Дата выдачи'>{TimestampToDate(infraction.Issue_date)}</SimpleCell>
        <SimpleCell disabled description='Дата снятия запрета'>{infraction.End_of_ban_date ? TimestampToDate(infraction.End_of_ban_date) : 'Без запрета'}</SimpleCell>
        <SimpleCell disabled description='Денежный штраф'>{infraction.Monetary_fine ?? 'Без штрафа'}</SimpleCell>

        </Group>
    </Group>
);
const RenderInfractionsList = ({ list }) => (
    <Group>
        {list.data.map(infraction => <Infraction key={infraction.Num} infraction={infraction} indicator={infraction.Is_active ? 'Активно' : ''} />)}
    </Group>
);

export default RenderInfractionsList