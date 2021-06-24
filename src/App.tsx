import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import { useState } from 'react';
import Header from './component/Header';
import Body from './component/Body';
import Home from './route/Home';
import Forum from './route/Forum';
import Study from './route/Study';
import File from './route/File';
import MyClassroom from './route/MyClassroom';
import Footer from './component/Footer';
import UserContext from './utils/UserContext';
import { IUser } from './utils/interface';
import ProfessorAccount from './route/ProfessorAccount';
import AddStudent from './route/AddStudent';
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
      name: 'Développement web Lyon',
      year: '2021/2022',
      id: '1',
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
              <Route path="/ma-promotion" component={MyClassroom} />
              <Route path="/ajouter-un-élève" component={AddStudent} />
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
