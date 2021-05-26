import { FormLayoutGroup } from '@vkontakte/vkui'
import React from 'react'
import FormInput from './FormInput'
const InputGroup = ({inputs, mode}) => {
    return (
        <FormLayoutGroup mode={mode}>
            {Object.keys(inputs).map(key => <FormInput key={key}
                                                name={key} value={inputs[key].value} placeholder={inputs[key].placeholder}
                                                onChange={inputs[key].onChange} type={inputs[key].type ? inputs[key].type : 'text'} required={inputs[key].required}
                                            />)}
        </FormLayoutGroup>
    )
}

export default InputGroup;