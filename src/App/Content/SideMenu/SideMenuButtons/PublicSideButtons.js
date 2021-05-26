import { Group } from "@vkontakte/vkui";
import SideMenuButton from "./SideMenuButton"

const publicPanels = {
    'publicBooks': 'Список книг',
    'publicLibraryPoints': 'Библиотечные пункты',
}

const PublicSideButtons = ({activePanel, onClick}) => (
    <Group mode='plain'>
    {Object.keys(publicPanels).map(panel => (
        <SideMenuButton
            key={panel}
            panel={panel}
            activePanel={activePanel}
            cellText={publicPanels[panel]}
            onClick={onClick}
            view='publicContent'
        />
        )
    )}
    </Group>
)

export default PublicSideButtons;