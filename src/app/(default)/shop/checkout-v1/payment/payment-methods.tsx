'use client'

import { useEffect, useState, useCallback } from 'react'
import { useCart } from '@/contexts/cart-context'
import { useCheckout } from '@/contexts/checkout-context'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Link from 'next/link'
import Image from 'next/image'
import Accordion from 'react-bootstrap/Accordion'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CreditCardInput from '@/components/forms/credit-card-input'
import Cleave from 'cleave.js/react'
import Button from 'react-bootstrap/Button'
import { useRouter } from 'next/navigation'

const PaymentMethodsCheckout_V1 = ({ tax, shipping }: { tax: number; shipping: number | string }) => {
  const { calculateTotal, processCheckout, state: cartState } = useCart('electronics')
  const { state, updatePaymentInfo } = useCheckout()
  const router = useRouter()
  const cartTotal = calculateTotal() + (tax ?? 0) + (typeof shipping === 'number' ? shipping : 0)
  const [payment, setPayment] = useState(state.paymentInfo.method)

  // Sync payment state with context only when state.paymentInfo.method changes
  useEffect(() => {
    setPayment(state.paymentInfo.method)
  }, [state.paymentInfo.method])

  // Custom toggle that binds radion button to accordion button
  const PaymentToggle = ({ eventKey, children }: { eventKey: string; children: React.ReactNode }) => {
    const accordionToggle = useAccordionButton(eventKey)

    const handleClick = (e: React.SyntheticEvent) => {
      accordionToggle(e)
      setPayment(eventKey as 'cod' | 'card' | 'paypal' | 'gpay')
      updatePaymentInfo({ method: eventKey as 'cod' | 'card' | 'paypal' | 'gpay' })
    }

    return (
      <Form.Check className="d-inline-block mb-0">
        <Form.Check.Label className="d-flex align-items-center text-dark-emphasis fw-semibold">
          <Form.Check.Input
            type="radio"
            name="paymentMethod"
            value={eventKey}
            onChange={handleClick}
            checked={eventKey === payment}
            className="fs-base me-2 me-sm-3"
          />
          {children}
        </Form.Check.Label>
      </Form.Check>
    )
  }

  const handleCardChange = useCallback((field: string, value: string) => {
    updatePaymentInfo({ [field]: value })
  }, [updatePaymentInfo])

  const handleCardNumberChange = useCallback((number: string) => {
    handleCardChange('cardNumber', number)
  }, [handleCardChange])

  const handleCardTypeChange = useCallback((type: string) => {
    console.log('Card type:', type)
  }, [])

  return (
    <div className="d-flex align-items-start">
      <div
        className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle fs-sm fw-semibold lh-1 flex-shrink-0"
        style={{ width: '2rem', height: '2rem', marginTop: '-.125rem' }}
      >
        3
      </div>
      <div className="w-100 ps-3 ps-md-4">
        <h2 className="h5 mb-0">Payment</h2>
        <Accordion defaultActiveKey={payment} className="mb-4">
          <div className="mt-4">
            <PaymentToggle eventKey="cod">Cash on delivery</PaymentToggle>
            <Accordion.Collapse eventKey="cod">
              <div className="d-sm-flex align-items-center pt-3 pt-sm-4 pb-2 ps-3 ms-2 ms-sm-3">
                <span className="fs-sm me-3">I would require a change from:</span>
                <InputGroup className="mt-2 mt-sm-0" style={{ maxWidth: 150 }}>
                  <InputGroup.Text id="currencySign">
                    <i className="ci-dollar-sign" />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    aria-label="Amount (to the nearest dollar)"
                    aria-describedby="currencySign"
                  />
                </InputGroup>
              </div>
            </Accordion.Collapse>
          </div>
          <div className="mt-4">
            <PaymentToggle eventKey="card">
              Credit or debit card
              <span className="d-none d-sm-flex gap-2 ms-3">
                <Image
                  src="/img/payment-methods/amex.svg"
                  className="d-block bg-info rounded-1"
                  width={36}
                  height={25}
                  alt="Amex"
                />
                <Image
                  src="/img/payment-methods/visa-light-mode.svg"
                  className="d-none-dark"
                  width={36}
                  height={25}
                  alt="Visa"
                />
                <Image
                  src="/img/payment-methods/visa-dark-mode.svg"
                  className="d-none d-block-dark"
                  width={36}
                  height={25}
                  alt="Visa"
                />
                <Image src="/img/payment-methods/mastercard.svg" width={36} height={25} alt="Mastercard" />
                <Image src="/img/payment-methods/maestro.svg" width={36} height={25} alt="Maestro" />
              </span>
            </PaymentToggle>
            <Accordion.Collapse eventKey="card">
              <Form className="pt-4 pb-2 ps-3 ms-2 ms-sm-3">
                <CreditCardInput
                  id="card-number"
                  size="lg"
                  placeholder="Card number"
                  onCardTypeChange={handleCardTypeChange}
                  onCardNumberChange={handleCardNumberChange}
                  required
                  className="mb-3 mb-lg-4"
                />
                <Row xs={1} sm={2} className="g-3 g-sm-4">
                  <Col>
                    <Form.Control
                      as={Cleave}
                      size="lg"
                      options={{ date: true, datePattern: ['m', 'y'] }}
                      placeholder="MM/YY"
                      value={state.paymentInfo.cardExpiry || ''}
                      onChange={(e) => handleCardChange('cardExpiry', e.target.value)}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      as={Cleave}
                      size="lg"
                      options={{ numericOnly: true, blocks: [3] }}
                      placeholder="CVC"
                      value={state.paymentInfo.cardCvv || ''}
                      onChange={(e) => handleCardChange('cardCvv', e.target.value)}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Control
                      type="text"
                      size="lg"
                      placeholder="Cardholder name"
                      value={state.paymentInfo.cardholderName || ''}
                      onChange={(e) => handleCardChange('cardholderName', e.target.value)}
                      required
                    />
                  </Col>
                </Row>
              </Form>
            </Accordion.Collapse>
          </div>
          <div className="mt-4">
            <PaymentToggle eventKey="paypal">
              PayPal
              <Image src="/img/payment-methods/paypal-icon.svg" width={16} height={19} className="ms-3" alt="PayPal" />
            </PaymentToggle>
          </div>
          <div className="mt-4">
            <PaymentToggle eventKey="gpay">
              Google Pay
              <Image
                src="/img/payment-methods/google-icon.svg"
                width={20}
                height={16}
                className="ms-3"
                alt="Google Pay"
              />
            </PaymentToggle>
          </div>
        </Accordion>
        <Nav className="pb-3 mb-2 mb-sm-3">
          <Nav.Link className="animate-underline p-0">
            <i className="ci-plus-circle fs-xl ms-a me-2" />
            <span className="animate-target">Add a promo code or a gift card</span>
          </Nav.Link>
        </Nav>
        <Form.Control as="textarea" size="lg" rows={3} className="mb-4" placeholder="Additional comments" />
        <Form.Check className="mb-lg-4">
          <Form.Check.Input id="acceptTerms" />
          <Form.Check.Label htmlFor="acceptTerms" className="nav align-items-center">
            I accept the
            <Nav.Link as={Link} href="/terms" className="text-decoration-underline fw-normal ms-1 p-0">
              Terms and Conditions
            </Nav.Link>
          </Form.Check.Label>
        </Form.Check>

        {/* Pay button visible on screens > 991px wide (lg breakpoint) */}
        <Button 
          variant="primary" 
          size="lg" 
          className="w-100 d-none d-lg-flex"
          onClick={async () => {
            if (!cartState.cartId) {
              alert('Cart not found. Please refresh the page and try again.')
              return
            }

            // Validate required fields
            if (!state.shippingAddress.firstName || 
                !state.shippingAddress.lastName || 
                !state.shippingAddress.email || 
                !state.shippingAddress.address || 
                !state.shippingAddress.city || 
                !state.shippingAddress.state || 
                !state.shippingAddress.zipCode) {
              alert('Please fill in all required shipping address fields.')
              return
            }

            try {
              console.log('Cart state:', cartState);
              console.log('Checkout state:', state);
              
              // Prepare checkout data
              const checkoutData: any = {
                address: {
                  name: `${state.shippingAddress.firstName} ${state.shippingAddress.lastName}`,
                  email: state.shippingAddress.email,
                  phone: state.shippingAddress.phone,
                  country: state.shippingAddress.country,
                  state: state.shippingAddress.state,
                  city: state.shippingAddress.city,
                  zip_code: state.shippingAddress.zipCode,
                  address: state.shippingAddress.address,
                },
                shipping_method: state.deliveryInfo.shippingMethod,
                shipping_option: state.deliveryInfo.pickupLocation || 'standard',
                payment_method: state.paymentInfo.method,
                note: '',
              }

              // Add billing address if different from shipping
              if (!state.billingSameAsShipping && state.billingAddress) {
                checkoutData.billing_address = {
                  name: `${state.billingAddress.firstName} ${state.billingAddress.lastName}`,
                  email: state.billingAddress.email,
                  phone: state.billingAddress.phone,
                  country: state.billingAddress.country,
                  state: state.billingAddress.state,
                  city: state.billingAddress.city,
                  zip_code: state.billingAddress.zipCode,
                  address: state.billingAddress.address,
                }
              }

              const response = await processCheckout(checkoutData)
              console.log('Checkout response:', response);
              
              if (response.success && response.data) {
                // Redirect to thank you page with order information
                const orderId = response.data.id;
                const token = response.token || response.data.token;
                console.log('Redirecting to thank you page with order ID:', orderId, 'token:', token);
                router.push(`/shop/checkout-v1/thank-you?order_id=${orderId}&token=${token}`)
              } else {
                console.error('Checkout failed:', response);
                alert(response.message || 'Failed to create order. Please try again.')
              }
            } catch (error) {
              console.error('Order processing error:', error)
              alert('Failed to process order. Please try again.')
            }
          }}
        >
          Pay $
          {cartTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Button>
      </div>
    </div>
  )
}

export default PaymentMethodsCheckout_V1
