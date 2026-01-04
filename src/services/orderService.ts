import { botbleAPI } from './api';

export interface OrderAddress {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}

export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface OrderHistory {
  id: number;
  action: string;
  description: string;
  created_at: string;
}

export interface OrderShipment {
  id: number;
  status: string;
  tracking_id: string;
  tracking_link: string;
}

export interface OrderPayment {
  id: number;
  status: string;
  payment_channel: string;
  amount: number;
}

export interface Order {
  id: number;
  code: string;
  status: string;
  amount: number;
  shipping_amount: number;
  payment_fee: number;
  tax_amount: number;
  sub_total: number;
  discount_amount: number;
  payment_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  address: OrderAddress;
  products: OrderProduct[];
  histories: OrderHistory[];
  shipment?: OrderShipment;
  payment?: OrderPayment;
}

export interface OrderListResponse {
  data: Order[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface OrderTrackingResponse {
  order: Order;
}

class OrderService {
  private static instance: OrderService;

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  // Get list of orders
  async getOrders(params?: {
    status?: string;
    shipping_status?: string;
    payment_status?: string;
    per_page?: number;
  }): Promise<{ success: boolean; message: string; data?: OrderListResponse }> {
    try {
      const response = await botbleAPI.getOrders(params);
      return {
        success: response.success,
        message: response.message || 'Operation completed',
        data: typeof response.data !== 'undefined' ? response.data : null
      };
    } catch (error) {
      console.error('Get orders error:', error);
      return {
        success: false,
        message: 'Failed to get orders',
        data: undefined
      };
    }
  }

  // Get order detail
  async getOrder(orderId: string): Promise<{ success: boolean; message: string; data?: Order }> {
    try {
      const response = await botbleAPI.getOrder(orderId);
      return {
        success: response.success,
        message: response.message || 'Operation completed',
        data: typeof response.data !== 'undefined' ? response.data : null
      };
    } catch (error) {
      console.error('Get order error:', error);
      return {
        success: false,
        message: 'Failed to get order',
        data: undefined
      };
    }
  }

  // Cancel order
  async cancelOrder(orderId: string, reason: string, description?: string): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const response = await botbleAPI.cancelOrder(orderId, reason, description);
      return {
        success: response.success,
        message: response.message || 'Operation completed',
        data: undefined
      };
    } catch (error) {
      console.error('Cancel order error:', error);
      return {
        success: false,
        message: 'Failed to cancel order',
        data: undefined
      };
    }
  }

  // Get order invoice
  async getOrderInvoice(orderId: string, type?: 'print' | 'download'): Promise<{ success: boolean; message: string; data?: any }> {
    // Temporarily disable to prevent API errors
    return {
      success: false,
      message: 'Order invoice feature is not available yet',
      data: undefined
    };
  }

  // Upload payment proof
  async uploadPaymentProof(orderId: string, file: File): Promise<{ success: boolean; message: string; data?: any }> {
    // Temporarily disable to prevent API errors
    return {
      success: false,
      message: 'Upload payment proof feature is not available yet',
      data: undefined
    };
  }

  // Download payment proof
  async downloadPaymentProof(orderId: string): Promise<{ success: boolean; message: string }> {
    // Temporarily disable to prevent API errors
    return {
      success: false,
      message: 'Download payment proof feature is not available yet'
    };
  }

  // Confirm delivery
  async confirmDelivery(orderId: string): Promise<{ success: boolean; message: string; data?: any }> {
    // Temporarily disable to prevent API errors
    return {
      success: false,
      message: 'Confirm delivery feature is not available yet',
      data: undefined
    };
  }

  // Track order
  async trackOrder(code: string, email?: string, phone?: string): Promise<{ success: boolean; message: string; data?: OrderTrackingResponse }> {
    // Temporarily disable to prevent API errors
    return {
      success: false,
      message: 'Track order feature is not available yet',
      data: undefined
    };
  }

  // Get order status display text
  getOrderStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'Pending',
      'processing': 'Processing',
      'completed': 'Completed',
      'canceled': 'Canceled',
      'refunded': 'Refunded'
    };
    return statusMap[status] || status;
  }

  // Get shipping status display text
  getShippingStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'not_shipped': 'Not Shipped',
      'delivering': 'Delivering',
      'delivered': 'Delivered',
      'canceled': 'Canceled'
    };
    return statusMap[status] || status;
  }

  // Get payment status display text
  getPaymentStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      'pending': 'Pending',
      'completed': 'Completed',
      'refunding': 'Refunding',
      'refunded': 'Refunded',
      'canceled': 'Canceled'
    };
    return statusMap[status] || status;
  }

  // Get order status color
  getOrderStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'pending': 'text-warning',
      'processing': 'text-info',
      'completed': 'text-success',
      'canceled': 'text-danger',
      'refunded': 'text-secondary'
    };
    return colorMap[status] || 'text-muted';
  }

  // Get shipping status color
  getShippingStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'not_shipped': 'text-warning',
      'delivering': 'text-info',
      'delivered': 'text-success',
      'canceled': 'text-danger'
    };
    return colorMap[status] || 'text-muted';
  }

  // Get payment status color
  getPaymentStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'pending': 'text-warning',
      'completed': 'text-success',
      'refunding': 'text-info',
      'refunded': 'text-secondary',
      'canceled': 'text-danger'
    };
    return colorMap[status] || 'text-muted';
  }

  // Format order amount
  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100); // Assuming amount is in cents
  }

  // Format order date
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export const orderService = OrderService.getInstance(); 