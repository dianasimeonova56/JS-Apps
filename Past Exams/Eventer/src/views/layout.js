import { html } from '../../node_modules/lit-html/lit-html.js'


//TODO replace w/ actual layout
export const layoutTemplate = (userData) => html`
<!-- Navigation -->
<a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>
        <nav>
          <div>
            <a href="/catalog">Events</a>
          </div>
            ${userData
        ? html`<div class="user">
            <a href="/create">Add Event</a>
            <a href="/logout">Logout</a>
          </div>`
        : html`<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
        </nav>
`