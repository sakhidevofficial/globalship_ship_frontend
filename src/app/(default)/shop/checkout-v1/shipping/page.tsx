'use client'

import Link from 'next/link'
import HeaderElectronics from '@/components/layout/header-electronics'
import DeliveryInfoOverviewCheckout_V1 from './delivery-info-overview'
import OrderSummarySidebar from '@/components/shop/order-summary-sidebar'
import SelectBox from '@/components/forms/select-box'
import FooterElectronics from '@/components/layout/footer-electronics'
import { useCheckout } from '@/contexts/checkout-context'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'
import FormCheck from 'react-bootstrap/FormCheck'
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverBody from 'react-bootstrap/PopoverBody'

const Checkout_V1_ShippingPage = () => {
  const { state, updateShippingAddress, setBillingSameAsShipping, updateBillingAddress } = useCheckout()

  const handleAddressChange = (field: string, value: string) => {
    updateShippingAddress({ [field]: value })
  }

  const handleBillingAddressChange = (field: string, value: string) => {
    updateBillingAddress({ [field]: value })
  }

  // Countries list
  const countries = [
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Japan', label: 'Japan' },
    { value: 'China', label: 'China' },
    { value: 'India', label: 'India' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'South Korea', label: 'South Korea' },
    { value: 'Netherlands', label: 'Netherlands' },
    { value: 'Switzerland', label: 'Switzerland' },
    { value: 'Sweden', label: 'Sweden' },
    { value: 'Norway', label: 'Norway' },
    { value: 'Denmark', label: 'Denmark' },
    { value: 'Finland', label: 'Finland' },
  ]

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
                {/* Delivery info overview + Edit button */}
                <DeliveryInfoOverviewCheckout_V1 
                  postcode={state.shippingAddress.zipCode || 'Enter postcode'}
                  deliveryDate={state.deliveryInfo.deliveryDate || 'To be calculated'}
                  deliveryTime={state.deliveryInfo.deliveryTime || 'To be calculated'}
                />

                {/* Shipping address form */}
                <div className="d-flex align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle fs-sm fw-semibold lh-1 flex-shrink-0"
                    style={{ width: '2rem', height: '2rem', marginTop: '-.125rem' }}
                  >
                    2
                  </div>
                  <div className="w-100 ps-3 ps-md-4">
                    <h1 className="h5 mb-md-4">Shipping address</h1>
                    <Form>
                      <Row xs={1} sm={2} className="g-3 g-sm-4 mb-4">
                        <Col>
                          <FormLabel htmlFor="shippingFn">
                            First name <span className="text-danger">*</span>
                          </FormLabel>
                          <FormControl 
                            type="text" 
                            size="lg" 
                            id="shippingFn" 
                            value={state.shippingAddress.firstName}
                            onChange={(e) => handleAddressChange('firstName', e.target.value)}
                            required 
                          />
                        </Col>
                        <Col>
                          <FormLabel htmlFor="shippingLn">
                            Last name <span className="text-danger">*</span>
                          </FormLabel>
                          <FormControl 
                            type="text" 
                            size="lg" 
                            id="shippingLn" 
                            value={state.shippingAddress.lastName}
                            onChange={(e) => handleAddressChange('lastName', e.target.value)}
                            required 
                          />
                        </Col>
                        <Col>
                          <FormLabel htmlFor="shippingEmail">
                            Email address <span className="text-danger">*</span>
                          </FormLabel>
                          <FormControl 
                            type="email" 
                            size="lg" 
                            id="shippingEmail" 
                            value={state.shippingAddress.email}
                            onChange={(e) => handleAddressChange('email', e.target.value)}
                            required 
                          />
                        </Col>
                        <Col>
                          <FormLabel htmlFor="shippingMobile">Phone number</FormLabel>
                          <FormControl 
                            type="tel" 
                            size="lg" 
                            id="shippingMobile" 
                            value={state.shippingAddress.phone}
                            onChange={(e) => handleAddressChange('phone', e.target.value)}
                          />
                        </Col>
                        <Col>
                          <FormLabel htmlFor="shippingCountry">
                            Country <span className="text-danger">*</span>
                          </FormLabel>
                          <SelectBox
                            choices={countries}
                            searchEnabled
                            inputClassName="form-select-lg"
                            placeholder="Select your country"
                            required
                            value={state.shippingAddress.country}
                            onChange={(value) => handleAddressChange('country', value as string)}
                            aria-label="Country select"
                          />
                        </Col>
                        <Col>
                          <FormLabel htmlFor="shippingState">
                            State/Province <span className="text-danger">*</span>
                          </FormLabel>
                          <FormControl 
                            type="text" 
                            size="lg" 
                            id="shippingState" 
                            value={state.shippingAddress.state}
                            onChange={(e) => handleAddressChange('state', e.target.value)}
                            required 
                          />
                        </Col>
                        <Col>
                          <FormLabel>
                            City <span className="text-danger">*</span>
                          </FormLabel>
                          <FormControl 
                            type="text" 
                            size="lg" 
                            id="shippingCity" 
                            value={state.shippingAddress.city}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            required 
                          />
                        </Col>
                        <Col>
                          <FormLabel htmlFor="shippingPostcode">
                            Postcode <span className="text-danger">*</span>
                          </FormLabel>
                          <FormControl 
                            type="text" 
                            size="lg" 
                            id="shippingPostcode" 
                            value={state.shippingAddress.zipCode}
                            onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                            required 
                          />
                        </Col>
                      </Row>
                      <div className="mb-3">
                        <FormLabel htmlFor="shippingAddress">
                          House / apartment number and street address <span className="text-danger">*</span>
                        </FormLabel>
                        <FormControl 
                          type="text" 
                          size="lg" 
                          id="shippingAddress" 
                          value={state.shippingAddress.address}
                          onChange={(e) => handleAddressChange('address', e.target.value)}
                          required 
                        />
                      </div>
                      <Nav className="mb-4">
                        <NavLink href="#" className="px-0">
                          Add address line
                          <i className="ci-plus fs-base ms-1" />
                        </NavLink>
                      </Nav>
                      <h3 className="h6">
                        Billing address
                        <OverlayTrigger
                          trigger={['hover', 'focus']}
                          placement="right"
                          overlay={
                            <Popover className="popover-sm">
                              <PopoverBody>
                                Uncheck the checkbox below if your Billing address should be different from your Shipping
                                address.
                              </PopoverBody>
                            </Popover>
                          }
                        >
                          <i className="ci-info text-body-secondary align-middle ms-2" />
                        </OverlayTrigger>
                      </h3>
                      <FormCheck 
                        id="sameAddress" 
                        label="Same as delivery address" 
                        className="mb-lg-4" 
                        checked={state.billingSameAsShipping}
                        onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                      />
                      
                      {/* Billing Address Form (shown when billing is different from shipping) */}
                      {!state.billingSameAsShipping && (
                        <div className="mb-4">
                          <h4 className="h6 mb-3">Billing Address</h4>
                          <Row xs={1} sm={2} className="g-3 g-sm-4 mb-4">
                            <Col>
                              <FormLabel htmlFor="billingFn">
                                First name <span className="text-danger">*</span>
                              </FormLabel>
                              <FormControl 
                                type="text" 
                                size="lg" 
                                id="billingFn" 
                                value={state.billingAddress?.firstName || ''}
                                onChange={(e) => handleBillingAddressChange('firstName', e.target.value)}
                                required 
                              />
                            </Col>
                            <Col>
                              <FormLabel htmlFor="billingLn">
                                Last name <span className="text-danger">*</span>
                              </FormLabel>
                              <FormControl 
                                type="text" 
                                size="lg" 
                                id="billingLn" 
                                value={state.billingAddress?.lastName || ''}
                                onChange={(e) => handleBillingAddressChange('lastName', e.target.value)}
                                required 
                              />
                            </Col>
                            <Col>
                              <FormLabel htmlFor="billingEmail">
                                Email address <span className="text-danger">*</span>
                              </FormLabel>
                              <FormControl 
                                type="email" 
                                size="lg" 
                                id="billingEmail" 
                                value={state.billingAddress?.email || ''}
                                onChange={(e) => handleBillingAddressChange('email', e.target.value)}
                                required 
                              />
                            </Col>
                            <Col>
                              <FormLabel htmlFor="billingPhone">Phone number</FormLabel>
                              <FormControl 
                                type="tel" 
                                size="lg" 
                                id="billingPhone" 
                                value={state.billingAddress?.phone || ''}
                                onChange={(e) => handleBillingAddressChange('phone', e.target.value)}
                              />
                            </Col>
                            <Col>
                              <FormLabel htmlFor="billingCountry">
                                Country <span className="text-danger">*</span>
                              </FormLabel>
                              <SelectBox
                                choices={countries}
                                searchEnabled
                                inputClassName="form-select-lg"
                                placeholder="Select your country"
                                required
                                value={state.billingAddress?.country || ''}
                                onChange={(value) => handleBillingAddressChange('country', value as string)}
                                aria-label="Country select"
                              />
                            </Col>
                            <Col>
                              <FormLabel htmlFor="billingState">
                                State/Province <span className="text-danger">*</span>
                              </FormLabel>
                              <FormControl 
                                type="text" 
                                size="lg" 
                                id="billingState" 
                                value={state.billingAddress?.state || ''}
                                onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                                required 
                              />
                            </Col>
                            <Col>
                              <FormLabel htmlFor="billingCity">
                                City <span className="text-danger">*</span>
                              </FormLabel>
                              <FormControl 
                                type="text" 
                                size="lg" 
                                id="billingCity" 
                                value={state.billingAddress?.city || ''}
                                onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                                required 
                              />
                            </Col>
                            <Col>
                              <FormLabel htmlFor="billingPostcode">
                                Postcode <span className="text-danger">*</span>
                              </FormLabel>
                              <FormControl 
                                type="text" 
                                size="lg" 
                                id="billingPostcode" 
                                value={state.billingAddress?.zipCode || ''}
                                onChange={(e) => handleBillingAddressChange('zipCode', e.target.value)}
                                required 
                              />
                            </Col>
                          </Row>
                          <div className="mb-3">
                            <FormLabel htmlFor="billingAddress">
                              House / apartment number and street address <span className="text-danger">*</span>
                            </FormLabel>
                            <FormControl 
                              type="text" 
                              size="lg" 
                              id="billingAddress" 
                              value={state.billingAddress?.address || ''}
                              onChange={(e) => handleBillingAddressChange('address', e.target.value)}
                              required 
                            />
                          </div>
                        </div>
                      )}
                      
                      <Link href="../payment" className="btn btn-lg btn-primary w-100 d-none d-lg-flex">
                        Continue
                        <i className="ci-chevron-right fs-lg ms-1 me-n1" />
                      </Link>
                    </Form>
                  </div>
                </div>

                {/* Payment */}
                <div className="d-flex align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center bg-body-secondary text-body-secondary rounded-circle fs-sm fw-semibold lh-1 flex-shrink-0"
                    style={{ width: '2rem', height: '2rem', marginTop: '-.125rem' }}
                  >
                    3
                  </div>
                  <h2 className="h5 text-body-secondary ps-3 ps-md-4 mb-0">Payment</h2>
                </div>
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
      <div className="fixed-bottom z-sticky w-100 py-2 px-3 bg-body border-top shadow d-lg-none">
        <Link href="../payment" className="btn btn-lg btn-primary w-100">
          Continue
          <i className="ci-chevron-right fs-lg ms-1 me-n1" />
        </Link>
      </div>
    </>
  )
}

export default Checkout_V1_ShippingPage
