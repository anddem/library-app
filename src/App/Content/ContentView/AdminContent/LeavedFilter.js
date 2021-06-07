import { Panel, PanelHeader, Group, PanelSpinner, Placeholder, FormLayout, DatePicker, FormItem, FormLayoutGroup } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';
import { ReaderListFromCells } from './AdminReaders/AdminReaders';
import { Icon56ErrorOutline } from '@vkontakte/icons';
import UniversityInfoSelect from './ReaderListContent/FilterQuery/Selects/UniversityInfoSelect';
import FormButton from '../../../CustomComponents/FormComponents/FormButton';

const LeavedFilter = props => {
    const [leaveAfterDate, setLeaveAfterDate] = useState({ day: 1, month: 1, year: 2020 });
    const [leaveBeforeDate, setLeaveBeforeDate] = useState({ day: 1, month: 1, year: 2022 });
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [group, setGroup] = useState('');
    const [role, setRole] = useState('');

    function onClick() {
        props.setBody({
            leaveAfterDay: leaveAfterDate.day,
            leaveAfterMonth: leaveAfterDate.month,
            leaveAfterYear: leaveAfterDate.year,
            leaveBeforeDay: leaveBeforeDate.day,
            leaveBeforeMonth: leaveBeforeDate.month,
            leaveBeforeYear: leaveBeforeDate.year,
            faculty: faculty !== '' ? faculty : null,
            department: department !== '' ? department : null,
            group: group !== '' ? group : null,
            role: role !== '' ? role : null,
        });
    }

    return (
        <FormLayout>
            <FormLayoutGroup mode='horizontal'>
                <FormItem top='Выбывшие после:'>
                    <DatePicker
                        min={{ day: 1, month: 1, year: 2020 }}
                        max={{ day: 1, month: 1, year: 2022 }}
                        defaultValue={leaveAfterDate}
                        onDateChange={setLeaveAfterDate}
                        dayPlaceholder="ДД"
                        monthPlaceholder="ММММ"
                        yearPlaceholder="ГГГГ" />
                </FormItem>
                <FormItem top='Выбывшие до:'>
                    <DatePicker
                        min={{ day: 1, month: 1, year: 2020 }}
                        max={{ day: 1, month: 1, year: 2022 }}
                        defaultValue={leaveBeforeDate}
                        onDateChange={setLeaveBeforeDate}
                        dayPlaceholder="ДД"
                        monthPlaceholder="ММММ"
                        yearPlaceholder="ГГГГ" />
                </FormItem>
            </FormLayoutGroup>
            <UniversityInfoSelect
                faculty={faculty} setFaculty={setFaculty}
                department={department} setDepartment={setDepartment}
                group={group} setGroup={setGroup}
                role={role} setRole={setRole}
                universityMode='horizontal' />
            <FormButton onClick={onClick} size='l' stretched mode='primary' text='Применить фильтр' />
        </FormLayout>

    );
};

export const AdminLeaveReaders = props => {
    const [body, setBody] = useState({
        leaveAfterDay: 1,
        leaveAfterMonth: 1,
        leaveAfterYear: 2020,
        leaveBeforeDay: 1,
        leaveBeforeMonth: 1,
        leaveBeforeYear: 2022
    });
    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + '/readers/leaved', {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => response.json())
        .then(data => {
            setLeave(data);
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
            <PanelHeader>Выбывшие читатели</PanelHeader>
            <Group>
                {loading
                    ? <PanelSpinner height={96} size='large' />
                    : leave
                        ? <LeavedFilter setBody={setBody} />
                        : <Placeholder icon={<Icon56ErrorOutline />} header='Ошибка при получении данных' />}
                {leave ? <ReaderListFromCells readerList={leave} openReaderInfo={props.openReaderInfo} /> : null}
            </Group>
        </Panel>
    );
};
