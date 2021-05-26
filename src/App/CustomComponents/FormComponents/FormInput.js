import React from 'react';
import {FormItem, Input} from '@vkontakte/vkui'

const FormInput = ({name, value, placeholder, onChange, type='text', required}) => {
    return (
        <FormItem>
            <Input required={required} type={type} name={name} value={value} placeholder={placeholder} onChange={({target}) => onChange(target.value)}/>
        </FormItem>
    )
}

export default FormInput