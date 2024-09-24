import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import Articles from './components/Articles';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Articles />
    </QueryClientProvider>
  );
}

export default App;
