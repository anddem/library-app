import { Icon16InfoOutline, Icon28ChevronRightOutline } from '@vkontakte/icons';
import { ModalPage, ModalPageHeader, Group, SimpleCell, IconButton, PanelHeaderBack, PanelHeaderClose, PanelHeaderSubmit, PanelHeaderButton } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { BookInformation } from './BookStatistics';

const Publication = ({ userIsAdmin, publication, openBookInfo, openLibraryPointInfo }) => {
    return (
        <SimpleCell
            disabled
            before={userIsAdmin ? <IconButton onClick={() => openBookInfo(publication)}><Icon16InfoOutline/></IconButton> : ''}
            after={publication.Available ? <IconButton onClick={() => openLibraryPointInfo(publication.Library_point, publication)}><Icon28ChevronRightOutline /></IconButton> : null}
            multiline
            description={`Доступно: ${publication.Available ?? 0}, издание ${publication.Publication_year} года`}
        >
            {publication.Library_point}
        </SimpleCell>
    );
};

const Publications = ({userIsAdmin, publications, openLibraryPointInfo, openBookInfo}) => {
    return (
        <Group>
            {publications.data.map(
                (publication, i) => <Publication
                                        userIsAdmin={userIsAdmin} 
                                        key={i} 
                                        publication={publication} 
                                        openBookInfo={openBookInfo} 
                                        openLibraryPointInfo={openLibraryPointInfo}
                                    />)}
        </Group>
    );
};
export const BookInfoModalPage = props => {
    const [publications, setPublications] = useState(null);
    const [activeBook, setActiveBook] = useState(null)
    const [bookInformation, setBookInformation] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const userIsAdmin = props.user.Role === 'Администратор'
    
    function deleteBook () {
        fetch(process.env.REACT_APP_API_HOST + '/books/' + activeBook.Id, {
            method: 'DELETE'
        }).then(response => setBookInformation(null))
        setConfirmDelete(false)
    }

    function openBookInfo (book) {
        setActiveBook(book)
        setBookInformation(<BookInformation book={book}/>)
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + `/books/publications?title=${props.book.Title}&authors=${props.book.Authors}`)
            .then(response => response.json())
            .then(data => setPublications(data));
    }, [props.book, bookInformation]);

    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal(null)}>
            <ModalPageHeader
                left={bookInformation ? <PanelHeaderBack onClick={() => setBookInformation(null)}/> : null}
                right={bookInformation ?
                        confirmDelete ?
                            <>
                                <PanelHeaderClose onClick={() => setConfirmDelete(false)}/>
                                <PanelHeaderSubmit onClick={deleteBook}/>
                            </> :
                                <PanelHeaderButton onClick={() => setConfirmDelete(true)}>
                                    Удалить
                                </PanelHeaderButton> :
                        null}
            >{bookInformation ? 'Информация о книге' :  'Пункты с данной книгой в наличии' }</ModalPageHeader>
            {publications ?
            bookInformation ??
            <Publications 
                userIsAdmin={userIsAdmin} 
                publications={publications} 
                openBookInfo={openBookInfo}
                openLibraryPointInfo={props.openLibraryPointInfo} 
            /> : null}
        </ModalPage>
    );
};
