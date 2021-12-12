import GMSProvider from "./components/GMSProvider";
import SatsButton from "./components/SatsButton";
import { STRIKE } from "./const";

function App() {
  return (
    <GMSProvider to="sasha" service={STRIKE}>
      <div>
        <SatsButton />
      </div>
    </GMSProvider>
  );
}

export default App;
