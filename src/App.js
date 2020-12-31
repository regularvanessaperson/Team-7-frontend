import {Switch, Route} from 'react-router-dom'

//Components
import Home from "./components/Home";

//High Order Component
import Layout from './components/common/Layout'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Favorites from './components/Favorites'

//CSS imports
import "./css/App.css";

const App = ()=> {
    return (
      <Layout>
      <Switch>
        <Route exact path ={["/", "/home"]} component={Home}/>
        <Route exact path ="/login" component={Login} />
        <Route exact path ="/register" component={SignUp}/>
        <Route exact path ="/profile" component={Profile} />
        <Route exact path ="/favorites" component={Favorites}/>
      </Switch>
      </Layout>
    );
}

export default App;
