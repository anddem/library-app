import React from 'react'
import {Placeholder} from '@vkontakte/vkui'
import {Icon56SettingsOutline} from '@vkontakte/icons'

const ErrorPlaceholder = ({header = 'Ошибка при получении данных'}) => {
    return (
      <Placeholder
        icon={<Icon56SettingsOutline/>}
        header={header}
      />
    );
};

export default ErrorPlaceholder;