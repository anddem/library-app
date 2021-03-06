import { FormItem, FormStatus } from '@vkontakte/vkui'
import React from 'react'

const CustomFormStatus = props => (
    <FormItem>
        <FormStatus header={props.header} mode={props.mode}>
            {props.text}
        </FormStatus>
    </FormItem>
)

export default CustomFormStatus