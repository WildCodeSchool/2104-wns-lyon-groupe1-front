import React from 'react';
import './App.scss';
import Header from './component/Header';
import Home from './component/Home';
import Footer from './component/Footer';
import ProfessorAccount from './components/professorAccout/ProfessorAccount';
{
  /* <Route path="/useraccount" component={ProfessorAccount} /> */
}
function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
