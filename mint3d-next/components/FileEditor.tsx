// components/FileEditor.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

interface FileEditorProps {
  parentAction: () => void;
}

const FileEditor: React.FC<FileEditorProps> = ({
  parentAction,
}: FileEditorProps) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    // Load file from server when component mounts
    axios
      .get("/api/file")
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Error loading file:", error);
      });
  }, []);

  const handleSave = () => {
    // Save file to server
    axios
      .post("/api/file", { content })
      .then((response) => {
        parentAction();
      })
      .catch((error) => {
        console.error("Error saving file:", error);
      });
  };

  return (
    <div className='flex flex-col space-y-4'>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className='w-full p-2 border rounded-lg'
      />
      <button
        onClick={handleSave}
        className='px-4 py-2 bg-blue-500 text-white rounded-lg'
      >
        Save
      </button>
    </div>
  );
};

export default FileEditor;
