'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/cart-context'
import { useToast } from '@/hooks/use-toast'
import type { Product } from '@/types/product'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import FormLabel from 'react-bootstrap/FormLabel'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Alert from 'react-bootstrap/Alert'
import ImageZoom from '@/components/image/image-zoom'
import CountInput from '@/components/forms/count-input'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

interface ProductGalleryOptionsElectronicsProps {
  product: Product
  gallery: {
    thumbs: string[]
    slides: string[]
  }
  botbleProduct?: any // Add the original Botble product data
}

const ProductGalleryOptionsElectronics = ({ product, gallery, botbleProduct }: ProductGalleryOptionsElectronicsProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  // Generate model options from backend specification attributes
  const generateModelOptions = () => {
    if (botbleProduct?.specification_attributes) {
      // Look for model/size related attributes
      const modelAttributes = botbleProduct.specification_attributes.filter((attr: any) => 
        attr.attribute?.name?.toLowerCase().includes('model') ||
        attr.attribute?.name?.toLowerCase().includes('size') ||
        attr.attribute?.name?.toLowerCase().includes('capacity') ||
        attr.attribute?.name?.toLowerCase().includes('version') ||
        attr.attribute?.name?.toLowerCase().includes('battery') ||
        attr.attribute?.name?.toLowerCase().includes('display') ||
        attr.attribute?.name?.toLowerCase().includes('resolution')
      )
      
      if (modelAttributes.length > 0) {
        return modelAttributes.map((attr: any) => `${attr.attribute?.name}: ${attr.value}`)
      }
    }
    
    // No options available - return empty array
    return []
  }

  const modelOptions = generateModelOptions()

  // Generate color options from backend specification attributes
  const generateColorOptions = () => {
    if (botbleProduct?.specification_attributes) {
      // Look for color related attributes
      const colorAttributes = botbleProduct.specification_attributes.filter((attr: any) => 
        attr.attribute?.name?.toLowerCase().includes('color') ||
        attr.attribute?.name?.toLowerCase().includes('colour')
      )
      
      if (colorAttributes.length > 0) {
        return colorAttributes.map((attr: any) => ({
          colorName: attr.value,
          colorHex: '#5a7aa1' // Default color, could be enhanced with color mapping
        }))
      }
    }
    
    // No color options available - return empty array
    return []
  }

  const colorOptions = generateColorOptions()

  // Check if we have any specification attributes to show
  const hasSpecificationAttributes = botbleProduct?.specification_attributes && 
    (modelOptions.length > 0 || colorOptions.length > 0)

  // No default values needed since there are no options
  const defaultModelValue = ''
  const defaultColorValue = ''

  const [count, setCount] = useState(1)
  const [wishlist, setWishlist] = useState(false)
  const [comparison, setComparison] = useState(false)
  const [modelValue, setModelValue] = useState(defaultModelValue)
  const [colorValue, setColorValue] = useState(defaultColorValue)
  const { addToCart } = useCart('electronics')
  const { createToast, ToastRenderer } = useToast()

  // Handle add to cart with toast
  const handleAddToCart = async () => {
    if (!product) return

    try {
      console.log('Adding product to cart:', product);
      
      // Use the product ID directly as expected by the cart context
      await addToCart({
        id: product.id,
        product_id: product.id,
        quantity: count,
        qty: count
      });

      createToast(
        {
          action: 'Added to cart:',
          product: ` ${product.title}`,
        },
        'cart'
      )
    } catch (error) {
      console.error('Add to cart error:', error);
      createToast(
        {
          action: 'Error adding to cart:',
          product: ` ${product.title}`,
        },
        'cart'
      )
    }
  }

  // Handle toggle wishlist with toast
  const handleToggleWishlist = () => {
    setWishlist(!wishlist)

    if (wishlist) {
      createToast(
        {
          action: 'Removed from wishlist: ',
          product: product.title,
        },
        'wishlist'
      )
    } else {
      createToast(
        {
          action: 'Added to wishlist: ',
          product: product.title,
        },
        'wishlist'
      )
    }
  }

  // Handle toggle comparison with toast
  const handleToggleCompare = () => {
    setComparison(!comparison)

    if (comparison) {
      createToast(
        {
          action: 'Removed from comparison list: ',
          product: product.title,
        },
        'comparison'
      )
    } else {
      createToast(
        {
          action: 'Added to comparison list: ',
          product: product.title,
        },
        'comparison'
      )
    }
  }

  return (
    <>
      <Container as="section" className="pb-5 mb-1 mb-sm-2 mb-md-3 mb-lg-4 mb-xl-5">
        <Row>
          {/* Product gallery */}
          <Col md={6}>
            {/* Preview images */}
            <Swiper
              modules={[Navigation, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              loop={gallery.slides.length > 1}
              navigation={{
                prevEl: '#prodGalPrev',
                nextEl: '#prodGalNext',
              }}
            >
              {gallery.slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <ImageZoom
                    priority
                    src={slide}
                    zoomSrc={slide}
                    inlinePane={9999}
                    hoverDelay={300}
                    touchDelay={300}
                    touchDisable={false}
                    width={1272}
                    height={1272}
                    alt="Image"
                  />
                </SwiperSlide>
              ))}
              <div className="position-absolute top-50 start-0 z-2 translate-middle-y ms-sm-2 ms-lg-3">
                <Button
                  variant="outline-secondary"
                  className="btn-icon bg-body rounded-circle animate-slide-start"
                  id="prodGalPrev"
                  aria-label="Previous slide"
                >
                  <i className="ci-chevron-left fs-lg animate-target" />
                </Button>
              </div>
              <div className="position-absolute top-50 end-0 z-2 translate-middle-y me-sm-2 me-lg-3">
                <Button
                  variant="outline-secondary"
                  className="btn-icon bg-body rounded-circle animate-slide-end"
                  id="prodGalNext"
                  aria-label="Next slide"
                >
                  <i className="ci-chevron-right fs-lg animate-target" />
                </Button>
              </div>
            </Swiper>

            {/* Thumbnails */}
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              watchSlidesProgress
              slidesPerView={3}
              spaceBetween={12}
              loop={gallery.thumbs.length > 3}
              breakpoints={{
                340: {
                  slidesPerView: 4,
                },
                500: {
                  slidesPerView: 5,
                },
                600: {
                  slidesPerView: 6,
                },
                768: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 6,
                },
              }}
              className="swiper-thumbs swiper-load pt-2 mt-1"
            >
              {gallery.thumbs.map((thumb, index) => (
                <SwiperSlide key={index} className="swiper-thumb">
                  <div className="ratio ratio-1x1" style={{ maxWidth: 94 }}>
                    <Image src={thumb} width={188} height={188} className="swiper-thumb-img" alt="Thumbnail" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>

          {/* Product options */}
          <Col as="aside" md={6} xl={5} className="offset-xl-1 pt-4">
            <div className="ps-md-4 ps-xl-0">
              {/* Model - only show if we have specification attributes */}
              {hasSpecificationAttributes && modelOptions.length > 0 && (
                <div className="pb-3 mb-2 mb-lg-3">
                  <FormLabel className="fw-semibold pb-1 mb-2">Specifications</FormLabel>
                  <div className="d-flex flex-wrap gap-2">
                    {modelOptions.map((model: string, index: number) => (
                      <ToggleButton
                        key={index}
                        type="radio"
                        id={`model-${index}`}
                        variant="outline-secondary"
                        size="sm"
                        name="model-options"
                        value={model}
                        checked={modelValue === model}
                        onChange={(e) => setModelValue(e.currentTarget.value)}
                      >
                        {model}
                      </ToggleButton>
                    ))}
                  </div>
                </div>
              )}

              {/* Color - only show if we have specification attributes */}
              {hasSpecificationAttributes && colorOptions.length > 0 && (
                <div className="pb-3 mb-2 mb-lg-3">
                  <FormLabel className="fw-semibold pb-1 mb-2">Color</FormLabel>
                  <div className="d-flex flex-wrap gap-2">
                    {colorOptions.map((color: any, index: number) => (
                      <ToggleButton
                        key={index}
                        type="radio"
                        id={`color-${index}`}
                        variant="outline-secondary"
                        size="sm"
                        name="color-options"
                        value={color.colorName}
                        checked={colorValue === color.colorName}
                        onChange={(e) => setColorValue(e.currentTarget.value)}
                      >
                        <div
                          className="d-flex align-items-center gap-2"
                          style={{ color: color.colorHex }}
                        >
                          <div
                            className="rounded-circle"
                            style={{
                              width: 16,
                              height: 16,
                              backgroundColor: color.colorHex,
                              border: '1px solid #dee2e6',
                            }}
                          />
                          {color.colorName}
                        </div>
                      </ToggleButton>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="d-flex flex-wrap align-items-center mb-3">
                <div className="h4 mb-0 me-3">
                  $
                  {product.price[0].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                  {product.price[1] !== undefined && (
                    <del className="fs-base fw-normal text-body-tertiary">
                      $
                      {product.price[1]?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </del>
                  )}
                </div>
                <div className="d-flex align-items-center text-success fs-sm ms-auto">
                  <i className="ci-check-circle fs-base me-2" />
                  Available to order
                </div>
              </div>

              {/* Count + Buttons */}
              <div className="d-flex flex-wrap flex-sm-nowrap flex-md-wrap flex-lg-nowrap gap-3 gap-lg-2 gap-xl-3 mb-4">
                <CountInput
                  size="lg"
                  value={count}
                  min={1}
                  onChange={(value) => {
                    setCount(value)
                  }}
                  aria-label="Count input"
                  className="flex-shrink-0 order-sm-1"
                />
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip className="tooltip-sm">{`${wishlist ? 'Remove from' : 'Add to'} Wishlist`}</Tooltip>
                  }
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="btn-icon animate-pulse order-sm-3 order-md-2 order-lg-3"
                    onClick={handleToggleWishlist}
                  >
                    <i className={`ci-heart${wishlist ? '-filled' : ''} fs-lg animate-target`} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip className="tooltip-sm">{comparison ? 'Remove from Comparison' : 'Compare'}</Tooltip>
                  }
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className={`btn-icon animate-${comparison ? 'scale' : 'rotate'} order-sm-4 order-md-3 order-lg-4`}
                    onClick={handleToggleCompare}
                  >
                    <i className={`ci-${comparison ? 'check-circle' : 'refresh-cw'} fs-lg animate-target`} />
                  </Button>
                </OverlayTrigger>
                <Button
                  size="lg"
                  className="w-100 animate-slide-end order-sm-2 order-md-4 order-lg-2"
                  onClick={handleAddToCart}
                >
                  <i className="ci-shopping-cart fs-lg animate-target ms-n1 me-2" />
                  Add to cart
                </Button>
              </div>

              {/* Features */}
              <div className="d-flex flex-wrap gap-3 gap-xl-4 pb-4 pb-lg-5 mb-2 mb-lg-0 mb-xl-2">
                <div className="d-flex align-items-center fs-sm">
                  <svg
                    className="text-warning me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                  >
                    <path d="M1.333 9.667H7.5V16h-5c-.64 0-1.167-.527-1.167-1.167V9.667zm13.334 0v5.167c0 .64-.527 1.167-1.167 1.167h-5V9.667h6.167zM0 5.833V7.5c0 .64.527 1.167 1.167 1.167h.167H7.5v-1-3H1.167C.527 4.667 0 5.193 0 5.833zm14.833-1.166H8.5v3 1h6.167.167C15.473 8.667 16 8.14 16 7.5V5.833c0-.64-.527-1.167-1.167-1.167z" />
                    <path d="M8 5.363a.5.5 0 0 1-.495-.573C7.752 3.123 9.054-.03 12.219-.03c1.807.001 2.447.977 2.447 1.813 0 1.486-2.069 3.58-6.667 3.58zM12.219.971c-2.388 0-3.295 2.27-3.595 3.377 1.884-.088 3.072-.565 3.756-.971.949-.563 1.287-1.193 1.287-1.595 0-.599-.747-.811-1.447-.811z" />
                    <path d="M8.001 5.363c-4.598 0-6.667-2.094-6.667-3.58 0-.836.641-1.812 2.448-1.812 3.165 0 4.467 3.153 4.713 4.819a.5.5 0 0 1-.495.573zM3.782.971c-.7 0-1.448.213-1.448.812 0 .851 1.489 2.403 5.042 2.566C7.076 3.241 6.169.971 3.782.971z" />
                  </svg>
                  <div className="text-body-emphasis text-nowrap">
                    <span className="fw-semibold">+32</span> bonuses
                  </div>
                </div>
                <div className="d-flex align-items-center fs-sm">
                  <svg
                    className="text-primary me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="none"
                  >
                    <path
                      d="M15.264 8.001l.702-1.831a.5.5 0 0 0-.152-.568l-1.522-1.234-.308-1.937a.5.5 0 0 0-.416-.415l-1.937-.308L10.399.185a.5.5 0 0 0-.567-.152L8 .736 6.169.034a.5.5 0 0 0-.567.152L4.368 1.709l-1.937.308a.5.5 0 0 0-.415.415l-.308 1.937L.185 5.603a.5.5 0 0 0-.152.567l.702 1.831-.702 1.831a.5.5 0 0 0 .152.567l1.523 1.233.308 1.937a.5.5 0 0 0 .415.416l1.937.308 1.234 1.522c.137.17.366.23.568.152L8 15.265l1.831.702a.5.5 0 0 0 .568-.153l1.233-1.522 1.937-.308a.5.5 0 0 0 .416-.416l.308-1.937 1.522-1.233a.5.5 0 0 0 .152-.567l-.702-1.831z"
                      fill="currentColor"
                    />
                    <path
                      d="M6.5 7.001a1.5 1.5 0 1 1 0-3 1.5 1.5 0 1 1 0 3zm0-2a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1zM9.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 1 1 0 3zm0-2a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1zm-4 2c-.101 0-.202-.03-.29-.093a.5.5 0 0 1-.116-.698l5-7a.5.5 0 1 1 .814.581l-5 7A.5.5 0 0 1 5.5 12z"
                      fill="white"
                    />
                  </svg>
                  <div className="text-body-emphasis text-nowrap">Interest-free loan</div>
                </div>
                <div className="d-flex align-items-center fs-sm">
                  <svg className="me-2" xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                    <path
                      className="text-success"
                      d="M7.42169 1.15662C3.3228 1.15662 0 4.47941 0 8.5783C0 12.6772 3.3228 16 7.42169 16C11.5206 16 14.8434 12.6772 14.8434 8.5783H7.42169V1.15662Z"
                      fill="currentColor"
                    />
                    <path
                      className="text-info"
                      d="M8.57812 0V7.42169H15.9998C15.9998 3.3228 12.677 0 8.57812 0Z"
                      fill="currentColor"
                    />
                    <defs>
                      <rect width={16} height={16} fill="white"></rect>
                    </defs>
                  </svg>
                  <div className="text-body-emphasis text-nowrap">Pay by installments</div>
                </div>
              </div>
            </div>

            {/* Shipping options */}
            <div className="d-flex align-items-center pb-2">
              <h3 className="h6 mb-0">Shipping options</h3>
              <Button href="#" variant="secondary" size="sm" className="ms-auto">
                <i className="ci-map-pin fs-sm ms-n1 me-1" />
                Find local store
              </Button>
            </div>
            <Table borderless className="fs-sm mb-2">
              <tbody>
                {[
                  ['Pickup from the store', 'Today', 'Free'],
                  ['Pickup from postal offices', 'Tomorrow', 25],
                  ['Delivery by courier', '2-3 days', 35],
                ].map((items, index) => (
                  <tr key={index}>
                    {items.map((item, index, arr) => (
                      <td
                        key={index}
                        className={`py-2${index === 0 ? ' ps-0' : index === arr.length - 1 ? ' text-body-emphasis fw-semibold text-end pe-0' : ''}`}
                      >
                        {index === arr.length - 1 && typeof item === 'number'
                          ? `$${item.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                          : item}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Warranty + Payment info accordion */}
            <Accordion>
              <Accordion.Item eventKey="warranty">
                <Accordion.Header as="h3" className="animate-underline">
                  <span className="animate-target me-2">Warranty information</span>
                </Accordion.Header>
                <Accordion.Body>
                  <Alert variant="info" className="d-flex mb-3">
                    <i className="ci-check-shield fs-xl mt-1 me-2" />
                    <div className="fs-sm">
                      <span className="fw-semibold">Warranty:</span> 12 months of official manufacturer&apos;s
                      warranty. Exchange/return of the product within 14 days.
                    </div>
                  </Alert>
                  <p className="mb-0">
                    Explore the details of our{' '}
                    <a className="fw-medium" href="#!">
                      product warranties here
                    </a>
                    , including duration, coverage, and any additional protection plans available. We prioritize your
                    satisfaction, and our warranty information is designed to keep you informed and confident in your
                    purchase.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="payment">
                <Accordion.Header as="h3" className="animate-underline">
                  <span className="animate-target me-2">Payment and credit</span>
                </Accordion.Header>
                <Accordion.Body>
                  Experience hassle-free transactions with our{' '}
                  <a href="#" className="fw-medium">
                    flexible payment options
                  </a>{' '}
                  and credit facilities. Learn more about the various payment methods accepted, installment plans, and
                  any exclusive credit offers available to make your shopping experience seamless.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* Toast notification stack */}
      <ToastRenderer />
    </>
  )
}

export default ProductGalleryOptionsElectronics
