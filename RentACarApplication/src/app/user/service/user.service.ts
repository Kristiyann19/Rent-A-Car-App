import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../dtos/user.dto';
import { AgentDto } from '../dtos/become-agent.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }


    getAll() {
        return this.http.get<UserDto[]>('http://localhost:19999/api/User');
    }

    becomeAgent(agent: AgentDto) : Observable<AgentDto>{
        return this.http.put<AgentDto>('http://localhost:19999/api/User', agent)
    }
}