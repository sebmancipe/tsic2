import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router, Route} from 'react-router-dom';
import InfoPage from './components/infopage';
import SiginPage from './components/siginpage';
import MainPage from './components/mainpage';
import LoginPage from './components/loginpage';
import history from './components/history/history';


class Root extends Component{
  render(){
    return(
      <Router history={history}>
        <Route exact path="/" name="info page" component={InfoPage}/>
        <Route exact path="/login" name="login page" component={LoginPage}/>
        <Route exact path="/signin" name="register page" component={SiginPage}/>
        <Route exact path="/main" name="main page" component={MainPage}/>
      </Router>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));


