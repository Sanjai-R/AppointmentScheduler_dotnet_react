# Appointment Scheduler

Appointment Scheduler is a web-based software application developed in ASP.NET and various other technologies of .NET. The project aims at managing daily appointments in companies, enterprises, and businesses. It is targeted for people such as business professionals, employees, officers, etc. who need to keep a record of all daily meetings; this online web software helps in effective management of their time.

## About Appointment Scheduler Project:

In ASP.NET Appointment Scheduler, users are required to register into the system with an application. Then, they can add, edit and update the appointment schedules after registration. The entire system works all around the world, provided there is internet service.

Optional Feature: It includes adding a notifications feature by which SMS can be sent about upcoming appointment's date and time. Being a web-based project, Appointment Scheduler System allows registered users to store appointments in the web page of this project. This application uses various technologies of .NET such as ASP.NET, C# coding language, SQL Server, and uses stored procedures. ADO.NET is used to access the system database and all database manipulations are performed with stored procedures. The main aim of Appointment Scheduler is to help in appointment management, effective time management, and keeping track of meetings. Adding, searching, modifying, and deleting appointments are the main tasks involved in this system.

## Features:

The key features of this proposed project are listed below. Many new features can be added into the system to make it more enhanced.

- User Registration cum Login/Logout
- Change password and password recovery facilities
- Add new appointments
- View list of all appointments
- Optional: Search for appointments
- Optional: List all upcoming/future appointments by date
- Optional: View list of users in Appointment Scheduler System
- Optional: Modify existing appointment details
- Optional: Delete existing/upcoming appointments (edited)

## Database Design:

The database design for the Appointment Scheduler system can include the following tables:

### Users Table:

This table will store information about registered users such as their user ID, username, password (hashed and salted), email address, contact information, and any other relevant user details.

| Column Name      | Data Type     | Description                                        |
| ---------------- | ------------- | -------------------------------------------------- |
| UserID           | INT           | Primary key that uniquely identifies a user        |
| UserName         | NVARCHAR(255) | Stores the username of the user                    |
| Email            | NVARCHAR(255) | Stores the email address of the user               |
| Password         | NVARCHAR(255) | Stores the password of the user (hashed)           |
| Role             | NVARCHAR(255) | Stores the role of the user                        |
| RecoveryQuestion | NVARCHAR(255) | Stores the recovery question for password recovery |
| RecoveryAnswer   | NVARCHAR(255) | Stores the recovery answer for password recovery   |

### Appointments Table:

This table will store information about appointments created by users, such as appointment ID, title, description, start and end times, and any other relevant appointment details.

| Column Name   | Data Type     | Description                                                                                                                             |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| APPOINTMENTID | INT           | Identity column serving as the primary key for the table                                                                                |
| TITLE         | NVARCHAR(255) | Stores the title of the appointment                                                                                                     |
| DESCRIPTION   | NVARCHAR(255) | Stores the description of the appointment                                                                                               |
| DATE          | DATE          | Stores the date of the appointment                                                                                                      |
| TIME          | TIME          | Stores the time of the appointment                                                                                                      |
| STATUS        | NVARCHAR(50)  | Stores the status of the appointment                                                                                                    |
| USERID        | INT           | Foreign key that references the USERS.USERID column with CASCADE DELETE constraint, indicating the user associated with the appointment |

### Notifications Table:

This table will store information about notifications sent to users for upcoming appointments, such as notification ID, appointment ID, recipient user ID, notification type, and notification status.

| Column Name        | Data Type | Description                                                                                                                            |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| NotificationID     | int       | Primary key that uniquely identifies a notification                                                                                    |
| AppointmentID      | int       | Foreign key that references the AppointmentID in the Appointments Table, indicating the appointment for which the notification is sent |
| UserID             | int       | Foreign key that references the UserID in the Users Table, indicating the recipient user of the notification                           |
| NotificationType   | varchar   | Stores the type of notification (e.g., SMS, email)                                                                                     |
| NotificationStatus | varchar   | Stores the status of the notification (e.g., sent, pending)                                                                            |

## Conclusion

The Appointment Scheduler system is a web-based application developed in ASP.NET and other .NET technologies that aims to effectively manage daily appointments for businesses, companies, and individuals. It provides features such as user registration, login/logout, password recovery, appointment creation, appointment viewing, and optional features like appointment search, user listing, appointment modification, and deletion. The system uses a database design that includes tables for users, appointments, and notifications. Further enhancements can be made to the system to cater to specific requirements and improve its functionality.
