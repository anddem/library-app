import { SplitCol, SplitLayout } from '@vkontakte/vkui'
import React, { useState } from 'react'
import ContentView from './ContentView/ContentView'
import SideMenu from './SideMenu/SideMenu'



const Content = props => {
    const [activeView, setActiveView] = useState('publicContent')
    const [activePanel, setActivePanel] = useState('publicBooks')
    const [activeModal, setActiveModal] = useState(null)

    const go = e => {
        setActiveView(e.currentTarget.dataset.view)
        setActivePanel(e.currentTarget.dataset.panel)
    }

    // function openUserInfo () {
    //     setActiveModal('userInformation')
    // }

    return (
        <SplitLayout style={{justifyContent: 'center'}}>
            <SplitCol fixed width='250px' maxWidth='250px'>
                <SideMenu
                    user={props.user}
                    activePanel={activePanel}
                    onClick={go}
                    onLogout={props.onLogout}
                />
            </SplitCol>
            <SplitCol
                animate={false}
                spaced={true}
                width='560px'
                maxWidth='900px'
            >
                <ContentView activeModal={activeModal} setActiveModal={setActiveModal} activePanel={activePanel} activeView={activeView} user={props.user} setActivePanel={setActivePanel}/>
            </SplitCol>
        </SplitLayout>
    )
}

export default Content;