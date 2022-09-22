import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'; 
import './scss/style.scss';
import 'antd/dist/antd.css';
import { checkSession } from './actions';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Users = React.lazy(() => import('./views/drivers/Drivers'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const Router = (props) => {
  const history = useHistory();

  useEffect(()=>{
    console.log('app router effect');
    checkUserSession();
  },[]);

  const checkUserSession = async ()=>{
      try {
          const sessionResponse = await props.actions._checkSession();
      } catch (error) {
          console.log("Eror in check session",error);
          if(error && error.status === 401){
            history.push(`/login`)
          }
      }
  }

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
          <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
          <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
          <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        _checkSession: (data) => checkSession(data),
      }, dispatch)
    }
  }
  
  function mapStateToProps(state) {
    const { user, loader } = state;
    return {
      isLoading: loader.loading
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Router);
