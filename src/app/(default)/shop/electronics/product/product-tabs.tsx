'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Product as CartzillaProduct } from '@/types/product'
import { Product as BotbleProduct } from '@/services/products'
import { mapBotbleToCartzillaProductForCategory } from '@/utils/product-mapping'
import ProductGalleryOptionsElectronics from './product-gallery-options'
import ProductBundleSaleElectronics, { type BundleProduct } from './product-bundle-sale'
import ProductDetailsElectronics from './product-details'
import ProductReviewsElectronics from './product-reviews'
import StickyProductDesktopElectronics from './sticky-product-desktop'
import StickyProductMobileElectronics from './sticky-product-mobile'
import ProductsCarouselElectronics from '@/components/shop/products-carousel-electronics'
import StarRating from '@/components/reviews/star-rating'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import NavLink from 'react-bootstrap/NavLink'
import { useState } from 'react'
import { useCart } from '@/contexts/cart-context'
import { useToast } from '@/hooks/use-toast'

interface ProductTabsElectronicsProps {
  product?: BotbleProduct
}

// Generate gallery from product images
const generateGalleryFromProduct = (product: CartzillaProduct) => {
  const images = Array.isArray(product.image) ? product.image : [product.image]
  
  // Use actual product images if available, otherwise use a placeholder
  const slides = images.length > 0 ? images : ['/img/shop/electronics/product/gallery/01.png']
  const thumbs = images.length > 0 ? images : ['/img/shop/electronics/product/gallery/th01.png']
  
  return {
    thumbs,
    slides
  }
}

const ProductTabsElectronics = ({ product }: ProductTabsElectronicsProps) => {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  
  // Set initial active tab based on URL parameter
  const getInitialTab = () => {
    if (tabParam === 'details') return 'details'
    if (tabParam === 'reviews') return 'reviews'
    return 'general'
  }
  
  const [activeTab, setActiveTab] = useState(getInitialTab())
  const { addToCart } = useCart('electronics')
  const { createToast, ToastRenderer } = useToast()

  // Track wishlist and comparison items with state only
  const [wishlistItems, setWishlistItems] = useState<Record<string, boolean>>({})
  const [comparisonItems, setComparisonItems] = useState<Record<string, boolean>>({})
  
  // Check for different possible ID field names
  const productId = product?.id || (product as any)?.product_id || (product as any)?.ID || 'unknown'
  
  // Additional safety check - if productId is still 'unknown', use a fallback
  const safeProductId = productId === 'unknown' ? 'fallback-id' : productId
  
  // Use the centralized mapping function - no fallback to hardcoded data
  const productData = product ? mapBotbleToCartzillaProductForCategory(product, 'electronics') : null

  // If no product data, show a simple message
  if (!productData) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Product Not Found</h2>
          <p>Sorry, this product could not be loaded.</p>
        </div>
      </Container>
    )
  }

  // Generate specs from product data if available, otherwise use empty array
  const specs = Array.isArray(product?.attributes) && product.attributes.length > 0
    ? [{
        category: 'Specifications',
        items: product.attributes.map(attr => ({
          label: attr.name || 'Attribute',
          value: attr.value || 'N/A',
        })),
      }]
    : []

  // Generate bundle products from related products if available
  const bundleProducts: BundleProduct[] = Array.isArray((product as any)?.cross_sales)
    ? ((product as any).cross_sales as import('@/types/product').CrossSaleProduct[]).map((crossProduct) => {
        let images: [string, string] = ['', ''];
        if (Array.isArray(crossProduct.images)) {
          images = [crossProduct.images[0] || '', crossProduct.images[1] || crossProduct.images[0] || ''];
        }
        return {
          id: crossProduct.id.toString(),
          image: images,
          title: crossProduct.name,
          href: `/shop/electronics/product/${crossProduct.slug}`,
          price: crossProduct.sale_price ? [crossProduct.sale_price, crossProduct.price] : [crossProduct.price],
          selected: false,
        };
      })
    : []

  // Generate reviews from product reviews if available, otherwise use empty array
  const reviews = product?.reviews?.map((review: any) => ({
    author: review.user && review.user.name ? review.user.name : 'Anonymous',
    verified: true,
    rating: review.star || 5,
    date: review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Unknown date',
    product: {},
    text: review.comment || 'No comment provided',
    pros: [],
    cons: [],
    likes: 0,
    dislikes: 0,
  })) || []

  // Render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <>
            {/* Product details tab */}
            <Container as="section" className="pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">
              <Row>
                <Col
                  as="aside"
                  md={5}
                  xl={4}
                  className="offset-xl-1 order-md-2 mb-5 mb-md-0"
                  style={{ marginTop: -100 }}
                >
                  <StickyProductDesktopElectronics product={productData} />
                </Col>
                <StickyProductMobileElectronics product={productData} className="start-0 ms-n4" />
                <Col md={7} className="order-md-1">
                  <ProductDetailsElectronics data={specs} />
                </Col>
              </Row>
            </Container>
          </>
        )
      case 'reviews':
        return (
          <>
            {/* Reviews tab */}
            <Container as="section" className="pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">
              <Row>
                <Col
                  as="aside"
                  md={5}
                  xl={4}
                  className="offset-xl-1 order-md-2 mb-5 mb-md-0"
                  style={{ marginTop: -100 }}
                >
                  <StickyProductDesktopElectronics product={productData} />
                </Col>
                <StickyProductMobileElectronics product={productData} className="start-0 ms-n4" />
                <Col md={7} className="order-md-1">
                  <ProductReviewsElectronics data={reviews} />
                </Col>
              </Row>
            </Container>
          </>
        )
      default:
        return (
          <>
            {/* General info tab */}
            <ProductGalleryOptionsElectronics product={productData} gallery={generateGalleryFromProduct(productData)} botbleProduct={product} />
            <StickyProductMobileElectronics product={productData} />
            {bundleProducts.length > 0 && (
              <ProductBundleSaleElectronics bundle={bundleProducts} />
            )}
            <Container as="section" className="pb-4 pb-md-5 mb-2 mb-sm-0 mb-lg-2 mb-xl-4">
              <h2 className="h3 border-bottom pb-4 mb-0">Trending products</h2>
              <ProductsCarouselElectronics />
            </Container>
            <Container as="section" className="pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">
              <Row>
                <Col md={7}>
                  <ProductDetailsElectronics data={specs} dataSlice={[0, 2]} />
                  <div className="pt-5 mt-2 mt-md-3 mt-lg-4">
                    <ProductReviewsElectronics data={reviews} dataSlice={[0, 2]} />
                  </div>
                </Col>
                <Col as="aside" md={5} xl={4} className="offset-xl-1 d-none d-md-block" style={{ marginTop: -100 }}>
                  <StickyProductDesktopElectronics product={productData} />
                </Col>
              </Row>
            </Container>
          </>
        )
    }
  }

  return (
    <>
      {/* Page title */}
      <h1 className="h3 container mb-4">{productData.title}</h1>

      {/* Nav links */}
      <Container
        as="section"
        className={`position-relative z-2 ${activeTab !== 'general' ? 'pb-4 pb-md-5 mb-2 mb-md-0' : 'pb-2 pb-lg-4'}`}
      >
        <div className="d-flex align-items-center border-bottom">
          <Nav as="ul" variant="underline" className="flex-nowrap gap-4">
            <NavItem as="li" className="me-sm-2">
              <NavLink 
                as="button" 
                className={`btn btn-link p-0 border-0 ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                General info
              </NavLink>
            </NavItem>
            <NavItem as="li" className="me-sm-2">
              <NavLink 
                as="button" 
                className={`btn btn-link p-0 border-0 ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Product details
              </NavLink>
            </NavItem>
            <NavItem as="li">
              <NavLink 
                as="button" 
                className={`btn btn-link p-0 border-0 ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews {productData.reviews && `(${productData.reviews[1]})`}
              </NavLink>
            </NavItem>
          </Nav>
          <a href="#reviews" className="d-none d-md-flex align-items-center gap-2 text-decoration-none ms-auto mb-1">
            <StarRating rating={productData.reviews ? productData.reviews[0] : 0} className="fs-sm" />
            {productData.reviews && <span className="text-body-tertiary fs-xs">{productData.reviews[1]} reviews</span>}
          </a>
        </div>
      </Container>

      {/* Render tab content based on the active tab */}
      {renderTabContent()}
    </>
  )
}

export default ProductTabsElectronics
