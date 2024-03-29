import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { catchError, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { AgentDetailsDto } from "../../dtos/agent-details.dto";
import { RegionEnumLocalization } from "../../../enums/region-enum";
import { CarService } from "../../../car/service/car.service";

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css'],
})

export class AgentDetailsComponent implements OnInit {
  agentDetails: AgentDetailsDto = new AgentDetailsDto();
  loadingData = false;
  showCars = false;
  regionEnumLocalization = RegionEnumLocalization;
  constructor(private route: ActivatedRoute, private userService: UserService, public carService: CarService) {}

  onAgentDetails(): void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.userService.getAgentDetails(id)
    .pipe(
             catchError((err: HttpErrorResponse) => {
                this.loadingData = false;
                return throwError(() => err);
            })
          )
    .subscribe((agentDetails: AgentDetailsDto) => {
      this.agentDetails = agentDetails;
      this.loadingData = false;
    });
  }

  ngOnInit(): void {
    this.loadingData = true;
    this.onAgentDetails();
  }
}
