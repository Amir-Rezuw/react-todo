import { Dispatch, SetStateAction, useCallback } from "react";
import { INotesData } from "../Interfaces/interfaces";
import { LocalStorageService } from "../Services/Localstorage";
import { NotesLocalStorageKey, SortingEnums } from "../enums/enums";
import AddNoteForm from "./AddNoteForm";
import Notes from "./Notes";

const NoteApp = ({
  sortBy,
  notesData,
  setNotesData,
}: {
  sortBy: SortingEnums;
  setNotesData: Dispatch<SetStateAction<INotesData[]>>;
  notesData: INotesData[];
}) => {
  const updateNotes = useCallback((newNote: INotesData) => {
    setNotesData((perviousData) => {
      const notes = [...perviousData, newNote];
      LocalStorageService(NotesLocalStorageKey.KEY, notes, "set");
      return notes;
    });
  }, []);
  const deleteNote = useCallback((noteId: number) => {
    setNotesData((perviousData) => {
      const filteredData = perviousData.filter((data) => data.id !== noteId);
      LocalStorageService(NotesLocalStorageKey.KEY, filteredData, "set");
      return filteredData;
    });
  }, []);
  const handleNoteCompletionCheck = useCallback((noteId: number) => {
    setNotesData((perviousData) => {
      const checkedItem = perviousData.map((note) => {
        const newNote = { ...note };
        if (newNote.id === noteId) {
          newNote.completed = !newNote.completed;
        }
        return newNote;
      });
      LocalStorageService(NotesLocalStorageKey.KEY, checkedItem, "set");
      return checkedItem;
    });
  }, []);
  let sortedNotes = notesData;
  if (sortBy === SortingEnums.LATEST_ON_TOP) {
    sortedNotes = [...notesData].sort(
      (a, b) => +new Date(b.date) - +new Date(a.date)
    );
  }

  if (sortBy === SortingEnums.ERLIEST_ON_TOP) {
    sortedNotes = [...notesData].sort(
      (a, b) => +new Date(a.date) - +new Date(b.date)
    );
  }

  if (sortBy === SortingEnums.NOT_COMPLETED_ON_TOP) {
    sortedNotes = [...notesData].sort((a, b) => +a.completed - +b.completed);
  }
  return (
    <div className="flex justify-between">
      <AddNoteForm onFormSubmit={updateNotes} />
      <Notes
        onNoteCheck={handleNoteCompletionCheck}
        notes={sortedNotes}
        onDeleteNote={deleteNote}
      />
    </div>
  );
};

export default NoteApp;
