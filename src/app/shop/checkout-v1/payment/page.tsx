'use client'

import HeaderElectronics from '@/components/layout/header-electronics'
import DeliveryShippingOverviewCheckout_V1 from './delivery-shipping-overview'
import PaymentMethodsCheckout_V1 from './payment-methods'
import OrderSummarySidebar from '@/components/shop/order-summary-sidebar'
import FooterElectronics from '@/components/layout/footer-electronics'
import StickyPayButtonCheckout_V1 from './sticky-pay-button'
import { useCheckout } from '@/contexts/checkout-context'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'

const Checkout_V1_PaymentPage = () => {
  const { state } = useCheckout()

  return (
    <>
      {/* Navigation bar (Page header) */}
      <HeaderElectronics />

      {/* Page content */}
      <main className="content-wrapper">
        <Container className="py-5">
          <Row className="pt-1 pt-sm-3 pt-lg-4 pb-2 pb-md-3 pb-lg-4 pb-xl-5">
            <Col lg={8} xl={7} className="position-relative z-2 mb-5 mb-lg-0">
              <Accordion className="d-flex flex-column gap-5 pe-lg-4 pe-xl-0">
                {/* Delivery and Shipping overview */}
                <DeliveryShippingOverviewCheckout_V1 
                  postcode={state.shippingAddress.zipCode || 'Enter postcode'}
                  deliveryDate={state.deliveryInfo.deliveryDate || 'To be calculated'}
                  deliveryTime={state.deliveryInfo.deliveryTime || 'To be calculated'}
                  shippingAddress={{
                    name: `${state.shippingAddress.firstName} ${state.shippingAddress.lastName}`.trim() || 'Enter shipping information',
                    email: state.shippingAddress.email || '',
                    phone: state.shippingAddress.phone || '',
                    state: state.shippingAddress.state || '',
                    zipCode: state.shippingAddress.zipCode || '',
                    address: state.shippingAddress.address || ''
                  }}
                />

                {/* Payment method */}
                <PaymentMethodsCheckout_V1 tax={73.4} shipping={16.5} />
              </Accordion>
            </Col>

            {/* Order summary (sticky sidebar) */}
            <Col lg={4} className="offset-xl-1" style={{ marginTop: -110 }}>
              <OrderSummarySidebar
                cartSlug="electronics"
                editCartUrl="./"
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

      {/* Fixed positioned pay button that is visible on screens < 992px wide (lg breakpoint) */}
      <StickyPayButtonCheckout_V1 tax={73.4} shipping={16.5} />
    </>
  )
}

export default Checkout_V1_PaymentPage
