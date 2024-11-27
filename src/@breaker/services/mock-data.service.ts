import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  // Mock data for users
  getUsers() {
    return [
      {
        id: '1',
        emails: [
          { email: 'dejesusmichael@mail.org', label: 'Personal' },
          { email: 'michael.dejesus@vitricomp.io', label: 'Work' },
        ],
        phoneNumbers: [
          { country: 'usa', phoneNumber: '984 531 2468', label: 'Mobile' },
          { country: 'usa', phoneNumber: '806 470 2693', label: 'Work' },
        ],
        addresses: [
          {
            label: 'Business',
            addressLine1: '101 Test Street',
            addressLine2: 'Unit #201',
            city: 'Springfield',
            state: 'IL',
            zip: '62704',
          },
          {
            label: 'Home',
            addressLine1: '789 Pine St',
            addressLine2: '',
            city: 'Dallas',
            state: 'TX',
            zip: '75201',
          },
        ],
        title: 'Track Service Worker',
        company: 'Vitricomp',
      },
      {
        id: '2',
        emails: [
          { email: 'jane.smith@gmail.com', label: 'Personal' },
          { email: 'jane.smith@techsolutions.com', label: 'Work' },
        ],
        phoneNumbers: [
          { country: 'usa', phoneNumber: '321 654 0987', label: 'Mobile' },
          { country: 'usa', phoneNumber: '789 012 3456', label: 'Work' },
        ],
        addresses: [
          {
            label: 'Business',
            addressLine1: '456 Oak Street',
            addressLine2: 'Suite 300',
            city: 'Austin',
            state: 'TX',
            zip: '73301',
          },
          {
            label: 'Home',
            addressLine1: '123 Maple St',
            addressLine2: '',
            city: 'Chicago',
            state: 'IL',
            zip: '60601',
          },
        ],
        title: 'Software Engineer',
        company: 'Tech Solutions',
      },
    ];
  }
}
