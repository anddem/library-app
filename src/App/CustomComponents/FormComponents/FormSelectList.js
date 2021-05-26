import React from 'react'
import {NativeSelect, FormItem} from '@vkontakte/vkui'

const FormSelectList = props => (
    <FormItem>
        <NativeSelect
            required={props.required}
            status={props.status}
            placeholder={props.placeholder}
            name={props.name}
            value={props.value}
            onChange={({ target }) => props.onChange(target.value)}
        >
            {props.values.map(value => <option key={value} value={value}>{value}</option>)}
        </NativeSelect>
    </FormItem>
)

export default FormSelectList