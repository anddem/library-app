import { Button, FormItem } from '@vkontakte/vkui'
import React from 'react'

const FormButton = (props) => <FormItem><Button stretched={props.stretched} mode={props.mode} onClick={props.onClick} size={props.size}>{props.text}</Button></FormItem>

export default FormButton;