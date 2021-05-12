import { Panel, PanelHeader, PanelSpinner } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import ReaderList from './ReaderList'
import ErrorPlaceholder from '../../CustomComponents/Placeholders/ErrorPlaceholder/ErrorPlaceholder'
import Table from '../../CustomComponents/Table/Tablenents/Table/Table'

const ReaderListContent = props => {
    const [pageContent, setPageContent] = useState('')
    const [table, setTable] = useState('')
    const [loading, setLoading] = useState(true)
    const [body, setBody] = useState({})

    useEffect(() => {
        if (table) setTable(<PanelSpinner height={96} size='large'/>)
        fetch('http://localhost:8800/reader-list/query', {
            method: 'POST', body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(({data}) => {
            setTable(<Table columns={data.columns} rows={data.rows}/>)
            setPageContent(<ReaderList setBody={setBody}/>)
            setLoading(false)
        })
        .catch(error => {
            console.error(error)
            setPageContent(<ErrorPlaceholder/>)
            setTable('')
            setLoading(false)
        })
    }, [body])

    return (
        <Panel id={props.id}>
            <PanelHeader>
                Список читателей
            </PanelHeader>
            {loading ? <PanelSpinner height={96} size='large'/> : pageContent}
            {table}
        </Panel>
    )
}

export default ReaderListContent;