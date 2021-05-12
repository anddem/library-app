import React from 'react';
import {FormItem, Input} from '@vkontakte/vkui'

const FormInput = ({name, value, placeholder, onChange}) => {
    return (
        <FormItem>
            <Input name={name} value={value} placeholder={placeholder} onChange={({target}) => onChange(target.value)}/>
        </FormItem>
    )
}

export default FormInput