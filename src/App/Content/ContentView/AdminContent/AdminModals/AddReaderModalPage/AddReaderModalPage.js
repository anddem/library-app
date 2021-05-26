import { ModalPage, ModalPageHeader } from '@vkontakte/vkui';
import React, {useState} from 'react'
import { EditReaderInformationForm } from './createReader';

const AddReaderModalPage = props => {

    const [placeholder, setPlaceholder] = useState(null)

    return (
        <ModalPage id={props.id} onClose={props.onClose}>
            <ModalPageHeader>Добавить читателя</ModalPageHeader>
            {placeholder ?? <EditReaderInformationForm props={props.props ?? props} setPlaceholder={setPlaceholder}/>}
        </ModalPage>
    )
}

export default AddReaderModalPage;