import { Icon20ChevronRightOutline } from '@vkontakte/icons';
import { CellButton, Group, Header, ModalPage, ModalPageHeader, PanelHeaderBack, PanelHeaderButton, PanelHeaderClose, PanelHeaderEdit, SimpleCell } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';
import { EditReaderInfo } from './EditReaderInfo';

const ReaderStatistics = props => (
    <Group header={<Header>Статистика</Header>} mode='card'>
        <InformationCell
            after={props.reader.Issued ? <Icon20ChevronRightOutline /> : null}
            indicator={props.reader.Issued ?? 0}
            text='Книг на руках'
            onClick={() => props.setActiveModal('issuedBooksList')}
            disabled={!props.reader.Issued}
        />
        <InformationCell
            after={props.reader.Lost ? <Icon20ChevronRightOutline /> : null}
            indicator={props.reader.Lost ?? 0}
            onClick={() => props.setActiveModal('lostBooksList')}
            text='Потеряно книг'
            disabled={!props.reader.Lost}
        />
        <InformationCell
            after={props.reader.Total_infractions ? <Icon20ChevronRightOutline /> : null}
            indicator={props.reader.Total_infractions ?? 0}
            onClick={() => props.setActiveModal('issuedInfractionsList')}
            text='Нарушений'
            disabled={!props.reader.Total_infractions}
        />
        <InformationCell
            after={props.reader.Active_infractions ? <Icon20ChevronRightOutline /> : null}
            indicator={props.reader.Active_infractions ?? 0}
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
export const ReaderRoleInformation = ({canEditInfo, reader, editReaderInfo }) => (
    <Group mode='card'>
        <InformationCell disabled indicator={reader.Role} text='Должность' />
        <InformationCell disabled indicator={reader.Faculty} text='Факультет' />
        <InformationCell disabled indicator={reader.Department} text='Кафедра' />
        <InformationCell disabled indicator={reader.Group} text='Группа' />
        {canEditInfo ? <CellButton onClick={editReaderInfo}>Редактировать информацию</CellButton> : null}
    </Group>
);
export const ReaderModalPageContent = props => (
    <Group separator>
        <ReaderRoleInformation canEditInfo={props.canEditInfo} reader={props.reader} editReaderInfo={props.editReaderInfo}/>
        <ReaderStatistics reader={props.reader} setActiveModal={props.setActiveModal} />
    </Group>
);

function deleteReader (readerId, setActiveModal) {
    fetch(process.env.REACT_APP_API_HOST + '/readers/' + readerId, {
        method: "DELETE"
    }).then(response => setActiveModal(null))
}

const ReaderModalPage = props => {
    const [reader, setReader] = useState(null);
    const [editInfo, setEditInfo] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + `/readers/${props.readerId}`)
            .then(response => response.json())
            .then(({ data }) => setReader(data[0]));
    }, [props.readerId, editInfo]);

    return (
        <ModalPage id={props.id} onClose={props.onClose} settlingHeight={100}>
            <ModalPageHeader
                left={
                    editInfo ? 
                    <PanelHeaderBack onClick={() => setEditInfo(false)}/> : 
                    '' 
                }
                right={
                    editInfo ?
                        confirmDelete ? 
                        <>
                            <PanelHeaderClose onClick={() => setConfirmDelete(false)}/>
                            <PanelHeaderEdit isActive onClick={() => deleteReader(reader.Id, props.setActiveModal)}/>
                        </> :
                        <PanelHeaderButton onClick={() => setConfirmDelete(true)}>Удалить</PanelHeaderButton> :
                    ''
                }
                >
                {reader ?
                `${reader.Surname} ${reader.Name} ${reader.Mid_name ?? ''}` :
                ''
                }
            </ModalPageHeader>
            {reader ? 
                editInfo ?
                <EditReaderInfo reader={reader}/> :
                <ReaderModalPageContent canEditInfo={true} reader={reader} editReaderInfo={() => setEditInfo(true)} setActiveModal={props.setActiveModal} /> :
            ''}
        </ModalPage>
    );
};

export default ReaderModalPage