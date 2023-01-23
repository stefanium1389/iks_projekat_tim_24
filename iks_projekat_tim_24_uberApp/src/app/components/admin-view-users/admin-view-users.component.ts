import { Component, OnInit } from '@angular/core';
import { AdminViewingService } from 'src/app/services/admin-viewing.service';
import { UserForCard } from '../profile-card/profile-card.component';
import { Router } from '@angular/router';
import { PassengerDataService } from 'src/app/backend-services/passenger-data.service';
import { DriverDataService } from 'src/app/backend-services/driver-data-service.service';
import { DTOList } from 'src/app/backend-services/DTO/DTOList';
import { UserCardDTO } from 'src/app/backend-services/DTO/UserDTO';

@Component({
  selector: 'app-admin-view-users',
  templateUrl: './admin-view-users.component.html',
  styleUrls: ['./admin-view-users.component.css']
})
export class AdminViewUsersComponent implements OnInit {

  searchWord : string = "";
  selectedType: string = 'both';

  users: UserForCard[] = [];

  constructor(private adminViewingService: AdminViewingService, private router:Router, private passengerService : PassengerDataService, private driverService : DriverDataService) {
    
   }

  ngOnInit(): void {
    this.onTypeChanged();
  }

  onUserClicked(user: UserForCard) {
    this.adminViewingService.setAdminViewing(user.role, user.userId);
    if (user.role === "DRIVER")
    {
      //this.router.navigate(['/admin-view-user']);
    }
    else if (user.role ==="USER")
    {
      //this.router.navigate(['/admin-view-driver']);
    }
    else
    {
      throw new Error ("greška u pronalaženju uloga!");
    }
    
  }

  handleResult(result:DTOList<UserCardDTO>)
  {
    let usersForCard = [];
      for (let card of result.results)
      {
        
        let user: UserForCard =
        {
          userId: card.id,
          role: card.role,
          nameAndSurname: card.name + " " + card.surname,
          picture: card.profilePicture
        }
        usersForCard.push(user);
        
      }
      this.users = usersForCard;
  }

  onTypeChanged() {
    if (this.selectedType!=="both" && this.selectedType!=="drivers" && this.selectedType!=="passengers")
    {
      throw new Error ("greška u odabiru tipa korisnika!");
    }

    if (this.searchWord==="" && this.selectedType==="both")
    {
      this.passengerService.getAllUsers().subscribe(
        { next: (result) => 
          {
            this.handleResult(result);
          },
          error: (error) =>
          {
            alert(error);
          }
        }
      );
    }

    else if (this.searchWord!=="" && this.selectedType ==="both")
    {
      this.passengerService.searchAll(this.searchWord).subscribe(
        { next: (result) => 
          {
            this.handleResult(result);
          },
          error: (error) =>
          {
            alert(error);
          }
        }
      );
    }

    else if (this.searchWord==="" && (this.selectedType!=="both"))
    {
      if (this.selectedType ==="drivers")
      {
        this.driverService.searchDrivers(" ").subscribe(
          { next: (result) => 
            {
              this.handleResult(result);
            },
            error: (error) =>
            {
              alert(error);
            }
          }
        );
      }
      if (this.selectedType ==="passengers")
      {
        this.passengerService.searchPassengers(" ").subscribe(
          { next: (result) => 
            {
              this.handleResult(result);
            },
            error: (error) =>
            {
              alert(error);
            }
          }
        );
      }
      
    }
    else if (this.searchWord!=="" && this.selectedType!=="both")
    {
      if (this.selectedType ==="drivers")
      {
        this.driverService.searchDrivers(this.searchWord).subscribe(
          { next: (result) => 
            {
              this.handleResult(result);
            },
            error: (error) =>
            {
              alert(error);
            }
          }
        );
      }
      if (this.selectedType ==="passengers")
      {
        this.passengerService.searchPassengers(this.searchWord).subscribe(
          { next: (result) => 
            {
              this.handleResult(result);
            },
            error: (error) =>
            {
              alert(error);
            }
          }
        );
      }
      
    }
    

  }

}
