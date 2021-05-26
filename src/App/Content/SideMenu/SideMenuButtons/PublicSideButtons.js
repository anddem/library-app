import SideMenuButton from "./SideMenuButton"

const publicPanels = {
    'publicBooks': 'Список книг'
}

const PublicSideButtons = ({activePanel, onClick}) => {
    return (Object.keys(publicPanels).map(panel => (
    <SideMenuButton
        key={panel}
        panel={panel}
        activePanel={activePanel}
        cellText={publicPanels[panel]}
        onClick={onClick}
        view='publicContent'
    />)
    )
    )
}

export default PublicSideButtons;