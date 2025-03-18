import {createRoot} from 'react-dom/client'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
import "flatpickr/dist/themes/material_green.css";

import './_metronic/assets/sass/style.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {AuthProvider, setupAxios} from './app/modules/auth'

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
      <MetronicI18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </MetronicI18nProvider>
  )
}
