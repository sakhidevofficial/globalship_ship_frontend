'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useCheckout } from '@/contexts/checkout-context'
import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import CheckoutAuthOptions from '@/components/checkout/checkout-auth-options'
import OrderSummarySidebar from '@/components/shop/order-summary-sidebar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Link from 'next/link'

const CheckoutAuthPage = () => {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { updateShippingAddress } = useCheckout()
  const [authType, setAuthType] = useState<'guest' | 'authenticated'>('guest')
  const [userData, setUserData] = useState<any>(null)
  const [canProceed, setCanProceed] = useState(false)

  const handleAuthChange = (type: 'guest' | 'authenticated', data?: any) => {
    setAuthType(type)
    setUserData(data)
    
    if (type === 'authenticated') {
      setCanProceed(true)
    } else if (type === 'guest' && data?.email) {
      setCanProceed(true)
    } else {
      setCanProceed(false)
    }
  }

  const handleUserSelect = (user: any) => {
    // Pre-fill shipping address with user data if available
    if (user && user.name) {
      const nameParts = user.name.split(' ')
      updateShippingAddress({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || ''
      })
    }
  }

  const handleContinue = () => {
    if (authType === 'guest' && userData?.email) {
      // For guest checkout, pre-fill email in shipping address
      updateShippingAddress({
        email: userData.email
      })
    }
    
    router.push('/shop/checkout-v1/shipping')
  }

  return (
    <>
      {/* Navigation bar (Page header) */}
      <HeaderElectronics />

      {/* Page content */}
      <main className="content-wrapper">
        {/* Breadcrumb */}
        <Breadcrumb as={Container} className="pt-3 my-3 my-md-4">
          <li className="breadcrumb-item">
            <Link href="/home">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/shop/electronics">Shop</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/shop/checkout-v1">Cart</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Checkout
          </li>
        </Breadcrumb>

        <Container className="py-5">
          <Row className="pt-1 pt-sm-3 pt-lg-4 pb-2 pb-md-3 pb-lg-4 pb-xl-5">
            <Col lg={8} xl={7} className="position-relative z-2 mb-5 mb-lg-0">
              <div className="pe-lg-4 pe-xl-0">
                {/* Step indicator */}
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle fs-sm fw-semibold lh-1 flex-shrink-0"
                    style={{ width: '2rem', height: '2rem' }}
                  >
                    1
                  </div>
                  <div className="ps-3">
                    <h1 className="h4 mb-0">Account Information</h1>
                    <p className="text-muted mb-0">Choose how you'd like to checkout</p>
                  </div>
                </div>

                {/* Authentication Options */}
                <CheckoutAuthOptions
                  onAuthChange={handleAuthChange}
                  onUserSelect={handleUserSelect}
                  className="mb-4"
                />

                {/* Continue Button */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-secondary"
                    onClick={() => router.push('/shop/checkout-v1')}
                  >
                    <i className="ci-chevron-left me-2"></i>
                    Back to Cart
                  </Button>
                  
                  <Button
                    variant="primary"
                    onClick={handleContinue}
                    disabled={!canProceed}
                  >
                    Continue to Shipping
                    <i className="ci-chevron-right ms-2"></i>
                  </Button>
                </div>

                {/* Help text */}
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="mb-2">Why create an account?</h6>
                  <ul className="mb-0 small text-muted">
                    <li>Track your orders easily</li>
                    <li>Save your shipping addresses</li>
                    <li>Faster checkout for future purchases</li>
                    <li>Access to exclusive offers and rewards</li>
                  </ul>
                </div>
              </div>
            </Col>

            {/* Order summary (sticky sidebar) */}
            <Col lg={4} className="offset-xl-1" style={{ marginTop: -110 }}>
              <OrderSummarySidebar
                cartSlug="electronics"
                editCartUrl="/shop/checkout-v1"
                tax={73.4}
                shipping={16.5}
                className="position-sticky top-0"
                style={{ paddingTop: 110 }}
              />
            </Col>
          </Row>
        </Container>
      </main>

      {/* Page footer */}
      <FooterElectronics />
    </>
  )
}

export default CheckoutAuthPage 