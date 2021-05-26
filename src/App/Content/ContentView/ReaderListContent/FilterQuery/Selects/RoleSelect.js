import React, { useEffect, useState } from 'react'
import FormSelectList from '../../../../../CustomComponents/FormComponents/FormSelectList'

function getRolesList(setRolesList) {
    fetch(`${process.env.REACT_APP_API_HOST}/roles-list`)
        .then(response => response.json())
        .then(({data}) => setRolesList(data.rows))
}

const RoleSelect = (props) => {
    const [rolesList, setRolesList] = useState('')

    useEffect(() => getRolesList(setRolesList), [])

    return (
        <FormSelectList
            required
            selectName={'roles'}
            selectList={Object.keys(rolesList)}
            selectValue={props.role}
            onSelectChange={props.setRole}
            selectPlaceholder='Выберите роль'
        />
    )
}

export default RoleSelect