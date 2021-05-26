import { ModalRoot } from '@vkontakte/vkui';
import React from 'react';
import ReaderModalPage from './ReaderModalPage/ReaderModalPage';
import IssuedInfractionsModalPage from './InfractionsModalPages/IssuedInfractionsModalPage';
import IssuedBooksModalPage from './BooksModalPages/IssuedBooksModalPage';
import LostBooksModalPage from './BooksModalPages/LostBooksList';
import ActiveInfractionsModalPage from './InfractionsModalPages/ActiveInfractionsModalPage';
import AddReaderModalPage from './AddReaderModalPage';

const AdminModals = props => {
    return (
        <ModalRoot activeModal={props.activeModal} onClose={() => props.setActiveModal(null)}>
            <AddReaderModalPage id='addReader' onClose={() => props.setActiveModal(null)} setActiveModal={props.setActiveModal}/>
            <ReaderModalPage id='readerInfo' onClose={() => props.setActiveModal(null)} setActiveModal={props.setActiveModal} readerId={props.readerId} />
            <IssuedBooksModalPage id='issuedBooksList' onClose={() => props.setActiveModal('readerInfo')} readerId={props.readerId} />
            <LostBooksModalPage id='lostBooksList' onClose={() => props.setActiveModal('readerInfo')} readerId={props.readerId} />
            <IssuedInfractionsModalPage id='issuedInfractionsList' onClose={() => props.setActiveModal('readerInfo')} readerId={props.readerId} />
            <ActiveInfractionsModalPage id='activeInfractionsList' onClose={() => props.setActiveModal('readerInfo')} readerId={props.readerId} />
        </ModalRoot>
    );
};

export default AdminModals