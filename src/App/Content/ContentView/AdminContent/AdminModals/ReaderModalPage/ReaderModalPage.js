import { Icon20ChevronRightOutline } from '@vkontakte/icons';
import { Group, Header, ModalPage, ModalPageHeader, SimpleCell } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';

const ReaderStatistics = props => (
    <Group header={<Header>Статистика</Header>}>
        <InformationCell
            after={props.reader.Issued ? <Icon20ChevronRightOutline /> : null}
            indicator={props.reader.Issued ? props.reader.Issued : 0}
            text='Книг на руках'
            onClick={() => props.setActiveModal('issuedBooksList')}
            disabled={!props.reader.Issued}
        />
        <InformationCell
            after={props.reader.Lost ? <Icon20ChevronRightOutline /> : null}
            indicator={props.reader.Lost ? props.reader.Lost : 0}
            onClick={() => props.setActiveModal('lostBooksList')}
            text='Потеряно книг'
            disabled={!props.reader.Lost}
        />
        <InformationCell
            after={props.reader.Total_infractions ? <Icon20ChevronRightOutline /> : null}
            indicator={props.reader.Total_infractions ? props.reader.Total_infractions : 0}
            onClick={() => props.setActiveModal('issuedInfractionsList')}
            text='Нарушений'
            disabled={!props.reader.Total_infractions}
        />
        <InformationCell
            after={props.reader.Active_infractions ? <Icon20ChevronRightOutline /> : null}
            indicator={props.reader.Active_infractions ? props.reader.Active_infractions : 0}
            onClick={() => props.setActiveModal('activeInfractionsList')}
            text='Из них активных'
            disabled={!props.reader.Active_infractions}
        />
    </Group>
);
const InformationCell = (props) => (
    props.indicator !== null ?
        <SimpleCell before={props.before} after={props.after} disabled={props.disabled} indicator={props.indicator} onClick={props.onClick}>
            {props.text}
        </SimpleCell> : ''
);
const ReaderRoleInformation = ({ reader }) => (
    <Group>
        <InformationCell disabled indicator={reader.Role} text='Должность' />
        <InformationCell disabled indicator={reader.Faculty} text='Факультет' />
        <InformationCell disabled indicator={reader.Department} text='Кафедра' />
        <InformationCell disabled indicator={reader.Group} text='Группа' />
    </Group>
);
const ReaderModalPageContent = props => (
    <Group separator>
        <ReaderRoleInformation reader={props.reader} />
        <ReaderStatistics reader={props.reader} setActiveModal={props.setActiveModal} />
    </Group>
);
const ReaderModalPage = props => {
    const [reader, setReader] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + `/readers/${props.readerId}`)
            .then(response => response.json())
            .then(({ data }) => setReader(data[0]));
    }, [props.readerId]);

    return (
        <ModalPage id={props.id} onClose={props.onClose} settlingHeight={100}>
            <ModalPageHeader level='1' style={{ marginBottom: 8 }}>{reader ? `${reader.Surname} ${reader.Name} ${reader.Mid_name ? reader.Mid_name : ''}` : ''}</ModalPageHeader>
            {reader ? <ReaderModalPageContent reader={reader} setActiveModal={props.setActiveModal} /> : ''}
        </ModalPage>
    );
};

export default ReaderModalPage