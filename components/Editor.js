import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";

function Editor({ data, onChange, holder, isReadOnly }) {
  // Add a reference to editor
  const ref = useRef();

  // Initialize editorjs
  useEffect(() => {
    // Initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        readOnly: isReadOnly,
        placeholder: "This is the start of something beautiful",
        data,
        async onChange(api, event) {
          event.preventDefault();
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    // Add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);


  return <div id={holder} className="prose max-w-full" />;
};

export default memo(Editor);