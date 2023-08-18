import { memo } from "react";
import { INotesData } from "../Interfaces/interfaces";
const Cart = ({
  data,
  onDeleteNote,
  onNoteCheck,
}: {
  data: INotesData;
  onDeleteNote: (id: number) => void;
  onNoteCheck: (noteId: number) => void;
}) => {
  const { completed, date, description, title, id } = data;
  return (
    <div className="shadow-lg bg-white p-4 rounded-xl mt-5">
      <div className="flex justify-between items-center border-b border-primary-100 pb-2">
        <div className="flex flex-col text-left">
          <h5 className={`font-semibold ${completed && "line-through"}`}>
            {title}
          </h5>
          <p className="text-text-400">{description}</p>
        </div>
        <div className="flex items-center">
          <button
            className="cursor-pointer"
            onClick={() => onDeleteNote(id)}
          >
            <img
              height={20}
              width={20}
              src="trash.svg"
              alt=""
            />
          </button>
          <div className="ml-5">
            <input
              className="scale-150"
              type="checkbox"
              name="completed"
              id="completed"
              checked={completed}
              onChange={() => onNoteCheck(id)}
            />
          </div>
        </div>
      </div>
      <div className="text-left mt-2">
        <time className="text-text-300 text-base">
          {new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            year: "numeric",
            month: "short",
          })}
        </time>
      </div>
    </div>
  );
};

export default memo(Cart);
