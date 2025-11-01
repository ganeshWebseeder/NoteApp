import { useEffect } from "react";
import { useSelector } from "react-redux";
import { saveNotes } from "./utils/localStorage";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import TagFilter from "./components/TagFilter";

function App() {
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Notes App</h1>
      <NoteForm />
      <TagFilter />
      <NoteList />
    </div>
  );
}

export default App;
