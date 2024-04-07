import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { main } from '../app.js';

//TODO replace w/ actual view
const homeTemplate = () => html`
    <section id="home">
        <img src="./images/landing.png" alt="home" />

        <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
            here!</span></h2>
      </section>
`

export function homePage() {
    render(homeTemplate(), main);
    
}