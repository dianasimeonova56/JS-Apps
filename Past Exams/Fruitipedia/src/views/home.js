import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';

//TODO replace w/ actual view
const homeTemplate = () => html` 
<section id="home">
<h1>Learn more about your favorite fruits</h1>
<img
  src="./images/pexels-pixabay-161559-dImkWBDHz-transformed (1).png"
  alt="home"
/>
`

export function homePage() {
    render(homeTemplate(), main);
    
}