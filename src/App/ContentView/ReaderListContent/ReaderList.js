import { Separator } from '@vkontakte/vkui';
import React from 'react';
import FilterQuery from './FilterQuery/FilterQuery'

const ReaderList = props => {
    return (
        <>
            <FilterQuery setBody={props.setBody}/>
            <Separator/>
        </>
    )
}

export default ReaderList