import {ConfigProvider, AdaptivityProvider, AppRoot, Platform} from '@vkontakte/vkui'
import App from './App/App'


const AdaptiveApp = () => {
  return (
    <ConfigProvider platform={Platform.VKCOM}>
        <AdaptivityProvider>
            <AppRoot>
                <App />
            </AppRoot>
        </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default AdaptiveApp;
