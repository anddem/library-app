import { View } from '@vkontakte/vkui'
import React from 'react'
import ReaderListContent from './ReaderListContent/ReaderListContent';

const ContentView = props => {
    return (
        <View
            activePanel={props.activePanel}
            popout={props.popout}
            modal={props.modal}
        >
            <ReaderListContent id='readerList'/>
        </View>
    )
}

export default ContentView;