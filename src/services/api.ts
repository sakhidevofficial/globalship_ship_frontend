class BotbleAPI {
  private baseURL: string;
  private ecommerceURL: string;
  private authURL: string;
  private token: string | null;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout: number = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    this.ecommerceURL = process.env.NEXT_PUBLIC_ECOMMERCE_API_URL || 'http://127.0.0.1:8000/api/v1/ecommerce';
    this.authURL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://127.0.0.1:8000';
    this.token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    console.log('API Service initialized with:');
    console.log('Base URL:', this.baseURL);
    console.log('E-commerce URL:', this.ecommerceURL);
    console.log('Auth URL:', this.authURL);
  }

  // Cache management
  private getCachedData(key: string) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Authentication methods
  async login(email: string, password: string) {
    try {
      const response = await fetch(`${this.authURL}/api-login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Login failed'
        };
      }

      return {
        success: true,
        data: data.data || { user: { email, first_name: 'Guest', last_name: 'User' }, token: 'demo-token' }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed'
      };
    }
  }

  async register(userData: { 
    name: string; 
    email: string; 
    password: string; 
    password_confirmation: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) {
    try {
      console.log('Registering with URL:', `${this.authURL}/register`);
      console.log('Register data:', userData);
      
      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Registration failed. Please try again.',
          errors: data.errors
        };
      }

      return { success: true, data: data.data, message: data.message };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  }

  async logout() {
    try {
      if (this.token) {
        await fetch(`${this.baseURL}/logout`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    }
    return { success: true, message: 'Logged out successfully' };
  }

  async getUser() {
    try {
      const response = await fetch(`${this.authURL}/api-user.php`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to get user data.'
        };
      }

      return { success: true, data: data.user || data.data };
    } catch (error) {
      console.error('Get user error:', error);
      return {
        success: false,
        message: 'Failed to get user data.'
      };
    }
  }

  async updateProfile(profileData: {
    name: string;
    email: string;
    phone: string;
    avatar?: File | null;
  }) {
    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      if (profileData.phone) {
        formData.append('phone', profileData.phone);
      }
      if (profileData.avatar) {
        formData.append('avatar', profileData.avatar);
      }

      const response = await fetch(`${this.authURL}/me`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {})
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to update profile.'
        };
      }

      return { success: true, data: data.data, message: data.message };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Failed to update profile.'
      };
    }
  }

  // E-commerce methods
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    category?: string;
    brand?: string;
    search?: string;
    sort?: string;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.category) queryParams.append('category', params.category);
      if (params?.brand) queryParams.append('brand', params.brand);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.sort) queryParams.append('sort', params.sort);

      const response = await fetch(`${this.ecommerceURL}/products?${queryParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to fetch products.'
        };
      }

      return { success: true, data: data.data, meta: data.meta };
    } catch (error) {
      console.error('Get products error:', error);
      return {
        success: false,
        message: 'Failed to fetch products.'
      };
    }
  }

  async getProduct(slug: string) {
    try {
      const response = await fetch(`${this.ecommerceURL}/products/${slug}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Product not found.'
        };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Get product error:', error);
      return {
        success: false,
        message: 'Failed to fetch product.'
      };
    }
  }

  async getCategories() {
    try {
      const response = await fetch(`${this.ecommerceURL}/product-categories`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        return {
          success: false,
          message: data.message || 'Failed to fetch categories.'
        };
      }

      return { 
        success: true, 
        data: data.data,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: data.data?.length || 0,
          total: data.data?.length || 0
        }
      };
    } catch (error) {
      console.error('Get categories error:', error);
      return {
        success: false,
        message: 'Failed to fetch categories.'
      };
    }
  }

  async getBrands() {
    try {
      const response = await fetch(`${this.ecommerceURL}/brands`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to fetch brands.'
        };
      }

      return { 
        success: true, 
        data: data.data,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: data.data?.length || 0,
          total: data.data?.length || 0
        }
      };
    } catch (error) {
      console.error('Get brands error:', error);
      return {
        success: false,
        message: 'Failed to fetch brands.'
      };
    }
  }

  // Cart methods
  async addToCart(productId: number, qty: number = 1, cartId?: string) {
    try {
      const url = cartId ? `${this.ecommerceURL}/cart/${cartId}` : `${this.ecommerceURL}/cart`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          qty: qty
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to add to cart.'
        };
      }

      return { success: true, message: data.message, data: data };
    } catch (error) {
      console.error('Add to cart error:', error);
      return {
        success: false,
        message: 'Failed to add to cart.'
      };
    }
  }

  async getCart(cartId: string) {
    try {
      const response = await fetch(`${this.ecommerceURL}/cart/${cartId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to get cart.'
        };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Get cart error:', error);
      return {
        success: false,
        message: 'Failed to get cart.'
      };
    }
  }

  async refreshCart(cartId: string) {
    try {
      const response = await fetch(`${this.ecommerceURL}/cart/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ cart_id: cartId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to refresh cart.'
        };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Refresh cart error:', error);
      return {
        success: false,
        message: 'Failed to refresh cart.'
      };
    }
  }

  async updateCartItem(cartId: string, itemId: string | number, quantity: number) {
    try {
      const response = await fetch(`${this.ecommerceURL}/cart/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          item_id: itemId,
          quantity: quantity 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to update cart item.'
        };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Update cart item error:', error);
      return {
        success: false,
        message: 'Failed to update cart item.'
      };
    }
  }

  async removeFromCart(cartId: string, itemId: string | number) {
    try {
      const response = await fetch(`${this.ecommerceURL}/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ item_id: itemId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to remove item from cart.'
        };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Remove from cart error:', error);
      return {
        success: false,
        message: 'Failed to remove item from cart.'
      };
    }
  }

  async processCheckout(cartId: string, checkoutData: any) {
    try {
      console.log('Processing checkout with cart ID:', cartId);
      console.log('Checkout data:', checkoutData);
      
      const response = await fetch(`${this.ecommerceURL}/checkout/cart/${cartId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();
      console.log('Checkout response:', data);

      if (!response.ok) {
        console.error('Checkout failed with status:', response.status);
        return {
          success: false,
          message: data.message || 'Failed to process checkout.'
        };
      }

      return { success: true, data: data.data, token: data.token };
    } catch (error) {
      console.error('Process checkout error:', error);
      return {
        success: false,
        message: 'Failed to process checkout.'
      };
    }
  }

  // Order methods
  async getOrders(params?: {
    status?: string;
    shipping_status?: string;
    payment_status?: string;
    per_page?: number;
  }) {
    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.shipping_status) queryParams.append('shipping_status', params.shipping_status);
      if (params?.payment_status) queryParams.append('payment_status', params.payment_status);
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());

      const response = await fetch(`${this.ecommerceURL}/orders?${queryParams}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to fetch orders.'
        };
      }

      return { success: true, data: data.data, meta: data.meta };
    } catch (error) {
      console.error('Get orders error:', error);
      return {
        success: false,
        message: 'Failed to fetch orders.'
      };
    }
  }

  async getOrder(orderId: string) {
    try {
      const response = await fetch(`${this.ecommerceURL}/orders/${orderId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Order not found.'
        };
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Get order error:', error);
      return {
        success: false,
        message: 'Failed to fetch order.'
      };
    }
  }

  async cancelOrder(orderId: string, reason: string, description?: string) {
    try {
      const response = await fetch(`${this.ecommerceURL}/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to cancel order.'
        };
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Cancel order error:', error);
      return {
        success: false,
        message: 'Failed to cancel order.'
      };
    }
  }

  // Wishlist API methods
  async addToWishlist(productId: number) {
    try {
      const response = await fetch(`${this.ecommerceURL}/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {})
        },
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to add to wishlist'
        };
      }

      return { 
        success: true, 
        message: data.message || 'Added to wishlist',
        data: data.data
      };
    } catch (error) {
      console.error('Add to wishlist error:', error);
      return { success: false, message: 'Failed to add to wishlist' };
    }
  }

  async removeFromWishlist(productId: number) {
    try {
      // Get wishlist ID first
      const wishlistResponse = await this.getWishlist();
      if (!wishlistResponse.success || !wishlistResponse.data?.id) {
        return { success: false, message: 'Wishlist not found' };
      }

      const wishlistId = wishlistResponse.data.id;
      
      const response = await fetch(`${this.ecommerceURL}/wishlist/${wishlistId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {})
        },
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to remove from wishlist'
        };
      }

      return { 
        success: true, 
        message: data.message || 'Removed from wishlist',
        data: data.data
      };
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      return { success: false, message: 'Failed to remove from wishlist' };
    }
  }

  async getWishlist() {
    try {
      // Generate a unique wishlist ID for this session
      let wishlistId = this.getWishlistId();
      
      const response = await fetch(`${this.ecommerceURL}/wishlist/${wishlistId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {})
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // If wishlist doesn't exist, create a new one
        if (response.status === 404) {
          return { 
            success: true, 
            data: { id: wishlistId, count: 0, items: [] },
            meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 }
          };
        }
        return {
          success: false,
          message: data.message || 'Failed to fetch wishlist'
        };
      }

      return { 
        success: true,
        data: data.data,
        meta: { current_page: 1, last_page: 1, per_page: 10, total: data.data?.count || 0 }
      };
    } catch (error) {
      console.error('Get wishlist error:', error);
      return { 
        success: true, 
        data: { id: this.getWishlistId(), count: 0, items: [] },
        meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 }
      };
    }
  }

  private getWishlistId(): string {
    if (typeof window === 'undefined') return 'default-wishlist';
    
    let wishlistId = localStorage.getItem('wishlist_id');
    if (!wishlistId) {
      wishlistId = 'wishlist-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('wishlist_id', wishlistId);
    }
    return wishlistId;
  }

  // Reviews
  async getProductReviews(productId: number) {
    try {
      const response = await fetch(`${this.ecommerceURL}/products/${productId}/reviews`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to fetch reviews.'
        };
      }

      return { success: true, data: data.data || [] };
    } catch (error) {
      console.error('Get reviews error:', error);
      return { success: true, data: [] };
    }
  }

  async createReview(reviewData: {
    product_id: number;
    rating: number;
    comment: string;
  }) {
    try {
      const response = await fetch(`${this.ecommerceURL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {})
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to create review.'
        };
      }

      return { success: true, data: data.data, message: data.message };
    } catch (error) {
      console.error('Create review error:', error);
      return {
        success: false,
        message: 'Failed to create review.'
      };
    }
  }

  // Blog methods
  async getBlogPosts(params?: Record<string, any>) {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      // Try the configured baseURL first
      let url = `${this.baseURL}/blog/posts?${queryParams}`;
      console.log('Fetching blog posts from:', url);

      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      // If the first attempt fails, try the production URL as fallback
      if (!response.ok) {
        console.log('First attempt failed, trying production URL...');
        const productionURL = 'https://store.earnyourdollar.com/api/v1';
        url = `${productionURL}/blog/posts?${queryParams}`;
        console.log('Trying production URL:', url);
        
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
      }

      console.log('Blog API response status:', response.status);
      console.log('Blog API response headers:', response.headers);

      const data = await response.json();
      console.log('Blog API response data:', data);

      if (!response.ok) {
        console.error('Blog API error response:', data);
        return {
          success: false,
          message: data.message || 'Failed to fetch blog posts.',
          error: data
        };
      }

      return { success: true, data: data.data || [] };
    } catch (error) {
      console.error('Get blog posts error:', error);
      return { 
        success: false, 
        message: 'Failed to fetch blog posts due to network error.',
        error: error 
      };
    }
  }

  // Theme Options methods




  // Utility methods
  private getHeaders() {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  updateToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

// Create singleton instance
export const botbleAPI = new BotbleAPI();