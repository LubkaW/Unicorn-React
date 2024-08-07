import logo from './logo.svg';
import './App.css';

const user = {
  firstname: "Luboš",
  surname: "Kasal"
}

function App() {
  return (
    <div className="App">
      <h1>Hello, {user.firstname} {user.surname}!</h1>
      <div className="imageSection">
        <img src={logo} alt={"logo"}/>
      </div>
    </div>
  );
}

export default App;
