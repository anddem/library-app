import { Icon36ChevronRightOutline } from '@vkontakte/icons'
import { Panel, PanelHeader, Group, SimpleCell, InfoRow, PanelSpinner, Header, Text, PanelHeaderButton, FormLayout, FormLayoutGroup } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import FormButton from '../../../../CustomComponents/FormComponents/FormButton'
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

const PublicRenderBooks = ({header, books, onClick}) => (
    <Group header={header}>
        {books ? books.map((book, i) => <Book key={i} book={book} onClick={onClick} />) : ''}
    </Group>
)

const PublicBooksList = (props) => (
    <Group>
        <FormLayout>
            <FormLayoutGroup mode='horizontal'>
                <FormButton size='l' stretched text='Топ книг' onClick={() => props.setActiveModal('booksOrdersTop')}/>
                <FormButton size='l' stretched text='Заказы за период' onClick={() => props.setActiveModal('booksOrdersPeriod')}/>
            </FormLayoutGroup>
        </FormLayout>
        <PublicRenderBooks books={props.books} onClick={props.onClick} header={<Header>Книг найдено: {props.count}</Header>} />
    </Group>
)

const Books = props => {
    const [page, setPage] = useState('')
    const [loading, setLoading] = useState(true)
    const userIsAdministrator = props.user.Role === 'Администратор'

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + '/books')
        .then(response => response.json())
        .then(data => {
            setPage(<PublicBooksList setActiveModal={props.setActiveModal} count={data.count} books={data.data} onClick={props.openBookInfo}/>)
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