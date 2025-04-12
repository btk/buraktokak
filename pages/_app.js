import '../styles/globals.css'
import { GoogleAnalytics } from "nextjs-google-analytics"
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

const systemFonts = 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'

//UA-56224091-1
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Burak Tokak's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        html, input {
          font-family: ${inter.style.fontFamily}, ${systemFonts};
        }
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
