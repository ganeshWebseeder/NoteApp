import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote, deleteNote } from "../redux/notesSlice";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";


export default function NoteForm() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(false);

  const handleAddOrEdit = () => {
    if (!title.trim()) return alert("Title cannot be empty");

    

    const noteData = {
      id: editingId || uuidv4(),
      title,
      body,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    toast.success("Note added successfully!");

    if (editingId) {
      dispatch(editNote({ id: editingId, updatedNote: noteData }));
      setEditingId(null);
    } else {
      dispatch(addNote(noteData));
    }

    setTitle("");
    setBody("");
    setTags("");
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setBody(note.body);
    setTags(note.tags.join(", "));
    setEditingId(note.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Note updated successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      dispatch(deleteNote(id));
    }
    toast.info("Note deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center tracking-wide">
          {editingId ? "✏️ Edit Note" : "📝 Create a New Note"}
        </h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter a descriptive title..."
          className="border border-gray-300 w-full p-4 rounded-xl mb-6 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Markdown Body */}
        <div className="flex justify-between items-center mb-3">
          <label className="font-semibold text-gray-700 text-lg">
            Note Body:
          </label>
          <button
            onClick={() => setPreview(!preview)}
            className="text-sm text-blue-600 underline hover:text-blue-800 transition-all"
          >
            {preview ? "Switch to Edit Mode" : "Preview Markdown"}
          </button>
        </div>

        {preview ? (
          <div className="border p-5 rounded-xl bg-gray-50 prose max-h-80 overflow-y-auto mb-6">
            <ReactMarkdown>{body || "*Nothing to preview...*"}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            placeholder="Write your detailed note here... (Markdown supported ✨)"
            className="border border-gray-300 w-full p-4 rounded-xl mb-6 h-48 text-md focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none shadow-sm"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        )}

        {/* Tag Select (Single) */}
        <select
          className="border border-gray-300 w-full p-4 rounded-xl mb-8 text-md focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        >
          <option value="">Select a Tag</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="urgent">Urgent</option>
          <option value="study">Study</option>
          <option value="idea">Idea</option>
        </select>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <button
            onClick={handleAddOrEdit}
            className="bg-blue-600 text-white px-10 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            {editingId ? "💾 Update Note" : "➕ Add Note"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setBody("");
                setTags("");
              }}
              className="bg-gray-300 text-gray-800 px-10 py-3 rounded-xl text-lg font-semibold hover:bg-gray-400 hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              ❌ Cancel
            </button>
          )}
        </div>

        {/* Notes Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            🗒️ Your Notes
          </h3>
          {notes.length === 0 ? (
            <p className="text-gray-500 italic text-center">
              No notes yet. Add one above!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="border border-gray-200 rounded-2xl p-5 bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  <h4 className="font-bold text-lg mb-2 text-blue-700">
                    {note.title}
                  </h4>
                  <div className="text-gray-700 text-sm mb-3 overflow-auto max-h-36 leading-relaxed">
                    <ReactMarkdown>{note.body}</ReactMarkdown>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-green-600 hover:text-green-800 transition-all"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-500 hover:text-red-700 transition-all"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
