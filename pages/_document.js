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
          <style
            dangerouslySetInnerHTML={{
              __html: `
                /* Prevent flash by hiding content until theme is loaded */
                body { visibility: hidden; }
                body.theme-loaded { visibility: visible; }
              `,
            }}
          />
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
                    
                    // Add theme-loaded class to show content
                    document.body.classList.add('theme-loaded');
                  } catch (e) {
                    // Fallback: show content even if theme detection fails
                    document.body.classList.add('theme-loaded');
                  }
                })();
                
                // Fallback: ensure content is visible after 100ms
                setTimeout(function() {
                  document.body.classList.add('theme-loaded');
                }, 100);
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
