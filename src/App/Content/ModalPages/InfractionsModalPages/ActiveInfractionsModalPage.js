import React, {useState, useEffect} from 'react'
import { ModalPage, ModalPageHeader, PanelSpinner} from '@vkontakte/vkui'
import RenderInfractionsList from './RenderInfractionsList';

const ActiveInfractionsModalPage = props => {
    const [infractionsList, setInfractionsList] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_HOST + `/readers/${props.readerId}/infractions?is_active=true`)
            .then(response => response.json())
            .then(data => setInfractionsList(data))
            .catch(error => console.error(error));
    }, [props.readerId]);

    return (
        <ModalPage id={props.id} onClose={props.onCLose}>
            <ModalPageHeader>Выданные нарушения {infractionsList ? `(${infractionsList.count})` : ''}</ModalPageHeader>
            {infractionsList ? <RenderInfractionsList list={infractionsList} /> : <PanelSpinner/>}
        </ModalPage>
    );
};

export default ActiveInfractionsModalPage