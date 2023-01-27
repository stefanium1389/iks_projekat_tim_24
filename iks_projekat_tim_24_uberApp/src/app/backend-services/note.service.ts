import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {DTOList} from "./DTO/DTOList";
import {NoteResponseDTO} from "./DTO/NoteResponseDTO";
import {NoteRequestDTO} from "./DTO/NoteRequestDTO";

@Injectable({
    providedIn: 'root'
})
export class NoteService {
    
    constructor(private http:HttpClient) { }
    
    getAllNotesByUserId(userId: number): Observable<DTOList<NoteResponseDTO>>
    {
        return this.http.get<DTOList<NoteResponseDTO>>(environment.apiBaseUrl+`api/user/${userId}/allnotes`);
    }
    
    postNoteByUserId(userId: number, message: string): Observable<any>
    {
        let noteRequestDTO:NoteRequestDTO = {message: message};
        return this.http.post<any>(environment.apiBaseUrl+`api/user/${userId}/note`, noteRequestDTO);
    }
}