import { Panel, PanelHeader, Group, PanelSpinner, Placeholder } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';
import { ReaderListFromCells } from './AdminReaders/AdminReaders';
import { DebtorsFilter } from './DebtorsFilter';
import { Icon56ErrorOutline } from '@vkontakte/icons';


export const AdminBanned = props => {
    const [body, setBody] = useState({});
    const [banned, setBanned] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + '/readers/banned', {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(data => {
            setBanned(data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        }),
        [body]
    );

    return (
        <Panel id={props.id}>
            <PanelHeader>Без доступа к библиотеке</PanelHeader>
            <Group>
                {loading
                    ? <PanelSpinner height={96} size='large' />
                    : banned
                        ? <DebtorsFilter setBody={setBody} />
                        : <Placeholder icon={<Icon56ErrorOutline />} header='Ошибка при получении данных' />}
                {banned ? <ReaderListFromCells readerList={banned} openReaderInfo={props.openReaderInfo} /> : null}
            </Group>
        </Panel>
    );
};
