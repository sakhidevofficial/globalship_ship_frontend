'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/cart-context'
import { useCheckout } from '@/contexts/checkout-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'

const StickyPayButtonCheckout_V1 = ({ tax, shipping }: { tax: number; shipping: number | string }) => {
  const { calculateTotal, processCheckout, state: cartState } = useCart('electronics')
  const { state: checkoutState } = useCheckout()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  
  const cartTotal = calculateTotal() + (tax ?? 0) + (typeof shipping === 'number' ? shipping : 0)

  const handleProcessOrder = async () => {
    if (!cartState.cartId) {
      alert('Cart not found. Please refresh the page and try again.')
      return
    }

    // Validate required fields
    if (!checkoutState.shippingAddress.firstName || 
        !checkoutState.shippingAddress.lastName || 
        !checkoutState.shippingAddress.email || 
        !checkoutState.shippingAddress.address || 
        !checkoutState.shippingAddress.city || 
        !checkoutState.shippingAddress.state || 
        !checkoutState.shippingAddress.zipCode) {
      alert('Please fill in all required shipping address fields.')
      return
    }

    setIsProcessing(true)

    try {
      // Prepare checkout data
      const checkoutData: any = {
        address: {
          name: `${checkoutState.shippingAddress.firstName} ${checkoutState.shippingAddress.lastName}`,
          email: checkoutState.shippingAddress.email,
          phone: checkoutState.shippingAddress.phone,
          country: checkoutState.shippingAddress.country,
          state: checkoutState.shippingAddress.state,
          city: checkoutState.shippingAddress.city,
          zip_code: checkoutState.shippingAddress.zipCode,
          address: checkoutState.shippingAddress.address,
        },
        shipping_method: checkoutState.deliveryInfo.shippingMethod,
        shipping_option: checkoutState.deliveryInfo.pickupLocation || 'standard',
        payment_method: checkoutState.paymentInfo.method,
        note: '',
      }

      // Add billing address if different from shipping
      if (!checkoutState.billingSameAsShipping && checkoutState.billingAddress) {
        checkoutData.billing_address = {
          name: `${checkoutState.billingAddress.firstName} ${checkoutState.billingAddress.lastName}`,
          email: checkoutState.billingAddress.email,
          phone: checkoutState.billingAddress.phone,
          country: checkoutState.billingAddress.country,
          state: checkoutState.billingAddress.state,
          city: checkoutState.billingAddress.city,
          zip_code: checkoutState.billingAddress.zipCode,
          address: checkoutState.billingAddress.address,
        }
      }

      const response = await processCheckout(checkoutData)
      console.log('Sticky button checkout response:', response);
      
      if (response.success && response.data) {
        // Redirect to thank you page with order information
        const orderId = response.data.id;
        const token = response.token || response.data.token;
        router.push(`/shop/checkout-v1/thank-you?order_id=${orderId}&token=${token}`)
      } else {
        console.error('Sticky button checkout failed:', response);
        alert(response.message || 'Failed to create order. Please try again.')
      }
    } catch (error) {
      console.error('Order processing error:', error)
      alert('Failed to process order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed-bottom z-sticky w-100 py-2 px-3 bg-body border-top shadow d-lg-none">
      <Button 
        variant="primary" 
        size="lg" 
        className="w-100"
        onClick={handleProcessOrder}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : `Pay $${cartTotal.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
      </Button>
    </div>
  )
}

export default StickyPayButtonCheckout_V1
