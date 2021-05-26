import { FormLayout, ModalPage, ModalPageHeader } from '@vkontakte/vkui';
import React, {useState} from 'react'
import FormButton from '../../../../CustomComponents/FormComponents/FormButton';
import InputGroup from '../../../../CustomComponents/FormComponents/InputGroup';
import UniversityInfoSelect from '../../ReaderListContent/FilterQuery/Selects/UniversityInfoSelect';

const AddReaderModalPage = props => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')

    const [role, setRole] = useState('')
    const [faculty, setFaculty] = useState('')
    const [department, setDepartment] = useState('')
    const [group, setGroup] = useState('')

    const onClick = e => console.log(e)

    return (
        <ModalPage id={props.id} onClose={props.onClose}>
            <ModalPageHeader>Добавить читателя</ModalPageHeader>
            <FormLayout>
            <InputGroup
                    inputs={{
                    'lastName': {
                        'value': lastName,
                        'onChange': setLastName,
                        'placeholder': 'Фамилия',
                        'required': true
                    }, 
                    'firstName': {
                        'value': firstName,
                        'onChange': setFirstName,
                        'placeholder': 'Имя',
                        'required': true
                    },
                    'middleName': {
                        'value': middleName,
                        'onChange': setMiddleName,
                        'placeholder': 'Отчество'
                    }
                    }} mode='horizontal'
                />
                <UniversityInfoSelect
                    role={role} setRole={setRole}
                    faculty={faculty} setFaculty={setFaculty}
                    department={department} setDepartment={setDepartment}
                    group={group} setGroup={setGroup}
                />
            <FormButton stretched mode='primary' onClick={onClick} size='l' text='Зарегистрировать читателя'/>
            
            </FormLayout>
        </ModalPage>
    )
}

export default AddReaderModalPage;