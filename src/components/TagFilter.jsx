import { useSelector, useDispatch } from "react-redux";
import { setSelectedTags } from "../redux/notesSlice";

export default function TagFilter() {
  const notes = useSelector((state) => state.notes.notes);
  const selectedTags = useSelector((state) => state.notes.selectedTags);
  const dispatch = useDispatch();

  // Collect all unique tags
  const allTags = [...new Set(notes.flatMap((note) => note.tags || []))];

  const toggleTag = (tag) => {
    const newSelected =
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
    dispatch(setSelectedTags(newSelected));
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2 justify-center">
      {allTags.length === 0 ? (
        <p className="text-gray-400 italic">No tags yet</p>
      ) : (
        allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200
              ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-gray-200 hover:bg-gray-300 border-gray-300 text-gray-700"
              }`}
          >
            {tag}
          </button>
        ))
      )}
    </div>
  );
}
