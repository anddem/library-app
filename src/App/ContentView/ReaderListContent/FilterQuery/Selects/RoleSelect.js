import React, { useEffect, useState } from 'react'
import FormSelectList from '../../../../CustomComponents/FormComponents/FormSelectList'

function getRolesList(setRolesList) {
    fetch('http://localhost:8800/roles-list')
        .then(response => response.json())
        .then(({data}) => setRolesList(data.rows))
}

const RoleSelect = (props) => {
    const [rolesList, setRolesList] = useState('')

    useEffect(() => getRolesList(setRolesList), [])

    return (
        <FormSelectList
            selectName={'roles'}
            selectList={Object.keys(rolesList)}
            selectValue={props.role}
            onSelectChange={props.setRole}
            selectPlaceholder='Выберите роль'
        />
    )
}

export default RoleSelect