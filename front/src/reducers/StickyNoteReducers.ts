import { StickyNoteAction } from "../types/actionTypes";
import {
  CREATE_STICKYNOTE,
  DELETE_STICKYNOTE,
  UPDATE_STICKYNOTE,
} from "../actions/constant";
import { v4 as uuidv4 } from "uuid";
import { Note } from "../types/apiTypes";

const stickyNote = (
  state = {
    notes: [] as Note[],
  },
  action: StickyNoteAction,
) => {
  const getStickyIndex = (id: string) => {
    return state.notes.findIndex((note) => note.id === id);
  };
  switch (action.type) {
    case CREATE_STICKYNOTE: {
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: uuidv4(),
            width: 242,
            height: 160,
            x: 24,
            y: 24,
          },
        ],
      };
    }
    case UPDATE_STICKYNOTE: {
      const { id, content } = action.payload;
      const copiedNotes = [...state.notes];
      copiedNotes[getStickyIndex(id)].content = content;

      return {
        ...state,
        notes: copiedNotes,
      };
    }
    case DELETE_STICKYNOTE: {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
};

export default stickyNote;
