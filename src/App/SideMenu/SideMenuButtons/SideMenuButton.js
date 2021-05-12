import { Cell } from '@vkontakte/vkui'
import React from 'react'

const SideMenuButton = ({panel, activePanel, onClick, cellText}) => {
    return (
        <Cell
            key={panel}
            disabled={panel === activePanel}
            style={panel === activePanel ? {
            backgroundColor: "var(--button_secondary_background)",
            borderRadius: 8
            } : {}}
            onClick={() => onClick(panel)}
        >
            {cellText}
        </Cell>
    )
}

export default SideMenuButton