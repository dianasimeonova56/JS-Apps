import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { register } from '../data/auth.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'

//TODO replace w/ actual view
const registerTemplate = (onRegister) => html`
    <section id="register">
          
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Register</h2>
            <form class="register-form" @submit=${onRegister}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">Register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
         
        </section>
`

export function registerPage() {
    render(registerTemplate(createSubmitHandler(onRegister)), main);
    
    async function onRegister({email, password, ['re-password']:repass}, form) {
        if(email == "" || password == "") {
            return alert("All fields are required")
        }
        if(password !== repass) {
            return alert("Passwords dont match")
        }
        await register(email, password);
        form.reset();
        page.redirect('/')
    }
}