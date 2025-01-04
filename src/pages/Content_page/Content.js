import { Routes, Route } from "react-router-dom";
import "./Content.css";

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<div>Call Center</div>} />
        <Route path="/ServiceCenter" element={<div>Service Center</div>} />
        <Route path="/Inventory" element={<div>Inventory</div>} />
        <Route path="/Sales" element={<div>Sales</div>} />
        <Route path="/Escalation" element={<div>Escalation</div>} />
        <Route path="/TRC" element={<div>TRC</div>} />
        <Route path="/KPI" element={<div>KPI</div>} /> 
        <Route path="/Report" element={<div>Report</div>} />
        <Route path="/Help" element={<div>Help</div>} />
      </Routes>
    </div>
  );
}

export default Content;
