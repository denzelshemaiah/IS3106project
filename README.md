# About the project
PetSociety is a comprehensive platform for both Pet Parents to search for nearby Pet Sitters. Each Pet Sitter on the platform can offer one service to Pet Parents. Pet Parents can schedule Meet-and-greet sessions or Bookings with Pet Sitters in the area.

# Features
## Customer Portal
### Login
Users log in with their email and password.

### Sign Up
Users will be taken through a 3-step onboarding process where they will first fill up required account creation fields. The second step is to fill in bank account and credit card details. Finally, they will choose whether to become a Pet Parent or Pet Sitter. 

### Profile
(it was supposed to be a part of our system but we literally had the groupmate from hell who didn’t even create this entity)

### Search Sitters
(Function doesn’t work so we [we being Andrea, Cally-Anne, RachelAng] just dynamically rendered list of available sitters to book lmao)

### Bookings
Upon finding a suitable Pet Sitter, clicking on the “Book now” button leads the Pet Parent to make a booking. After indicating necessary information such as the dates, frequency, and message for the booking, the booking will be sent to the Pet Sitter.

When the booking is pending, Pet Parents can cancel or edit the booking while Pet Sitters can Accept or Reject it. Accepted bookings can still be cancelled by Pet Parents free-of-charge more than 3 days before the booking. Subsequently, there will be a penalty of 75% charged to the Pet Parent.

After a booking is accepted, both Pet Sitter and Pet Parent can view the contact details of the other party using the “Contact” button on each booking listing.

### Meet and Greets
If a Pet Parent wants to schedule a meet-and-greet with a Pet Sitter, they can click the “Meet” button which opens a modal. After keying in the meeting date and description, the meet-and-greet request will be sent to the Pet Sitter.

When the request is pending, Pet Parents can still cancel or edit the request. Pet Sitters are only able to Accept or Reject it. Accepted requests can still be cancelled by the Pet Parent and Pet Sitter. Meanwhile, rejected requests can still be edited by Pet Parents, and will be set to be pending again.

After a request is accepted, both Pet Sitter and Pet Parent can view the contact details of the other party using the “Contact” button on each request listing.

### Reports
(it was supposed to be a part of our system but we literally had the groupmate from hell who didn’t even create this entity)

Users can create a report against another user after filling in the report details. The report will then be sent for approval.

### Ratings
(it was supposed to be a part of our system but we literally had the groupmate from hell who didn’t even create this entity)

For an archived booking, users can choose to rate the other party. On each Booking listing, a Rate button will be accessible, which leads them to make a rating. Each party is only allowed to make 1 rating for every booking that they have made.

### Miscellaneous
#### Homepage
Homepage appearance changes based on whether the user is logged in or not logged in.

#### Services Page
Static page showing cards of services available for booking offered on the platform.

#### Help Page
Static page answering the FAQs from both Pet Sitters and Pet Parents.

## Staff Portal
### Login
Staff login with their username and password.

### Create staff
Staff can add another staff member into the database. They will need to fill in the new staff’s details (i.e. First name, last name, username, password).

### Manage Authentication Requests
Staff can view the Authentication Requests submitted from the PetSitter sign up process, and proceed to reject or accept the request after reviewing the information. Upon acceptance, the PetSitter associated with the Authentication Request will have his status changed from ‘PENDING’ to ‘APPROVED’. If rejected, the Pet Sitter’s status remains as ‘PENDING’.

### Manage Reports
Staff can view reports created from the customer portal. After reviewing the report details, the staff will accept or reject the report. If the report is accepted, the user that is reported will have their account status changed to ‘DISABLED’ for 5 days. If the user is already disabled, the number of days disabled will increment by 5 days. Upon rejection of the report, the statuses of the user making the report and the user reported will remain unchanged.

### Manage Users
Staff can search for users based on their UserID, username, email, password, or phone number, and view their account information.

Staff can also manually enable/disable users before their ‘ban period’ is complete, by toggling their status from each individual user page. Users with status ‘PENDING’ cannot be disabled or enabled.


# Setup Instructions
## Customer Portal
Clone down this repository. You will need npm installed globally on your machine.
After cloning, please run the following command to download the required React dependencies from ```package.json```.
```npm install```

### Frontend
To run the project on the frontend, run ```npm start``` in the project directory. 

### Backend
To run the project on the backend, open the project in NetBeans, then create a MySQL database named ‘PetSocietyDB’. Remember to select ‘mysql.sys@localhost’.

Afterwards, start GlassFish Server 5.1.0.

Go back into Projects folder, right-click ‘PetSociety’. Select clean and build, then run.

## Admin Portal
Add the PrimeFaces 10.0 library to your IDE (https://www.primefaces.org/downloads/)
Change the ```img.path``` property in ```config.properties``` to ```[PROJECT_BASE_DIRECTORY]/PetSociety-war/web/img```. ```config.properties``` can be found in ```[PROJECT_BASE_DIRECTORY]/PetSociety-war/web```.

# Tech stack
## Customer Portal:
Frontend: React

Backend: MySQL, JavaEE

## Admin Portal:
Frontend: PrimeFaces 10.0

Backend: MySQL, JavaEE

# Collaborators 
The Committers – [andrealyh319](https://github.com/andrealyh319) [callyanne](https://github.com/callyanne) [rrachelangrq](https://github.com/rrachelangrq)
