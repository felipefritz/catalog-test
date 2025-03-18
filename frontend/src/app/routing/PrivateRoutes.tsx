import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import CatalogPage from '../modules/catalogs/pages/CatalogPage'


const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>

        <Route path='auth/*' element={<Navigate to='/catalogs' />} />
        <Route path='catalogs' element={<CatalogPage />} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export { PrivateRoutes }
