import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './component/Header';
import Home from './route/Home';
import MySpace from './route/MySpace';
import Forum from './route/Forum';
import Study from './route/Study';
import File from './route/File';
import Footer from './component/Footer';
import ProfessorAccount from './components/professorAccout/ProfessorAccount';
{
  /* <Route path="/useraccount" component={ProfessorAccount} /> */
}
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/mes-fiches-de-revisions" component={File} />
        <Route path="/nous-contacter" render={() => <h2>Nous contacter</h2>} />
        <Route path="/notre-équipe" render={() => <h2>Notre équipe</h2>} />
        <Route
          path="/mentions-legales"
          render={() => <h2>Mentions légales</h2>}
        />
        <Route path="/mes-matières" component={Study} />
        <Route path="/forum" component={Forum} />
        <Route path="/mon-espace" component={MySpace} />
        <Route exact path="/" component={Home} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
