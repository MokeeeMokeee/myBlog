import * as React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import IndexLayout from '../layouts'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { colors } from '../styles/variables'
import FooterContent from '../components/FooterContent'

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
        featuredImage: {
          childImageSharp: {
            fixed: any
            resize: {
              src: string
            }
          }
        }
      }
      fields: {
        slug: string
      }
    }
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
            featuredImage: {
              childImageSharp: {
                fixed: any
              }
            }
          }
        }
      }
    }
  }
}

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const Title = styled.h1``
const ImageContainer = styled.div`
  max-width: 20rem;
  max-height: 20rem;
  min-width: 20rem;
  min-height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TitleContainer = styled.div`
  padding: 1rem;
  border-bottom: 4px double #000;
  text-align: center;
`

const MainContent = styled.div`
  padding: 1rem;
  h1 {
    padding-bottom: 0.3em;
    line-height: 1.2;
    border-bottom: 2px solid #2f51b4;
    position: relative;
    padding-left: 18px;
  }

  h1:before {
    background: #2f51b4;
    content: '';
    height: 28px;
    width: 8px;
    left: 0;
    position: absolute;
    top: 3px;
  }

  h2 {
    padding-bottom: 0.3em;
    line-height: 1.2;
    /* border-bottom: 1px solid #2f51b4; */
    position: relative;
    padding-left: 18px;
    /*margin-left: 16px;*/
  }

  h2:before {
    background: #2f51b4;
    content: '';
    height: 20px;
    width: 5px;
    left: 0px;
    position: absolute;
    top: 3px;
  }

  h3 {
    text-decoration: underline;
  }

  h4 {
    text-decoration: underline dotted;
  }

  .gatsby-code-title {
    display: block;
    position: relative;
    background: #272822;
    width: 100%;
    top: 10px;
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
  }

  .gatsby-code-title span {
    display: inline;
    position: relative;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    color: #eee;
    background: #777;
    border-top-left-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
    padding: 3px;
    top: 1px;
  }
`

const Container = styled.div`
  background-color: ${colors.white};
  padding: 1rem 0;
`

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  let footerPost = data.allMarkdownRemark
  let post = data.markdownRemark
  console.log(data.markdownRemark.fields.slug)
  let featuredImgFixed = post.frontmatter.featuredImage.childImageSharp.fixed
  return (
    <IndexLayout
      articleImage={data.markdownRemark.frontmatter.featuredImage.childImageSharp.resize.src}
      articleTitle={data.markdownRemark.frontmatter.title}
      slug={data.markdownRemark.fields.slug}
    >
      <Page>
        <Container>
          <MainTitleContainer>
            <ImageContainer>
              <Img fixed={featuredImgFixed} />
            </ImageContainer>
            <TitleContainer>
              <Title>{data.markdownRemark.frontmatter.title}</Title>
            </TitleContainer>
          </MainTitleContainer>
          <MainContent dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          <FooterContent data={footerPost} />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fixed(width: 336) {
              ...GatsbyImageSharpFixed
            }
            resize(width: 900, quality: 90) {
              src
            }
          }
        }
      }
      fields {
        slug
      }
    }
    allMarkdownRemark(limit: 4, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage {
              childImageSharp {
                fixed(width: 160) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
