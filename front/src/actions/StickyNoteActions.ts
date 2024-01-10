import {
  CREATE_STICKYNOTE,
  DELETE_STICKYNOTE,
  UPDATE_STICKYNOTE,
} from "./constant";

// export const setStickyNote = (note: unknown[]) => ({
//   type: SET_STICKYNOTE,
//   payload: note,
// });

export const deleteStickyNote = (id: string) => ({
  type: DELETE_STICKYNOTE,
  payload: {
    id,
  },
});

export const createStickyNote = () => ({
  type: CREATE_STICKYNOTE,
});

export const updateStickyNote = (id: string, content: string) => ({
  type: UPDATE_STICKYNOTE,
  payload: {
    id,
    content,
  },
});
