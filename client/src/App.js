import 'bootstrap/dist/css/bootstrap.min.css';
import FormNew from './components/FormNew';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UpdateForm from './components/UpdateForm';

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={ <FormNew />} />
          <Route path="/update/:id" element={<UpdateForm/>} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
