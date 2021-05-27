import { ModalPageHeader, ModalPage } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { BooksList } from './AdditionalLibraryPointInfo';
import StructureSelect from '../../AdminContent/ReaderListContent/FilterQuery/Selects/StructureSelect';
import FormInput from '../../../../CustomComponents/FormComponents/FormInput';

export const BooksOrdersTop = props => {
    const [faculty, setFaculty] = useState('');
    const [top, setTop] = useState(null);

    useEffect(() => fetch(
        process.env.REACT_APP_API_HOST + '/books/orders/top?param=' + (faculty !== '' ? 'faculty' : ' ') + '&param_name=' + faculty)
        .then(response => response.json())
        .then(data => setTop(<BooksList books={data.data} />)),
        [faculty]);

    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal(null)}>
            <ModalPageHeader>Топ книг по вузу и факультетам</ModalPageHeader>
            <StructureSelect faculty={faculty} setFaculty={setFaculty} facultyOnly />
            {top ? top : null}
        </ModalPage>
    );
};
export const BooksOrderPeriod = props => {
    const [period, setPeriod] = useState(31);
    const [top, setTop] = useState(null);

    useEffect(() => fetch(
        process.env.REACT_APP_API_HOST + `/books/orders?order_period=${period}`)
        .then(response => response.json())
        .then(data => setTop(<BooksList books={data.data} />)),
        [period]);

    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal(null)}>
            <ModalPageHeader>Заказанные книги за период в днях: {period}</ModalPageHeader>
            <FormInput value={period} onChange={setPeriod} placeholder='Период заказов, в днях' type='number' required />
            {top ? top : null}
        </ModalPage>
    );
};
