import Link from 'next/link'
import { NextSeo } from 'next-seo';

function SEO({ description, meta, title, noMainTitle, isHome, canonical, imageURL }) {

  const metaDescription = description;

  title = (noMainTitle || isHome) ? title : `${title} - SVG Repo`;

  if(!imageURL){
    imageURL = "https://buraktokak.com/social.png";
  }

  return (
    <NextSeo
      title={title}
      description={metaDescription}
      canonical={"https://buraktokak.com"+canonical}
      openGraph={{
        url: "https://buraktokak.com"+canonical,
        title: title,
        description: metaDescription,
        site_name: 'Burak Tokak',
        images: [
          { url: imageURL,
            width: 256,
            height: 256,
            alt: 'Burak Tokak',
            type: 'image/png'
          }
        ]
      }}
      robotsProps={{
        maxImagePreview: 'large'
      }}
      twitter={{
        handle: '@burakmakes',
        site: '@burakmakes',
        cardType: 'summary',
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
