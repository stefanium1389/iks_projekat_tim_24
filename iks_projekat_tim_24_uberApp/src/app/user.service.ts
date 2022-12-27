import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({
    providedIn:'root'
})
export class UserService {

    private user: User;

    constructor(){}

    getUser(): User {
        return this.user;
    }
    setUser(user: User) {
        this.user = user;
    }
    getRole(): string {
        return this.user.role;
    }
}