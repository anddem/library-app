import React from 'react'
import {NativeSelect, FormItem} from '@vkontakte/vkui'

const Option = ({value, text}) => <option value={value}>{text}</option>

const SelectList = ({name, list, value, onChange, placeholder}) => {
    return (
        <NativeSelect placeholder={placeholder} name={name} value={value} onChange={({target}) => onChange(target.value)}>
            {list.map(item => <Option value={item} text={item} key={item}/>)}
        </NativeSelect>
    )
}

const FormSelectList = ({selectName, required, selectList, selectValue, onSelectChange, selectPlaceholder}) => {
    return (
        <FormItem>
            <SelectList required={required} name={selectName} list={selectList} value={selectValue} onChange={onSelectChange} placeholder={selectPlaceholder}/>
        </FormItem>
    )
}

export default FormSelectList