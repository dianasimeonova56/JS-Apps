import { html } from '../../node_modules/lit-html/lit-html.js'

export const charTemplate = (char) => html`
    <div class="character">
            <img src="${char.imageUrl}" alt="example1" />
            <div class="hero-info">
              <h3 class="category">${char.category}</h3>
              <p class="description">${char.description}</p>
              <a class="details-btn" href="/details/${char._id}">More Info</a>
            </div>
`