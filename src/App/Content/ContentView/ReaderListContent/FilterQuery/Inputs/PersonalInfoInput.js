import { FormLayoutGroup} from '@vkontakte/vkui';
import React from 'react';
import FormInput from '../../../../../CustomComponents/FormComponents/FormInput';

const PersonalInfoInput = (props) => {
    return (
        <FormLayoutGroup mode='horizontal'>
            <FormInput name='lastName' placeholder='Фамилия' value={props.lastName} onChange={props.setLastName}/>
            <FormInput name='firstName' placeholder='Имя' value={props.firstName} onChange={props.setFirstName}/>
            <FormInput name='surname' placeholder='Отчество' value={props.surname} onChange={props.setSurname}/>
        </FormLayoutGroup>
    )
}

export default PersonalInfoInput