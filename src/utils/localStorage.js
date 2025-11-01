export const loadNotes = () => {
  try {
    const data = localStorage.getItem("notesData");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveNotes = (notes) => {
  try {
    localStorage.setItem("notesData", JSON.stringify(notes));
  } catch (e) {
    console.error("Error saving notes", e);
  }
};
