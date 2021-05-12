import React, { useEffect, useState } from 'react'
import FormSelectList from '../../../../CustomComponents/FormComponents/FormSelectList'

function getUniversityStructure(setUniversityStructure) {
    fetch('http://localhost:8800/university-structure')
    .then(response => response.json())
    .then(({structure}) => setUniversityStructure(structure))
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
                selectName="faculty"
                selectList={Object.keys(universityStructure)}
                selectValue={props.faculty}
                onSelectChange={onFacultyChange}
                selectPlaceholder="Выберите факультет"
            />
            {
                props.faculty ?
                <FormSelectList
                    selectName="department"
                    selectList={Object.keys(universityStructure[props.faculty])}
                    selectValue={props.department}
                    onSelectChange={onDepartmentChange}
                    selectPlaceholder="Выберите кафедру"
                /> : ''
            }
            {
                props.department ?
                <FormSelectList
                    selectName="group"
                    selectList={universityStructure[props.faculty][props.department]}
                    selectValue={props.group}
                    onSelectChange={props.setGroup}
                    selectPlaceholder='Выберите группу'
                /> : ''
            }
        </>
    )
}

export default StructureSelect