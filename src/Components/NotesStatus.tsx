import { INotesData } from "../Interfaces/interfaces";

const NotesStatus = ({ notes }: { notes: INotesData[] }) => {
  let completedNoteCount = 0;
  notes.forEach((note) => {
    if (note.completed) {
      ++completedNoteCount;
    }
  });
  if (notes.length === 0) return <h2>No Notes were added</h2>;
  return (
    <ul className="flex justify-between text-text-400 mx-2">
      <li>
        All
        <span className="border ml-1 bg-text-400 text-white rounded-full px-1 py-0.5">
          {notes.length}
        </span>
      </li>
      <li>
        Compeleted
        <span className="border ml-1 bg-text-400 text-white rounded-full px-1 py-0.5">
          {completedNoteCount}
        </span>
      </li>
      <li>
        Open
        <span className="border ml-1 bg-text-400 text-white rounded-full px-1 py-0.5">
          {notes.length - completedNoteCount}
        </span>
      </li>
    </ul>
  );
};

export default NotesStatus;
