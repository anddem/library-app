import { ModalPageHeader, ModalPage } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import { ReaderRoleInformation } from '../ContentView/AdminContent/AdminModals/ReaderModalPage/ReaderModalPage'

const UserInformationModalPage = props => {
    const [reader, setReader] = useState(null)

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + '/readers/' + props.reader.Id)
    .then(response => response.json())
    .then(({data}) => setReader(data[0]))
    .catch(error => console.error(error)), [props.reader]
    )


    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal(null)}>
            <ModalPageHeader>Информация о пользователе</ModalPageHeader>
            {reader ? <ReaderRoleInformation reader={reader}/> : null}
        </ModalPage>
    )
}

export default UserInformationModalPage