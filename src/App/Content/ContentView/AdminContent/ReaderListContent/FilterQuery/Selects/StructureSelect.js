import React, { useEffect, useState } from 'react'
import FormSelectList from '../../../../../../CustomComponents/FormComponents/FormSelectList'

function getUniversityStructure(setUniversityStructure) {
    fetch(process.env.REACT_APP_API_HOST + '/university')
    .then(response => response.json())
    .then(({data}) => setUniversityStructure(data))
}

const StructureSelect = (props) => {
    const [universityStructure, setUniversityStructure] = useState('')

    useEffect(() => getUniversityStructure(setUniversityStructure), [])

    function onFacultyChange (faculty) {
        props.setFaculty(faculty)
        onDepartmentChange("")
    }
    
    function onDepartmentChange (department) {
        props.setDepartment(department)
        props.setGroup('')
    }
    

    return (
        <>
            <FormSelectList
                required={props.required}
                status={props.status}
                name="faculty"
                values={Object.keys(universityStructure)}
                value={props.faculty}
                onChange={onFacultyChange}
                placeholder="Выберите факультет"
            />
            {
                props.faculty ?
                <FormSelectList
                    required={props.required}
                    status={props.status}
                    name="department"
                    values={Object.keys(universityStructure[props.faculty])}
                    value={props.department}
                    onChange={onDepartmentChange}
                    placeholder="Выберите кафедру"
                /> : ''
            }
            {
                props.department ?
                <FormSelectList
                    required={props.required}
                    status={props.status}
                    name="group"
                    values={universityStructure[props.faculty][props.department]}
                    value={props.group}
                    onChange={props.setGroup}
                    placeholder='Выберите группу'
                /> : ''
            }
        </>
    )
}

export default StructureSelect