import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../dtos/user.dto';
import { AgentDto } from '../dtos/become-agent.dto';
import { Observable, Observer, catchError, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class UserService {
    agentDto: AgentDto;
    currentUserDto: UserDto = new UserDto();
    private isAgent = false;
    localStorage: Storage;

    constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { 
        this.localStorage = document.defaultView?.localStorage;
    }  

    getCurrentUser() {
      return this.http.get<UserDto>('api/User/currentData').subscribe(e => this.currentUserDto = e);
    }

    getAll() {
        return this.http.get<UserDto[]>('http://localhost:19999/api/User/All');
    }

    getAgentDetails(id: number): Observable<AgentDto> {
        return this.http.get<AgentDto>(`http://localhost:19999/api/User/${id}`);
    }  

    becomeAgent(agent: AgentDto) : Observable<AgentDto>{
        const token = this.localStorage.getItem('access_token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
        return this.http.put<AgentDto>('http://localhost:19999/api/User', agent, { headers: headers })
    }
}