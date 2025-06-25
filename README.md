# cs465-Fullsatck
In our project, we used two types of frontend development:

Express HTML with Handlebars: This was primarily used to serve the initial static layout of the web pages. Handlebars allowed us to inject dynamic content server-side before the page reached the browser, which was particularly useful for rendering admin and customer views quickly and securely.

Single-Page Application (SPA) with JavaScript: On the client side, we used JavaScript to make our application more interactive. By using SPA and fetch API calls, we were able to load and update data dynamically without requiring full page reloads. This improved performance and user experience.

Using a NoSQL MongoDB database on the backend made sense for this project because it offered flexibility with data modeling. The customer and trip information had varying structures, which MongoDB handled well. It also integrated seamlessly with Node.js and provided fast querying for real-time updates.

Functionality
JSON (JavaScript Object Notation) differs from JavaScript in that it is a text-based format used to store and transport data. It is language-independent, although it is based on JavaScript syntax. In this project, JSON played a vital role in connecting the frontend and backend. When the frontend requested or submitted data to the backend, JSON was used as the format to structure those requests and responses.

During the development process, we frequently refactored code to improve readability and maintainability. For example, we modularized route handlers and reused UI components like form inputs and data tables across different views. This made the application more scalable and reduced the risk of bugs, since changes only needed to be made in one place rather than multiple duplicated spots.




Testing
We tested endpoints using tools like Postman and integrated automated tests where possible. For each route (endpoint), we ensured that GET, POST, PUT, and DELETE requests returned the correct data and status codes.

Adding authentication and security layers, such as Passport.js with JWT for admin login, made testing more complex. We had to ensure that secure routes correctly restricted access and returned appropriate errors when authentication failed. This deepened our understanding of middleware functions and role-based access control in Express.js.


Reflection
This course helped me understanding of full stack development and how to build secure, functional web applications from the ground up. I’ve improved my skills in Express, MongoDB, JavaScript, and API design.

I also learned how to structure my code better and using Git and GitHub. These are important skills for working in a real-world development environment. 
