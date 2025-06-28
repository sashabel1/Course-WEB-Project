// components/Timeline/Controls.jsx
const Controls = ({ sortOrder, onSort, color, onColorChange }) => (
  <div className="flex items-center justify-center gap-4 mb-4">
    <button
      onClick={onSort}
      className="px-5 py-2 text-white bg-[#006A71] rounded-md font-semibold hover:bg-[#10b2bd] hover:-translate-y-0.5 hover:shadow-md transition"
    >
      {sortOrder === "asc" ? "Past → Future" : "Future → Past"}
    </button>
    <input
      type="color"
      value={color}
      onChange={onColorChange}
      title="Pick timeline color"
    />
  </div>
);

export default Controls;
