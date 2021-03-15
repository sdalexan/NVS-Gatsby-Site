/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from "gatsby"
import {RiSendPlane2Line} from "react-icons/ri";

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query quoteQuery($id: String!){
		markdownRemark(id: { eq: $id }) {
      id
			html
			excerpt(pruneLength: 140)
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const quote = ({data}) => {
  const { markdownRemark, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return  (
    <Layout className="quote-page" sx={quoteStyles.quotePage}>
      <SEO 
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />
      <div className="wrapper">
        <h1>{frontmatter.title}</h1>
        <div className="description" dangerouslySetInnerHTML={{ __html: html }} />
        <form className="quote-form" action="/thanks" name="quote" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="quote" />
          <p>
            <label>Name<input type="text" name="name" required /></label>   
          </p>
          <p>
            <label>Email<input type="email" name="email" required /></label>
          </p>
          <p>
            <label>Phone<input type="text" name="phone" required /></label>
          </p>
          <p>
            <label>Origin Location<input type="text" name="origin" required /></label>
          </p>
          <p>
            <label>Destination Location<input type="text" name="destination" required /></label>
          </p>
          <p>
            <label>Make<input type="text" name="make" required /></label>   
          </p>
          <p>
            <label>Model<input type="text" name="model" required /></label>
          </p>
          <p>
            <label>Comment<textarea name="message" required ></textarea></label>
          </p>
          <p className="text-align-right">
            <button className="button"            
            sx={{
              variant: 'links.button'
            }} type="submit">Request Quote <span className="icon -right"><RiSendPlane2Line/></span></button>
          </p>
        </form>
      </div>

    </Layout>
  )
}

export default quote

const quoteStyles = {
  quotePage:{
    "input":{
      border:"6px solid",
      borderColor: "inputBorder",
      bg: "inputBackground"
    },
    "textarea": {
      border:"6px solid",
      borderColor: "inputBorder",
      bg: "inputBackground"
    }
  }
}