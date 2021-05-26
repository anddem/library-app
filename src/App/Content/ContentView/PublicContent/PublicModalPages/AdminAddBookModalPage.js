import { ModalPage, ModalPageHeader } from '@vkontakte/vkui';
import React, { useState } from 'react';
import { EditBookInfoForm } from './createBook';

const AdminAddBookModalPage = props => {

    const [placeholder, setPlaceholder] = useState(null);

    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal(null)}>
            <ModalPageHeader>
                Добавить книгу в библиотечный каталог
            </ModalPageHeader>
            {placeholder ?
                placeholder :
                <EditBookInfoForm props={props} setPlaceholder={setPlaceholder}/>
                }
        </ModalPage>
    );
};

export default AdminAddBookModalPage;