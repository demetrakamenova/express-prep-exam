Functional Requirements 

The Functionality Requirements describe the functionality that the Application must support. 

Guest (not logged in) 

The application should provide Guest (not logged in) users with the functionality to login, register and view the Home page. 

Users (logged in) 

The application should provide Users (logged in) with the functionality to view all the courses which are listed, course details page of all listed courses and they should be able to enroll in courses. Enrolled in users should be able to see lectures in that course and the Play Video section. Courses can be public or not. Users can access only public courses. 

Database Models (10 pts) 

The Database of the Tutorials application needs to support 2 entities 

User 

Username - string (required), unique 

Password - string (required) 

Enrolled Courses - a collection of Courses  

Course 

Title - string (required), unique 

Description - string (required), max length of 50 symbols, 

Image Url - string (required), 

Is Public - boolean, default - false, 

Created at – Date or String, required 

Users Enrolled - a collection of Users 

Implement the entities with the correct datatypes. 

Application Pages (70 pts) 

Guest Pages (15 pts) 

These are the pages and functionalities, accessible by Guests (logged out users). 

Home Page (logged out user) 

List the top three (3) public courses ordered by the count of enrolled in users in descending order. 
If there are no courses in the database yet, display "No courses..." 

Register a user inside the database with username and password. Both passwords must match! 

Login Page (logged out user) 

User Pages (55 pts) 

These are the templates and functionalities, accessible by Users (logged in users). 

Home Page (logged in user) 

List all public courses sorted in descending order by the created time with a button Details which leads to a course details page. 

Create Course Page (logged in user) 

Enter course title, description, image URL and choose if the course will be public or not. You will receive the value of the checkbox as a string "on" if it's checked or undefined if it's not. You have to convert the received value as Boolean true or false and save the course in the database. 

Logged in Details Page (logged in user) 

In the Details of a course section, you should load course name and description. 

Not Enrolled in Course (logged in user) 

If the user is not enrolled in the course, you should display Enroll button.  

Enrolled in Course (logged in user) 

After the user has enrolled in the course, the "You are already enrolled" span element should be shown instead of the [Enroll] button. 

Course creator (logged in user) 

The creator of the course should see [Delete] [Edit] 

Delete course (logged in user) 

Upon deleting a lecture (clicking over [Delete] button, you should be redirected to the home page. 

Edit course (logged in user) 

All form fields should be filled with the corresponding information of the selected course.

Security Requirements (10 pts) 

The Security Requirements are mainly access requirements. Configurations about which users can access specific functionalities and pages. 

Guest (not logged in) users can access Home page and functionality. 

Guest (not logged in) users can access Login page and functionality. 

Guest (not logged in) users can access Register page and functionality. 

Users (logged in) can access Home page (Listed all Courses)page and functionality. 

Users (logged in) can access Course Details page and functionality. 

Users (not course creator) can Enroll once for the course 

Users (course creator) can Edit and Delete the current course 

Users (logged in) can access Create Course page and functionality. 

Users (logged in) can access Logout functionality. 
