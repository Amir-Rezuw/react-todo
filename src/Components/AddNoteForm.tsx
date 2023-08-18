import { FormEvent, memo, useRef } from "react";
import { INotesData } from "../Interfaces/interfaces";

const AddNoteForm = ({
  onFormSubmit,
}: {
  onFormSubmit: (newNote: INotesData) => void;
}) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const addNote = (event: FormEvent) => {
    event.preventDefault();
    if (!titleRef.current?.value || !descriptionRef.current?.value) return;
    const newNote: INotesData = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      id: Date.now(),
      completed: false,
      date: new Date().toISOString(),
    };
    titleRef.current.value = "";
    descriptionRef.current.value = "";

    onFormSubmit(newNote);
  };

  return (
    <form
      className="flex-1 p-4 w-80"
      onSubmit={addNote}
    >
      <h2 className="font-semibold">Add a new note</h2>
      <input
        className="my-2 mx-0 w-full p-2 rounded-xl h-11"
        type="text"
        placeholder="Note title ..."
        ref={titleRef}
        name="title"
      />
      <input
        name="description"
        className="my-2 mx-0 w-full p-2 rounded-xl h-11"
        type="text"
        placeholder="Note Description ..."
        ref={descriptionRef}
      />
      <button className="bg-primary-600 text-white w-full h-10 mt-2 rounded-xl">
        Add Note
      </button>
    </form>
  );
};

export default memo(AddNoteForm);
