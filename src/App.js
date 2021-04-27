import './App.css';
import AslideRight from './components/AsildeRight';
import AslideLeft from './components/AslideLeft';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App container-fluid">
          <AslideLeft />
          <AslideRight/>       
    </div>
    </Router>
  );
}

export default App;
