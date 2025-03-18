import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
  return (
    <>
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Inspecciones
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to="/catalogs"
        icon="fa fa-documents"
        title="catalogs"
        fontIcon="bi-wifi-off text-info"
      />
    </>
  )
}

export { SidebarMenuMain }
