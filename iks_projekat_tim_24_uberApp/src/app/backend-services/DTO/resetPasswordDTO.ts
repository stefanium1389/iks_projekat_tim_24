export interface PasswordResetRequestDTO {
    email: string;
}
export interface CodeAndPasswordDTO {
    newPassword:string;
    code:string;
}