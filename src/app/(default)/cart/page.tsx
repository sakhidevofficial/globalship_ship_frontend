'use client'

import HeaderElectronics from '@/components/layout/header-electronics'
import FooterElectronics from '@/components/layout/footer-electronics'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CustomFooter from '@/components/layout/custom-footer'

export default function CartPage() {
  return (
    <>
      <HeaderElectronics />
      <main className="content-wrapper">
        <Container className="py-5">
          <Row>
            <Col xs={12}>
              <h1 className="mb-4">Shopping Cart</h1>
              <div className="bg-light rounded-3 p-4">
                <p className="mb-3">Your cart contains 3 items</p>
                <div className="d-flex gap-3">
                  <Button variant="primary">Proceed to Checkout</Button>
                  <Button variant="outline-secondary">Continue Shopping</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      {/* <FooterElectronics /> */}
      <CustomFooter />
    </>
  )
}
