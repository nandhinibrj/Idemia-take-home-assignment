Engineering decides to go ahead and implement the POC for a hotel reservation system. 

As the first iteration,  ENG will create a search and master/detail page with CRUD features.

The following are the requirement
1.	Engineering MUST use Visual Studio Code with React V18 and its React Material for GUI
2.	It needs to use ts and tsx.
3.	Engineering needs to create a search page with search criteria and a result table. (check reservation.json for required data (2 entries))
4.	Engineering needs to create a popup dialog (modal dialog) to display the detail reservation (check GUI.png for UI sketch)
5.	Engineering MUST use the Function Component approach and use hook / State / Context to load 2 entries from reservation.json into memory and manage search logic.
6.	Engineering MUST create relevant component objects to display search criteria, search results, and detail reservations by double-clicking the search result. 
7.	Engineering MUST enhance add/modify/delete functions to provide CRUD for reservation. Please provide some basic form validation for add/modification.  If you choose 3rd lib, please explain the reason.
8.	Engineering MUST use an observable/subscription in the useEffect hook to add a new reservation to the in-memory cache, so the user can query that newly added reservation on the fly. 
9.	Engineering MUST apply the standard React coding style guide throughout the implementation. For example, import order, CamelCase, PascalCase
10.	Engineering MUST create JEST unit test for each component object. We expect at least 80% code coverage. 
11.	Engineering MUST use ESLint to find and address all Lint-related issues. [ADDED, TEST NEEDS TO BE DONE]
12.	Engineering MUST use playwright to do an e2e automation test.
13.	Engineering MUST use GitHub to store the project and use a GitHub CI/CD pipeline to build, run unit tests, run ESLint, and execute the e2e. 
14.	Please forward the GitHub link to us.


  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd idemia-take-home-project
  npm start



  To do
  --------
  1. stop scrolling of main outer layout
  