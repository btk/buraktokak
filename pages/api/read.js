// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

async function goodreadsFetcher(type){
  let goodreads = await fetch(`https://www.goodreads.com/review/list/${process.env.GOODREADS_LISTID}?shelf=${type}`)
  let goodreadsText = await goodreads.text();
  let books = goodreadsText.split(`"booksBody">`)[1].split(`https://i.gr-assets.com/images`);

  let booksArray = [];
  books.forEach((book, i) => {
    if(book.includes(".jpg")){
      let cover = "https://i.gr-assets.com/images" + book.split(`"`)[0];
      let url = "https://www.goodreads.com/book/show/" + book.split(`/book/show/`)[1].split(`"`)[0];
      let title = book.split(`<label>title</label>`)[1].split(`">`)[2].split(`<`)[0];
      let author = book.split(`<label>author</label>`)[1].split(`">`)[2].split(`<`)[0];

      booksArray.push({cover, url, title, author});
    }
  });

  return booksArray.slice(0,5);
}

export default async function handler(req, res) {


  let to_read = await goodreadsFetcher("to-read");
  let read = await goodreadsFetcher("read");

  res.statusCode = 200;
  res.json({to_read, read});
}
