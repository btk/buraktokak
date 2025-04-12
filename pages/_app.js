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

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f4d6.png"
          as="image"
        />
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Burak's webpage who calls himself an Indie Maker, containing the projects he worked and working on. Click the link to get in touch." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
        body {
          font-family: var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
