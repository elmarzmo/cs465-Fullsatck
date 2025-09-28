import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';
import { TripData } from '../services/trip-data';
import { User } from '../models/user';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit{
  @Input('trip') trip: any;

  constructor(private router: Router,
    private authentication: Authentication,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public isLoggedIn()
  {
    return this.authentication.isLoggedIn();
  }

  public isFavorite(): boolean {
    if (!this.authentication.isLoggedIn()) return false;
    const userId = this.authentication.getCurrentUser()?._id;
    return this.trip.favorites?.includes(userId);
  }

  public toggleFavorite() {
    const userId = this.authentication.getCurrentUser()?._id;
    if (!userId) return;

    if (this.isFavorite()) {
      this.tripData.removeFavorite(this.trip.code).subscribe({
        next: (res) => {
        this.trip = res.trip; // backend returns { message, trip }
      },
        error: (err) => console.error(err)
      });
    } else {
      this.tripData.addFavorite(this.trip.code).subscribe({
        next: (res) => {
        this.trip = res.trip;
      },
        error: (err) => console.error(err)
      });
    }
  }

}
