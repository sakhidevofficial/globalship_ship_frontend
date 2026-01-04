'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { useCart } from '@/contexts/cart-context'
import { useToast } from '@/hooks/use-toast'
import type { Product as CartzillaProduct } from '@/types/product'
import type { Product as BotbleProduct } from '@/services/products'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Placeholder from 'react-bootstrap/Placeholder'
import Alert from 'react-bootstrap/Alert'
import ProductCardElectronics from './product-card-electronics'
import { ProductService } from '@/services/products'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface ProductsGridElectronicsProps {
  dataSlice?: [number, number]
  bannerPosition?: number
  className?: string
}

const ProductsGridElectronics = ({
  dataSlice,
  bannerPosition,
  children,
  className,
}: React.PropsWithChildren<ProductsGridElectronicsProps>) => {
  const { data, error, isLoading } = useSWR(
    'products',
    async () => {
      const res = await ProductService.getProducts()
      return res.data
    }
  )
  const { addToCart } = useCart('electronics')
  const { createToast, ToastRenderer } = useToast()

  // Track wishlist and comparison items with state only
  const [wishlistItems, setWishlistItems] = useState<Record<string, boolean>>({})
  const [comparisonItems, setComparisonItems] = useState<Record<string, boolean>>({})

  // Handle add to cart with toast
  const handleAddToCart = (botbleProduct: BotbleProduct) => {
    // Map Botble product to Cartzilla format
    const cartzillaProduct: CartzillaProduct = {
      id: botbleProduct.id.toString(),
      image: [botbleProduct.images[0] || '', botbleProduct.images[1] || botbleProduct.images[0] || ''],
      title: botbleProduct.name,
      href: ProductService.getProductUrl(botbleProduct),
      price: botbleProduct.sale_price ? [botbleProduct.sale_price, botbleProduct.price] : [botbleProduct.price],
      specs: undefined,
    }

    addToCart({
      id: cartzillaProduct.id,
      image: cartzillaProduct.image[1],
      title: cartzillaProduct.title,
      href: cartzillaProduct.href,
      price: cartzillaProduct.price,
      specs: cartzillaProduct.specs,
      quantity: 1,
      badge: undefined,
    })

    createToast(
      {
        action: 'Added to cart:',
        product: ` ${cartzillaProduct.title}`,
      },
      'cart'
    )
  }

  // Handle toggle wishlist with toast
  const handleToggleWishlist = (botbleProduct: BotbleProduct) => {
    const productId = botbleProduct.id.toString()
    const isCurrentlyInWishlist = wishlistItems[productId] || false

    setWishlistItems((prev) => ({
      ...prev,
      [productId]: !isCurrentlyInWishlist,
    }))

    if (isCurrentlyInWishlist) {
      createToast(
        {
          action: 'Removed from wishlist:',
          product: ` ${botbleProduct.name}`,
        },
        'wishlist'
      )
    } else {
      createToast(
        {
          action: 'Added to wishlist:',
          product: ` ${botbleProduct.name}`,
        },
        'wishlist'
      )
    }
  }

  // Handle toggle compare with toast
  const handleToggleCompare = (botbleProduct: BotbleProduct) => {
    const productId = botbleProduct.id.toString()
    const isCurrentlyInComparison = comparisonItems[productId] || false

    setComparisonItems((prev) => ({
      ...prev,
      [productId]: !isCurrentlyInComparison,
    }))

    if (isCurrentlyInComparison) {
      createToast(
        {
          action: 'Removed from comparison list:',
          product: ` ${botbleProduct.name}`,
        },
        'comparison'
      )
    } else {
      createToast(
        {
          action: 'Added to comparison list:',
          product: ` ${botbleProduct.name}`,
        },
        'comparison'
      )
    }
  }

  if (isLoading)
    return (
      <Row xs={2} md={3} className={`g-4${className ? ` ${className}` : ''}`}>
        {Array.from({ length: dataSlice ? dataSlice[1] - dataSlice[0] : 9 }, (_, index) => (
          <Col key={index}>
            <Placeholder as="div" animation="wave" className="position-relative mb-3">
              <Placeholder
                className="ratio rounded"
                style={{ '--cz-aspect-ratio': 'calc(282 / 306 * 100%)' } as React.CSSProperties}
              />
              <i className="ci-image position-absolute top-50 start-50 translate-middle fs-1 opacity-40" />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="mb-1">
              <Placeholder xs={5} size="xs" />
            </Placeholder>
            <Placeholder as="h6" animation="glow" className="mb-2">
              <Placeholder xs={12} size="sm" />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="mb-0">
              <Placeholder xs={5} />
            </Placeholder>
          </Col>
        ))}
      </Row>
    )

  if (error)
    return (
      <Alert variant="danger" className="d-inline-flex mb-0">
        <i className="ci-alert-triangle fs-lg pe-1 mt-1 me-2" />
        <div>
          <span className="fw-semibold">Error loading products:</span> {error.message}
        </div>
      </Alert>
    )

  const products = dataSlice ? (data || []).slice(dataSlice[0], dataSlice[1]) : data || []

  // Create array of items with products and banner inserted at the correct position
  const finalItems: React.ReactNode[] = []

  products.forEach((product, index) => {
    // Insert banner at the specified position
    if (bannerPosition !== undefined && index === bannerPosition) {
      finalItems.push(<Col key="banner">{children}</Col>)
    }

    // Add the product
    finalItems.push(
      <Col key={product.id || `product-${index}`}>
        <ProductCardElectronics
          image={{ src: product.images[0], width: 516, height: 480, alt: product.name }}
          title={product.name}
          href={ProductService.getProductUrl(product)}
          price={{
            current: ProductService.getProductPrice(product),
            original: ProductService.getProductOriginalPrice(product),
          }}
          reviews={product.average_rating !== undefined && product.total_reviews !== undefined ? {
            rating: product.average_rating,
            count: product.total_reviews,
          } : undefined}
          specs={undefined}
          cartButton={{
            onClick: () => handleAddToCart(product),
          }}
          wishlistButton={{
            active: wishlistItems[product.id.toString()] || false,
            onClick: () => handleToggleWishlist(product),
          }}
          compareButton={{
            active: comparisonItems[product.id.toString()] || false,
            onClick: () => handleToggleCompare(product),
          }}
        />
      </Col>
    )
  })

  // If banner position is at the end or beyond the products array length
  if (bannerPosition !== undefined && bannerPosition >= products.length) {
    finalItems.push(<Col key="banner">{children}</Col>)
  }

  return (
    <>
      <Row xs={2} md={3} className={`g-4${className ? ` ${className}` : ''}`}>
        {finalItems}
      </Row>

      {/* Toast notification stack */}
      <ToastRenderer />
    </>
  )
}

export default ProductsGridElectronics
