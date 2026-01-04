import type { Metadata } from 'next'
import Link from 'next/link'
import HeaderElectronics from '@/components/layout/header-electronics'
import BlogPostsGridVariantTwo from '@/components/blog/blog-posts-grid-variant-two'
import BlogSidebar from '@/components/blog/blog-sidebar'
import BlogContributorsPostsSlider from '@/components/blog/blog-contributors-posts-slider'
import BlogVideoReviews from '@/components/blog/blog-video-reviews'
import BlogPagination from '@/components/blog/blog-pagination'
import FooterElectronics from '@/components/layout/footer-electronics'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { BlogService, BlogPost } from '@/services/blog'
import CustomFooter from '@/components/layout/custom-footer'

export const metadata: Metadata = {
  title: 'Cartzilla | Blog Grid View v.2',
}

const BlogGridV2Page = async () => {
  const posts: BlogPost[] = await BlogService.getPosts()
  return (
    <>
      {/* Navigation bar (Page header) */}
      <HeaderElectronics />

      {/* Page content */}
      <main className="content-wrapper">
        {/* Breadcrumb */}
        <Breadcrumb as={Container} className="pt-3 my-3 my-md-4">
          <li className="breadcrumb-item">
            <Link href="/home">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Blog
          </li>
        </Breadcrumb>

        <h1 className="h3 container mb-4">Our blog</h1>

        {/* Posts grid + Sidebar */}
        <Container as="section" className="pb-5 mb-2 mb-md-3 mb-lg-4 mb-xl-5">
          <Row>
            <Col lg={8}>
              {/* Grid of posts */}
              <BlogPostsGridVariantTwo posts={posts} />

              {/* Contributors' posts slider */}
              <BlogContributorsPostsSlider />

              {/* Pagination */}
              <BlogPagination />
            </Col>

            {/* Sticky sidebar that turns into offcanvas on screens < 992px wide (lg breakpoint) */}
            <Col as="aside" lg={4} xl={3} className="offset-xl-1" style={{ marginTop: -115 }}>
              <BlogSidebar />
            </Col>
          </Row>
        </Container>

        {/* Video reviews */}
        <BlogVideoReviews />
      </main>

      {/* Page footer */}
      {/* <FooterElectronics className="border-top" /> */}
      <CustomFooter />
    </>
  )
}

export default BlogGridV2Page
