// Archivo: Navbar.tsx
// Solución completa para el problema de sincronización

import clsx from 'clsx';
import { ThemeModeSwitcher, HeaderUserMenu } from '../../../partials';


const Navbar = () => {
  const itemClass = 'ms-1 ms-md-4';
  const userAvatarClass = 'symbol-35px';

  return (
    <div className="app-navbar flex-shrink-0">
      {/* Modo Oscuro */}
      <div className={clsx('app-navbar-item', itemClass)}>
        <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-info btn-custom')} />
      </div>

      {/* Menú de Usuario */}
      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach="parent"
          data-kt-menu-placement="bottom-end"
        >
          <i className="bi bi-person-bounding-box"></i>
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  );
};

export { Navbar };