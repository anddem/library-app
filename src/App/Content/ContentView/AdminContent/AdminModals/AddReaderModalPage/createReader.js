import { FormLayout, Placeholder } from '@vkontakte/vkui';
import React, { useState } from 'react';
import FormButton from '../../../../../CustomComponents/FormComponents/FormButton';
import InputGroup from '../../../../../CustomComponents/FormComponents/InputGroup';
import ErrorPlaceholder from '../../../../../CustomComponents/Placeholders/ErrorPlaceholder';
import RoleSelect from '../../ReaderListContent/FilterQuery/Selects/RoleSelect';
import StructureSelect from '../../ReaderListContent/FilterQuery/Selects/StructureSelect';

function createReader(body, setPlaceholder) {
    fetch(process.env.REACT_APP_API_HOST + '/readers', {
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(response => response.ok ?
            setPlaceholder(<Placeholder header='Читатель зарегистрирован' />) :
            setPlaceholder(<Placeholder header='Ошибка при регистрации читателя' />))
        .catch(error => setPlaceholder(<ErrorPlaceholder />));
}

export const EditReaderInformationForm = ({ props, setPlaceholder }) => {

    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [middleName, setMiddleName] = useState(props.middleName);

    const [role, setRole] = useState(props.role);
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [group, setGroup] = useState('');

    const onButtonClick = () => {
        if (!role)
            return;
        let body = {
            firstName: firstName,
            lastName: lastName,
            middleName: middleName !== '' ? middleName : null,
            role: role,
            faculty: faculty === '' ? null : faculty,
            department: department === '' ? null : department,
            group: group === '' ? null : group
        };
        if (props.onClick)
            props.onClick(body);
        else
            createReader(body, setPlaceholder);
    };

    return (
        <FormLayout name='addReader'>
            <InputGroup
                inputs={{
                    'addReaderLasttName': {
                        'value': lastName,
                        'onChange': setLastName,
                        'placeholder': 'Фамилия',
                        'required': true
                    },
                    'addReaderFirstName': {
                        'value': firstName,
                        'onChange': setFirstName,
                        'placeholder': 'Имя',
                        'required': true
                    },
                    'addReaderMiddleName': {
                        'value': middleName,
                        'onChange': setMiddleName,
                        'placeholder': 'Отчество'
                    }
                }} mode='horizontal' />
            <RoleSelect role={role} setRole={setRole} required status={role ? 'valid' : 'error'} />
            <StructureSelect
                faculty={faculty} setFaculty={setFaculty}
                department={department} setDepartment={setDepartment}
                group={group} setGroup={setGroup} />
            <FormButton stretched mode='primary' onClick={onButtonClick} size='l' text={props.text ?? 'Зарегистрировать'} />
        </FormLayout>
    );
};
