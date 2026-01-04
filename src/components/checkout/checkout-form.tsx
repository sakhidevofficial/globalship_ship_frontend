'use client'

import React, { useState, useEffect } from 'react'
import { useCart } from '@/contexts/cart-context'
import { useAuth } from '@/contexts/auth-context'
import { OrderService, type CreateOrderRequest, type OrderAddress } from '@/services/orders'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useRouter } from 'next/navigation'
import { botbleAPI } from '@/services/api'

interface CheckoutFormProps {
  slug: string
  onSuccess?: (order: any) => void
  onError?: (error: string) => void
}

export default function CheckoutForm({ slug, onSuccess, onError }: CheckoutFormProps) {
  const { cart, calculateTotal, calculateTotalDiscount, clearCart, state, processCheckout } = useCart(slug)
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [createAccount, setCreateAccount] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [formData, setFormData] = useState({
    address: {
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      country: user?.country || 'United States',
      zip_code: user?.zip_code || '',
    } as OrderAddress,
    shipping_method: 'default',
    shipping_option: 'standard',
    payment_method: 'cod',
    coupon_code: '',
    note: '',
  })

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      // Use basic user info for address form
      setFormData(prev => ({
        ...prev,
        address: {
          name: user.name || '',
          phone: user.phone || '',
          email: user.email || '',
          address: '',
          city: '',
          state: '',
          country: 'United States',
          zip_code: '',
        }
      }))
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object || {}),
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (cart.length === 0) {
      setError('Your cart is empty')
      setIsSubmitting(false)
      return
    }

    if (!state.cartId) {
      setError('Cart ID not found. Please refresh the page and try again.')
      setIsSubmitting(false)
      return
    }

    // Validate password if creating account
    if (createAccount) {
      if (!password) {
        setError('Password is required when creating an account')
        setIsSubmitting(false)
        return
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        setIsSubmitting(false)
        return
      }
      if (password !== passwordConfirmation) {
        setError('Password confirmation does not match')
        setIsSubmitting(false)
        return
      }
    }

    try {
      // Prepare checkout data
      const checkoutData: any = {
        address: formData.address,
        shipping_method: formData.shipping_method,
        shipping_option: formData.shipping_option,
        payment_method: formData.payment_method,
        coupon_code: formData.coupon_code || undefined,
        note: formData.note || undefined,
      }

      // Add account creation data if requested
      if (createAccount) {
        checkoutData.create_account = 1
        checkoutData.password = password
        checkoutData.password_confirmation = passwordConfirmation
      }

          // Use the cart context processCheckout method
    const response = await processCheckout(checkoutData)
      
      if (response.success && response.data) {
        // Clear cart after successful order
        clearCart()
        
        if (onSuccess) {
          onSuccess(response.data)
        } else {
          // Redirect to thank you page with order information
          router.push(`/shop/checkout-v1/thank-you?order_id=${response.data.id}&token=${response.token}`)
        }
      } else {
        throw new Error(response.message || 'Failed to create order')
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create order'
      setError(errorMessage)
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const subtotal = calculateTotal()
  const discount = calculateTotalDiscount()
  const shipping = 0 // This would be calculated based on shipping method
  const tax = 0 // This would be calculated based on location
  const total = subtotal - discount + shipping + tax

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Shipping Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.name}
                      onChange={(e) => handleInputChange('address.name', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="tel"
                      value={formData.address.phone}
                      onChange={(e) => handleInputChange('address.phone', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.address.email}
                  onChange={(e) => handleInputChange('address.email', e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.address.address}
                  onChange={(e) => handleInputChange('address.address', e.target.value)}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('address.city', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>State/Province *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange('address.state', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.country}
                      onChange={(e) => handleInputChange('address.country', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>ZIP/Postal Code *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.address.zip_code}
                      onChange={(e) => handleInputChange('address.zip_code', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Account Creation Option */}
              {!isAuthenticated && (
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="create-account"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                    label="Create an account for faster checkout next time"
                  />
                </Form.Group>
              )}

              {createAccount && (
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password *</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={createAccount}
                        minLength={6}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password *</Form.Label>
                      <Form.Control
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required={createAccount}
                        minLength={6}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5>Shipping Method</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="shipping-default"
                  name="shipping_method"
                  value="default"
                  checked={formData.shipping_method === 'default'}
                  onChange={(e) => handleInputChange('shipping_method', e.target.value)}
                  label="Standard Shipping (3-5 business days)"
                />
                <Form.Check
                  type="radio"
                  id="shipping-express"
                  name="shipping_method"
                  value="express"
                  checked={formData.shipping_method === 'express'}
                  onChange={(e) => handleInputChange('shipping_method', e.target.value)}
                  label="Express Shipping (1-2 business days)"
                />
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5>Payment Method</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="payment-cod"
                  name="payment_method"
                  value="cod"
                  checked={formData.payment_method === 'cod'}
                  onChange={(e) => handleInputChange('payment_method', e.target.value)}
                  label="Cash on Delivery"
                />
                <Form.Check
                  type="radio"
                  id="payment-card"
                  name="payment_method"
                  value="card"
                  checked={formData.payment_method === 'card'}
                  onChange={(e) => handleInputChange('payment_method', e.target.value)}
                  label="Credit/Debit Card"
                />
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>
              <h5>Additional Information</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Coupon Code</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.coupon_code}
                  onChange={(e) => handleInputChange('coupon_code', e.target.value)}
                  placeholder="Enter coupon code"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Order Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  placeholder="Special instructions for delivery"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5>Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-100 mt-3"
                disabled={isSubmitting || cart.length === 0}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Form>
  )
} 