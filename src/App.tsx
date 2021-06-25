import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import { useState } from 'react';
import Header from './component/Header';
import Body from './component/Body';
import Home from './route/Home';
import Forum from './route/Forum';
import Study from './route/Study';
import File from './route/File';
import Footer from './component/Footer';
import UserContext from './utils/UserContext';
import { IUser } from './utils/interface';
import ProfessorAccount from './route/ProfessorAccount';
import Connect from './route/Connect';

function App() {
  // PROD
  // const [user, setUser] = useState<IUser>({});

  // DEV
  const [user, setUser] = useState<IUser>({
    id: '1',
    firstname: 'John',
    lastname: 'Doe',
    isTeacher: false,
    email: 'nicolas.legrand@aze.com',
    classroom: {
      name: 'Wild Code School',
    },
  });

  return (
    <Router>
      <UserContext.Provider value={user}>
        <div className="App">
          <Header />
          <Body>
            <Switch>
              <Route path="/mes-fiches-de-revisions" component={File} />
              <Route
                path="/nous-contacter"
                render={() => <h2>Nous contacter</h2>}
              />
              <Route
                path="/notre-équipe"
                render={() => <h2>Notre équipe</h2>}
              />
              <Route
                path="/mentions-legales"
                render={() => <h2>Mentions légales</h2>}
              />
              <Route path="/mes-matières" component={Study} />
              <Route path="/forum" component={Forum} />
              <Route
                path="/me-connecter"
                render={() => <Connect setUser={setUser} />}
              />
              <Route
                path="/ma-promotion"
                render={() => <h2>Mes promotions</h2>}
              />
              <Route
                path="/ajouter-une-fiche"
                render={() => <h2>Ajouter une fiche</h2>}
              />
              <Route
                path="/me-deconnecter"
                render={() => <h2>Deconnecter</h2>}
              />
              <Route path="/rechercher" render={() => <h2>Rechercher</h2>} />
              <Route path="/mon-espace" component={ProfessorAccount} />
              <Route exact path="/" component={Home} />
            </Switch>
          </Body>
          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
