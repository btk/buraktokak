import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Twemoji from 'react-twemoji';

import './index.css'

class IndexPage extends React.Component {
  componentDidMount(){
    window.location.replace("https://docs.google.com/presentation/d/1eXZQql-2Bjwaf31SA69JOWE3GS3BbHfKBbCAxhw34-Q/edit?usp=sharing");
  }

  render(){
    return (<p>slide link</p>)
  }
}

export default IndexPage
