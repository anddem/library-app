import { FormLayout, Panel, PanelHeader } from '@vkontakte/vkui'
import React, {useState} from 'react'
import CustomFormStatus from '../../../CustomComponents/FormComponents/CustomFormStatus'
import FormButton from '../../../CustomComponents/FormComponents/FormButton'
import InputGroup from '../../../CustomComponents/FormComponents/InputGroup'
import UniversityInfoSelect from '../ReaderListContent/FilterQuery/Selects/UniversityInfoSelect'

async function createReaderQuery (body) {
    const response = await fetch(process.env.REACT_APP_API_HOST + '/reader', {
        method: 'POST',
        body: JSON.stringify(body)
    })
    const result = await response.json()
    return result
}

const AddReaderPanel = props => {
    const [formStatus, setFormStatus] = useState(null)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [surname, setSurname] = useState('')

    const [role, setRole] = useState('')
    const [faculty, setFaculty] = useState('')
    const [department, setDepartment] = useState('')
    const [group, setGroup] = useState('')

    const onClick = () => {
        if (!(firstName && lastName && role))
            setFormStatus(<CustomFormStatus header='Заполните Фамилию, Имя и Роль' mode='error' text='Остальные поля заполняются по желанию'/>)
        else {
            setFormStatus(null)
            createReaderQuery(
                {
                    'firstName': firstName,
                    'lastName': lastName,
                    'surname': surname,
                    'role': role,
                    'faculty': faculty,
                    'department': department,
                    'group': group
                }).then(result => setFormStatus(<CustomFormStatus header={result.header} mode={result.status} text={result.text}/>))
        }

    }

    return (
        <Panel id={props.id}>
            <PanelHeader>Добавление читателя</PanelHeader>
            <FormLayout>
                {formStatus}
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
                    'surname': {
                        'value': surname,
                        'onChange': setSurname,
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
        </Panel>
    )
}

export default AddReaderPanel