import React from 'react';
import {FormItem, Input} from '@vkontakte/vkui'

const FormInput = ({name, status, value, 
                    placeholder, onChange,
                    type='text', required}) => (
    <FormItem>
        <Input 
            name={name}
            status={status} 
            value={value}
            placeholder={placeholder} 
            onChange={({ target }) => onChange(target.value)} 
            type={type} 
            required={required} 
        />
    </FormItem>
)

export default FormInput