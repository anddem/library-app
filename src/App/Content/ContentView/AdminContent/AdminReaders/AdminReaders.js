import { Group, Header, Headline, Panel, PanelHeader, PanelHeaderButton, PanelSpinner, Placeholder, SimpleCell} from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import { Icon28ChevronRightOutline, Icon56ErrorOutline } from '@vkontakte/icons'
import FilterQuery from '../ReaderListContent/FilterQuery/FilterQuery'

const AdminReaders = props => {
    const [loading, setLoading] = useState(true)
    const [body, setBody] = useState({})
    const [readerList, setReaderList] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/readers/query`, {
            method: 'POST', body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then((data) => {
            setReaderList(<ReaderListFromCells readerList={data} openReaderInfo={props.openReaderInfo}/>)
            setLoading(false)
        })
        .catch(error => {
            console.error(error)
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [body])

    return (
        <Panel id={props.id}>
            <PanelHeader left={<PanelHeaderButton onClick={props.addReaderButtonClick}>Добавить читателя</PanelHeaderButton>}>
                Список читателей
            </PanelHeader>
            <Group>
                {loading
                ? <PanelSpinner height={96} size='large'/>
                : readerList
                    ? <FilterQuery setBody={setBody}/>
                    : <Placeholder icon={<Icon56ErrorOutline/>} header='Ошибка при получении данных'/>}
                {readerList}
            </Group>
        </Panel>
    )
}

export const ReaderListFromCells = ({readerList, openReaderInfo}) => (
    <Group header={<Header>Найдено: {readerList.count}</Header>} mode='plain'>
        {readerList?.data.map(reader => <ReaderCell key={reader.Id} reader={reader} openReaderInfo={openReaderInfo}/>)}
    </Group>
)


const ReaderCell = ({reader, openReaderInfo}) => {
    return (
        <SimpleCell after={<Icon28ChevronRightOutline/>} onClick={() => openReaderInfo(reader.Id)}>
            <Headline weight='medium'>{`${reader['Surname']} ${reader['Name']} ${reader['Mid_name'] ?? ''}`}</Headline>
        </SimpleCell>
    )
}

export default AdminReaders;