import React, { useEffect, useState } from 'react'
import FormSelectList from '../../../../../../CustomComponents/FormComponents/FormSelectList'

function getRolesList(setRoles) {
    fetch(process.env.REACT_APP_API_HOST + '/roles')
        .then(response => response.json())
        .then(({data}) => setRoles(data))
}

const RoleSelect = props => {
    const [roles, setRoles] = useState('')

    useEffect(() => getRolesList(setRoles), [])

    return (
        <FormSelectList
            status={props.status}
            required={props.required}
            name={props.name}
            values={roles ? Object.keys(roles) : []}
            value={props.role}
            onChange={props.setRole}
            placeholder='Выберите должность'
        />
    )
}

export default RoleSelect