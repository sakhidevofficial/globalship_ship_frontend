'use client'

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  state: string
  city: string
  zipCode: string
  address: string
  addressLine2?: string
}

interface DeliveryInfo {
  postcode: string
  deliveryDate: string
  deliveryTime: string
  shippingMethod: 'courier' | 'pickup'
  pickupLocation?: string
}

interface PaymentInfo {
  method: 'cod' | 'card' | 'paypal' | 'gpay'
  cardNumber?: string
  cardExpiry?: string
  cardCvv?: string
  cardholderName?: string
}

interface CheckoutState {
  shippingAddress: ShippingAddress
  deliveryInfo: DeliveryInfo
  paymentInfo: PaymentInfo
  billingSameAsShipping: boolean
  billingAddress?: ShippingAddress
}

interface CheckoutContextType {
  state: CheckoutState
  updateShippingAddress: (address: Partial<ShippingAddress>) => void
  updateDeliveryInfo: (info: Partial<DeliveryInfo>) => void
  updatePaymentInfo: (info: Partial<PaymentInfo>) => void
  setBillingSameAsShipping: (same: boolean) => void
  updateBillingAddress: (address: Partial<ShippingAddress>) => void
  resetCheckout: () => void
}

const defaultShippingAddress: ShippingAddress = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'United States',
  state: '',
  city: '',
  zipCode: '',
  address: '',
  addressLine2: ''
}

const defaultDeliveryInfo: DeliveryInfo = {
  postcode: '',
  deliveryDate: '',
  deliveryTime: '',
  shippingMethod: 'courier'
}

const defaultPaymentInfo: PaymentInfo = {
  method: 'cod'
}

const defaultState: CheckoutState = {
  shippingAddress: defaultShippingAddress,
  deliveryInfo: defaultDeliveryInfo,
  paymentInfo: defaultPaymentInfo,
  billingSameAsShipping: true
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckoutState>(defaultState)

  const updateShippingAddress = useCallback((address: Partial<ShippingAddress>) => {
    setState(prev => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, ...address }
    }))
  }, [])

  const updateDeliveryInfo = useCallback((info: Partial<DeliveryInfo>) => {
    setState(prev => ({
      ...prev,
      deliveryInfo: { ...prev.deliveryInfo, ...info }
    }))
  }, [])

  const updatePaymentInfo = useCallback((info: Partial<PaymentInfo>) => {
    setState(prev => ({
      ...prev,
      paymentInfo: { ...prev.paymentInfo, ...info }
    }))
  }, [])

  const setBillingSameAsShipping = useCallback((same: boolean) => {
    setState(prev => ({
      ...prev,
      billingSameAsShipping: same,
      billingAddress: same ? undefined : prev.shippingAddress
    }))
  }, [])

  const updateBillingAddress = useCallback((address: Partial<ShippingAddress>) => {
    setState(prev => ({
      ...prev,
      billingAddress: { ...(prev.billingAddress || prev.shippingAddress), ...address }
    }))
  }, [])

  const resetCheckout = useCallback(() => {
    setState(defaultState)
  }, [])

  const contextValue: CheckoutContextType = {
    state,
    updateShippingAddress,
    updateDeliveryInfo,
    updatePaymentInfo,
    setBillingSameAsShipping,
    updateBillingAddress,
    resetCheckout
  }

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }
  return context
} 