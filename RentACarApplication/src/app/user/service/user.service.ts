import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../dtos/user.dto';
import { AgentDto } from '../dtos/become-agent.dto';
import { Observable, Observer, catchError, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { AgentDetailsDto } from '../dtos/agent-details.dto';
import { CurrentUserDto } from '../dtos/current-user.dto';
import { UpdateUserDto } from '../dtos/all-property-user.dto';


@Injectable()
export class UserService {
    agentDto: AgentDto;
    currentUserDto: CurrentUserDto = new CurrentUserDto();
    localStorage: Storage;

    constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { 
        this.localStorage = document.defaultView?.localStorage;
    }  

    private apiUrl = 'http://localhost:19999/api/User';

    updateUser(updateUser2: UpdateUserDto){
        return this.http.put(this.apiUrl + '/UpdateAccount', updateUser2);
    }

    getCurrentUser() {
      return this.http.get<CurrentUserDto>(this.apiUrl + '/currentData').subscribe(e => this.currentUserDto = e);
    }

    deleteAccount(){
        return this.http.delete<CurrentUserDto>(this.apiUrl + '/DeleteAccount')
    }

    getAll() {
        return this.http.get<UserDto[]>(this.apiUrl + '/All');
    }

    getAgentDetails(id: number): Observable<AgentDetailsDto> {
        return this.http.get<AgentDetailsDto>(this.apiUrl + `/${id}`);
    }  

    becomeAgent(agent: AgentDto) : Observable<AgentDto>{
        const token = this.localStorage.getItem('access_token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
        return this.http.put<AgentDto>(this.apiUrl, agent, { headers: headers })
    }

    initializeUser(): Promise<{}> {
        return new Promise((resolve) => {
          return this.http
            .get<CurrentUserDto>('api/User/currentData')
            .subscribe((e) => {
              this.currentUserDto = e;
              resolve(true);
            });
        });
      }
}