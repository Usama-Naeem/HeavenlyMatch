import './styles.css';
import AppRouter from './App.router';
import AuthProvider from './shared/context/AuthProvider';


const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
};
export default App;
