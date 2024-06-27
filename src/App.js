import Grid from "./components/Grid";
import Sidebar from "./components/Sidebar";
import data from "./data.json";

function App() {
  const { tables } = data;
  return (
    <div className="flex m-5">
      <Sidebar tables={tables} />
      <Grid tables={tables} />
    </div>
  );
}

export default App;
