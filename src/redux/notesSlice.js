import { createSlice } from "@reduxjs/toolkit";

// Load notes from localStorage
const loadNotes = () => {
  try {
    const saved = localStorage.getItem("notesData");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
};

// Save notes to localStorage
const saveNotes = (notes) => {
  try {
    localStorage.setItem("notesData", JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
};

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: loadNotes(),
    selectedTags: [], // ✅ added for TagFilter
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
      saveNotes(state.notes);
    },
    editNote: (state, action) => {
      const { id, updatedNote } = action.payload;
      const index = state.notes.findIndex((n) => n.id === id);
      if (index !== -1) {
        state.notes[index] = updatedNote;
        saveNotes(state.notes);
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
      saveNotes(state.notes);
    },
    clearAllNotes: (state) => {
      state.notes = [];
      saveNotes([]);
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload; // ✅ handles tag filtering
    },
  },
});

export const { addNote, editNote, deleteNote, clearAllNotes, setSelectedTags } =
  notesSlice.actions;

export default notesSlice.reducer;
