import { ModalRoot } from '@vkontakte/vkui';
import React from 'react';
import ReaderModalPage from './ReaderModalPage/ReaderModalPage';
import IssuedBooksModalPage from '../../../ModalPages/BooksModalPages/IssuedBooksModalPage';
import LostBooksModalPage from '../../../ModalPages/BooksModalPages/LostBooksList';
import AddReaderModalPage from './AddReaderModalPage/AddReaderModalPage';
import UserInformationModalPage from '../../../ModalPages/UserInforamtionModal';
import IssuedInfractionsModalPage from '../../../ModalPages/InfractionsModalPages/IssuedInfractionsModalPage'
import ActiveInfractionsModalPage from '../../../ModalPages/InfractionsModalPages/ActiveInfractionsModalPage'

const AdminModals = props => {
    return (
        <ModalRoot activeModal={props.activeModal} onClose={() => props.setActiveModal(null)}>
            <AddReaderModalPage id='addReader' onClose={() => props.setActiveModal(null)} setActiveModal={props.setActiveModal}/>
            <ReaderModalPage id='readerInfo' onClose={() => props.setActiveModal(null)} setActiveModal={props.setActiveModal} readerId={props.readerId} />
            <IssuedBooksModalPage id='issuedBooksList' onClose={() => props.setActiveModal('readerInfo')} readerId={props.readerId} />
            <LostBooksModalPage id='lostBooksList' onClose={() => props.setActiveModal('readerInfo')} readerId={props.readerId} />
            <IssuedInfractionsModalPage id='issuedInfractionsList' onClose={() => props.setActiveModal('readerInfo')} readerId={props.readerId} />
            <ActiveInfractionsModalPage id='activeInfractionsList' onClose={() => props.setActiveModal('readerInfo')} readerId={props.readerId} />
            <UserInformationModalPage id='userInformation' onClose={() => props.setActiveModal(null)} reader={props.user} setActiveModal={props.setActiveModal}/>
        </ModalRoot>
    );
};

export default AdminModals