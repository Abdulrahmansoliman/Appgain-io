import { useState } from "react";
import "./App.css";
import { GetForm, CreateForm, PutForm } from "./forms";

function App() {
  const [selectedForm, setSelectedForm] = useState("get");

  return (
    <div>
      {selectedForm === "create" && <CreateForm />}
      {selectedForm === "update" && <PutForm />}
      <div className="buttons">
        <button onClick={() => setSelectedForm("update")}>Put</button>
        <button onClick={() => setSelectedForm("create")}>Create</button>
      </div>
      <button onClick={() => setSelectedForm("get")}>Get all URLs</button>
      {selectedForm === "get" && <GetForm />}
    </div>
  );
}

export default App;
