import { ModalRoot } from '@vkontakte/vkui'
import React from 'react'
import UserInformationModalPage from '../../../ModalPages/UserInforamtionModal'
import AdminAddBookModalPage from './AdminAddBookModalPage'
import { BookInfoModalPage } from './Publication'
import { AdditionalLibraryPointInfo } from './ReadersList'
import { LibraryPointModalPage } from './ReserveBookForm'

const PublicModalPages = props => {
    return (
        <ModalRoot activeModal={props.activeModal} onClose={() => props.setActiveModal(null)}>
            <BookInfoModalPage user={props.user} id='bookInfo' setActiveModal={props.setActiveModal} book={props.book} openLibraryPointInfo={props.openLibraryPointInfo}/>
            <LibraryPointModalPage id='libraryPointInfo' setActiveModal={props.setActiveModal} book={props.book} libraryPoint={props.libraryPoint} user={props.user}/>
            <AdditionalLibraryPointInfo id='additionalLibraryPoint' setActiveModal={props.setActiveModal} point={props.libraryPoint}/>
            <AdminAddBookModalPage id='addBook' setActiveModal={props.setActiveModal}/>
            <UserInformationModalPage id='userInformation' reader={props.user} onClose={() => props.setActiveModal(null)} setActiveModal={props.setActiveModal}/>
        </ModalRoot>
    )
}

export default PublicModalPages