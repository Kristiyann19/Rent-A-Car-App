import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../dtos/user.dto';
import { AgentDto } from '../dtos/become-agent.dto';
import { Observable } from 'rxjs';
import { IncomingMessage } from 'http';

@Injectable({ providedIn: 'root' })
export class UserService {

    agentDto: AgentDto;
    currentUserDto: UserDto;
    private isAgent = false;

    constructor(private http: HttpClient) { }  

    
    getCurrentUser(){
        return this.http.get<UserDto>('http://localhost:19999/api/User');
    }

    
    setIsAgent(status: boolean): void {
          this.isAgent = status;
      }

      getIsAgent(): boolean {
        return this.isAgent; // Get the logged-in status
      }

    getAll() {
        return this.http.get<UserDto[]>('http://localhost:19999/api/User/All');
    }

    getAgentDetails(id: number): Observable<AgentDto> {
        return this.http.get<AgentDto>(`http://localhost:19999/api/User/${id}`);
      }  

    becomeAgent(agent: AgentDto) : Observable<AgentDto>{
        const token = localStorage.getItem('access_token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
        return this.http.put<AgentDto>('http://localhost:19999/api/User', agent, { headers: headers })
    }
}