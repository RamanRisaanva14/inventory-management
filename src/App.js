import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InventoryTable from "./components/InventoryTable";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };
  return (
    <div className="bg-[#161719] h-[100vh] p-4">
      <Header handleToggle={handleToggle} isAdmin={isAdmin} />
      <InventoryTable isAdmin={isAdmin} />
    </div>
  );
}

export default App;
