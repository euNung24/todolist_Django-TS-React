import React, { ChangeEvent, useCallback, useEffect, useMemo } from "react";
// @ts-ignore
import Draggable from "@eunung/draggable";
import { GoX } from "@react-icons/all-files/go/GoX";
import { Note } from "../types/apiTypes";
import { useDispatch } from "react-redux";
import {
  deleteStickyNote,
  updateStickyNote,
} from "../actions/StickyNoteActions";
import { debounce } from "underscore";

interface StickyNoteProps {
  note: Note;
}

function StickyNote({ note }: StickyNoteProps) {
  const dispatch = useDispatch();
  const onChangeContent = useMemo(
    () =>
      debounce(
        (e: ChangeEvent<HTMLTextAreaElement>) =>
          dispatch(updateStickyNote(note.id, e.target.value)),
        300,
      ),
    [],
  );
  const onClickDeleteNote = useCallback(() => {
    dispatch(deleteStickyNote(note.id));
  }, []);

  useEffect(() => {
    return () => {
      onChangeContent.cancel();
    };
  }, [onChangeContent]);

  return (
    <Draggable x={note.x} y={note.y}>
      <div
        style={{
          width: `${note.width}px`,
          height: `${note.height}px`,
          minWidth: "100px",
          minHeight: "100px",
          borderRadius: "4px",
          paddingBottom: "24px",
          boxSizing: "content-box",
          overflow: "hidden",
          resize: "both",
          boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Draggable.Handle>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "24px",
              padding: "4px 8px",
              backgroundColor: "#3d6191",
            }}
          >
            <GoX onClick={onClickDeleteNote} />
          </div>
        </Draggable.Handle>
        <textarea
          name="note"
          placeholder="메모를 작성하세요."
          defaultValue=""
          style={{
            width: "100%",
            height: "100%",
            padding: "4px 8px",
            border: "none",
            fontSize: "1rem",
            backgroundColor: "#abcdef",
            resize: "none",
            outline: "none",
          }}
          onChange={onChangeContent}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default StickyNote;
