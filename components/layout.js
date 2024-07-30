import React from "react"

const Layout = ({ children }) => {
  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer style={{fontSize: "0.9em", paddingTop: 20, paddingBottom: 30}}>
          Copyright © {new Date().getFullYear()}, {` `} Burak Tokak<br/>
          <small>I operate, accept payments & pay taxes under my company <a href="https://dreamoriented.org" target="_blank">Dream Oriented Limited</a> in Republic of Turkey or <a href="https://dreamoriented.org" target="_blank">Dream Oriented Pvt Ltd</a> in Singapore</small>
          <br/>
          <small><a href="#">Mostly Based in 🌃 Singapore, ❄️ Ankara, 🐘 Bangkok and 🌺 Tokyo</a></small>
        </footer>
      </div>
    </>
  )
}

export default Layout
