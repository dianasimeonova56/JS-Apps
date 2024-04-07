import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { register } from '../data/auth.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'

//TODO replace w/ actual view
const registerTemplate = (onRegister) => html`
    <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form" @submit=${onRegister}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
          </form>
        </div>
      </section>
`

export function registerPage() {
    render(registerTemplate(createSubmitHandler(onRegister)), main);
    
    //TODO change user object based on requirements
    async function onRegister({email, password, 're-password': repass}) {
        if(email == "" || password == "" || repass == "") {
            return alert("All fields are required")
        }
        if(password !== repass) {
            return alert("Passwords dont match")
        }
        await register(email, password);
        //TODO use redirect location from requirements
        page.redirect('/catalog')
    }
}