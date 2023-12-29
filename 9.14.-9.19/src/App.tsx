// Components
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

// Constants
import { courseName } from "./constants";

const App = () => {
  return (
    <div>
      <Header name={courseName}/>
      <Content/>
      <Total/>
    </div>
  );
};

export default App;