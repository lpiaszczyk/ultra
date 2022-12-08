# Interview task
## UI Automation
UI automation task is created using Playwright + TypeScript. It contains couple of tests checking 'Purchase flow'. 
### Test scenarios:
#### Purchase flow can be completed with correct data
1. Login as standard_user (part of global setup)
2. From inventory page add Backpack to Cart
3. Go to cart, check that item is added
4. Proceed with checkout, fill form with postal data
5. Verify prices are calculated as expected
6. Finish checkout and verify that success message is displayed

#### Purchase flow cannot be completed with empty postal data (First Name / Last Name / Postal Code)(splitted into 3 tests)
1. Login as standard_user (part of global setup)
2. Navigate to checkout first step
3. Fill Postal data form leaving one box empty
4. Click continue and verify that error message is displayed

### To run solution:
1. Download necessary packages with `npm i`
2. Run tests with `npx playwright test`
3. Show report with `npx playwright show-report` - this will serve http report on local server
By default test is run concurrently on Google Chrome (chromium), Firefox and Safari (webkit) in headless mode.

## API Automation
Api automation task is created using Postman. Endpoint under test is `https://gorest.co.in/public/v2/users`.
Tests are stored in `postman/` directory.

Test collections included:
DELETE Users/id
GET Users/id
GET Users
PATCH Users/id
POST Users
PUT Users/id

Also environment file is included:
gorest.postman_environment.json

#### Important note!
In environemnt file there is API key included. __This is included only for your convenience and would not be a part of repository outside of interview use case!__ API key would not be included in production repository, instead it would be a secret stored e.g. in CI/CD environment key-value store.

### Collections structure
For clarity test collections for each HTTP verb are divided into subfolders. Notice that not every folder is present in every collection as it may not be neccessary
1. Setup: Setup steps seeding data used in further steps
2. Authorisation: If action needs api key for work, tests in this folder check behaviour for incorrect authorisation
3. Validation: Tests in this folder checks behaviour for incorrect parameters supplied
4. Pagination: Verify pagination behaviour where applies
5. Tests: Positive/happy paths tests, sometimes including additional calls for verification (e.g. verify that GET returns no data after DELETE)

#### Note about data seeding
Notice that data-seed steps are present only when user id is necessary for action. In other cases we assume that database is already filled with data

### Run tests
To run tests simply import all collections and environment files into Postman app and use build in runner. Alternatively, use `newman` runner supplying collection and env file path, e.g.
`newman run postman/GET\ Users-id.postman_collection.json -e postman/gorest.postman_environment.json`