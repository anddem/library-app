import { Cell } from '@vkontakte/vkui'
import React from 'react'

const SideMenuButton = ({panel, activePanel, onClick, cellText, view}) => {
    return (
        <Cell
            key={panel}
            disabled={panel === activePanel}
            style={panel === activePanel ? {
            backgroundColor: "var(--button_secondary_background)",
            borderRadius: 8
            } : {}}
            data-view={view}
            data-panel={panel}
            onClick={onClick}
        >
            {cellText}
        </Cell>
    )
}

export default SideMenuButton