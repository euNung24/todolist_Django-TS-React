import React from "react";
// @ts-ignore
import Draggable from "@eunung/draggable";
import { GoX } from "@react-icons/all-files/go/GoX";

function StickyNote() {
  return (
    <Draggable x={24} y={24}>
      <div
        style={{
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <Draggable.Handle>
          <div
            style={{
              backgroundColor: "#3d6191",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "4px 8px",
            }}
          >
            <GoX />
          </div>
        </Draggable.Handle>
        <textarea
          name="note"
          cols={40}
          rows={10}
          placeholder="메모를 작성하세요."
          defaultValue=""
          style={{
            backgroundColor: "#abcdef",
            borderRadius: "4px",
            border: "none",
            fontSize: "1rem",
            padding: "4px 8px",
          }}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default StickyNote;
