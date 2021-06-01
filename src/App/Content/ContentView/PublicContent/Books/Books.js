import { Icon36ChevronRightOutline, Icon56ErrorOutline } from '@vkontakte/icons'
import { Panel, PanelHeader, Group, SimpleCell, InfoRow, PanelSpinner, Header, Text, PanelHeaderButton, FormLayout, FormLayoutGroup, Placeholder } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import FormButton from '../../../../CustomComponents/FormComponents/FormButton'

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
    <Group header={header} mode='plain'>
        {books ? books.map((book, i) => <Book key={i} book={book} onClick={onClick} />) : ''}
    </Group>
)

const PublicBooksList = (props) => (
    <Group mode='plain'>
        <FormLayout>
            <FormLayoutGroup mode='horizontal'>
                <FormButton size='l' stretched text='Топ книг' onClick={() => props.setActiveModal('booksOrdersTop')}/>
                <FormButton size='l' stretched text='Заказы за период' onClick={() => props.setActiveModal('booksOrdersPeriod')}/>
            </FormLayoutGroup>
        </FormLayout>
        <PublicRenderBooks books={props.books} onClick={props.onClick} header={<Header>Найдено: {props.count}</Header>} />
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
            setPage(<Placeholder header='Ошибка при получении данных' icon={<Icon56ErrorOutline/>}/>)
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <Panel id={props.id}>
            <PanelHeader left={userIsAdministrator ? <PanelHeaderButton onClick={props.addBookButtonClick}>Добавить книгу</PanelHeaderButton> : null}>Список книг</PanelHeader>
            <Group>
                {loading ? <PanelSpinner height={96} size='large'/> : page}
            </Group>
        </Panel>
    )
}

export default Books