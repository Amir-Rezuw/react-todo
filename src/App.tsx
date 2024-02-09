import { useCallback, useState } from "react";
import NoteApp from "./Components/NoteApp";
import NotesHeader from "./Components/NotesHeader";
import { INotesData } from "./Interfaces/interfaces";
import { LocalStorageService } from "./Services/Localstorage";
import { NotesLocalStorageKey, SortingEnums } from "./enums/enums";

const App = () => {
  const [notesData, setNotesData] = useState<INotesData[]>(
    JSON.parse(
      LocalStorageService(NotesLocalStorageKey.KEY, undefined, "get") ?? "[]"
    )
  );
  const [sortBy, setSortBy] = useState(SortingEnums.LATEST_ON_TOP);
  const onSelectSort = useCallback((selectedSortingValue: SortingEnums) => {
    setSortBy(selectedSortingValue);
  }, []);

  return (
    <div className="my-0 p-4 text-center pt-10 mx-10">
      <header className="flex items-start justify-around border-b border-text-400 mb-8">
        <NotesHeader
          notesData={notesData}
          onSelectSortStatus={onSelectSort}
        />
      </header>

      <NoteApp
        sortBy={sortBy}
        notesData={notesData}
        setNotesData={setNotesData}
      />
    </div>
  );
};

export default App;
