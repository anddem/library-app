import { FormLayoutGroup } from '@vkontakte/vkui'
import React from 'react'
import RoleSelect from './RoleSelect'
import StructureSelect from './StructureSelect'

const UniversityInfoSelect = (props) => {
    return (
        <FormLayoutGroup>
            <RoleSelect role={props.role} setRole={props.setRole}/>
            <StructureSelect 
                faculty={props.faculty} setFaculty={props.setFaculty}
                department={props.department} setDepartment={props.setDepartment}
                group={props.group} setGroup={props.setGroup}
            />
        </FormLayoutGroup>
    )
}

export default UniversityInfoSelect