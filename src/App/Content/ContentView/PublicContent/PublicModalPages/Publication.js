import { Icon16InfoOutline, Icon28ChevronRightOutline } from '@vkontakte/icons';
import {TimestampToDate} from '../../AdminContent/AdminModals/InfractionsModalPages/RenderInfractionsList'
import { ModalPage, ModalPageHeader, Group, SimpleCell, IconButton, PanelHeaderBack, Header, InfoRow, Placeholder } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { EditBookInfoForm } from './createBook';
import ErrorPlaceholder from '../../../../CustomComponents/Placeholders/ErrorPlaceholder';

const BookStatistics = ({book}) => {
    const [issueLog, setIssueLog] = useState(null)

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + '/books/issue-logs?book_id=' + book.Id )
    .then(response => response.json())
    .then(data => setIssueLog(data)), [book]
    )

    return (
        issueLog ?
        <Group header={<Header>Выдано экземпляров: {issueLog.count}</Header>}>
            {issueLog.data.map(
                log => <SimpleCell
                            multiline
                            description={`Должен вернуть ${TimestampToDate(log.Return_date)}`}
                        >
                            <InfoRow header={`ID читателя: ${log.Id}`}>
                                {log.Surname} {log.Name}
                            </InfoRow>
                    </SimpleCell>
                )
            }
        </Group> : null
    )
}

const BookInformation = props => {
    const [placeholder, setPlaceholder] = useState(null)

    function updateBookInformation (body) {
        fetch(process.env.REACT_APP_API_HOST + '/books/' + props.book.Id, {
            method: "PUT",
            body: JSON.stringify(body)
        }).then(response => response.ok ?
            setPlaceholder(<Placeholder header='Информация обновлена'/>) :
            setPlaceholder(<Placeholder header='Не удалось обновить информацию'/>))
        .catch(error => setPlaceholder(<ErrorPlaceholder/>))
    }
    return (
        placeholder ??
        <Group>
            <EditBookInfoForm props={{
                title: props.book.Title,
                authors: props.book.Authors,
                publisher: props.book.Publisher,
                publicationYear: props.book.Publication_year,
                text: 'Изменить информацию',
                onClick: updateBookInformation
            }}/>
            <BookStatistics book={props.book}/>
        </Group>
    )
}

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
            {publications.data.map((publication, i) => <Publication
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
    const [bookInformation, setBookInformation] = useState(null)
    const userIsAdmin = props.user.Role === 'Администратор'
    
    function openBookInfo (book) {
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
