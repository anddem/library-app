import { ModalRoot } from '@vkontakte/vkui'
import React from 'react'
import { BookInfoModalPage } from './Publication'
import { LibraryPointModalPage } from './ReserveBookForm'

const PublicModalPages = props => {
    return (
        <ModalRoot activeModal={props.activeModal} onClose={() => props.setActiveModal(null)}>
            <BookInfoModalPage id='bookInfo' setActiveModal={props.setActiveModal} book={props.book} openLibraryPointInfo={props.openLibraryPointInfo}/>
            <LibraryPointModalPage id='libraryPointInfo' setActiveModal={props.setActiveModal} book={props.book} libraryPoint={props.libraryPoint} user={props.user}/>
        </ModalRoot>
    )
}

export default PublicModalPages