import { useSelector } from "react-redux";
import NoteItem from "./NoteItem";

export default function NoteList() {
  const { notes, selectedTags } = useSelector((state) => state.notes);

  const filtered = selectedTags.length
    ? notes.filter(note => note.tags.some(tag => selectedTags.includes(tag)))
    : notes;

  return (
    <div>
      {filtered.map(note => <NoteItem key={note.id} note={note} />)}
    </div>
  );
}
