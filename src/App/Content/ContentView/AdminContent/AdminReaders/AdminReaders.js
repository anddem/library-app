import { Group, Headline, Panel, PanelHeader, PanelHeaderButton, PanelSpinner, SimpleCell} from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import ReaderList from '../../ReaderListContent/ReaderList'
import ErrorPlaceholder from '../../../../CustomComponents/Placeholders/ErrorPlaceholder'
import { Icon28ChevronRightOutline } from '@vkontakte/icons'

const AdminReaders = props => {
    const [pageContent, setPageContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [body, setBody] = useState({})
    const [readerList, setReaderList] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/readers/query`, {
            method: 'POST', body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(({data}) => {
            setReaderList(<ReaderListFromCells readerList={data} openReaderInfo={props.openReaderInfo}/>)
            setPageContent(<ReaderList setBody={setBody}/>)
            setLoading(false)
        })
        .catch(error => {
            console.error(error)
            setPageContent(<ErrorPlaceholder/>)
            setLoading(false)
        })
    }, [body, props.openReaderInfo])

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderButton onClick={props.addReaderButtonClick}>Добавить читателя</PanelHeaderButton>}>
                Список читателей
            </PanelHeader>
            <Group>
                {loading ? <PanelSpinner height={96} size='large'/> : pageContent}
                {readerList}
            </Group>
        </Panel>
    )
}

const ReaderListFromCells = ({readerList, openReaderInfo}) => {
    return (
        readerList.map(reader => <ReaderCell key={reader.id} reader={reader} openReaderInfo={openReaderInfo}/>)
    )
}

const ReaderCell = ({reader, openReaderInfo}) => {
    return (
        <SimpleCell after={<Icon28ChevronRightOutline/>} data-panel='publicContent' onClick={() => openReaderInfo(reader.id)}>
            <Headline weight='medium'>{`${reader['Фамилия']} ${reader['Имя']} ${reader['Отчество'] ? reader['Отчество'] : ''}`}</Headline>
        </SimpleCell>
    )
}

export default AdminReaders;