import { Group, Headline, Panel, PanelHeader, PanelHeaderButton, PanelSpinner, SimpleCell} from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import ReaderList from '../ReaderListContent/ReaderList'
import ErrorPlaceholder from '../../../../CustomComponents/Placeholders/ErrorPlaceholder'
import { Icon28ChevronRightOutline } from '@vkontakte/icons'

const AdminReaders = props => {
    const [pageContent, setPageContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [body, setBody] = useState({})
    const [readerList, setReaderList] = useState(null)
    const [counter, setCounter] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/readers/query`, {
            method: 'POST', body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then((data) => {
            setCounter(data.count)
            setReaderList(<ReaderListFromCells readerList={data.data} openReaderInfo={props.openReaderInfo}/>)
            setPageContent(<ReaderList setBody={setBody}/>)
            setLoading(false)
        })
        .catch(error => {
            console.error(error)
            setPageContent(<ErrorPlaceholder/>)
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [body])

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderButton onClick={props.addReaderButtonClick}>Добавить читателя</PanelHeaderButton>}>
                Найдено читателей: {counter}
            </PanelHeader>
            <Group>
                {loading ? <PanelSpinner height={96} size='large'/> : pageContent}
                {readerList}
            </Group>
        </Panel>
    )
}

export const ReaderListFromCells = ({readerList, openReaderInfo}) => {
    return (
        readerList.map(reader => <ReaderCell key={reader.Id} reader={reader} openReaderInfo={openReaderInfo}/>)
    )
}

const ReaderCell = ({reader, openReaderInfo}) => {
    return (
        <SimpleCell after={<Icon28ChevronRightOutline/>} onClick={() => openReaderInfo(reader.Id)}>
            <Headline weight='medium'>{`${reader['Surname']} ${reader['Name']} ${reader['Mid_name'] ?? ''}`}</Headline>
        </SimpleCell>
    )
}

export default AdminReaders;