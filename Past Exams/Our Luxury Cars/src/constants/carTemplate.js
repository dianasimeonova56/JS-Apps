import {html} from '../../node_modules/lit-html/lit-html.js'

export const carTemplate = (car) => html `
<div class="car">
            <img src="${car.imageUrl}" alt="example1" />
            <h3 class="model">${car.model}</h3>
            <div class="specs">
              <p class="price">Price: ${car.price}</p>
              <p class="weight">Weight: ${car.weight} kg</p>
              <p class="top-speed">Top Speed: ${car.speed} kph</p>
            </div>
            <a class="details-btn" href="/details/${car._id}">More Info</a>
</div>
` 