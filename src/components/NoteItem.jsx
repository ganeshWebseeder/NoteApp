import { useDispatch } from "react-redux";
import { deleteNote } from "../redux/notesSlice";
import ReactMarkdown from "react-markdown";

export default function NoteItem({ note }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-3 mb-3 rounded-lg">
      <h3 className="font-semibold">{note.title}</h3>
      <ReactMarkdown>{note.body}</ReactMarkdown>
      <div className="flex gap-2 my-2">
        {note.tags.map(tag => (
          <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">{tag}</span>
        ))}
      </div>
      <button
        onClick={() => dispatch(deleteNote(note.id))}
        className="text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
