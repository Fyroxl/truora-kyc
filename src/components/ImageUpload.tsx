import React from "react";

import { ImageUploadProps } from "../interfaces/imageUpload";

import "./ImageUpload.css";

export default function ImageUpload({ label, onUpload }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      <input
        type="file"
        onChange={handleFileChange}
        className="image-upload-input"
      />
    </div>
  );
}
