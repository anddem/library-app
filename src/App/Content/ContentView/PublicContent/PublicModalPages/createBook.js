import { FormLayout, Placeholder } from '@vkontakte/vkui';
import React, { useState } from 'react';
import FormButton from '../../../../CustomComponents/FormComponents/FormButton';
import InputGroup from '../../../../CustomComponents/FormComponents/InputGroup';

function createBook(body, setPlaceholder) {
    fetch(process.env.REACT_APP_API_HOST + '/books', {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => response.ok ?
        setPlaceholder(<Placeholder header='Книга добавлена' />) :
        setPlaceholder(<Placeholder header='Не удалось добавить книгу в каталог' />
        ));
}

export const EditBookInfoForm = ({ props, setPlaceholder }) => {
    const [title, setTitle] = useState(props.title ?? '');
    const [authors, setAuthors] = useState(props.authors ?? '');
    const [publisher, setPublisher] = useState(props.publisher ?? '');
    const [publicationYear, setPublicationYear] = useState(props.publicationYear ?? 0);

    const onClick = () => {
        let body = {
            title: document.getElementsByName('add_title')[0].value,
            authors: document.getElementsByName('add_authors')[0].value,
            publisher: document.getElementsByName('add_publisher')[0].value,
            publicationYear: document.getElementsByName('add_publicationYear')[0].value
        };

        if (props.onClick)
            props.onClick(body);
        else
            createBook(body, setPlaceholder);
    };

    return (
        <FormLayout>
            <InputGroup inputs={{
                'add_title': {
                    value: title,
                    onChange: setTitle,
                    placeholder: 'Название книги',
                    required: true
                },
                'add_authors': {
                    value: authors,
                    onChange: setAuthors,
                    placeholder: 'Авторы',
                    required: true
                },
                'add_publisher': {
                    value: publisher,
                    onChange: setPublisher,
                    placeholder: 'Издательство',
                    required: true
                },
                'add_publicationYear': {
                    status: publicationYear > 0 ? 'default' : 'error',
                    value: publicationYear,
                    onChange: setPublicationYear,
                    placeholder: 'Год издания',
                    required: true,
                    type: 'number'
                },
            }} />
            <FormButton
                disabled={!(title && authors && publisher && publicationYear > 0)}
                mode='primary'
                size='l'
                text={props.text ?? 'Добавить книгу'}
                onClick={onClick}
                stretched />
        </FormLayout>
    );
};
