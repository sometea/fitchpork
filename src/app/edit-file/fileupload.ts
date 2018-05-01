export enum FileType {
    Image = 'Image',
    File = 'File',
}

export class FileUpload {
    title: string;
    filename: string;
    url: string;
    type: FileType;
}

export class FileUploadWithKey {
    key: string;
    file: FileUpload;
}
