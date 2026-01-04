'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import AccountSidebarShop from '@/components/account/account-sidebar-shop'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { useAuth } from '@/contexts/auth-context'
import CustomFooter from '@/components/layout/custom-footer'

const ShopAccountLayout = ({ children }: React.PropsWithChildren) => {
  const { user, isAuthenticated, isLoading } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/account')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading account...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user || !user.name) {
    return null // Will redirect to login
  }

  return (
    <>
      <HeaderElectronics
        isLoggedIn={{
          name: user.name,
          href: '/account/shop',
        }}
      />

      {/* Account page sidebar + content */}
      <main className="content-wrapper">
        <Container className="py-5 mt-n2 mt-sm-0">
          <Row className="pt-md-2 pt-lg-3 pb-sm-2 pb-md-3 pb-lg-4 pb-xl-5">
            {/* Sidebar navigation that turns into offcanvas on screens < 992px wide (lg breakpoint) */}
            <Col as="aside" lg={3}>
              <AccountSidebarShop name={user.name} />
            </Col>

            {/* Page content */}
            <Col lg={9}>
              <div className="ps-lg-3 ps-xl-0">{children}</div>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Page footer */}
      {/* <FooterElectronics className="border-top" /> */}
      <CustomFooter />
    </>
  )
}

export default ShopAccountLayout
