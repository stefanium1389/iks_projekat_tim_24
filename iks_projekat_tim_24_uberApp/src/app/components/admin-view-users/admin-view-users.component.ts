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

  searchWord : string;
  selectedType = 'both';

  users: UserForCard[] = []/*[{
    userId: 1,
    role: "DRIVER",
    nameAndSurname: "xdbro",
    picture: "data:image/jpeg;base64,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"
  },
 ]*/

  
  constructor(private adminViewingService: AdminViewingService, private router:Router, private passengerService : PassengerDataService, private driverService : DriverDataService) {
    
   }

  ngOnInit(): void {
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
