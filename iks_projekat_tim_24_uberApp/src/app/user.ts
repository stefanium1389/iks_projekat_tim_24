export interface User {
    id: number;
    role: string;
    sub: string;
}

export const defaultPicture: string = "data:image/jpeg;base64,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";