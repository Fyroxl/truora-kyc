export interface ImageUploadProps {
    label: string;
    onUpload: (file: File) => void;
}

export interface UploadImageRequest {
    url: string;
    image: File;
}