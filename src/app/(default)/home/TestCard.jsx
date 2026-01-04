'use client'

import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Link from 'next/link'

export default function WeeklyPromotion({ e }) {
  console.log(e)

  return (
    <div as="section" className="py-1">
      {/* Section Header */}
      <Card className="h-100 border-0 shadow-sm">
        <div className="position-relative">
          {/* <Link href="#"> */}
          <Card.Img
            variant="top"
            src={e.image_url}
            className="rounded-5"
            style={{ height: '170px', objectFit: 'cover' }}
          />
          {/* </Link> */}

          {/* Sale Badge */}
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            {Math.round(((e.original_price - e.price) / e.original_price) * 100)}% OFF
          </span>

          {/* Wishlist Button */}
          <Button variant="light" size="sm" className="rounded-circle position-absolute bottom-0 end-0 m-2">
            <i className="bi bi-heart"></i>
          </Button>
        </div>

        <Card.Body className="p-2">
          <h6 className="mb-1 text-truncate">{e?.name}</h6>
          <div>
            <span className="fw-bold text-dark">{e.price_formatted}</span>{' '}
            <small className="text-muted text-decoration-line-through">{e.original_price_formatted}</small>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

// 'use client'

// import { Container, Row, Col, Button, Card } from 'react-bootstrap'
// import Link from 'next/link'

// export default function WeeklyPromotion() {
//   return (
//     <Container as="section" className="py-5">
//       {/* Section Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div className="d-flex align-items-center">
//           <img
//             src="https://cdn.shopify.com/s/files/1/0293/9277/files/square_640x640_crop_center.png?v=1664823210&format=webp&width=88"
//             alt="Fashion Nova"
//             className="rounded-3 me-3"
//             style={{ width: '44px', height: '44px', objectFit: 'cover' }}
//           />
//           <div>
//             <h5 className="mb-0">Fashion Nova</h5>
//             <small className="text-muted">⭐ 4.3 (345.9K)</small>
//           </div>
//         </div>

//         <div className="d-flex align-items-center gap-2">
//           <Button size="sm" variant="dark" className="rounded-pill">
//             Follow
//           </Button>
//           <Button size="sm" variant="light" className="rounded-circle">
//             <i className="bi bi-three-dots"></i>
//           </Button>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <Row className="g-3">
//         {[1, 2, 3, 4, 5, 6].map((item) => (
//           <Col key={item} xs={6} sm={4} md={3} lg={2}>
//             <Card className="h-100 border-0 shadow-sm">
//               <div className="position-relative">
//                 <Link href="#">
//                   <Card.Img
//                     variant="top"
//                     src="https://cdn.shopify.com/s/files/1/0293/9277/files/12-04-23Studio7_CB_AL_09-24-57_10_22024053_White_P_0304_CM.jpg?v=1728929222&width=256"
//                     className="rounded"
//                     style={{ height: '200px', objectFit: 'cover' }}
//                   />
//                 </Link>

//                 {/* Sale Badge */}
//                 <span className="badge bg-danger position-absolute top-0 start-0 m-2">50% OFF</span>

//                 {/* Wishlist Button */}
//                 <Button variant="light" size="sm" className="rounded-circle position-absolute bottom-0 end-0 m-2">
//                   <i className="bi bi-heart"></i>
//                 </Button>
//               </div>

//               <Card.Body className="p-2">
//                 <h6 className="mb-1 text-truncate">Oversized Heavyweight Tee</h6>
//                 <div>
//                   <span className="fw-bold text-dark">$10.00</span>{' '}
//                   <small className="text-muted text-decoration-line-through">$19.99</small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   )
// }
