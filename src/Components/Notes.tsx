import { Fragment } from "react";
import { INotesData } from "../Interfaces/interfaces";
import Cart from "./Cart";
import NotesStatus from "./NotesStatus";

const Notes = ({
  notes,
  onDeleteNote,
  onNoteCheck,
}: {
  notes: INotesData[];
  onDeleteNote: (noteId: number) => void;
  onNoteCheck: (noteId: number) => void;
}) => {
  return (
    <section className="flex-3 mx-20 p-4">
      <NotesStatus notes={notes} />
      {notes.map((note) => (
        <Fragment key={note.id}>
          <Cart
            onNoteCheck={onNoteCheck}
            data={note}
            onDeleteNote={onDeleteNote}
          />
        </Fragment>
      ))}
    </section>
  );
};

export default Notes;
