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
                /* Aggressive flash prevention - hide everything and apply dark theme by default */
                html, body { 
                  visibility: hidden; 
                  background-color: #1a1a1a !important;
                  color: hsla(0, 0%, 100%, 0.9) !important;
                }
                body.theme-loaded { 
                  visibility: visible; 
                  background-color: var(--bg-primary) !important;
                  color: var(--text-primary) !important;
                }
                /* Force dark theme on html element immediately */
                html { 
                  background-color: #1a1a1a !important;
                  color: hsla(0, 0%, 100%, 0.9) !important;
                }
                html[data-theme="light"] {
                  background-color: #ffffff !important;
                  color: hsla(0, 0%, 0%, 0.7) !important;
                }
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
                    
                    // Set theme immediately
                    document.documentElement.setAttribute('data-theme', theme);
                    
                    // Force immediate style application
                    if (theme === 'dark') {
                      document.documentElement.style.backgroundColor = '#1a1a1a';
                      document.documentElement.style.color = 'hsla(0, 0%, 100%, 0.9)';
                    } else {
                      document.documentElement.style.backgroundColor = '#ffffff';
                      document.documentElement.style.color = 'hsla(0, 0%, 0%, 0.7)';
                    }
                    
                    // Add theme-loaded class to show content with proper transitions
                    document.body.classList.add('theme-loaded');
                  } catch (e) {
                    // Fallback: show content even if theme detection fails
                    document.body.classList.add('theme-loaded');
                  }
                })();
                
                // Aggressive fallback: ensure content is visible after 50ms
                setTimeout(function() {
                  document.body.classList.add('theme-loaded');
                }, 50);
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
