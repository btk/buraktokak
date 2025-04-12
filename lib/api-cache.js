// API response cache for development
const apiCache = {
  read: {
    read: [
      {
        title: "The Pragmatic Programmer",
        author: "Hunt, Andrew",
        cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1401432508l/4099._SY75_.jpg",
        url: "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer"
      },
      {
        title: "Clean Code",
        author: "Martin, Robert C.",
        cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SY75_.jpg",
        url: "https://www.goodreads.com/book/show/3735293-clean-code"
      }
    ],
    to_read: [
      {
        title: "Designing Data-Intensive Applications",
        author: "Kleppmann, Martin",
        cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1442469705l/23463279._SY75_.jpg",
        url: "https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications"
      }
    ]
  },
  listen: {
    tracks: {
      recenttracks: {
        track: [
          {
            name: "Bohemian Rhapsody",
            artist: { "#text": "Queen" },
            album: { "#text": "A Night at the Opera" },
            url: "https://www.last.fm/music/Queen/_/Bohemian+Rhapsody",
            image: [
              { "#text": "small" },
              { "#text": "medium" },
              { "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png" }
            ]
          }
        ]
      }
    },
    albums: {
      topalbums: {
        album: [
          {
            name: "A Night at the Opera",
            artist: { name: "Queen" },
            playcount: "1234",
            url: "https://www.last.fm/music/Queen/A+Night+at+the+Opera",
            image: [
              { "#text": "small" },
              { "#text": "medium" },
              { "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png" }
            ]
          }
        ]
      }
    }
  },
  play: {
    last_played: [
      {
        name: "The Witcher 3",
        image: "https://steamcdn-a.akamaihd.net/steam/apps/292030/header.jpg",
        url: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/"
      }
    ],
    most_played: [
      {
        name: "Stardew Valley",
        image: "https://steamcdn-a.akamaihd.net/steam/apps/413150/header.jpg",
        url: "https://store.steampowered.com/app/413150/Stardew_Valley/"
      }
    ]
  }
};

export default apiCache; 