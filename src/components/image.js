import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "burak.png" }) {
        childImageSharp {
          fixed(width: 70, height: 70, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
          <div style={{
            borderRadius: "100%",
            width: 80,
            height: 80,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #eee"
          }}>
            <Img fixed={data.placeholderImage.childImageSharp.fixed} style={{borderRadius: "100%"}} />
          </div>
        );
}

export default Image
