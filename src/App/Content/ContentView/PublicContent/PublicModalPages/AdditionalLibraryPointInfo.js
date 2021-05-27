import { ModalPage, ModalPageHeader, Group, SimpleCell, InfoRow } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import {Book} from '../../../ModalPages/BooksModalPages/RenderBooksList';

const ReadersList = ({ readers }) => {
    return (
        <Group>
            {readers.map(reader => <SimpleCell disabled multiline>
                <InfoRow key={reader.Id} header={`ID: ${reader.Id}, ${reader.Role}`}>{reader.Surname} {reader.Name}</InfoRow>
            </SimpleCell>)}
        </Group>
    );
};

export const BooksList = ({books}) => (
    <Group>
        {books.map(book => <Book book={book} key={book.Id} indicator={`Заказов: ${book.Taken}`}/>)}
    </Group>
)

export const AdditionalLibraryPointInfo = props => {
    const [readers, setReaders] = useState(null);
    const [ordersTop, setOrdersTop] = useState(null);
    const [currentList, setCurrentList] = useState(null);

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + `/library/${props.point.Name}/readers`)
        .then(response => response.json())
        .then(data => setReaders(data))
        .catch(error => console.error(error)),
        [props.point]
    );

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + '/books/orders/top?param=library_point&param_name=' + props.point.Name)
    .then(response => response.json())
    .then(data => setOrdersTop(data)), [props.point]
    )

    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal(null)}>
            <ModalPageHeader>{props.point.Name}</ModalPageHeader>
                <Group>
                    {readers ? <SimpleCell onClick={() => setCurrentList(<ReadersList readers={readers.data} />)} indicator={readers.count}>Открыть список читателей</SimpleCell> : null}
                    {ordersTop ? <SimpleCell onClick={() => setCurrentList(<BooksList books={ordersTop.data}/>)}  indicator={ordersTop.count}>Посмотреть топ заказов</SimpleCell> : null}
                </Group>
                {currentList ?? null}
        </ModalPage>
    );
};
