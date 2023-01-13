import React from "react"
import Twemoji from 'react-twemoji';

import Image from 'next/image'
import SEO from '@/components/SEO'
import Layout from '@/components/layout'

export default class Home extends React.Component {
  state = {
    makerText: "maker",
    topics: false
  }

  getSongs(){
    fetch("/api/listen").then(res => res.json()).then(res => {
      console.log(res.albums);
      this.setState({songs: res.tracks.recenttracks.track, albums: res.albums.topalbums.album})
    });
  }

  getBooks(){
    fetch("/api/read").then(res => res.json()).then(res => {
      this.setState({to_read: res.to_read, read:res.read})
    });
  }

  getGames(){
    fetch("/api/play").then(res => res.json()).then(res => {
      this.setState({last_games:res.last_played, most_games: res.most_played})
    });
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
    this.getSongs();
    this.getBooks();
    this.getGames();
  }

  revealTopics(){
    this.setState({topics: true});
  }

  render(){
    return (
      <Layout>
        <SEO
          title="Burak Tokak" isHome={true}
          description="Burak's webpage who calls himself an Indie Maker, containing the projects he worked and working on. Click the link to get in touch."
        />
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
        <Twemoji options={{ className: 'twemoji', base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' }}>

        <div className="making">
          <h3>Currently</h3>
          <ul>
            <li>Working for 💙 <a href="https://dreamoriented.org/" target="_blank"><b>Dream Oriented</b></a>, <span>creating developer tooling software</span></li>
            <li>Working for 🔰 <a href="https://stratera.co/" target="_blank"><b>Stratera Games</b></a>, <span>making fun indie games</span></li>
            <li>Working for 🎴 <a href="https://assistivecards.com/" target="_blank"><b>Assistive Cards</b></a>, <span>making assistive accessibility apps/software</span></li>
            <li>Attending 🏫 <b>Software Engineering</b>, <span>master's program at METU</span></li>
            <li>Making    🧧️ <a href="https://uncontent.co/" target="_blank"><b>uncontent.co</b></a>, <span>an AI companion for your content marketing</span></li>
            <li>Making    🥽 <a href="https://vrux.co/" target="_blank"><b>VRUX</b></a>, <span>a virtual reality interface & experience prototying tool</span></li>
            <li>Helping Make 💹 <a href="https://temettu.app/" target="_blank"><b>Temettu</b></a>, <span>a mobile app to track dividend yields of stocks</span></li>
            <li>Making 🎛️ <a href="https://vectormixer.com/" target="_blank"><b>Vector Mixer</b></a>, <span>a tool to remix and create unique svg vectors</span></li>
            <li>Leading 🕹 <a href="https://assistivecards.com/games" target="_blank"><b>Assistive Cards Games</b></a>, <span>educational assistive mobile games</span></li>
            <li>Helping Make 🏙 <a href="https://store.steampowered.com/app/2198070/Cardboard_Town/" target="_blank"><b>Cardboard Town</b></a>, <span>a PC city building card game</span></li>
            <li>Helping Make ‍🚀 <a href="https://store.steampowered.com/app/2198070/Cardboard_Town/" target="_blank"><b>Untitled Game</b></a>, <span>a PC tower defense / resource management game</span></li>
          </ul>
        </div>
        </Twemoji>

        <Twemoji options={{ className: 'twemoji', base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' }}>
        <div className="made">
          <h3>Past</h3>
          <ul>
            <li>Made 🎨 <a href="https://www.svgrepo.com/svg/97560/tomato-juice?edit=true" target="_blank"><b>SVG Repo Editor</b></a>, <span>a tool with internal SVG vector editor in NextJS</span></li>
            <li>Shipped 🐳 <a href="https://www.svgrepo.com/" target="_blank"><b>SVG Repo V2</b></a>, <span>a 2nd version of SVG Repo with competition equal functionality</span></li>
            <li>Made 🌳 <a href="https://carbonneutralwebsite.org/" target="_blank"><b>Carbon Neutral Website</b></a>, <span>a tool for offseting website's carbon footprint</span></li>
            <li>Helped Release 🐇 <a href="https://store.steampowered.com/app/2113120/Verlet_Ascend/" target="_blank"><b>Verlet Ascend</b></a>, <span>a physics based platformer on Steam</span></li>
            <li>Made ⚙️ <a href="https://text2icon.app/" target="_blank"><b>text2icon</b></a>, <span>a stable diffusion based vector icon generator</span></li>
            <li>Made ✒️ <a href="https://vectormaker.co/" target="_blank"><b>vectormaker</b></a>, <span>a multicolor raster image vectorizer tool</span></li>
            <li>Helped Make  🦅 <a href="https://assistivecards.com/wingo" target="_blank"><b>Wingo</b></a>, <span>a daily planner app for kids</span></li>
            <li>Project Lead 🌊 <a href="https://store.steampowered.com/app/2023050/Lighthouse_Keeper/" target="_blank"><b>Lighthouse Keeper</b></a>, <span>a simulation/survival chill PC game on Steam</span></li>
            <li>Helped Release 🧩 <a href="https://store.steampowered.com/app/1732750/Havsala_Into_the_Soul_Palace/" target="_blank"><b>Havsala</b></a>, <span>a 2D PC puzzle game on Steam</span></li>
            <li>Helped Make 🧁 <a href="https://stratera.co/game/cupcats/" target="_blank"><b>Cats in the Cups</b></a>, <span>an NFT set's gacha style mobile game</span></li>
            <li>Accelerated by 🕵️ <a href="https://startupwiseguys.com/" target="_blank"><b>Startup Wise Guys</b></a>, <span>a European startup accelerator (via ODTU SpeedUp)</span></li>
            <li>Featured by 🌐 <a href="https://www.unicef.org/appcatalogue/" target="_blank"><b>UNICEF</b></a>, <span>at their App catalogue with Leeloo</span></li>
            <li>Made 🦚 <a href="https://personalitylist.com/" target="_blank"><b>Personality List</b></a>, <span>an AI text generation experiment with character personalities</span></li>
            <li>Co-Made 📑 <a href="https://beyazsayfa.org/" target="_blank"><b>Beyaz Sayfa</b></a>, <span>human understandable Turkish cryptocurrency white papers</span></li>
            <li>Co-Made 🏴‍☠️ <a href="https://stratera.co/game/pirate-factions/" target="_blank"><b>Pirate Factions</b></a>, <span>a text based mobile RPG strategy game</span></li>
            <li>Helped Make 🧃 <a href="https://stratera.co/game/blokk-defense/" target="_blank"><b>Blokk Defense</b></a>, <span>a casual mobile tower defense game</span></li>
            <li>Made 🐼 <a href="https://assistivecards.com/chamur" target="_blank"><b>Chamur</b></a>, <span>educational AI scavenger hunt game for kids</span></li>
            <li>Part-released  🈳 <a href="https://github.com/btk/anlam" target="_blank"><b>Anlam</b></a>, <span>an open source statistical Turkish NLP library in JS</span></li>
            <li>Made 🐙 <a href="https://tenta.me/" target="_blank"><b>Tenta.me</b></a>, <span>an app for sending yourself notifications</span></li>
            <li>Co-made 🃏 <a href="https://assistivecards.com/" target="_blank"><b>Assistive Cards Listing</b></a>, <span>a library of assistive cards in 37 languages</span></li>
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
            <li>Made  📝 <a href="https://usememo.com/" target="_blank"><b>Memo</b></a>, <span>a smart note taking app using GH Gists</span></li>
            <li>Localized 📡 <a href="https://dijitalpsikoloji.com/" target="_blank"><b>Dijital Psikoloji</b></a>, <span>a list of principals of digital product design in Turkish</span></li>
            <li>Helped 👾 <a href="https://apps.apple.com/us/app/mola-arcade-space-shooter/id1493319285" target="_blank"><b>Mola</b></a>, <span>a mobile arcade space shooter game</span></li>
            <li>Co-Founded 💊 <a href="https://drcanciftci.com/" target="_blank"><b>Dr. Can Supplementleri</b></a>, <span>a medical e-commerce website</span></li>
            <li>Made 🤔 <a href="https://www.dreamoriented.org/wordmoji/" target="_blank"><b>Wordmoji</b></a>, <span>a casual mobile emoji quiz game</span></li>
            <li>Made 🤞 <a href="https://play.google.com/store/apps/details?id=org.dreamoriented.leeloo" target="_blank"><b>Leeloo AAC</b></a>, <span>a simple open source multilangulal mobile AAC app</span></li>
            <li>Made 🖼️ <a href="https://www.pngrepo.com/" target="_blank"><b>PNG Repo</b></a>, <span>a png clipart library, like svgrepo</span></li>
            <li>Graduated 💻 <b>Computer Engineering</b>, <span>bachelor's degree from Ankara University</span></li>
            <li>Made 🦄 <a href="https://www.svgrepo.com/" target="_blank"><b>SVG Repo</b></a>, <span>an svg vector listing & search tool</span></li>
            <li>Made 📲 <a href="https://apps.apple.com/tr/app/wordpack-word-puzzle-game/id1350159332?l=tr" target="_blank"><b>Wordpack</b></a>, <span>a mobile word puzzle game</span></li>
            <li>Co-Made 😼 <a href="https://aucyberclub.org" target="_blank"><b>AUCC</b></a>, <span>a website for our university cyber security club</span></li>
            <li>Written 📕 <a href="https://www.kitapyurdu.com/kitap/angularjs/427295.html" target="_blank"><b>AngularJS</b></a>, <span>a published book about front-end in Turkish</span></li>
            <li>Made 📙 <a href="https://turkcenedemek.com" target="_blank"><b>turkcenedemek</b></a>, <span>an Turkish dictionary & search engine</span></li>
            <li>Written 📘 <a href="https://www.kitapyurdu.com/kitap/responsive-web-tasarimi-ve-uygulamalari/403949.html&publisher_id=4468" target="_blank"><b>Responsive Design</b></a>, <span>a published book about front-end in Turkish</span></li>
            <li>Co-Built 👨‍⚕️ <a href="https://www.fitekran.com" target="_blank"><b>Fitekran</b></a>, <span>a popular Turkish health blog</span></li>
            <li>Worked for 🎲 <a href="https://www.otsimo.com" target="_blank"><b>Otsimo</b></a>, <span>building AAC apps</span></li>
            <li>Written 📗 <a href="https://www.dr.com.tr/kitap/html5-css3-ve-javascript-ile-web-tasarimi/burak-tokak/egitim-basvuru/bilgisayar/urunno=0000000672365" target="_blank"><b>HTML5, CSS3 ve Javascript</b></a>, <span>a published book about front-end in Turkish</span></li>
            <li>Made 📖 <a href="https://www.etimolojiturkce.com" target="_blank"><b>Etimoloji Türkçe</b></a>, <span>an etymological dictionary & search engine</span></li>
            <li>Co-built 🎮 <b>metin2sozluk.com</b>, <span>a popular Turkish codex for an mmorpg game</span></li>
          </ul>
        </div>
        </Twemoji>

        <Twemoji options={{ className: 'twemoji', base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/' }}>
        <div className="made" style={{display: "none"}}>
          <h3>Future</h3>
          <ul>
            <li>Will be Making 🔗 <a href="https://iconlist.co/" target="_blank"><b>iconlist.co</b></a>, <span>a tool to manage your project icons, discover new ones</span></li>
            <li>Will be Making 🔍️ <a href="https://svgfind.com/" target="_blank"><b>SVG Find</b></a>, <span>search and find original SVG vectors</span></li>
            <li>Will be Making    🗣️ <a href="https://uncopy.co/" target="_blank"><b>uncopy.co</b></a>, <span>an AI companion for copywriting</span></li>
            <li>Will be Creating 👩🏼‍🎨 <a href="https://opendesign.fyi/" target="_blank"><b>OpenDesign.FYI</b></a>, <span>a license menifesto for open design</span></li>
            <li>Will be Creating 🤔 <a href="https://creativecommons.info/" target="_blank"><b>Creative Commons Info</b></a>, <span>a non-corporate license alternative for CC</span></li>
            <li>Will be Making 🤘 <a href="https://metalmap.net/" target="_blank"><b>MetalMap</b></a>, <span>a map with popular/new released metal albums by band origin</span></li>
            <li>Will be Making 📦 <a href="https://fbxrepo.com/" target="_blank"><b>FBXRepo</b></a>, <span>a repository of open licensed FBX models</span></li>
            <li>Will be Compiling 👨‍💼 <a href="https://founderlist.org/" target="_blank"><b>Founderlist</b></a>, <span>a list of actionable tasks for bootstrappers</span></li>
            <li>Will be Making 🧢 <a href="https://howoldwhen.com/" target="_blank"><b>How Old When?</b></a>, <span>a list for how old was that celeb during a movie/album</span></li>
            <li>Will be Making 🎨 <a href="https://illustrationfree.com/" target="_blank"><b>Illustration Free</b></a>, <span>a repository of open licensed Illustrations</span></li>
            <li>Will be Making 👓 <a href="https://landingapi.com/" target="_blank"><b>Landing API</b></a>, <span>an API for your landing page (undisclosed SaaS)</span></li>
            <li>Will be Making 📜 <a href="https://makerhow.com/" target="_blank"><b>Makerhow</b></a>, <span>a long form tutorial on making fast/eff products</span></li>
            <li>Will be Making ❄️ <a href="https://unlogo.co/" target="_blank"><b>unlogo.co</b></a>, <span>a stable diffusion based general-purpose logo maker</span></li>
          </ul>
        </div>
        </Twemoji>


        <div className="tags">
          <h4>Topics I'm passionate about</h4>
          <div>
            <span>nlp</span>
            <span>accessibility</span>
            <span>virtual reality</span>
            <span>deep learning</span>
            <span>dev experience</span>
            <span>static web & serverless</span>
          </div>
        </div>


        {this.state.songs && this.state.songs.length != 0 &&
          <div className="lists">
            <h4>Last listened tracks</h4>
            <div>
              {this.state.songs.map((song, i) => {
                return (
                  <a href={song.url} key={"songs"+i} target="_blank">
                    <div className="listItem">
                      <img src={song.image[2]["#text"]} style={{width: 54, height: 54, float: "left", borderRadius: 5, marginRight: 10}}/>
                      <div>
                        <small style={{textTransform: "uppercase"}}>{song.album["#text"]}</small>
                        <p>{song.artist["#text"]} - {song.name}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        }

        {this.state.albums && this.state.albums.length != 0 &&
          <div className="lists">
            <h4>Most listened albums</h4>
            <div>
              {this.state.albums.map((album, i) => {
                return (
                  <a href={album.url} key={"albums"+i} target="_blank">
                    <div className="listItem">
                      <img src={album.image[2]["#text"]} style={{width: 54, height: 54, float: "left", borderRadius: 5, marginRight: 10}}/>
                      <div>
                        <small style={{textTransform: "uppercase"}}>{album.artist.name}</small>
                        <p>{album.name} - <span style={{opacity: 0.4, fontWeight: "normal"}}>{album.playcount} Listens</span></p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        }

        {this.state.read && this.state.read.length != 0 &&
          <div className="lists">
            <h4>Last read</h4>
            <div>
              {this.state.read.map((book, i) => {
                return (
                  <a href={book.url} key={"read" + i} target="_blank">
                    <div className="listItem">
                      <img src={book.cover} style={{width: 54, height: 80, float: "left", borderRadius: 5, marginRight: 10}}/>
                      <div>
                        <small style={{textTransform: "uppercase"}}>{book.author.split(", ")[1] + " " + book.author.split(", ")[0]}</small>
                        <p>{book.title}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        }

        {this.state.to_read && this.state.to_read.length != 0 &&
          <div className="lists">
            <h4>Will read</h4>
            <div>
              {this.state.to_read.map((book, i) => {
                return (
                  <a href={book.url} key={"to_read" + i} target="_blank">
                    <div className="listItem">
                      <img src={book.cover} style={{width: 54, height: 80, float: "left", borderRadius: 5, marginRight: 10}}/>
                      <div>
                        <small style={{textTransform: "uppercase"}}>{book.author.split(", ")[1] + " " + book.author.split(", ")[0]}</small>
                        <p>{book.title}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        }


        {this.state.last_games && this.state.last_games.length != 0 &&
          <div className="lists">
            <h4>Last played games</h4>
            <div>
              {this.state.last_games.map((game, i) => {
                return (
                  <a href={`https://store.steampowered.com/app/${game.appid}`} key={"last_games" + i} target="_blank">
                    <div className="listItem">
                      <img src={game.logo} style={{width: 184, height: 69, float: "left", borderRadius: 5, marginRight: 10}}/>
                      <div>
                        <small style={{textTransform: "uppercase"}}>{game.hours_forever} Hours</small>
                        <p>{game.name}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        }


        {this.state.most_games && this.state.most_games.length != 0 &&
          <div className="lists">
            <h4>Most played games</h4>
            <div>
              {this.state.most_games.map((game, i) => {
                return (
                  <a href={`https://store.steampowered.com/app/${game.appid}`} key={"most_games" + i} target="_blank">
                    <div className="listItem">
                      <img src={game.logo} style={{width: 184, height: 69, float: "left", borderRadius: 5, marginRight: 10}}/>
                      <div>
                        <small style={{textTransform: "uppercase"}}>{game.hours_forever} Hours</small>
                        <p>{game.name}</p>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        }
      </Layout>
    )
  }
}
