import {h, app} from 'hyperapp';
import hyperx from 'hyperx';
import $ from 'jquery';
// window.jQuery = jquery;
// import 'bootstrap';

const html = hyperx(h);

const state = {};
const actions = {};

const views = (state, actions) => {
	return html`
		<div class="container-fluid">
		  <div class="row no-gutter">
			<div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
			<div class="col-md-8 col-lg-6">
			  <div class="login d-flex align-items-center py-5">
				<div class="container">
				  <div class="row">
					<div class="col-md-9 col-lg-8 mx-auto">
					  <h3 class="login-heading mb-4">Welcome back!</h3>
					  <form>
						<div class="form-label-group">
						  <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
						  <label for="inputEmail">Email addres</label>
						</div>
		
						<div class="form-label-group">
						  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
						  <label for="inputPassword">Password</label>
						</div>
		
						<div class="custom-control custom-checkbox mb-3">
						  <input type="checkbox" class="custom-control-input" id="customCheck1">
						  <label class="custom-control-label" for="customCheck1">Remember password</label>
						</div>
						<button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" onclick="${(() => console.log('click on:' + new Date()))}">Sign in</button>
						<div class="text-center">
						  <a class="small" href="#">Forgot password?</a></div>
					  </form>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>`;
};

app(state, actions, views, document.body);

console.log($('body'));