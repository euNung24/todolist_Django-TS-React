import {
  CHANGE_POSITION_STICKYNOTE,
  CREATE_STICKYNOTE,
  DELETE_STICKYNOTE,
  RESIZE_STICKYNOTE,
  UPDATE_STICKYNOTE,
} from "./constant";

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

export const resizeStickyNote = (
  id: string,
  [width, height]: [number, number],
) => ({
  type: RESIZE_STICKYNOTE,
  payload: {
    id,
    width,
    height,
  },
});

export const changePositionStickyNote = (
  id: string,
  [x, y]: [number, number],
) => ({
  type: CHANGE_POSITION_STICKYNOTE,
  payload: {
    id,
    x,
    y,
  },
});
