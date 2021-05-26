import { Icon36ChevronRightOutline } from '@vkontakte/icons'
import { Panel, PanelHeader, Group, SimpleCell, InfoRow, PanelSpinner, Header, Text, PanelHeaderButton } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import ErrorPlaceholder from '../../../../CustomComponents/Placeholders/ErrorPlaceholder'

const Book = ({book, onClick}) => {
    return (
        <Group mode='plain'>
            <SimpleCell
                indicator={<Icon36ChevronRightOutline/>}
                multiline
                onClick={() => onClick(book)}
                description={`Доступно: ${book.Available ?? 0}`}>
                <InfoRow header={book.Authors}><Text weight='semibold'>{book.Title}</Text ></InfoRow>
            </SimpleCell>
        </Group>
    )
}

const PublicRenderBooks = ({books, onClick}) => {
    return (
        books ? books.map((book, i) => <Book key={i} book={book} onClick={onClick}/>) : ''
    )
}

const PublicBooksList = (props) => {
    return (
        <Group header={<Header>Книг найдено: {props.count}</Header>}>
            <PublicRenderBooks books={props.books} onClick={props.onClick}/>
        </Group>
    )
}

const Books = props => {
    const [page, setPage] = useState('')
    const [loading, setLoading] = useState(true)
    const userIsAdministrator = props.user.Role === 'Администратор'

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + '/books')
        .then(response => response.json())
        .then(data => {
            setPage(<PublicBooksList count={data.count} books={data.data} onClick={props.openBookInfo}/>)
            setLoading(false)
        })
        .catch(error => {
            console.error(error)
            setPage(<ErrorPlaceholder/>)
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <Panel id={props.id}>
            <PanelHeader left={userIsAdministrator ? <PanelHeaderButton onClick={props.addBookButtonClick}>Добавить книгу</PanelHeaderButton> : null}>Список книг</PanelHeader>
                {loading ? <PanelSpinner height={96}/> : page}
        </Panel>
    )
}

export default Books