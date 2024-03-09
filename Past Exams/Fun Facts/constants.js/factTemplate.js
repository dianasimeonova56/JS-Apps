import { html } from '../../node_modules/lit-html/lit-html.js'

export const factTemplate =(fact) => html`<div class="fact">
<img src="${fact.imageUrl}" alt="example1" />
<h3 class="category">${fact.category}</h3>
<p class="description">${fact.description}</p>
<a class="details-btn" href="/details/${fact._id}">More Info</a>
</div>`

export const factDetailTemplate = (fact, totalLikes) => html`
            <img id="details-img" src="${fact.imageUrl}" alt="example1" />
            <p id="details-category">History</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                ${fact.description}
                  </p>
                   <p id ="more-info">
                   ${fact.moreInfo}
                        </p>
                       <h3>Likes:<span id="likes">${totalLikes}</span></h3>
`