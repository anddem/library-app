import { FormLayout } from '@vkontakte/vkui'
import React, {useState} from 'react'
import UniversityInfoSelect from './Selects/UniversityInfoSelect'
import PersonalInfoInput from './Inputs/PersonalInfoInput'
import FormButton from '../../../../../CustomComponents/FormComponents/FormButton'

const FilterQuery = props => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')

    const [role, setRole] = useState('')
    const [faculty, setFaculty] = useState('')
    const [department, setDepartment] = useState('')
    const [group, setGroup] = useState('')

    async function onFilterSubmit (e) {
        e.preventDefault()

        let body = {}

        if (firstName) body['firstName'] = firstName
        if (lastName) body['lastName'] = lastName
        if (middleName) body['middleName'] = middleName
        if (role) body['role'] = role
        if (faculty) body['faculty'] = faculty
        if (department) body['department'] = department
        if (group) body['group'] = group
        
        props.setBody(body)
    }

    return (
            <FormLayout name='filterQuery' onSubmit={onFilterSubmit}>
                <PersonalInfoInput
                    firstName={firstName} setFirstName={setFirstName}
                    lastName={lastName} setLastName={setLastName}
                    surname={middleName} setSurname={setMiddleName}
                />
                <UniversityInfoSelect
                    role={role} setRole={setRole}
                    faculty={faculty} setFaculty={setFaculty}
                    department={department} setDepartment={setDepartment}
                    group={group} setGroup={setGroup}
                />
                <FormButton stretched mode='primary' onClick={onFilterSubmit} size='l' text='Применить фильтр'/>
            </FormLayout>
    )
}

export default FilterQuery;