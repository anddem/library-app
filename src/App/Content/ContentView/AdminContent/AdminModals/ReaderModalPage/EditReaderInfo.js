import { Placeholder } from '@vkontakte/vkui';
import React, { useState } from 'react';
import ErrorPlaceholder from '../../../../../CustomComponents/Placeholders/ErrorPlaceholder';
import { EditReaderInformationForm } from "../AddReaderModalPage/createReader";

export const EditReaderInfo = ({ reader }) => {
    const [placeholder, setPlaceholder] = useState(null);
    function onClick(body) {
        fetch(process.env.REACT_APP_API_HOST + '/readers/' + reader.Id, {
            method: "PUT",
            body: JSON.stringify(body)
        }).then(response => response.ok ?
            setPlaceholder(<Placeholder header='Информация успешно обновлена' />) :
            setPlaceholder(<Placeholder header='Не удалось обновить информацию' />))
            .catch(error => setPlaceholder(<ErrorPlaceholder />));
    }

    return (
        placeholder ??
        <EditReaderInformationForm props={{
            firstName: reader.Name,
            lastName: reader.Surname,
            middleName: reader.Mid_name ?? '',
            role: reader.Role,
            faculty: reader.Faculty ?? '',
            department: reader.Department ?? '',
            group: reader.Group ?? '',
            onClick: onClick,
            text: 'Обновить информацию'
        }} />
    );
};
