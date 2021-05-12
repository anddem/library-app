import React from 'react'
import {Placeholder} from '@vkontakte/vkui'
import {Icon56SettingsOutline} from '@vkontakte/icons'

const ErrorPlaceholder = () => {
    return (
      <Placeholder
        icon={<Icon56SettingsOutline/>}
        header={'Ошибка при получении данных'}
      />
    );
};

export default ErrorPlaceholder;