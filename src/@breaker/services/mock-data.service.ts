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
        firstName: 'Michael',
        lastName: 'Dejesus',
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
        firstName: 'Jane',
        lastName: 'Smith',
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
      {
        id: '3',
        firstName: 'Emily',
        lastName: 'Johnson',
        emails: [
          { email: 'emily.johnson@mail.com', label: 'Personal' },
          { email: 'emily.johnson@globalsoft.com', label: 'Work' },
        ],
        phoneNumbers: [
          { country: 'usa', phoneNumber: '555 123 4567', label: 'Mobile' },
          { country: 'usa', phoneNumber: '555 987 6543', label: 'Work' },
        ],
        addresses: [
          {
            label: 'Business',
            addressLine1: '321 Market Street',
            addressLine2: '',
            city: 'Seattle',
            state: 'WA',
            zip: '98101',
          },
          {
            label: 'Home',
            addressLine1: '654 Pine Avenue',
            addressLine2: '',
            city: 'Tacoma',
            state: 'WA',
            zip: '98402',
          },
        ],
        title: 'Data Analyst',
        company: 'GlobalSoft',
      },
      // Add more users below
      ...Array.from({ length: 17 }).map((_, i) => ({
        id: `${i + 4}`,
        firstName: `TestFirstName${i + 4}`,
        lastName: `TestLastName${i + 4}`,
        emails: [
          { email: `test${i + 4}@personalmail.com`, label: 'Personal' },
          { email: `test${i + 4}@workmail.com`, label: 'Work' },
        ],
        phoneNumbers: [
          { country: 'usa', phoneNumber: `555 000 ${i + 4}00`, label: 'Mobile' },
          { country: 'usa', phoneNumber: `555 000 ${i + 4}01`, label: 'Work' },
        ],
        addresses: [
          {
            label: 'Business',
            addressLine1: `${i + 4} Corporate Blvd`,
            addressLine2: '',
            city: 'SomeCity',
            state: 'CA',
            zip: `90${i + 4}01`,
          },
          {
            label: 'Home',
            addressLine1: `${i + 4} Suburban Ave`,
            addressLine2: '',
            city: 'OtherCity',
            state: 'CA',
            zip: `91${i + 4}02`,
          },
        ],
        title: `Position ${i + 4}`,
        company: `Company ${i + 4}`,
      })),
    ];
  }
}
