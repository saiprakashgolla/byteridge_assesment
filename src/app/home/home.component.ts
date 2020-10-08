import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html',
// styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    searchUsers: string = '';
    sortingNumber: number = 0;
    filterList = [];
    currentUser: User;
    users = [];
    p: number = 1;
    time:string = "12Hrs";

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe((res:any)=>{
                this.users = res;
                this.filterList = res;
            })
            
            // (users => this.users = users);
            // this.filterList = this.users
    }
    searchRegisteredUsersList() {
    
        console.log(this.searchUsers);
        if (!this.searchUsers) {
          this.searchUsers = ''
        }
          let newUnitsList = this.filterList.filter(element => {
          if (!element.firstName) element.firstName = '';
          if (!element.lastName) element.lastName = '';
          return (element.firstName.toLowerCase().includes(this.searchUsers.toLowerCase()) || element.lastName.toLowerCase().includes(this.searchUsers.toLowerCase()))
        });
      
        this.users = newUnitsList;
        console.log(this.users);
    
      }
      sortByName() {
        if (this.sortingNumber == 0) {
          this.sortingNumber = 1;
          this.sortData(this.users, this.sortingNumber)
        } else if (this.sortingNumber == 1) {
          this.sortingNumber = -1;
          this.sortData(this.users, this.sortingNumber)
        } else {
          this.sortingNumber = 0;
    
        }
      }
      sortData(sortData, numbr) {
        console.log(sortData)
        sortData.sort((a, b) => {
          var nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
          var nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
          if (numbr == 1) {
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
    
            // names must be equal
            return 0;
          }
          else if (numbr == -1) {
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
    
            // names must be equal
            return 0;
          }
          else {
            return 0;
          }
    
        })

    
      }
       getTwentyFourHourTime(time) {
           console.log(time);
           
           this.users.forEach(element => {
              
               if(time == "24Hrs"){
                element.timeChange = {}
             var d = new Date(element.createdDate) ;
             console.log(d.getHours() + ':' + d.getMinutes());
             element.timeChange = d.getHours() + ':' + d.getMinutes()
             
               } else {
                 element.timeChange = ""
               }
           }); 
       
    }
}