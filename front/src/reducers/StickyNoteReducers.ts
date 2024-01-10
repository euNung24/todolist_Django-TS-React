import { StickyNoteAction } from "../types/actionTypes";
import {
  CHANGE_POSITION_STICKYNOTE,
  CREATE_STICKYNOTE,
  DELETE_STICKYNOTE,
  RESIZE_STICKYNOTE,
  UPDATE_STICKYNOTE,
} from "../actions/constant";
import { v4 as uuidv4 } from "uuid";
import { StickyNoteState } from "../components/Todolist";
import { Note } from "../types/apiTypes";

const stickyNote = (
  state: StickyNoteState = {
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
            content: "",
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
    case RESIZE_STICKYNOTE: {
      const { id, width, height } = action.payload;
      const copiedNotes = [...state.notes];
      copiedNotes[getStickyIndex(id)].width = width;
      copiedNotes[getStickyIndex(id)].height = height;

      return {
        ...state,
        notes: copiedNotes,
      };
    }
    case CHANGE_POSITION_STICKYNOTE: {
      const { id, x, y } = action.payload;
      const copiedNotes = [...state.notes];
      copiedNotes[getStickyIndex(id)].x = x;
      copiedNotes[getStickyIndex(id)].y = y;

      return {
        ...state,
        notes: copiedNotes,
      };
    }
    default:
      return state;
  }
};

export default stickyNote;
