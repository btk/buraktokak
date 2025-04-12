// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { type } = req.query;
  if (!type) {
    return res.status(400).json({ error: 'Type parameter is required' });
  }

  try {
    const goodreads = await fetch(
      `https://www.goodreads.com/review/list/${process.env.GOODREADS_LISTID}?shelf=${type}`
    );
    
    if (!goodreads.ok) {
      throw new Error(`Goodreads API responded with status: ${goodreads.status}`);
    }

    const goodreadsText = await goodreads.text();
    
    // Check if the response contains the expected content
    if (!goodreadsText.includes('"booksBody">')) {
      return res.status(200).json({ [type]: [] });
    }

    const books = goodreadsText.split('"booksBody">')[1].split('https://i.gr-assets.com/images');
    const booksArray = [];

    books.forEach((book, i) => {
      if (i === 0) return;
      let bookTitle = book.split('title="')[1]?.split('"')[0];
      let bookAuthor = book.split('authorName">')[1]?.split('<')[0];
      let bookImage = book.split('src="')[1]?.split('"')[0];
      let bookLink = book.split('href="')[1]?.split('"')[0];

      if (bookTitle && bookAuthor && bookImage && bookLink) {
        booksArray.push({
          title: bookTitle,
          author: bookAuthor,
          image: bookImage,
          link: bookLink,
        });
      }
    });

    res.status(200).json({ [type]: booksArray });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books data' });
  }
}
