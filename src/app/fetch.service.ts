import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Users {
  drinks: string[];
  name: string;
  wont_eat: string[];
}

export interface Venue {
  drinks: string[];
  food: string[];
  name: string;
}

const USERS_ENDPOINT = 'https://gist.githubusercontent.com/benjambles/ea36b76bc5d8ff09a51def54f6ebd0cb/raw/7332cda51d074dd9a434c4a858e5f5ef6e294d95/users.json';
const VENUES_ENDPOINT = 'https://gist.githubusercontent.com/benjambles/ea36b76bc5d8ff09a51def54f6ebd0cb/raw/7332cda51d074dd9a434c4a858e5f5ef6e294d95/venues.json';


@Injectable()
export class FetchService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Users[]>(USERS_ENDPOINT);
  }

  getVenues() {
    return this.http.get<Venue[]>(VENUES_ENDPOINT);
  }
}
