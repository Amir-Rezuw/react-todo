import { ChangeEvent, Fragment } from "react";
import { INotesData } from "../Interfaces/interfaces";
import { SortingEnums } from "../enums/enums";

const NotesHeader = ({
  notesData,
  onSelectSortStatus,
}: {
  notesData: INotesData[];
  onSelectSortStatus: (selectedSortingValue: SortingEnums) => void;
}) => {
  return (
    <Fragment>
      <h1 className="font-bold text-3xl">
        My Notes
        <span>({notesData.length})</span>
      </h1>
      <select
        name="order"
        id="order"
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onSelectSortStatus(event.target.value as SortingEnums)
        }
      >
        <option value={SortingEnums.LATEST_ON_TOP}>Latest to earliest</option>
        <option value={SortingEnums.ERLIEST_ON_TOP}>Erliest to latest</option>
        <option value={SortingEnums.NOT_COMPLETED_ON_TOP}>
          Completion status
        </option>
      </select>
    </Fragment>
  );
};

export default NotesHeader;
