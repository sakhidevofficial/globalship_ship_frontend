import { botbleAPI } from './api'

export interface OrderItem {
  id: number
  product_id: number
  product_name: string
  product_image: string
  qty: number
  price: number
  tax_amount: number
  options?: any
  product_type?: string
}

export interface OrderAddress {
  id?: number
  name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  country: string
  zip_code: string
  is_default?: boolean
}

export interface Order {
  id: number
  user_id: number
  address_id: number
  shipping_method: string
  shipping_option?: string
  shipping_amount: number
  tax_amount: number
  sub_total: number
  coupon_code?: string
  discount_amount: number
  amount: number
  currency: string
  status: string
  payment_status: string
  shipping_status: string
  token: string
  created_at: string
  updated_at: string
  address: OrderAddress
  products: OrderItem[]
  payment?: any
  shipment?: any
}

export interface CreateOrderRequest {
  address: OrderAddress
  shipping_method: string
  shipping_option?: string
  payment_method: string
  coupon_code?: string
  note?: string
}

export interface OrdersResponse {
  data: Order[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export class OrderService {
  static async getOrders(params?: {
    page?: number
    per_page?: number
    status?: string
    shipping_status?: string
    payment_status?: string
  }): Promise<OrdersResponse> {
    const response = await botbleAPI.getOrders(params)
    if (response.success && response.data) {
      return {
        data: response.data,
        meta: response.meta || { current_page: 1, last_page: 1, per_page: 10, total: 0 }
      }
    } else {
      // Return empty response if failed
      return {
        data: [],
        meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 }
      }
    }
  }

  static async getOrder(id: number): Promise<Order> {
    const response = await botbleAPI.getOrder(id.toString())
    if (response.success) {
      return response.data
    } else {
      throw new Error(response.message || 'Failed to fetch order')
    }
  }

  static async cancelOrder(id: number, reason: string, description?: string): Promise<any> {
    const response = await botbleAPI.cancelOrder(id.toString(), reason, description)
    if (response.success) {
      return response
    } else {
      throw new Error(response.message || 'Failed to cancel order')
    }
  }

  static async getOrderInvoice(id: number): Promise<any> {
    // This method doesn't exist in the API yet, so we'll return a placeholder
    console.warn('getOrderInvoice method not implemented in API')
    return { success: false, message: 'Method not implemented' }
  }

  static async uploadProof(id: number, file: File): Promise<any> {
    // This method doesn't exist in the API yet, so we'll return a placeholder
    console.warn('uploadProof method not implemented in API')
    return { success: false, message: 'Method not implemented' }
  }

  static async downloadProof(id: number): Promise<any> {
    // This method doesn't exist in the API yet, so we'll return a placeholder
    console.warn('downloadProof method not implemented in API')
    return { success: false, message: 'Method not implemented' }
  }

  static async confirmDelivery(id: number): Promise<any> {
    // This method doesn't exist in the API yet, so we'll return a placeholder
    console.warn('confirmDelivery method not implemented in API')
    return { success: false, message: 'Method not implemented' }
  }

  // Create order directly through Botble CMS API
  static async createOrder(orderData: CreateOrderRequest): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      // Use the botbleAPI processCheckout method which uses the correct endpoint
      const response = await botbleAPI.processCheckout('', orderData);

      if (response.success) {
        return {
          success: true,
          message: 'Order created successfully in Botble CMS backend',
          data: response.data
        }
      } else {
        return {
          success: false,
          message: response.message || 'Failed to create order',
          data: response.data
        }
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        message: 'Failed to create order: ' + (error as Error).message,
      }
    }
  }

  // Helper methods for order formatting
  static formatOrderStatus(status: string): string {
    const statusMap: Record<string, string> = {
      pending: 'Pending',
      processing: 'Processing',
      completed: 'Completed',
      canceled: 'Canceled',
      refunded: 'Refunded',
    }
    return statusMap[status] || status
  }

  static formatPaymentStatus(status: string): string {
    const statusMap: Record<string, string> = {
      pending: 'Pending',
      completed: 'Completed',
      refunding: 'Refunding',
      refunded: 'Refunded',
      canceled: 'Canceled',
    }
    return statusMap[status] || status
  }

  static formatShippingStatus(status: string): string {
    const statusMap: Record<string, string> = {
      not_shipped: 'Not Shipped',
      delivering: 'Delivering',
      delivered: 'Delivered',
      canceled: 'Canceled',
    }
    return statusMap[status] || status
  }

  static getOrderTotal(order: Order): number {
    return order.amount
  }

  static getOrderSubtotal(order: Order): number {
    return order.sub_total
  }

  static getOrderShippingAmount(order: Order): number {
    return order.shipping_amount
  }

  static getOrderTaxAmount(order: Order): number {
    return order.tax_amount
  }

  static getOrderDiscountAmount(order: Order): number {
    return order.discount_amount
  }

  static getOrderItemsCount(order: Order): number {
    return order.products?.length || 0
  }

  static getOrderUrl(order: Order): string {
    return `/orders/${order.id}`
  }

  static canCancelOrder(order: Order): boolean {
    return order.status === 'pending' || order.status === 'processing'
  }

  static canConfirmDelivery(order: Order): boolean {
    return order.shipping_status === 'delivering'
  }
} 