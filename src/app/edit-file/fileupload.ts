export class FileUpload {
    title: string;
    filename: string;
    url: string;
}

export class FileUploadWithKey {
    key: string;
    image: FileUpload;
}