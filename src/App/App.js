import { SplitCol, SplitLayout} from '@vkontakte/vkui';
import "@vkontakte/vkui/dist/vkui.css";

import SideMenu from './SideMenu/SideMenu'
import React, { useState } from 'react'
import ContentView from './ContentView/ContentView';

const user = {
    'avatarUrl': 'https://cdn.pixabay.com/photo/2015/02/28/15/48/monkey-653705_960_720.jpg',
    'name': 'Андрей'
}

const panels = {
    'readerList': 'Список читателей'
}

const App = () => {
    const [activePanel, setActivePanel] = useState('readerList');
    const [modal, setModal] = useState(null);
    const [popout, setPopout] = useState(null);

    return (
        <SplitLayout style={{justifyContent: 'center'}}>
            <SplitCol fixed width='250px' maxWidth='250px'>
                <SideMenu user={user} panels={panels} activePanel={activePanel} onClick={setActivePanel}/>
            </SplitCol>
            <SplitCol
                animate={false}
                spaced={true}
                width='560px'
                maxWidth='900px'
            >
                <ContentView
                    activePanel={activePanel}
                    modal={modal} setModal={setModal}
                    popout={popout} setPopout={setPopout}/>
            </SplitCol>
        </SplitLayout>
    );
  }
  
  export default App