import { View } from '@vkontakte/vkui'
import React, { useState } from 'react'
import AddReaderPanel from './AddReaderPanel'
import AddBookPanel from './AddBookPanel'
import AddLibraryPointPanel from './AddLibraryPointPanel'
import AdminReaders from './AdminReaders/AdminReaders'
import AdminModals from './AdminModals/AdminModals'

const AdminContent = props => {
    const [readerId, setReaderId] =useState(null)
    const [activeModal, setActiveModal] = useState(null)
    const modals = <AdminModals readerId={readerId} activeModal={activeModal} setActiveModal={setActiveModal}/>

    function openReaderInfo(readerId) {
        setReaderId(readerId)
        setActiveModal('readerInfo')
    }

    return (
        <View id={props.id} activePanel={props.activePanel} modal={modals}>
            <AddReaderPanel id='adminAddReader'/>
            <AddBookPanel id='adminAddBook'/>
            <AddLibraryPointPanel id='adminAddLibraryPoint'/>
            <AdminReaders id='adminReaders' openReaderInfo={openReaderInfo} addReaderButtonClick={() => setActiveModal('addReader')}/>
        </View>
    )
}

export default AdminContent