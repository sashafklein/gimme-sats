import GMSProvider from "./components/GMSProvider";
import Checkmark from "./components/modal/content/Checkmark";
import SatsButton from "./components/SatsButton";
import { STRIKE } from "./const";

function App() {
  return (
    <GMSProvider to="sasha" service={STRIKE}>
      <div>
        <SatsButton />
      <Checkmark />
      </div>
    </GMSProvider>
  );
}

export default App;
