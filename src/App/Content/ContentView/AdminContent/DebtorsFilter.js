import { PanelHeader, Panel, Group, FormLayout, PanelSpinner, Placeholder } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { ReaderListFromCells } from './AdminReaders/AdminReaders';
import InputGroup from '../../../CustomComponents/FormComponents/InputGroup';
import UniversityInfoSelect from './ReaderListContent/FilterQuery/Selects/UniversityInfoSelect';
import FormButton from '../../../CustomComponents/FormComponents/FormButton';
import { Icon56ErrorOutline } from '@vkontakte/icons';

export const DebtorsFilter = ({ setBody }) => {
    const [debtPeriod, setDebtPeriod] = useState(10);
    const [libraryPoint, setLibraryPoint] = useState('');
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [group, setGroup] = useState('');
    const [role, setRole] = useState('');

    function onClick() {
        setBody({
            debtPeriod: debtPeriod !== '' ? debtPeriod : 10,
            libraryPoint: libraryPoint !== '' ? libraryPoint : null,
            faculty: faculty !== '' ? faculty : null,
            department: department !== '' ? department : null,
            group: group !== '' ? group : null,
            role: role !== '' ? role : null,
        });
    }

    return (
        <FormLayout>
            <InputGroup inputs={{
                'debtPeriod': {
                    value: debtPeriod,
                    placeholder: 'Введите период задолженности в днях',
                    onChange: setDebtPeriod,
                    type: 'number'
                },
                'libraryPoint': {
                    value: libraryPoint,
                    placeholder: 'Введите название пункта',
                    onChange: setLibraryPoint
                }
            }} mode='horizontal' />
            <UniversityInfoSelect
                faculty={faculty} setFaculty={setFaculty}
                department={department} setDepartment={setDepartment}
                group={group} setGroup={setGroup}
                role={role} setRole={setRole}
                universityMode='horizontal' />
            <FormButton onClick={onClick} disabled={debtPeriod < 0} size='l' stretched mode='primary' text='Применить фильтры' />
        </FormLayout>
    );
};

export const AdminDebtors = props => {
    const [body, setBody] = useState({});
    const [debtors, setDebtors] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + '/readers/debtors', {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(data => {
            setDebtors(data);
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
            <PanelHeader>Задолжники</PanelHeader>
            <Group>
                {loading
                    ? <PanelSpinner height={96} size='large' />
                    : debtors
                        ? <DebtorsFilter setBody={setBody} />
                        : <Placeholder icon={<Icon56ErrorOutline />} header='Ошибка при получении данных' />}
                {debtors ? <ReaderListFromCells readerList={debtors} openReaderInfo={props.openReaderInfo} /> : null}
            </Group>
        </Panel>
    );
};
