'use client'

import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { authService, LoginCredentials, RegisterData } from '@/services/auth'

interface AuthModalProps {
  show: boolean
  onHide: () => void
  initialMode?: 'login' | 'signup'
}

export default function AuthModal({ show, onHide, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await authService.login(loginForm as LoginCredentials)
      
      if (response.success) {
        setSuccess('Login successful!')
        setTimeout(() => {
          onHide()
          // Optionally redirect or update global state
        }, 1500)
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await authService.register(signupForm as RegisterData)
      
      if (response.success) {
        setSuccess(response.message)
        setTimeout(() => {
          setMode('login')
          setSignupForm({ name: '', email: '', password: '', password_confirmation: '' })
        }, 2000)
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: 'facebook' | 'google') => {
    // Implement social login logic here
    console.log(`${provider} login clicked`)
    setError(`${provider} login not implemented yet`)
  }

  const resetForms = () => {
    setLoginForm({ email: '', password: '' })
    setSignupForm({ name: '', email: '', password: '', password_confirmation: '' })
    setError('')
    setSuccess('')
  }

  const handleModeSwitch = (newMode: 'login' | 'signup') => {
    setMode(newMode)
    resetForms()
  }

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      onExited={resetForms}
      style={{ maxWidth: '500px' }}
    >
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="w-100 text-center">
          <div className="text-center mb-3">
            {/* Pink padlock icon with key */}
            <div className="position-relative d-inline-block">
              <i className="ci-lock text-pink" style={{ fontSize: '3rem', color: '#e91e63' }}></i>
              <i className="ci-key position-absolute" style={{ 
                fontSize: '1.5rem', 
                color: '#9e9e9e',
                top: '10px',
                right: '-5px'
              }}></i>
            </div>
          </div>
          <h4 className="fw-bold text-dark mb-0">
            {mode === 'login' ? 'Please log in' : 'Create Account'}
          </h4>
        </Modal.Title>
        <Button 
          variant="link" 
          className="position-absolute top-0 end-0 p-2 text-dark text-decoration-none"
          onClick={onHide}
        >
          <i className="ci-close fs-4"></i>
        </Button>
      </Modal.Header>

      <Modal.Body className="pt-0">
        {/* Social Login Buttons */}
        <div className="d-flex flex-column gap-3 mb-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="d-flex align-items-center justify-content-center gap-2"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
          >
            <i className="ci-facebook fs-5"></i>
            Facebook
          </Button>
          
          <Button 
            variant="outline-dark" 
            size="lg" 
            className="d-flex align-items-center justify-content-center gap-2"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
          >
            <i className="ci-google fs-5"></i>
            Google
          </Button>
          
          <Button 
            variant="light" 
            size="lg" 
            className="text-muted"
            disabled={isLoading}
          >
            Show more login options
          </Button>
        </div>

        {/* Divider */}
        <div className="text-center mb-4">
          <span className="text-muted">or</span>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="alert alert-danger py-2 mb-3" role="alert">
            {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success py-2 mb-3" role="alert">
            {success}
          </div>
        )}

        {/* Login Form */}
        {mode === 'login' && (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email address"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </Form.Group>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
            
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-decoration-none p-0"
                onClick={() => handleModeSwitch('signup')}
              >
                Don't have an account? Sign up
              </Button>
            </div>
          </Form>
        )}

        {/* Signup Form */}
        {mode === 'signup' && (
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full name"
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                required
                disabled={isLoading}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email address"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={signupForm.password_confirmation}
                onChange={(e) => setSignupForm({ ...signupForm, password_confirmation: e.target.value })}
                required
                disabled={isLoading}
              />
            </Form.Group>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-decoration-none p-0"
                onClick={() => handleModeSwitch('login')}
              >
                Already have an account? Log in
              </Button>
            </div>
          </Form>
        )}

        {/* Terms and Privacy */}
        <div className="text-center mt-4">
          <small className="text-muted">
            By continuing, you accept our{' '}
            <a href="/terms" className="text-danger text-decoration-none">Terms and Conditions</a>
            {' '}and{' '}
            <a href="/privacy" className="text-danger text-decoration-none">Privacy Policy</a>.
          </small>
        </div>
      </Modal.Body>
    </Modal>
  )
}
