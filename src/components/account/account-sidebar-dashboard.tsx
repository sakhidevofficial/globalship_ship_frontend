'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOffcanvas } from '@/contexts/offcanvas-context'
import { useModal } from '@/contexts/modal-context'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

interface AccountSidebarDashboardProps {
  name: string
  currentView?: string
  onViewChange?: (view: any) => void
}

interface LinkItem {
  icon: string
  label: string
  view: string
  badge?: number | string
}

const menuItems: { heading?: string; links: LinkItem[] }[] = [
  {
    links: [
      { icon: 'ci-grid', label: 'Dashboard', view: 'dashboard' },
      { icon: 'ci-shopping-bag', label: 'Orders', view: 'orders', badge: 1 },
      { icon: 'ci-heart', label: 'Wishlist', view: 'wishlist' },
      { icon: 'ci-credit-card', label: 'Payment methods', view: 'payment' },
      { icon: 'ci-star', label: 'My reviews', view: 'reviews' },
    ],
  },
  {
    heading: 'Manage account',
    links: [
      { icon: 'ci-user', label: 'Personal info', view: 'info' },
      { icon: 'ci-map-pin', label: 'Addresses', view: 'addresses' },
      { icon: 'ci-bell', label: 'Notifications', view: 'notifications' },
    ],
  },
  {
    heading: 'Customer service',
    links: [
      { icon: 'ci-help-circle', label: 'Help center', view: 'help' },
      { icon: 'ci-info', label: 'Terms and conditions', view: 'terms' },
    ],
  },
  {
    links: [{ icon: 'ci-log-out', label: 'Log out', view: 'logout' }],
  },
]

const AccountSidebarDashboard = ({ name, currentView = 'dashboard', onViewChange }: AccountSidebarDashboardProps) => {
  const pathname = usePathname()

  const { openOffcanvas, closeOffcanvas, isOpen } = useOffcanvas()
  const { openModal, closeModal, isShown } = useModal()

  const handleItemClick = (view: any) => {
    if (view === 'logout') {
      // Handle logout
      window.location.href = '/account'
      return
    }
    
    if (view === 'help' || view === 'terms') {
      // Navigate to external pages
      window.location.href = `/${view}`
      return
    }
    
    if (onViewChange) {
      onViewChange(view)
    }
    
    // Close offcanvas on mobile
    closeOffcanvas('accountSidebar')
  }

  return (
    <Fragment>
      <Offcanvas
        show={isOpen('accountSidebar')}
        onHide={() => closeOffcanvas('accountSidebar')}
        responsive="lg"
        placement="start"
        className="pe-lg-0 pe-xl-4"
        aria-label="Account sidebar"
      >
        <Offcanvas.Header className="d-lg-block py-3 p-lg-0">
          <div className="d-flex align-items-center">
            <div
              className="h5 d-flex justify-content-center align-items-center flex-shrink-0 text-primary bg-primary-subtle lh-1 rounded-circle mb-0"
              style={{ width: '3rem', height: '3rem' }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 ps-3">
              <h5 className="h6 mb-0">{name}</h5>
            </div>
          </div>
          <CloseButton className="d-lg-none" onClick={() => closeOffcanvas('accountSidebar')} />
        </Offcanvas.Header>
        <Offcanvas.Body className="d-block pt-2 pt-lg-4 pb-lg-0">
          {menuItems.map(({ heading, links }, index, arr) => (
            <Fragment key={index}>
              {heading && <h6 className="pt-4 ps-2 ms-1">{heading}</h6>}
              <ListGroup as="nav" variant="borderless" className={index === arr.length - 1 && !heading ? 'pt-3' : ''}>
                {links.map(({ icon, label, view, badge }, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    className="d-flex align-items-center"
                    active={currentView === view}
                    onClick={() => handleItemClick(view)}
                  >
                    <i className={`${icon} fs-base opacity-75 me-2`} />
                    {label}
                    {badge && (
                      <Badge pill className="ms-auto">
                        {badge}
                      </Badge>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Fragment>
          ))}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar navigation offcanvas toggle that is visible on screens < 992px wide (lg breakpoint) */}
      <Button
        variant="dark"
        size="lg"
        className="fixed-bottom z-sticky w-100 border-0 border-top border-light border-opacity-10 rounded-0 pb-4 d-lg-none"
        onClick={() => openOffcanvas('accountSidebar')}
      >
        <i className="ci-sidebar fs-base me-2" />
        Account menu
      </Button>
    </Fragment>
  )
}

export default AccountSidebarDashboard 