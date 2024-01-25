import { useCallback, useState } from "react";
import AddNoteForm from "./Components/AddNoteForm";
import Notes from "./Components/Notes";
import NotesHeader from "./Components/NotesHeader";
import { INotesData } from "./Interfaces/interfaces";
import { LocalstorageService } from "./Services/Localstorage";
import { NotesLocalStorageKey, SortingEnums } from "./enums/enums";

const App = () => {
  const [notesData, setNotesData] = useState<INotesData[]>(
    JSON.parse(
      LocalstorageService(NotesLocalStorageKey.KEY, undefined, "get") ?? "[]"
    )
  );
  const [sortBy, setSortBy] = useState(SortingEnums.LATEST_ON_TOP);
  const onSelectSort = useCallback((selectedSortingValue: SortingEnums) => {
    setSortBy(selectedSortingValue);
  }, []);

  const updateNotes = useCallback((newNote: INotesData) => {
    setNotesData((perviousData) => {
      const notes = [...perviousData, newNote];
      LocalstorageService(NotesLocalStorageKey.KEY, notes, "set");
      return notes;
    });
  }, []);
  const deleteNote = useCallback((noteId: number) => {
    setNotesData((perviousData) => {
      const filteredData = perviousData.filter((data) => data.id !== noteId);
      LocalstorageService(NotesLocalStorageKey.KEY, filteredData, "set");
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
      LocalstorageService(NotesLocalStorageKey.KEY, checkedItem, "set");
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
    <div className="my-0 p-4 text-center pt-10 mx-10">
      <header className="flex items-start justify-around border-b border-text-400 mb-8">
        <NotesHeader
          notesData={notesData}
          onSelectSortStatus={onSelectSort}
        />
      </header>
      <div className="flex justify-between ">
        <AddNoteForm onFormSubmit={updateNotes} />

        <Notes
          onNoteCheck={handleNoteCompletionCheck}
          notes={sortedNotes}
          onDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
