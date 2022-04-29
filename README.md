## Summary of Work Completed:

I only added the /export route to the admin service. 

I got caught out trying to send the data over to the investments service in csv format.

I have listed the work I'd do to complete the assigment below.

I was going to fork the github project and noticed that there are solutions from other candidates. 
I didn't think it was ethical to look at these before tackling the project.

From a personal perspective and growth, if there's an ideal response to this test, I'd be interested in viewing it.


## Time Allocation:

I spent 15 mins downloading and getting the systems to work

I spent 10 mins commiting source-code changes

I spent 15 mins going understanding the requirements

I spent 20 mins going though, understanding the system

I spent one hour working out how to post the csv and then trying to send a csv stream from memory

I spent one and a half hours thinking about and answering the questions below

Total time ~3 hours


## Break-down of work to complete the assignment:

In order to complete the test requirements I would break down the work as following,

Admin reads and caches the financial-companies data from the financial-companies service (assuming memory isn't an issue) (1)

Admin then iterates through the investments service data, (2)

- for each user, iterate their holdings, (3)
  - for each holding (4)
    - append or stream a csv line containing, (5)
      - userId, (6)
      - firstName, (7)
      - lastName, (8)
      - date, (9)
      - holding (look-up from the financial-companies service, either in memory or query) (10)
      - value (which is investmentTotal * investmentPercentage) (11)

The results are streamed to a file as a cache or held in memory and that data is posted to the /export route of the investments service (12)



## Responses to questions

### 1. How might you make this service more secure?

   - Store data in a database

   - Holdings should be seprate from the user identifible data

   - Services shouldn't be publically accessable

   - Can't run global query to pull all the data

   - Logging of queries

   - Monitoring of queries

   - Permission based access



### 2. How would you make this solution scale to millions of records?

You don't want to be doing any heavy processing directly from an users actions via the website.

a. Implement some sort of batch processing for the more complicated queries

This would process only users data where the investmentTotal or investmentPercentage is changed and their investmentValue needs recalculating.

This processing this can be scheduled via a queue or a seperate machine or set of machines.

If queried/changed directly by the user, add that user processing to a queue to have their data reprocessed.


b. Use the power of stored procedures to calculate the variable data so leaving the heavy work to a sql database


c. Master, slave archeture to make sure there are enough available servers for quering the data.


d. Data would be held in a sql or noSQL database depending on querying



### 3. What else would you have liked to improve given more time?

- Update code to use latest javascript standards, e.g. async/await

- Written some tests

- Update Libraries

- Containerise the solution

# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the report to be sent as csv text
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Deliverables
**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?
    2. How would you make this solution scale to millions of records?
    3. What else would you have liked to improve given more time?
  

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
