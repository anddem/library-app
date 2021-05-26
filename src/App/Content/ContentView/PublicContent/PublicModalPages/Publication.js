import { Icon28ChevronRightOutline } from '@vkontakte/icons';
import { ModalPage, ModalPageHeader, Group, SimpleCell, PanelHeaderBack } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';

const Publication = ({ publication, onClick }) => {
    return (
        <SimpleCell
            disabled={publication.Available === 0}
            indicator={publication.Available ? <Icon28ChevronRightOutline /> : null}
            multiline
            description={`Доступно: ${publication.Available}, издание ${publication.Publication_year} года`}
            onClick={() => onClick(publication.Library_point, publication)}
        >
            {publication.Library_point}
        </SimpleCell>
    );
};
const Publications = ({ publications, onClick }) => {
    return (
        <Group>
            {publications.data.map((publication, i) => <Publication key={i} publication={publication} onClick={onClick} />)}
        </Group>
    );
};
export const BookInfoModalPage = props => {
    const [publications, setPublications] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + `/books/publications?title=${props.book.Title}&authors=${props.book.Authors}`)
            .then(response => response.json())
            .then(data => setPublications(data));
    }, [props.book]);

    return (
        <ModalPage id={props.id} onClose={() => props.setActiveModal(null)}>
            <ModalPageHeader left={<PanelHeaderBack onClick={() => props.setActiveModal(null)} />}>Пункты с данной книгой в наличии</ModalPageHeader>
            {publications ? <Publications publications={publications} onClick={props.openLibraryPointInfo} /> : null}
        </ModalPage>
    );
};
