import CssBaseline from '@mui/material/CssBaseline';
import Portfolio from './components/Portfolio';
import './app.css';

const App = () => {
  return (
    <>
      <h1 className="text-primary text-center text-2xl font-bold my-10">Full-Stack / Frontend homework (Typescript, React, Drag & Drop)</h1>
      <CssBaseline />
      <Portfolio />
    </>
  );
};

export default App;
