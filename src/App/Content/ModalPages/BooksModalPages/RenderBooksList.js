import { Group, InfoRow, SimpleCell } from '@vkontakte/vkui';
import React from 'react';

export const Book = ({ book, indicator }) => (
    <Group mode='card'>
        <SimpleCell multiline disabled indicator={indicator}>
            <InfoRow header='Авторы' style={{ marginBottom: 10 }}>{book.Authors}</InfoRow>
            <InfoRow header='Название книги'>{book.Title}</InfoRow>
        </SimpleCell>
    </Group>
);
const RenderBooksList = ({ list }) => (
    <Group>
        {list.data.map(book => <Book key={book.Id} book={book} indicator={`Год издания: ${book.Publication_year}`}/>)}
    </Group>
);

export default RenderBooksList