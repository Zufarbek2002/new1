import { DataApiProvider } from "./api/DataApiProvider";
import Header from "./components/Header";
import Table from "./components/Table";

const App = () => {
  return (
    <DataApiProvider>
      <Header />
      <Table />
    </DataApiProvider>
  );
};

export default App;
