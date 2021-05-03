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
          <p style={{fontSize: 19, lineHeight: "1.5em"}}>Burak is an indie {this.state.makerText}, <br/>Trying to make useful things for everyone.</p>
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
            <li>Working for 💙 <a href="https://dreamoriented.org/" target="_blank"><b>Dream Oriented</b></a>, <span>creating developer tooling software</span></li>
            <li>Working for 🔰 <a href="https://stratera.co/" target="_blank"><b>Stratera Games</b></a>, <span>making fun mobile games</span></li>
            <li>Working for 🎴 <a href="https://assistivecards.com/" target="_blank"><b>Assistive Cards</b></a>, <span>making assistive accessibility apps/software</span></li>
            <li>Attending 🏫 <b>Software Engineering</b>, <span>master's program at METU</span></li>
            <li>Coordinating    🦅 <b>Wingo</b>, <span>a daily planner app for kids</span></li>
            <li>Creating  🈳 <b>Anlam</b>, <span>an open source statistical Turkish NLP library in JS</span></li>
            <li>Making    🌌 <b>Beyond Mars</b>, <span>a dice based mobile space exploration game</span></li>
            <li>Making    🥽 <b>VRID</b>, <span>a virtual reality interface prototying tool</span></li>
          </ul>
        </div>

        <div className="made">
          <h3>Past</h3>
          <ul>
            <li>Featured by 🔵 <a href="https://www.svgrepo.com/adobexd" target="_blank"><b>UNICEF</b></a>, <span>at Covid-19 App catalogue with Leeloo</span></li>
            <li>Built 📌<a href="https://www.svgrepo.com/adobexd" target="_blank"><b>Vectors for XD</b></a>, <span>a vector search addon for XD</span></li>
            <li>Helped Make 💹 <a href="https://temettu.app/" target="_blank"><b>Temettu</b></a>, <span>a mobile app to track dividend yields of stocks</span></li>
            <li>Co-Made 📑 <a href="https://beyazsayfa.org/" target="_blank"><b>Beyaz Sayfa</b></a>, <span>human understandable Turkish cryptocurrency white papers</span></li>
            <li>Co-Made 🏴‍☠️ <a href="https://stratera.co/game/pirate-factions/" target="_blank"><b>Pirate Factions</b></a>, <span>a text based mobile RPG strategy game</span></li>
            <li>Helped Make 🧃 <a href="https://stratera.co/game/blokk-defense/" target="_blank"><b>Blokk Defense</b></a>, <span>a casual mobile tower defense game</span></li>
            <li>Made 🐼 <a href="https://assistivecards.com/chamur" target="_blank"><b>Chamur</b></a>, <span>educational AI scavenger hunt game for kids</span></li>
            <li>Made 🐙 <a href="https://tenta.me/" target="_blank"><b>Tenta.me</b></a>, <span>an app for sending yourself notifications</span></li>
            <li>Co-made 🌐 <a href="https://assistivecards.com/" target="_blank"><b>Assistive Cards</b></a>, <span>a library of assistive cards in 37 languages</span></li>
            <li>Helped Release 🐎 <a href="https://stratera.co/game/ride-to-victory/" target="_blank"><b>Ride to Victory</b></a>, <span>a Battle of Ankara inspired endless 3D runner game</span></li>
            <li>Made 🦙 <a href="https://assistivecards.com/huni" target="_blank"><b>Huni AI</b></a>, <span>a mobile speech therapy app with voice recognition</span></li>
            <li>Made ‍💨 <a href="https://speedrun.xyz" target="_blank"><b>speedrun.xyz</b></a>, <span>live timeline of record speedruns for games</span></li>
            <li>Helped Release 🏃‍♂️ <a href="https://stratera.co/game/viralfirar" target="_blank"><b>Virar Firar</b></a>, <span>an arcade runner game with ft. 5 influencers</span></li>
            <li>Designed 🔰 <a href="https://stratera.co/" target="_blank"><b>Stratera.co</b></a>, <span>a website for the company</span></li>
            <li>Re-Made 🦜 <a href="https://apps.apple.com/us/app/id1517824465" target="_blank"><b>Wordmoji</b></a>, <span>a new version of Wordmoji on ios</span></li>
            <li>Co-Made 🐰 <a href="https://apps.apple.com/us/app/leeloo-aac-autism-speech-app/id1508952198" target="_blank"><b>Leeloo AAC</b></a>, <span>a new version of Leeloo on ios</span></li>
            <li>Founded 🎈 <a href="https://dreamoriented.org/" target="_blank"><b>Dream Oriented</b></a>, <span>a website for the company</span></li>
            <li>Written 📓 <a href="https://play.google.com/store/books/details?id=EL7tDwAAQBAJ" target="_blank"><b>React ile Uygulama Geliştirme</b></a>, <span>a tutorial ebook in Turkish</span></li>
            <li>Made    💾 <a href="https://svgapi.com/" target="_blank"><b>svgapi</b></a>, <span>a saas Rest API to list and search SVG icons</span></li>
            <li>Shipped 📝 <a href="https://usememo.com/" target="_blank"><b>Memo</b></a>, <span>a smart note taking app using GH Gists</span></li>
            <li>Helped 👾 <a href="https://apps.apple.com/us/app/mola-arcade-space-shooter/id1493319285" target="_blank"><b>Mola</b></a>, <span>a mobile arcade space shooter game</span></li>
            <li>Maintained 💊 <a href="https://drcanciftci.com/" target="_blank"><b>Dr. Can Supplementleri</b></a>, <span>an e-commerce website</span></li>
            <li>Made 🤔 <a href="https://www.dreamoriented.org/wordmoji/" target="_blank"><b>Wordmoji</b></a>, <span>a casual mobile emoji quiz game</span></li>
            <li>Made 🤞 <a href="https://play.google.com/store/apps/details?id=org.dreamoriented.leeloo" target="_blank"><b>Leeloo AAC</b></a>, <span>a simple open source multilangulal mobile AAC app</span></li>
            <li>Made 🖼️ <a href="https://www.pngrepo.com/" target="_blank"><b>PNG Repo</b></a>, <span>a png clipart library, like svgrepo</span></li>
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
