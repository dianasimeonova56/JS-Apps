import { html,render } from '../../node_modules/lit-html/lit-html.js'
import { createSubmitHandler } from '../util.js';
import { login } from '../data/auth.js';
import { main } from '../app.js';
import page from '../../node_modules/page/page.mjs'


//TODO replace w/ actual view
const loginTemplate = (onLogin) => html`
    <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`

export function loginPage() {
    render(loginTemplate(createSubmitHandler(onLogin)), main);
    
    async function onLogin({email, password}, form) {
        if(email == "" || password == '') {
            return alert("All fields are required")
        }
        
        await login(email, password);
        form.reset();
        page.redirect('/')
    }
}