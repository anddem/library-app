import { View} from '@vkontakte/vkui'
import React, { useState } from 'react'
import AdminReaders from './AdminReaders/AdminReaders'
import AdminModals from './AdminModals/AdminModals'
import { AdminDebtors } from './DebtorsFilter'
import { AdminLeaveReaders } from './LeavedFilter'
import { AdminBanned } from './AdminBanned'

const AdminContent = props => {
    const [readerId, setReaderId] =useState(null)
    const modals = <AdminModals readerId={readerId} activeModal={props.activeModal} setActiveModal={props.setActiveModal} user={props.user}/>

    function openReaderInfo(readerId) {
        setReaderId(readerId)
        props.setActiveModal('readerInfo')
    }

    return (
        <View id={props.id} activePanel={props.activePanel} modal={modals}>
            <AdminReaders id='adminReaders' openReaderInfo={openReaderInfo} addReaderButtonClick={() => props.setActiveModal('addReader')}/>
            <AdminDebtors id='adminDebtors' openReaderInfo={openReaderInfo}/>
            <AdminBanned id='adminBanned' openReaderInfo={openReaderInfo}/>
            <AdminLeaveReaders id='adminLeaveReaders' openReaderInfo={openReaderInfo}/>
        </View>
    )
}

export default AdminContent