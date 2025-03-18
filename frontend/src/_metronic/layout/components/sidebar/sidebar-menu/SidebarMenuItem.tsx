import {FC} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTIcon, WithChildren} from '../../../../helpers'
import {useLayout} from '../../../core'
import {Tooltip, OverlayTrigger} from 'react-bootstrap' // Importar Tooltip y OverlayTrigger

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  tooltip?: string // Nueva propiedad opcional para tooltip
}

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  tooltip, // Recibir el tooltip como parámetro opcional
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {app} = config

  // Crear el contenido del enlace
  const linkContent = (
    <>
      {hasBullet && (
        <span className='menu-bullet'>
          <span className='bullet bullet-dot'></span>
        </span>
      )}
      {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
        <span className='menu-icon me-2'> 
          <KTIcon iconName={icon} className='fs-2' />
        </span>
      )}
      {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
        <i className={clsx('bi fs-3 me-2', fontIcon)}></i> 
      )}
      <span className='menu-title'>{title}</span>
    </>
  );

  return (
    <div className='menu-item'>
      {tooltip ? (
        // Si se especifica un tooltip, envolver el enlace en OverlayTrigger
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip id={`tooltip-${title}`}>{tooltip}</Tooltip>}
        >
          <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
            {linkContent}
          </Link>
        </OverlayTrigger>
      ) : (
        // Si no hay tooltip, renderizar el enlace normalmente
        <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
          {linkContent}
        </Link>
      )}
      {children}
    </div>
  )
}

export {SidebarMenuItem}
