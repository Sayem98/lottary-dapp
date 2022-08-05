import { EthProvider } from "./contexts/EthContext";

import Accounts from "./components/Accounts";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import RightSide from "./components/RightSide";

function App() {
  return (
    <Layout>
      <EthProvider>
        <Accounts />
        <RightSide />
      </EthProvider>
    </Layout>
  );
}

export default App;
