import React from 'react';
import { Group } from "@vkontakte/vkui";
import SideMenuButton from './SideMenuButton'

const SideMenuButtons = ({panels, activePanel, onClick}) => {
    return (
        <Group>
            {Object.keys(panels).map(panel => (
                <SideMenuButton
                    key={panel}
                    panel={panel}
                    activePanel={activePanel}
                    cellText={panels[panel]}
                    onClick={onClick}
                />
            ))}
        </Group>
    )
}

export default SideMenuButtons