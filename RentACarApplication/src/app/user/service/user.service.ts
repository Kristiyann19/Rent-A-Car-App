import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../dtos/user.dto';
import { AgentDto } from '../dtos/become-agent.dto';
import { Observable, Observer, catchError, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AgentDetailsDto } from '../dtos/agent-details.dto';
import { CurrentUserDto } from '../dtos/current-user.dto';

@Injectable()
export class UserService {
    agentDto: AgentDto;
    currentUserDto: CurrentUserDto = new CurrentUserDto();
    private isAgent = false;
    localStorage: Storage;

    constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { 
        this.localStorage = document.defaultView?.localStorage;
    }  

    getCurrentUser() {
      return this.http.get<CurrentUserDto>('api/User/currentData').subscribe(e => this.currentUserDto = e);
    }

    removeCar(){
        return this.http.delete<CurrentUserDto>('http://localhost:19999/api/User/DeleteAccount')
    }

    getAll() {
        return this.http.get<UserDto[]>('http://localhost:19999/api/User/All');
    }

    getAgentDetails(id: number): Observable<AgentDetailsDto> {
        return this.http.get<AgentDetailsDto>(`http://localhost:19999/api/User/${id}`);
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