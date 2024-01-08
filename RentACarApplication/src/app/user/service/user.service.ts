import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../dtos/user.dto';
import { AgentDto } from '../dtos/become-agent.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }


    getAll() {
        return this.http.get<UserDto[]>('http://localhost:19999/api/User');
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