import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('theme');
                    if (!theme) {
                      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      theme = prefersDark ? 'dark' : 'light';
                      localStorage.setItem('theme', theme);
                    }
                    document.documentElement.setAttribute('data-theme', theme);
                    // Add theme-loaded class after a brief delay to prevent flash
                    setTimeout(function() {
                      document.body.classList.add('theme-loaded');
                    }, 10);
                  } catch (e) {}
                })();
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
