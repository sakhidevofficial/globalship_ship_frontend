import type { CommonComponentProps } from '@/types/common-component-props'
import type { BlogPost } from '@/services/blog'
import BlogPostCard from './blog-post-card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface BlogLatestPostsVariantOneProps extends CommonComponentProps {
  posts: BlogPost[]
}

const BlogLatestPostsVariantOne = ({ posts, className, ...props }: BlogLatestPostsVariantOneProps) => (
  <Container as="section" className={className} {...props}>
    <Row xs={1} sm={2} lg={3} className="g-4">
      {posts?.map((post) => (
        <Col key={post.id}>
          <BlogPostCard
            image={{ src: post.image || '/img/blog/list/01.jpg', width: 480, height: 480, alt: post.name }}
            title={post.name}
            href={`/blog/${post.slug}`}
            category={{ label: 'Blog', href: '/blog' }}
            date={post.created_at || new Date().toISOString()}
          />
        </Col>
      ))}
    </Row>
  </Container>
)

export default BlogLatestPostsVariantOne
