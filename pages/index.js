import React, { useState, useEffect, Suspense } from "react"
import dynamic from 'next/dynamic'
import Image from 'next/image'
import SEO from '@/components/SEO'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import apiCache from '../lib/api-cache'

// Dynamically import Twemoji with no SSR
const Twemoji = dynamic(() => {
  const delay = process.env.NODE_ENV === 'development' ? 2000 : 100;
  return new Promise(resolve => {
    setTimeout(() => {
      import('react-twemoji').then(module => resolve(module));
    }, delay);
  });
}, {
  ssr: false,
  loading: () => <Loading />
});

// Create a loading component for dynamic content
const Loading = () => (
  <div className="lists">
    <div>
      {[...Array(5)].map((_, i) => (
        <GhostItem key={`ghost-${i}`} />
      ))}
    </div>
  </div>
);

const GhostItem = () => (
  <div className="listItem ghost">
    <div className="ghost-image ghost-loading" />
    <div className="ghost-content">
      <div className="ghost-title ghost-loading" />
      <div className="ghost-subtitle ghost-loading" />
    </div>
  </div>
);

export default function Home() {
  const [makerText, setMakerText] = useState("maker")
  const [topics, setTopics] = useState(false)
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [toRead, setToRead] = useState([])
  const [read, setRead] = useState([])
  const [lastGames, setLastGames] = useState([])
  const [mostGames, setMostGames] = useState([])
  const router = useRouter()
  const [isSongsLoading, setIsSongsLoading] = useState(true)
  const [isBooksLoading, setIsBooksLoading] = useState(true)
  const [isGamesLoading, setIsGamesLoading] = useState(true)
  const [isTwemojiLoaded, setIsTwemojiLoaded] = useState(false)

  // Load cached data immediately in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Safely access and set songs
      if (apiCache?.listen?.tracks?.recenttracks?.track) {
        setSongs(apiCache.listen.tracks.recenttracks.track);
      }
      
      // Safely access and set albums
      if (apiCache?.listen?.albums?.topalbums?.album) {
        setAlbums(apiCache.listen.albums.topalbums.album);
      }
      
      // Safely access and set books
      if (apiCache?.read?.to_read) {
        setToRead(apiCache.read.to_read);
      }
      if (apiCache?.read?.read) {
        setRead(apiCache.read.read);
      }
      
      // Safely access and set games
      if (apiCache?.play?.last_played) {
        setLastGames(apiCache.play.last_played);
      }
      if (apiCache?.play?.most_played) {
        setMostGames(apiCache.play.most_played);
      }
      
      // Update loading states
      setIsSongsLoading(false);
      setIsBooksLoading(false);
      setIsGamesLoading(false);
    }
  }, []);

  // Load Twemoji after initial render
  useEffect(() => {
    import('react-twemoji').then(() => {
      setIsTwemojiLoaded(true);
    });
  }, []);

  const getSongs = async () => {
    try {
      setIsSongsLoading(true);
      const res = await fetch("/api/listen")
      const data = await res.json()
      if (data?.tracks?.recenttracks?.track) {
        setSongs(data.tracks.recenttracks.track)
      }
      if (data?.albums?.topalbums?.album) {
        setAlbums(data.albums.topalbums.album)
      }
    } catch (error) {
      console.error("Error fetching songs:", error)
      setSongs([])
      setAlbums([])
    } finally {
      setIsSongsLoading(false);
    }
  }

  const getBooks = async () => {
    try {
      setIsBooksLoading(true);
      const res = await fetch("/api/read")
      const data = await res.json()
      setToRead(data.to_read)
      setRead(data.read)
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setIsBooksLoading(false);
    }
  }

  const getGames = async () => {
    try {
      setIsGamesLoading(true);
      const res = await fetch("/api/play")
      const data = await res.json()
      setLastGames(data.last_played)
      setMostGames(data.most_played)
    } catch (error) {
      console.error("Error fetching games:", error)
    } finally {
      setIsGamesLoading(false);
    }
  }

  const makerTextGlitch = () => {
    const textArray = [
      "ha%wr",
      "ha&ec",
      "ha#er",
      "hacker",
      "hacker",
      "hacker",
      "hacker",
      "macker",
      "maker",
    ]

    textArray.forEach((text, index) => {
      setTimeout(() => {
        setMakerText(text)
      }, 30 * index)
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      makerTextGlitch()
    }, 5000)

    // Fetch data in parallel
    Promise.all([getSongs(), getBooks(), getGames()])

    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <SEO
        title="Burak Tokak"
        isHome={true}
        description="Burak's webpage who calls himself an Indie Maker, containing the projects he worked and working on. Click the link to get in touch."
      />
      <div style={{ marginTop: 100 }}>
        <h1>Hi, I'm Burak.</h1>
        <p style={{ fontSize: 19, lineHeight: "1.5em" }}>
          Burak is an indie {makerText}, <br />
          Making useful and sometimes silly things.
        </p>
        <h2 style={{ display: 'none' }}>Digital Product Portfolio</h2>
        <div className="contact" onClick={() => setTopics(!topics)}>
          {topics ? <span>👇 Choose a topic below</span> : <span>💭 Get in touch with me</span>}
        </div>
        {topics && (
          <div className="tags" style={{ marginTop: 0 }}>
            <div onClick={() => setTopics(false)}>
              <a href="mailto:info@buraktokak.com?subject=[Work] Hi, Burak&body=I want to get in touch with you about work related stuff...">
                <span>💼 Work</span>
              </a>
              <a href="mailto:info@buraktokak.com?subject=[Personal] Hi, Burak&body=I want to get in touch with you about personal stuff...">
                <span>🙏 Personal</span>
              </a>
              <a href="mailto:info@buraktokak.com?subject=[Other] Hi, Burak&body=I want to get in touch with you about other stuff...">
                <span>🍂 Other</span>
              </a>
            </div>
          </div>
        )}
      </div>

      <Suspense fallback={<Loading />}>
        <Twemoji options={{ className: 'twemoji', base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/' }}>
          <div className="making">
            <h3>Currently</h3>
            <ul>
              <li>Working for 🦆 <a href="http://rogueduck.net/" target="_blank" rel="noopener noreferrer"><b>Rogue Duck Interactive</b></a>, <span>making & publishing indie strategy pc games</span></li>
              <li>Making    🥽 <a href="https://vrux.co/" target="_blank" rel="noopener noreferrer"><b>VRUX</b></a>, <span>a virtual reality interface & experience prototying tool</span></li>
              <li>Making 📐 <a href="https://sitemanifest.dev/" target="_blank" rel="noopener noreferrer"><b>sitemanifest.dev</b></a>, <span>a tool that helps you generate site manifests</span></li>
              <li>Making 🚢 <a href="https://store.steampowered.com/app/2755950/Tidebound/" target="_blank" rel="noopener noreferrer"><b>Tidebound</b></a>, <span>a fishing & inventory management game</span></li>
              <li>Making 🗂 <a href="https://store.steampowered.com/app/3415240/Cozy_Organizer/" target="_blank" rel="noopener noreferrer"><b>Cozy Organizer</b></a>, <span>an item organization game on Steam</span></li>
              <li>Making 🚚 <a href="https://store.steampowered.com/app/3496000/Ship_Inc/" target="_blank" rel="noopener noreferrer"><b>Ship, Inc.</b></a>, <span>a parcel packaging PC game on Steam</span></li>
              <li>Publishing 🔮 <a href="https://store.steampowered.com/app/3415230/Witchy_Business/" target="_blank" rel="noopener noreferrer"><b>Witchy Business</b></a>, <span>a witch job-simulator game on Steam</span></li>
              <li>Publishing 👑 <a href="https://store.steampowered.com/app/2655590/Kingdoms_Deck/" target="_blank" rel="noopener noreferrer"><b>Kingdom's Deck</b></a>, <span>a kingdom builder & defense pc game on Steam</span></li>
              <li>Publishing 👽 <a href="https://store.steampowered.com/app/2449450/Clonizer/" target="_blank" rel="noopener noreferrer"><b>Clonizer</b></a>, <span>a hex based roguelike deckbuilder pc game on Steam</span></li>
              <li>Publishing 🎯 <a href="https://store.steampowered.com/app/3301530/Boogey_Hunters/" target="_blank" rel="noopener noreferrer"><b>Boogey Hunters</b></a>, <span>an ammo-building roguelike pc game on Steam</span></li>
              <li>Publishing 🎨 <a href="https://store.steampowered.com/app/3454660/Color_Factory_Automation_Meets_Canvas/" target="_blank" rel="noopener noreferrer"><b>Color Factory</b></a>, <span>a relaxing factory-building game on Steam</span></li>
              <li>Publishing ⚽ <a href="https://store.steampowered.com/app/3241940/Regista_Reign_Your_Football_Club/" target="_blank" rel="noopener noreferrer"><b>Regista</b></a>, <span>a football themed choose your own adventure game on Steam</span></li>
              <li>Publishing 🚚 <a href="https://store.steampowered.com/app/3521410/Cats__Cups/" target="_blank" rel="noopener noreferrer"><b>Cats & Cups</b></a>, <span>a 2d barista sim PC game on Steam</span></li>
            </ul>
          </div>
        </Twemoji>
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Twemoji options={{ className: 'twemoji', base: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/' }}>
          <div className="made">
            <h3>Past</h3>
            <ul>
              <li>Made 🫠 <a href="https://meltingface.org/" target="_blank" rel="noopener noreferrer"><b>Melting Face</b></a>, <span>a tool that generates branding & interface vibe with AI</span></li>
              <li>Made 🤘 <a href="https://metalmap.vercel.app/" target="_blank" rel="noopener noreferrer"><b>Metal Map</b></a>, <span>a map of well-known metal bands by their origin</span></li>
              <li>Founded & Worked for 💙 <a href="https://dreamoriented.org/" target="_blank" rel="noopener noreferrer"><b>Dream Oriented</b></a>, <span>created developer tooling for almost a decade</span></li>
              <li>Published 🛖 <a href="https://store.steampowered.com/app/3056580/HEXAROMA/" target="_blank" rel="noopener noreferrer"><b>HEXAROMA</b></a>, <span>a village builder with colony sim elements</span></li>
              <li>Released 1.0 for ‍🪐 <a href="https://store.steampowered.com/app/2628570/Stellar_Settlers/" target="_blank" rel="noopener noreferrer"><b>Stellar Settlers</b></a>, <span>a PC space colony sim & city building game</span></li>
              <li>Published 🏙️ <a href="https://store.steampowered.com/app/2517440/Mini_City_Mayhem/" target="_blank" rel="noopener noreferrer"><b>Mini City: Mayhem</b></a>, <span>a tetris-like city builder against time</span></li>
              <li>Published 🃏 <a href="https://store.steampowered.com/app/2755950/" target="_blank" rel="noopener noreferrer"><b>Pairs & Perils</b></a>, <span>a memory game roguelike on Steam</span></li>
              <li>Made 🔍 <a href="https://store.steampowered.com/app/2755950/" target="_blank" rel="noopener noreferrer"><b>Lost But Found</b></a>, <span>a job sim + hidden object game on Steam, sold 100k units</span></li>
              <li>Published & Built Backend for 🥊 <a href="https://store.steampowered.com/app/2693940/NeoDuel_Backpack_Monsters/" target="_blank" rel="noopener noreferrer"><b>NEODUEL</b></a>, <span>a pvp autobattler pc game on Steam</span></li>
              <li>Founded & Worked for 🐁 <a href="https://tinymice.org/" target="_blank" rel="noopener noreferrer"><b>Tinymice Entertainment</b></a>, <span>making tiny indie pc games</span></li>
              <li>Co-Made 🎲 <a href="https://store.steampowered.com/app/2693930/Dice__Fold/" target="_blank" rel="noopener noreferrer"><b>Dice & Fold</b></a>, <span>a card & dice based dungeon crawler with a twist</span></li>
              <li>Made 📃 <a href="https://fluent1.vercel.app/" target="_blank" rel="noopener noreferrer"><b>fluent.</b></a>, <span>a tool that gives you crafted paragraphs to train your pronunciation</span></li>
              <li>Co-Made ‍🪐 <a href="https://store.steampowered.com/app/2628570/Stellar_Settlers/" target="_blank" rel="noopener noreferrer"><b>Stellar Settlers</b></a>, <span>a PC space colony sim & city building game</span></li>
              <li>Made 💬 <a href="https://steamreview.vercel.app/" target="_blank" rel="noopener noreferrer"><b>Steam Review Analyzer</b></a>, <span>an nlp tool for analyzing game reviews on steam</span></li>
              <li>Co-Founded & Worked for 🔰 <a href="https://stratera.co/" target="_blank" rel="noopener noreferrer"><b>Stratera Games</b></a>, <span>making fun indie games, 5-ish years</span></li>
              <li>Made 🐳 <a href="https://easylogo.dev/" target="_blank" rel="noopener noreferrer"><b>EasyLogo</b></a>, <span>a tool that helps you design easy and fast logos</span></li>
              <li>Made ⚗️ <a href="https://sciencefigures.org/" target="_blank" rel="noopener noreferrer"><b>Science Figures</b></a>, <span>a searchable directory of open licensed science figures</span></li>
              <li>Made ➿ <a href="https://playfulturkiye.com/" target="_blank" rel="noopener noreferrer"><b>Playful Turkiye</b></a>, <span>a website for the game publishing company</span></li>
              <li>Co-Made 🎟️ <a href="https://strateragames.itch.io/lost-but-found" target="_blank" rel="noopener noreferrer"><b>Lost But Found</b></a>, <span>a jam game where you manage a lost and found box in airport</span></li>
              <li>Co-Made 🙈️ <a href="https://strateragames.itch.io/blindsight" target="_blank" rel="noopener noreferrer"><b>Blindsight</b></a>, <span>a platformer jam game where you play a blind girl</span></li>
              <li>Made 🛠️ <a href="https://www.svgrepo.com/tools/" target="_blank" rel="noopener noreferrer"><b>Tools by SVG Repo</b></a>, <span>a collection of tools for developer & designers</span></li>
              <li>Made 👩🏼‍🎨 <a href="https://opendesign.fyi/" target="_blank" rel="noopener noreferrer"><b>Open Design License</b></a>, <span>a license menifesto for open design</span></li>
              <li>Made 🔍️ <a href="https://svgfind.com/" target="_blank" rel="noopener noreferrer"><b>SVG Find</b></a>, <span>search and find open-licensed SVG files</span></li>
              <li>Co-Founded & Worked for 🎴 <a href="https://assistivecards.com/" target="_blank" rel="noopener noreferrer"><b>Assistive Cards</b></a>, <span>making assistive accessibility apps/software</span></li>
              <li>Helped Make 🕹 <a href="https://assistivecards.com/games" target="_blank" rel="noopener noreferrer"><b>Assistive Cards Games</b></a>, <span>educational assistive mobile games</span></li>
              <li>Made 👨‍💻 <a href="https://github.com/btk/nextjs-google-adsense" target="_blank" rel="noopener noreferrer"><b>nextjs-google-adsense</b></a>, <span>Google AdSense addon for Next.js</span></li>
              <li>Released 🏙 <a href="https://store.steampowered.com/app/2198070/Cardboard_Town/" target="_blank" rel="noopener noreferrer"><b>Cardboard Town</b></a>, <span>a PC city building and card game</span></li>
              <li>Graduated 🏫 <b>Software Engineering</b>, <span>master's degree from METU</span></li>
              <li>Made 🎛️ <a href="https://vectormixer.com/" target="_blank" rel="noopener noreferrer"><b>Vector Mixer</b></a>, <span>a tool to remix and create unique svg vectors</span></li>
              <li>Made 💠 <a href="https://www.figma.com/community/plugin/1200930158268112554" target="_blank" rel="noopener noreferrer"><b>SVG Repo for Figma</b></a>, <span>a figma plugin allows you to drag drop vectors and icons from SVG Repo</span></li>
              <li>Made 🎨 <a href="https://www.svgrepo.com/svg/97560/tomato-juice?edit=true" target="_blank" rel="noopener noreferrer"><b>SVG Repo Editor</b></a>, <span>a tool with internal SVG vector editor in NextJS</span></li>
              <li>Made 🌳 <a href="https://carbonneutralwebsite.org/" target="_blank" rel="noopener noreferrer"><b>Carbon Neutral Website</b></a>, <span>a tool for offseting website's carbon footprint</span></li>
              <li>Shipped 🐳 <a href="https://www.svgrepo.com/" target="_blank" rel="noopener noreferrer"><b>SVG Repo V2</b></a>, <span>a 2nd version of SVG Repo with competition equal functionality</span></li>
              <li>Helped Release 🐇 <a href="https://store.steampowered.com/app/2113120/Verlet_Ascend/" target="_blank" rel="noopener noreferrer"><b>Verlet Ascend</b></a>, <span>a physics based platformer on Steam</span></li>
              <li>Made ⚙️ <a href="https://text2icon.app/" target="_blank" rel="noopener noreferrer"><b>text2icon</b></a>, <span>a stable diffusion based vector icon generator</span></li>
              <li>Made ✒️ <a href="https://vectormaker.co/" target="_blank" rel="noopener noreferrer"><b>vectormaker</b></a>, <span>a multicolor raster image vectorizer tool</span></li>
              <li>Helped Make  🦅 <a href="https://assistivecards.com/wingo" target="_blank" rel="noopener noreferrer"><b>Wingo</b></a>, <span>a daily planner app for kids</span></li>
              <li>Project Lead 🌊 <a href="https://store.steampowered.com/app/2023050/Lighthouse_Keeper/" target="_blank" rel="noopener noreferrer"><b>Lighthouse Keeper</b></a>, <span>a simulation/survival chill PC game on Steam</span></li>
              <li>Helped Release 🧩 <a href="https://store.steampowered.com/app/1732750/Havsala_Into_the_Soul_Palace/" target="_blank" rel="noopener noreferrer"><b>Havsala</b></a>, <span>a 2D PC puzzle game on Steam</span></li>
              <li>Helped Make 🧁 <a href="https://stratera.co/game/cupcats/" target="_blank" rel="noopener noreferrer"><b>Cats in the Cups</b></a>, <span>an NFT set's gacha style mobile game</span></li>
              <li>Accelerated by 🕵️ <a href="https://startupwiseguys.com/" target="_blank" rel="noopener noreferrer"><b>Startup Wise Guys</b></a>, <span>a European startup accelerator (via ODTU SpeedUp)</span></li>
              <li>Featured by 🌐 <a href="https://www.unicef.org/appcatalogue/" target="_blank" rel="noopener noreferrer"><b>UNICEF</b></a>, <span>at their App catalogue with Leeloo</span></li>
              <li>Made 🦚 <a href="https://personalitylist.com/" target="_blank" rel="noopener noreferrer"><b>Personality List</b></a>, <span>an AI text generation experiment with character personalities</span></li>
              <li>Co-Made 📑 <a href="https://beyazsayfa.org/" target="_blank" rel="noopener noreferrer"><b>Beyaz Sayfa</b></a>, <span>human understandable Turkish cryptocurrency white papers</span></li>
              <li>Co-Made 🏴‍☠️ <a href="https://stratera.co/game/pirate-factions/" target="_blank" rel="noopener noreferrer"><b>Pirate Factions</b></a>, <span>a text based mobile RPG strategy game</span></li>
              <li>Helped Make 🧃 <a href="https://stratera.co/game/blokk-defense/" target="_blank" rel="noopener noreferrer"><b>Blokk Defense</b></a>, <span>a casual mobile tower defense game</span></li>
              <li>Made 🐼 <a href="https://assistivecards.com/chamur" target="_blank" rel="noopener noreferrer"><b>Chamur</b></a>, <span>educational AI scavenger hunt game for kids</span></li>
              <li>Part-released  🈳 <a href="https://github.com/btk/anlam" target="_blank" rel="noopener noreferrer"><b>Anlam</b></a>, <span>an open source statistical Turkish NLP library in JS</span></li>
              <li>Made 🐙 <a href="https://tenta.me/" target="_blank" rel="noopener noreferrer"><b>Tenta.me</b></a>, <span>an app for sending yourself notifications</span></li>
              <li>Co-made 🃏 <a href="https://assistivecards.com/" target="_blank" rel="noopener noreferrer"><b>Assistive Cards Listing</b></a>, <span>a library of assistive cards in 37 languages</span></li>
              <li>Helped Release 🐎 <a href="https://stratera.co/game/ride-to-victory/" target="_blank" rel="noopener noreferrer"><b>Ride to Victory</b></a>, <span>a Battle of Ankara inspired endless 3D runner game</span></li>
              <li>Made 🦙 <a href="https://assistivecards.com/huni" target="_blank" rel="noopener noreferrer"><b>Huni AI</b></a>, <span>a mobile speech therapy app with voice recognition</span></li>
              <li>Made ‍💨 <a href="https://speedrun.xyz" target="_blank" rel="noopener noreferrer"><b>speedrun.xyz</b></a>, <span>live timeline of record speedruns for games</span></li>
              <li>Helped Release 🏃‍♂️ <a href="https://stratera.co/game/viralfirar" target="_blank" rel="noopener noreferrer"><b>Virar Firar</b></a>, <span>an arcade runner game with ft. 5 influencers</span></li>
              <li>Designed 🔰 <a href="https://stratera.co/" target="_blank" rel="noopener noreferrer"><b>Stratera.co</b></a>, <span>a website for the company</span></li>
              <li>Made 🧺 <a href="https://www.iconrepo.com/" target="_blank" rel="noopener noreferrer"><b>ICON Repo</b></a>, <span>an open-licensed icon listing & search tool</span></li>
              <li>Re-Made 🦜 <a href="https://apps.apple.com/us/app/id1517824465" target="_blank" rel="noopener noreferrer"><b>Wordmoji</b></a>, <span>a new version of Wordmoji on ios</span></li>
              <li>Co-Made 🐰 <a href="https://apps.apple.com/us/app/leeloo-aac-autism-speech-app/id1508952198" target="_blank" rel="noopener noreferrer"><b>Leeloo AAC</b></a>, <span>a new version of Leeloo on ios</span></li>
              <li>Founded 🎈 <a href="https://dreamoriented.org/" target="_blank" rel="noopener noreferrer"><b>Dream Oriented</b></a>, <span>a website for the company</span></li>
              <li>Written 📓 <a href="https://play.google.com/store/books/details?id=EL7tDwAAQBAJ" target="_blank" rel="noopener noreferrer"><b>React ile Uygulama Geliştirme</b></a>, <span>a tutorial ebook in Turkish</span></li>
              <li>Made    💾 <a href="https://svgapi.com/" target="_blank" rel="noopener noreferrer"><b>svgapi</b></a>, <span>a saas Rest API to list and search SVG icons</span></li>
              <li>Made  📝 <a href="https://usememo.com/" target="_blank" rel="noopener noreferrer"><b>Memo</b></a>, <span>a smart note taking app using GH Gists</span></li>
              <li>Localized 📡 <a href="https://dijitalpsikoloji.com/" target="_blank" rel="noopener noreferrer"><b>Dijital Psikoloji</b></a>, <span>a list of principals of digital product design in Turkish</span></li>
              <li>Helped 👾 <a href="https://apps.apple.com/us/app/mola-arcade-space-shooter/id1493319285" target="_blank" rel="noopener noreferrer"><b>Mola</b></a>, <span>a mobile arcade space shooter game</span></li>
              <li>Made 🤔 <a href="https://www.dreamoriented.org/wordmoji/" target="_blank" rel="noopener noreferrer"><b>Wordmoji</b></a>, <span>a casual mobile emoji quiz game</span></li>
              <li>Made 🤞 <a href="https://play.google.com/store/apps/details?id=org.dreamoriented.leeloo" target="_blank" rel="noopener noreferrer"><b>Leeloo AAC</b></a>, <span>a simple open source multilangulal mobile AAC app</span></li>
              <li>Made 🖼️ <a href="https://www.pngrepo.com/" target="_blank" rel="noopener noreferrer"><b>PNG Repo</b></a>, <span>a png clipart library, like svgrepo</span></li>
              <li>Graduated 💻 <b>Computer Engineering</b>, <span>bachelor's degree from Ankara University</span></li>
              <li>Made 🦄 <a href="https://www.svgrepo.com/" target="_blank" rel="noopener noreferrer"><b>SVG Repo</b></a>, <span>an svg vector listing & search tool</span></li>
              <li>Made 📲 <a href="https://apps.apple.com/tr/app/wordpack-word-puzzle-game/id1350159332?l=tr" target="_blank" rel="noopener noreferrer"><b>Wordpack</b></a>, <span>a mobile word puzzle game</span></li>
              <li>Co-Made 😼 <a href="https://aucyberclub.org" target="_blank" rel="noopener noreferrer"><b>AUCC</b></a>, <span>a website for our university cyber security club</span></li>
              <li>Written 📕 <a href="https://www.kitapyurdu.com/kitap/angularjs/427295.html" target="_blank" rel="noopener noreferrer"><b>AngularJS</b></a>, <span>a published book about front-end in Turkish</span></li>
              <li>Made 📙 <a href="https://turkcenedemek.com" target="_blank" rel="noopener noreferrer"><b>turkcenedemek</b></a>, <span>an Turkish dictionary & search engine</span></li>
              <li>Written 📘 <a href="https://www.kitapyurdu.com/kitap/responsive-web-tasarimi-ve-uygulamalari/403949.html&publisher_id=4468" target="_blank" rel="noopener noreferrer"><b>Responsive Design</b></a>, <span>a published book about front-end in Turkish</span></li>
              <li>Co-Built 👨‍⚕️ <a href="https://www.fitekran.com" target="_blank" rel="noopener noreferrer"><b>Fitekran</b></a>, <span>a popular Turkish health blog</span></li>
              <li>Worked for 🎲 <a href="https://www.otsimo.com" target="_blank" rel="noopener noreferrer"><b>Otsimo</b></a>, <span>building AAC apps</span></li>
              <li>Written 📗 <a href="https://www.dr.com.tr/kitap/html5-css3-ve-javascript-ile-web-tasarimi/burak-tokak/egitim-basvuru/bilgisayar/urunno=0000000672365" target="_blank" rel="noopener noreferrer"><b>HTML5, CSS3 ve Javascript</b></a>, <span>a published book about front-end in Turkish</span></li>
              <li>Made 📖 <a href="https://www.etimolojiturkce.com" target="_blank" rel="noopener noreferrer"><b>Etimoloji Türkçe</b></a>, <span>an etymological dictionary & search engine</span></li>
              <li>Co-built 🎮 <b>metin2sozluk.com</b>, <span>a popular Turkish codex for an mmorpg game</span></li>
            </ul>
          </div>
        </Twemoji>
      </Suspense>

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

      {isSongsLoading ? (
        <div className="lists">
          <h4>Loading tracks...</h4>
          <div>
            {[...Array(5)].map((_, i) => (
              <GhostItem key={`ghost-songs-${i}`} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {songs && songs.length !== 0 && (
            <div className="lists">
              <h4>Last listened tracks</h4>
              <div>
                {songs.map((song, i) => (
                  <a href={song.url} key={`songs${i}`} target="_blank" rel="noopener noreferrer">
                    <div className="listItem">
                      <Image
                        src={song.image[2]["#text"]}
                        alt={`${song.artist["#text"]} - ${song.name}`}
                        width={70}
                        height={70}
                        loading="lazy"
                        quality={75}
                        style={{ 
                          borderRadius: 5, 
                          marginRight: 10,
                          width: '70px',
                          height: '70px',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <small>{song.album["#text"]}</small>
                        <p>{song.artist["#text"]} - {song.name}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {albums && albums.length !== 0 && (
            <div className="lists">
              <h4>Most listened albums</h4>
              <div>
                {albums.map((album, i) => (
                  <a href={album.url} key={`albums${i}`} target="_blank" rel="noopener noreferrer">
                    <div className="listItem">
                      <Image
                        src={album.image[2]["#text"]}
                        alt={`${album.artist.name} - ${album.name}`}
                        width={70}
                        height={70}
                        loading="lazy"
                        quality={75}
                        style={{ 
                          borderRadius: 5, 
                          marginRight: 10,
                          width: '70px',
                          height: '70px',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <small style={{ textTransform: "uppercase" }}>{album.artist.name}</small>
                        <p>{album.name} - <span style={{ opacity: 0.5, fontWeight: "normal" }}>{album.playcount} Listens</span></p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {isBooksLoading ? (
        <div className="lists">
          <h4>Loading books...</h4>
          <div>
            {[...Array(5)].map((_, i) => (
              <GhostItem key={`ghost-books-${i}`} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {read && read.length > 0 && (
            <div className="lists">
              <h4>Last read</h4>
              <div>
                {read.map((book, i) => (
                  <a href={book.url} key={`read${i}`} target="_blank" rel="noopener noreferrer">
                    <div className="listItem">
                      <Image
                        src={book.cover}
                        alt={`${book.title} by ${book.author}`}
                        width={60}
                        height={90}
                        loading="lazy"
                        quality={75}
                        style={{ 
                          borderRadius: 5, 
                          marginRight: 10,
                          width: '60px',
                          height: '90px',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <small style={{ textTransform: "uppercase" }}>
                          {book.author.split(", ")[1] + " " + book.author.split(", ")[0]}
                        </small>
                        <p>{book.title}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {toRead && toRead.length > 0 && (
            <div className="lists">
              <h4>Will read</h4>
              <div>
                {toRead.map((book, i) => (
                  <a href={book.url} key={`toRead${i}`} target="_blank" rel="noopener noreferrer">
                    <div className="listItem">
                      <Image
                        src={book.cover}
                        alt={`${book.title} by ${book.author}`}
                        width={60}
                        height={90}
                        loading="lazy"
                        quality={75}
                        style={{ 
                          borderRadius: 5, 
                          marginRight: 10,
                          width: '60px',
                          height: '90px',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <small style={{ textTransform: "uppercase" }}>
                          {book.author.split(", ")[1] + " " + book.author.split(", ")[0]}
                        </small>
                        <p>{book.title}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {isGamesLoading ? (
        <div className="lists">
          <h4>Loading games...</h4>
          <div>
            {[...Array(5)].map((_, i) => (
              <GhostItem key={`ghost-games-${i}`} />
            ))}
          </div>
        </div>
      ) : (lastGames.length > 0 || mostGames.length > 0) && (
        <div className="lists">
          <h4>Games</h4>
          <div>
            {lastGames.map((game, i) => (
              <a href={game.url} key={`lastGames${i}`} target="_blank" rel="noopener noreferrer">
                <div className="listItem">
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={128.37}
                    height={60}
                    loading="lazy"
                    quality={75}
                    style={{ 
                      borderRadius: 5, 
                      marginRight: 10,
                      width: '128.37px',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <small style={{ textTransform: "uppercase" }}>Last played - </small><span style={{ opacity: 0.5, fontWeight: "normal" }}>{game.playtimeText}</span>
                    <p>{game.name}</p>
                  </div>
                </div>
              </a>
            ))}
            {mostGames.map((game, i) => (
              <a href={game.url} key={`mostGames${i}`} target="_blank" rel="noopener noreferrer">
                <div className="listItem">
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={128.37}
                    height={60}
                    loading="lazy"
                    quality={75}
                    style={{ 
                      borderRadius: 5, 
                      marginRight: 10,
                      width: '128.37px',
                      height: '60px',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <small style={{ textTransform: "uppercase" }}>Most played</small>  - <span style={{ opacity: 0.5, fontWeight: "normal" }}>{game.playtimeText}</span>
                    <p>{game.name}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}
