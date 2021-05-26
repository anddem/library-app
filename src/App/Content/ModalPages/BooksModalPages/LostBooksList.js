import { ModalPage, ModalPageHeader, PanelSpinner } from '@vkontakte/vkui';
import React, {useState, useEffect} from 'react'
import RenderBooksList from './RenderBooksList';

const LostBooksModalPage = props => {
    const [booksList, setBooksList] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + `/readers/${props.readerId}/books?status=lost`)
            .then(response => response.json())
            .then(data => setBooksList(data))
            .catch(error => console.error(error));
    }, [props.readerId]);

    return (
        <ModalPage id={props.id} onClose={props.onCLose}>
            <ModalPageHeader>Потерянные книги {booksList ? `(${booksList.count})` : ''}</ModalPageHeader>
            {booksList ? <RenderBooksList list={booksList} /> : <PanelSpinner/>}
        </ModalPage>
    );
};

export default LostBooksModalPage