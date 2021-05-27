import { TimestampToDate } from '../../../ModalPages/InfractionsModalPages/RenderInfractionsList';
import { Group, SimpleCell, Header, InfoRow, Placeholder } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { EditBookInfoForm } from './createBook';
import ErrorPlaceholder from '../../../../CustomComponents/Placeholders/ErrorPlaceholder';
import { Icon28ErrorOutline } from '@vkontakte/icons';

const BookStatistics = ({ book }) => {
    const [issueLog, setIssueLog] = useState(null);

    useEffect(() => fetch(process.env.REACT_APP_API_HOST + '/books/issue-logs?book_id=' + book.Id)
        .then(response => response.json())
        .then(data => setIssueLog(data)), [book]
    );

    return (
        issueLog ?
            <Group header={<Header>Выдано экземпляров: {issueLog.count}</Header>}>
                {issueLog.data.map(
                    log => <SimpleCell
                        multiline
                        description={`Должен вернуть ${TimestampToDate(log.Return_date)}`}
                        indicator={new Date(log.Return_date*1000) < new Date() ? <Icon28ErrorOutline/> : null}
                    >
                        <InfoRow header={`ID читателя: ${log.Id}`}>
                            {log.Surname} {log.Name}
                        </InfoRow>
                    </SimpleCell>
                )}
            </Group> : null
    );
};
export const BookInformation = props => {
    const [placeholder, setPlaceholder] = useState(null);

    function updateBookInformation(body) {
        fetch(process.env.REACT_APP_API_HOST + '/books/' + props.book.Id, {
            method: "PUT",
            body: JSON.stringify(body)
        }).then(response => response.ok ?
            setPlaceholder(<Placeholder header='Информация обновлена' />) :
            setPlaceholder(<Placeholder header='Не удалось обновить информацию' />))
            .catch(error => setPlaceholder(<ErrorPlaceholder />));
    }
    return (
        placeholder ??
        <Group>
            <EditBookInfoForm props={{
                title: props.book.Title,
                authors: props.book.Authors,
                publisher: props.book.Publisher,
                publicationYear: props.book.Publication_year,
                text: 'Изменить информацию',
                onClick: updateBookInformation
            }} />
            <BookStatistics book={props.book} />
        </Group>
    );
};
