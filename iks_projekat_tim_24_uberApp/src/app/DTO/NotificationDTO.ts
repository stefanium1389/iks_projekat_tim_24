import {UserRef} from "./UserRef";


export interface NotificationDTO {
    id: number,
    note: string,
    date: string,
    read: boolean,
    notificationType: string,
    receiver: UserRef,
}