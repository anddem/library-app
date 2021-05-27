import { Group} from '@vkontakte/vkui';
import React from 'react';
import FilterQuery from './FilterQuery/FilterQuery'

const ReaderList = props => {
    return (
        <Group mode='plain'>
            <FilterQuery setBody={props.setBody}/>
        </Group>
    )
}

export default ReaderList