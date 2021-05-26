import { ModalPage, ModalPageHeader, PanelSpinner } from '@vkontakte/vkui';
import React, { useState, useEffect } from 'react';
import RenderBooksList from './RenderBooksList';

const IssuedBooksModalPage = props => {
    const [booksList, setBooksList] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + `/readers/${props.readerId}/books`)
            .then(response => response.json())
            .then(data => setBooksList(data))
            .catch(error => console.error(error));
    }, [props.readerId]);

    return (
        <ModalPage id={props.id} onClose={props.onCLose}>
            <ModalPageHeader>Выданные книги {booksList ? `(${booksList.count})` : ''}</ModalPageHeader>
            {booksList ? <RenderBooksList list={booksList} /> : <PanelSpinner/>}
        </ModalPage>
    );
};

export default IssuedBooksModalPage;
