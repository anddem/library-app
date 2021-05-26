import React, {useState, useEffect} from 'react'
import {Group, Panel, PanelHeader, Title} from '@vkontakte/vkui'
import ErrorPlaceholder from '../../../CustomComponents/Placeholders/ErrorPlaceholder'


async function getReaderInfo (readerId) {
    const response = await fetch(process.env.REACT_APP_API_HOST + `/readers/${readerId}`)
    const result = await response.json()

    return result
}

const ReaderInfoPanel = props => {
    const [reader, setReader] = useState(null)

    useEffect(() => {
        props.readerId ? getReaderInfo(props.readerId).then(({data}) => setReader(data[0])) : setReader(null)
    }, [props.readerId])
    return (
        <Panel id={props.id}>
            {reader ? <ReaderPanel reader={reader} onBackClick={props.onBackClick}/> : <ErrorPlaceholder />}
        </Panel>
    )
}

const ReaderPanel = ({reader, onBackClick}) => {
    console.log(reader)
    return (
        <>
            <PanelHeader>Информация о читателе</PanelHeader>
            <Group>
                <Title weight='heavy'>{`${reader.Surname} ${reader.Name} ${reader.Mid_name ? reader.Mid_name : ''}`}</Title>
            </Group>
        </>
    )
}

export default ReaderInfoPanel