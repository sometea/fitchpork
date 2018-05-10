export enum FileType {
    Image = 'image',
    File = 'file',
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
