import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './index.css'

class IndexPage extends React.Component {
  state = {
    makerText: "maker",
    topics: false
  }

  makerTextGlitch(){
    let textArray = [
      "ha%wr",
      "ha&ec",
      "ha#er",
      "hacker",
      "hacker",
      "hacker",
      "hacker",
      "macker",
      "maker",
    ];
    let i = 0;

    textArray.forEach((t, i) => {
      setTimeout(() => {
        this.setState({ makerText: t });
      }, 30 * i);
    });

  }

  componentDidMount(){
      setInterval(() => {
        this.makerTextGlitch();
      }, 5000);
  }

  revealTopics(){
    this.setState({topics: true});
  }

  render(){
    return (
      <Layout>
        <SEO title="Burak Tokak" description="Burak's webpage who calls himself an Indie Maker, containing the projects he worked and working on. Click the link to get in touch."/>
        <div style={{marginTop: 100}}>
          <h1>Hi, I'm Burak.</h1>
          <p style={{fontSize: 19, lineHeight: "1.5em"}}>Burak is an indie {this.state.makerText}, <br/>Trying to make things that makes people's lives better.</p>
          <div className="contact" onClick={() => this.revealTopics()}>{this.state.topics && <span>👇 Choose a topic below</span>}{!this.state.topics && <span>💭 Get in touch with me</span>}</div>
          { this.state.topics &&
            <div className="tags" style={{marginTop: 0}}>
              <div onClick={() => this.setState({topics: false})}>
                <a href="mailto:info@buraktokak.com?subject=[Work] Hi, Burak&body=I want to get in touch with you about work related stuff..."><span>💼 Work</span></a>
                <a href="mailto:info@buraktokak.com?subject=[Personal] Hi, Burak&body=I want to get in touch with you about personal stuff..."><span>🙏 Personal</span></a>
                <a href="mailto:info@buraktokak.com?subject=[Other] Hi, Burak&body=I want to get in touch with you about other stuff..."><span>🍂 Other</span></a>
              </div>
            </div>
          }
        </div>
        <div className="making">
          <h3>Currently</h3>
          <ul>
            <li>Making    💪 <b>worko</b>, <span>a workout guide app with hq videos</span></li>
            <li>Creating  🈳 <b>Anlam</b>, <span>an open source statistical Turkish NLP library in JS</span></li>
            <li>Writing   📓 <b>Making Apps with React</b>, <span>an open access book in Turkish</span></li>
            <li>Making    🌌 <b>Beyond Mars</b>, <span>a dice based mobile space exploration game</span></li>
          </ul>
        </div>

        <div className="made">
          <h3>Past</h3>
          <ul>
            <li>Made    💾 <a href="https://svgapi.com/" target="_blank"><b>svgapi</b></a>, <span>a saas Rest API to list and search SVG icons</span></li>
            <li>Shipped 📝 <a href="https://usememo.com/" target="_blank"><b>Memo</b></a>, <span>a smart note taking app using GH Gists</span></li>
            <li>Helped 👾 <a href="https://apps.apple.com/us/app/mola-arcade-space-shooter/id1493319285" target="_blank"><b>Mola</b></a>, <span>a mobile arcade space shooter game</span></li>
            <li>Maintained 💊 <a href="https://drcanciftci.com/" target="_blank"><b>Dr. Can Supplementleri</b></a>, <span>an e-commerce website</span></li>
            <li>Made ⚗️ <a href="https://iconsrepo.com/" target="_blank"><b>IconsRepo</b></a>, <span>a tool to edit PD&CC  icons and download</span></li>
            <li>Made 🤔 <a href="https://www.dreamoriented.org/wordmoji/" target="_blank"><b>Wordmoji</b></a>, <span>a casual mobile emoji quiz game</span></li>
            <li>Made 🤞 <a href="https://play.google.com/store/apps/details?id=org.dreamoriented.leeloo" target="_blank"><b>Leeloo AAC</b></a>, <span>a simple open source multilangulal mobile AAC app</span></li>
            <li>Graduated 💻 <b>Computer Engineering</b>, <span>bachelor's degree from Ankara University</span></li>
            <li>Made 🦄 <a href="https://www.svgrepo.com/" target="_blank"><b>SVG Repo</b></a>, <span>an svg vector listing & search tool</span></li>
            <li>Made 📲 <a href="https://apps.apple.com/tr/app/wordpack-word-puzzle-game/id1350159332?l=tr" target="_blank"><b>Wordpack</b></a>, <span>a mobile word puzzle game</span></li>
            <li>Co-Made 😼 <a href="https://aucyberclub.org" target="_blank"><b>AUCC</b></a>, <span>a website for our university cyber security club</span></li>
            <li>Written 📕 <a href="https://www.kitapyurdu.com/kitap/angularjs/427295.html" target="_blank"><b>AngularJS</b></a>, <span>a published book about front-end in Turkish</span></li>
            <li>Written 📘 <a href="https://www.kitapyurdu.com/kitap/responsive-web-tasarimi-ve-uygulamalari/403949.html&publisher_id=4468" target="_blank"><b>Responsive Design</b></a>, <span>a published book about front-end in Turkish</span></li>
            <li>Co-Built 👨‍⚕️ <a href="https://www.fitekran.com" target="_blank"><b>Fitekran</b></a>, <span>a popular Turkish health blog</span></li>
            <li>Worked for 🎲 <a href="https://www.otsimo.com" target="_blank"><b>Otsimo</b></a>, <span>building AAC apps</span></li>
            <li>Written 📗 <a href="https://www.dr.com.tr/kitap/html5-css3-ve-javascript-ile-web-tasarimi/burak-tokak/egitim-basvuru/bilgisayar/urunno=0000000672365" target="_blank"><b>HTML5, CSS3 ve Javascript</b></a>, <span>a published book about front-end in Turkish</span></li>
            <li>Made 📖 <a href="https://www.etimolojiturkce.com" target="_blank"><b>Etimoloji Türkçe</b></a>, <span>an etymological dictionary & search engine</span></li>
            <li>Co-built 🎮 <b>metin2sozluk.com</b>, <span>a popular Turkish codex for a mmorpg game</span></li>
          </ul>
        </div>

        <div className="tags">
          <h4>Topics I'm passionate about</h4>
          <div>
            <span>user experience</span>
            <span>accessibility & disability</span>
            <span>natural language processing</span>
            <span>static web & serverless</span>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
