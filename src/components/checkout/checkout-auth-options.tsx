'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Collapse from 'react-bootstrap/Collapse'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface CheckoutAuthOptionsProps {
  onAuthChange: (authType: 'guest' | 'authenticated', userData?: any) => void
  onUserSelect: (user: any) => void
  className?: string
}

const CheckoutAuthOptions = ({ onAuthChange, onUserSelect, className = '' }: CheckoutAuthOptionsProps) => {
  const { user, isAuthenticated, login, register, isLoading } = useAuth()
  const [selectedOption, setSelectedOption] = useState<'guest' | 'signin' | 'signup'>('guest')
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [guestEmail, setGuestEmail] = useState('')

  // If user is already authenticated, notify parent
  useEffect(() => {
    if (isAuthenticated && user) {
      onAuthChange('authenticated', user)
      onUserSelect(user)
    }
  }, [isAuthenticated, user, onAuthChange, onUserSelect])

  const handleOptionChange = (option: 'guest' | 'signin' | 'signup') => {
    setSelectedOption(option)
    setShowAuthForm(option !== 'guest')
    setErrors({})
    
    if (option === 'guest') {
      onAuthChange('guest')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (selectedOption === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required'
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      if (selectedOption === 'signin') {
        const result = await login(formData.email, formData.password)
        if (result.success) {
          onAuthChange('authenticated')
        } else {
          setErrors({ submit: result.message || 'Login failed' })
        }
      } else if (selectedOption === 'signup') {
        const result = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          phone: formData.phone
        })
        if (result.success) {
          onAuthChange('authenticated')
        } else {
          setErrors({ submit: result.message || 'Registration failed' })
        }
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGuestEmailChange = (email: string) => {
    setGuestEmail(email)
    onAuthChange('guest', { email })
  }

  // If user is already authenticated, show authenticated state
  if (isAuthenticated && user) {
    return (
      <Card className={className}>
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 me-3">
              <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="ci-check text-white"></i>
              </div>
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-1">Signed in as {user.name || user.email}</h6>
              <p className="text-muted mb-0 small">{user.email}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <Card.Body>
        <h5 className="mb-4">Checkout Options</h5>
        
        {/* Authentication Options */}
        <div className="mb-4">
          <Form.Check
            type="radio"
            id="guest-option"
            name="checkout-option"
            label="Continue as Guest"
            checked={selectedOption === 'guest'}
            onChange={() => handleOptionChange('guest')}
            className="mb-3"
          />
          
          <Form.Check
            type="radio"
            id="signin-option"
            name="checkout-option"
            label="Sign In to Existing Account"
            checked={selectedOption === 'signin'}
            onChange={() => handleOptionChange('signin')}
            className="mb-3"
          />
          
          <Form.Check
            type="radio"
            id="signup-option"
            name="checkout-option"
            label="Create New Account"
            checked={selectedOption === 'signup'}
            onChange={() => handleOptionChange('signup')}
            className="mb-3"
          />
        </div>

        {/* Guest Email Input */}
        {selectedOption === 'guest' && (
          <div className="mb-3">
            <Form.Label htmlFor="guest-email">Email Address</Form.Label>
            <Form.Control
              type="email"
              id="guest-email"
              placeholder="Enter your email for order confirmation"
              value={guestEmail}
              onChange={(e) => handleGuestEmailChange(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll use this email to send you order confirmation and updates.
            </Form.Text>
          </div>
        )}

        {/* Authentication Forms */}
        <Collapse in={showAuthForm}>
          <div>
            {errors.submit && (
              <Alert variant="danger" className="mb-3">
                {errors.submit}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              {selectedOption === 'signup' && (
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label htmlFor="signup-name">Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      id="signup-name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Col>
                  <Col md={6}>
                    <Form.Label htmlFor="signup-phone">Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      id="signup-phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </Col>
                </Row>
              )}
              
              <Row className="mb-3">
                <Col md={selectedOption === 'signup' ? 6 : 12}>
                  <Form.Label htmlFor="auth-email">Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    id="auth-email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Col>
                
                <Col md={selectedOption === 'signup' ? 6 : 12}>
                  <Form.Label htmlFor="auth-password">Password *</Form.Label>
                  <Form.Control
                    type="password"
                    id="auth-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              
              {selectedOption === 'signup' && (
                <div className="mb-3">
                  <Form.Label htmlFor="confirm-password">Confirm Password *</Form.Label>
                  <Form.Control
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || isLoading}
                className="w-100"
              >
                {isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    {selectedOption === 'signin' ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  selectedOption === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </Form>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  )
}

export default CheckoutAuthOptions 