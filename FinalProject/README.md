# Final Report

## Members and Contributions

-   Matthew Chanda - cachine, pwa, project pitch, frontend & backend connection, worked with the YELP API, setting up and managing Docker
-   Rose Xiao - set up the db, implemented some REST API's (favorites/add/remove), readme reports, video submissions, wireframe
-   Mari Kilgus - caching, pwa, authentication, implemented some REST API's (login/register/logout), wireframe

### Authentication & Authorization Process

-   What works (description of your features) and what doesn't work (any known issues)
    The Login page allows user to authenticate successfully, the Signup option will create a user in the database, and the Generate button utilizes the YELP API to generate some restaurants, and the user can successfully Logout. The offline features give users the ability to login and view their favorites.

-   A brief description of your authentication and authorization processes. What techniques are you using? What data is being stored where and how? How are you making sure users only access what they are allowed to?
    We decided to do a JWT Tokens to verify our users. In addition, we also incoporated a middleware on the backend endpoints to verify the token is valid as well. In addtion, how we know that the users are allowed to access certain routes on the React frontend is that we send a request to grab the information. If we get any errors, we simply go back to the login page. In terms of data that's being stored, it's email, username, and id of the user which is embedded in the token itself that we can decode in the middleware.

-   A description of your caching strategy and why you chose it
    We are utilizing the Network-First strategy where we try to query network. If the network fails, we return the cached response for /api/offline endpoints. If not cached and fetched failed, we will return graceful error.

### ER Diagram of Our DB

![ER](https://github.ncsu.edu/engr-csc342/csc342-2023Spring-groupR/blob/main/Milestone2/ER.png)

### Tasks

| Tasks                         | Completion |
| :---------------------------- | :--------: |
| Setting up containers         |    100%    |
| REST API sketch               |    100%    |
| Front end first pass          |    100%    |
| Front end first pass (mobile) |    100%    |
| Authentication                |    100%    |
| Generate filters/popup        |    100%    |
| Linking to backend            |    100%    |
| Consistent Styling            |    100%    |

### Upcoming Iteration Tasks to be Completed

-   Make pins for map
-   Fix some styling issues
-   Add/remove favorites on the frontend & backent
-   Check in with mobile version

### Frontend

| Pages       | Status | Wireframe                                                                                                                                                                                                                                                               |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Login       | 100%   | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Spring-groupR/blob/main/Proposal/wireframes/Login.jpg)                                                                                                                                                       |
| Sign up     | 100%   | [wireframe](https://github.ncsu.edu/engr-csc342/csc342-2023Spring-groupR/blob/main/Proposal/wireframes/Signup.png)                                                                                                                                                      |
| Generate    | 100%   | [wireframe]()                                                                                                                                                                                                                                                           |
| Restaurants | 100%   | [wireframe (web)](https://github.ncsu.edu/engr-csc342/csc342-2023Spring-groupR/blob/main/Proposal/wireframes/Restaurant-web.png) [wireframe (mobile)](https://github.ncsu.edu/engr-csc342/csc342-2023Spring-groupR/blob/main/Proposal/wireframes/Suggestion-mobile.png) |
| Favorites   | 100%   | [wireframe (web)](https://github.ncsu.edu/engr-csc342/csc342-2023Spring-groupR/blob/main/Proposal/wireframes/Favorites.png) [wireframe (mobile)](https://github.ncsu.edu/engr-csc342/csc342-2023Spring-groupR/blob/main/Proposal/wireframes/Favoriites-mobile.png)      |
| Account     | 100%   | [wireframe (mobile)](https://github.ncsu.edu/engr-csc342/csc342-2023Spring-groupR/blob/main/Proposal/wireframes/Account-mobile.png)                                                                                                                                     |

### Backend - List of API endpoints

| Method | Route        | Description                                                |
| ------ | ------------ | ---------------------------------------------------------- |
| `POST` | `/login`     | Receives the user's email and username if found in the db  |
| `POST` | `/register`  | Creates a new user account and returns the new user object |
| `GET`  | `/users`     | Retrieves an array of all active users in the system       |
| `POST` | `/food`      | Retrieves list of restaurants from the YELP API            |
| `POST` | `/logout`    | Logging the user out and clearing the cookies              |
| `POST` | `/favorites` | Retrieves all favorites of the logged in user              |
| `POST` | `/add`       | Adds a restaurant to a user's list of favorites            |
| `POST` | `/remove`    | Removes a restaurant to a user's list of favorites         |

-   Yelp API to filter restaurants by cuisine and distance
-   React
-   SQLlite for database
