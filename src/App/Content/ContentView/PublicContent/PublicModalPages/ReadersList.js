import { ModalPage, ModalPageHeader, Header, Group, SimpleCell, InfoRow, PanelHeaderBack } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';

const ReadersList = ({ readers }) => {
    return (
        <Group>
            {readers.map(reader => <SimpleCell disabled multiline>
                <InfoRow key={reader.Id} header={`ID: ${reader.Id}, ${reader.Role}`}>{reader.Surname} {reader.Name}</InfoRow>
            </SimpleCell>)}
        </Group>
    );
};
export const AdditionalLibraryPointInfo = props => {
    const [readers, setReaders] = useState(null);
    const [readersList, setReadersList] = useState(null);

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + `/library/${props.point.Name}/readers`)
        .then(response => response.json())
        .then(data => setReaders(data))
        .catch(error => console.error(error)),
        [props.point]
    );

    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal(null)}>
            {readersList ?
                <ModalPageHeader left={<PanelHeaderBack onClick={() => setReadersList(null)} />}>
                    Список читателей пункта
                </ModalPageHeader> :
                <ModalPageHeader>
                    Информация о пункте
                </ModalPageHeader>}
            {readersList ??
                <Group header={<Header> {props.point.Name}</Header>}>
                    {readers ? <SimpleCell onClick={() => setReadersList(<ReadersList readers={readers.data} />)} indicator={readers.count}>Открыть список читателей</SimpleCell> : null}
                </Group>}
        </ModalPage>
    );
};
