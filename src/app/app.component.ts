import { Component, OnDestroy } from '@angular/core';
import { FetchService, Users } from './fetch.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ FetchService ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'LunchOut';

  users = [];

  filteredVenues = [];

  selectedUsers = false;

  // Fetch the original list of users and add an 'isActive' key - value pair.
  private originalUsers = this.fetchService.getUsers()
      .pipe(map(userArray => {
        userArray.map(user => {
          // Make the drinks array to lower case to compare data
          user.drinks = user.drinks.map(drink => drink.toLowerCase());
          user['isActive'] = false;
        });
        return userArray;
      }))
      .subscribe(response => this.users = response);

  // Fetch the list of venues, and add active state and reason to reject.
  private venues = this.fetchService.getVenues()
      .pipe(map(venueArray => {
        venueArray.map(venue => {
          // Make the drinks array to lower case to compare data
          venue.drinks = venue.drinks.map(drink => drink.toLowerCase());
          venue['isActive'] = true;
          venue['foodReason'] = '';
          venue['drinkReason'] = '';
        });
        return venueArray;
      }))
      .subscribe(response => this.filteredVenues = response);


  constructor(private fetchService: FetchService) {}

  // Toggle the selected user isActive state
  selectedUser(name: string) {
    const index = this.users.findIndex(user => user.name === name);
    this.users[index].isActive = !this.users[index].isActive;

    this.filterUser();
  }

  private filterUser() {
    this.selectedUsers = false;
    let foodsToAvoid = [];
    let mustHaveDrinks = [];

    // Loop throught the users and create a Array of food to avoid and drinks
    // to have.
    this.users.map(user => {
      if (user.isActive) {
        foodsToAvoid.push(...user.wont_eat);
        mustHaveDrinks.push(...user.drinks);

        this.selectedUsers = true;
      }
    });

    // Remove duplicates from the arrays
    foodsToAvoid = [...new Set(foodsToAvoid)];
    mustHaveDrinks = [...new Set(mustHaveDrinks)];

    // Loop though the venues and the users and map the rejection reasons for
    // every discarded venue.
    this.filteredVenues.map(venue => {
      const userWontEat = [];
      const userNothingToDrink = [];
      venue.foodReason = '';
      venue.drinkReason = '';

      this.users.map(user => {
        if (!user.isActive) {
          return;
        }

        const avoidFood = user.wont_eat.some(
            food => venue.food.includes(food));
        const hasDrink = user.drinks.some(
            value => venue.drinks.includes(value));

        if (avoidFood) {
          userWontEat.push(user.name);
        }

        if (!hasDrink) {
          userNothingToDrink.push(user.name);
        }
      });

      if (userWontEat.length) {
        const userWontEatString = userWontEat.join(', ');
        venue.foodReason = `nothing for ${userWontEatString} to eat`;
      }

      if (userNothingToDrink.length) {
        const userNothingToDrinkString = userNothingToDrink.join(', ');
        venue.drinkReason =
            `nothing for ${userNothingToDrinkString} to drink`;
      }

      venue.isActive = (userWontEat.length || userNothingToDrink.length)
          ? false : true;
    });
  }

  ngOnDestroy() {
    this.originalUsers.unsubscribe();
    this.venues.unsubscribe();
  }
}
