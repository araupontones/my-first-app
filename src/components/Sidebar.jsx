import "./Sidebar.css";
import TypeButtons from "./TypeButtons";

// The type picker that stays on screen while you scroll:
// a column on the left on wide screens, a strip stuck to the top on phones.
function Sidebar({ types, selectedType, onSelect }) {
  return (
    <aside className="sidebar">
      <p className="sidebar__title">Pick a type</p>
      <TypeButtons types={types} selectedType={selectedType} onSelect={onSelect} />
    </aside>
  );
}

export default Sidebar;
