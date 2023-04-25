import React, { useRef, memo } from "react"
import { Editor as TinyEditor } from '@tinymce/tinymce-react';

function Editor({ setBlogData, blogData }) {
  const editorRef = useRef(null);

  return (
    <div className="w-full">
      <TinyEditor
        onInit={(evt, editor) => editorRef.current = editor}
        // initialValue="<p>Why this no work</p>"
        initialValue={blogData}
        plugins="code advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount"
        toolbar="undo redo formatselect h1 h2 h3 bold italic underline code backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat help"
        onEditorChange={() => setBlogData(editorRef.current.getContent())}
        init={{
          height: 500,
          menubar: false,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </div>
  );
}

export default memo(Editor);