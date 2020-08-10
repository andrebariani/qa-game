import React, { Component } from 'react';
import css from './form.css';
import functions from './functions';

class Form extends React.PureComponent {
  constructor(props) {
    super(props);
    this.emailValidation = event => functions.emailValidation(event.target);
  }

  render() {
    return (
      <form class="form" action="#">
        <div class="form">
          <fieldset>
            <div class="form">
              <label for="password-1596631422562">Campo</label>
              <input type="text" id="password-1596631422562" placeholder="Confirmar Senha"
                required="true" onChange={this.emailValidation}
              />
            </div>
          </fieldset>
        </div>
        <div class="form form--aligned">
          <div class="form-group">
            <label for="text-1596631519204">Campo</label>
            <input type="text" id="text-1596631519204" placeholder=""
              required="true" onKeyDown={this.emailValidation} />
            <button class="button" type="submit" id="submit-1596739668819">Enviar</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;