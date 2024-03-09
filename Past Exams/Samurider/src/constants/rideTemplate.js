import {html} from '../../node_modules/lit-html/lit-html.js'

export const rideTemplate = (ride) => html`
<div class="motorcycle">
<img src="${ride.imageUrl}" alt="example1" />
<h3 class="model">${ride.model}</h3>
<p class="year">Year: ${ride.year}</p>
<p class="mileage">Mileage: ${ride.mileage} km.</p>
<p class="contact">Contact Number: ${ride.contact}</p>
<a class="details-btn" href="/details/${ride._id}">More Info</a>
</div>`

export const searchRideTemplate = (ride) => html` 
<div class="search-result">
    <div class="motorcycle">
<img src="${ride.imageUrl}" alt="example1" />
<h3 class="model">${ride.model}</h3>
  <a class="details-btn" href="/details/${ride._id}">More Info</a>
</div>
</div>`