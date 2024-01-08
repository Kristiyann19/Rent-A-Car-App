import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AgentDto } from "../dtos/become-agent.dto";
import { UserService } from "../service/user.service";
import { catchError, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css'],
})

export class AgentDetailsComponent implements OnInit {
  agent: AgentDto = new AgentDto();
  loadingData = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  onAgentDetails(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.userService.getAgentDetails(id)
    .pipe(
             catchError((err: HttpErrorResponse) => {
                this.loadingData = false;
                return throwError(() => err);
            })
          )
    .subscribe((agent: AgentDto) => {
      debugger
      this.agent = agent;
      this.loadingData = false;
    });
  }

  ngOnInit(): void {
    this.loadingData = true;
    this.onAgentDetails();
  }
}
