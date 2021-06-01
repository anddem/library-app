import { ModalPage, ModalPageHeader, Group, SimpleCell, PanelHeaderBack, PanelSpinner, FormLayout, Placeholder } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import FormButton from '../../../../CustomComponents/FormComponents/FormButton';

function reserveBook(book, point, user, setPlaceholder) {
    fetch(process.env.REACT_APP_API_HOST + '/library/' + point.Name + '/reserve', {
        method: 'POST',
        body: JSON.stringify({
            bookId: book.Id,
            libraryPoint: point.Name,
            readerId: user.Id,
        })
    })
    .then(response => setPlaceholder(
        response.ok ? <Placeholder header='Экземпляр зарезервирован'/> :
        <Placeholder header='Ошибка при резерве, попробуйте позже'/>)
    )
}

const ReserveBookForm = ({ book, point, user, onReserveBook }) => {
    return (
        <Group>
            <SimpleCell disabled description='Название пункта'>{point.Name}</SimpleCell>
            <SimpleCell disabled description='Название книги'>{book.Title}</SimpleCell>
            <SimpleCell disabled description='Авторы'>{book.Authors}</SimpleCell>
            <SimpleCell disabled indicator={book.Available}>Доступно книг</SimpleCell>
            <FormLayout>
                <FormButton
                    stretched
                    mode='primary'
                    disabled={!point.Can_issue_books || user.Role === 'Абитуриент'}
                    onClick={onReserveBook}
                    size='l'
                    text={point.Can_issue_books ?
                        user.Role === 'Абитуриент' ?
                            'Вы не можете резервировать книги' :
                            'Зарезервировать экземпляр'
                        : 'Пункт не может выдавать книги'} />
            </FormLayout>
        </Group>
    );
};
export const LibraryPointModalPage = props => {
    const [point, setPoint] = useState(null);
    const [placeholder, setPlaceholder] = useState(null)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + `/library/${props.libraryPoint}`)
            .then(response => response.json())
            .then(({ data }) => setPoint(data[0]))
            .catch(error => console.error(error));
    }, [props.libraryPoint]);

    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal('bookInfo')}>
            <ModalPageHeader left={<PanelHeaderBack onClick={() => props.setActiveModal('bookInfo')} />}>Информация о библиотечном пункте</ModalPageHeader>
            {placeholder ? placeholder :
                <Group>
                    {point ?
                    <ReserveBookForm
                        book={props.book} point={point}
                        user={props.user} 
                        onReserveBook={() => reserveBook(props.book, point, props.user, setPlaceholder)}/> :
                    <PanelSpinner size={56} />}
                </Group>
            }
        </ModalPage>
    );
};
