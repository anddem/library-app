import { ModalPage, ModalRoot, ModalPageHeader, SimpleCell, PanelSpinner, InfoRow, Group } from '@vkontakte/vkui'
import React, { useEffect, useState } from 'react'
import UserInformationModalPage from '../../../ModalPages/UserInforamtionModal'
import AdminAddBookModalPage from './AdminAddBookModalPage'
import { BookInfoModalPage } from './Publication'
import { AdditionalLibraryPointInfo } from './AdditionalLibraryPointInfo'
import { LibraryPointModalPage } from './ReserveBookForm'
import { BooksOrdersTop, BooksOrderPeriod } from './BooksOrdersTop'

function fetchStat(stat_kind, set) {
    fetch(process.env.REACT_APP_API_HOST + '/library/statistics?stat_kind=' + stat_kind)
    .then(response => response.json())
    .then(data => set(data))
}

const Buttons = props =>  (
    <Group>
        <SimpleCell onClick={() => {props.setList(props.minReaders); console.log(props.maxDebits)}} indicator={props.minReaders?.count}>Пункты с минимальным числом читателей</SimpleCell>
        <SimpleCell onClick={() => props.setList(props.maxReaders)} indicator={props.maxReaders?.count}>Пункты с максимальным числом читателей</SimpleCell>
        <SimpleCell onClick={() => props.setList(props.minDebits)} indicator={props.minDebits?.count}>Пункты с минимальным числом задолжников</SimpleCell>
        <SimpleCell onClick={() => props.setList(props.maxDebits)} indicator={props.maxDebits?.count}>Пункты с максимальным числом задолжников</SimpleCell>
    </Group>
)

const LibraryStatistics = props => {
    const [minReaders, setMinReaders] = useState(null)
    const [maxReaders, setMaxReaders] = useState(null)
    const [minDebits, setMinDebits] = useState(null)
    const [maxDebits, setMaxDebits] = useState(null)
    const [currentStat, setCurrentStat] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStat('min_debit', setMinDebits)
        fetchStat('min_reader', setMinReaders)
        fetchStat('max_debit', setMaxDebits)
        fetchStat('max_reader', setMaxReaders)
        setLoading(false)
    }
    , [])

    return (
        <ModalPage id={props.id} onClose={props.onClose}>
            <ModalPageHeader>Статистика по библиотеке</ModalPageHeader>
            {loading ? <PanelSpinner/> : <Buttons setList={setCurrentStat} minReaders={minReaders} maxReaders={maxReaders} minDebits={minDebits} maxDebits = {maxDebits}/>}
            {currentStat ? <Group>{currentStat.data.map(el => <SimpleCell key={el.Name} indicator={el?.Readers ?? el?.Debitors}>{el.Name}</SimpleCell>)}</Group> : null}
        </ModalPage>
    )
}

const PublicModalPages = props => {
    const onClose = () => props.setActiveModal(null)
    return (
        <ModalRoot activeModal={props.activeModal} onClose={onClose}>
            <BookInfoModalPage user={props.user} id='bookInfo' setActiveModal={props.setActiveModal} book={props.book} openLibraryPointInfo={props.openLibraryPointInfo}/>
            <LibraryPointModalPage id='libraryPointInfo' setActiveModal={props.setActiveModal} book={props.book} libraryPoint={props.libraryPoint} user={props.user}/>
            <AdditionalLibraryPointInfo id='additionalLibraryPoint' setActiveModal={props.setActiveModal} point={props.libraryPoint}/>
            <AdminAddBookModalPage id='addBook' setActiveModal={props.setActiveModal}/>
            <UserInformationModalPage id='userInformation' reader={props.user} onClose={onClose} setActiveModal={props.setActiveModal}/>
            <BooksOrdersTop id='booksOrdersTop' onClose={onClose} setActiveModal={props.setActiveModal}/>
            <BooksOrderPeriod id='booksOrdersPeriod' onClose={onClose} setActiveModal={props.setActiveModal}/>
            <LibraryStatistics id='statistics' onClose={onClose}/>
        </ModalRoot>
    )
}

export default PublicModalPages