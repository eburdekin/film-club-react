[Server repo here](https://github.com/eburdekin/film-club-server)

## Film Club

### How to join

hosted URL for demo will be here.

### Features

#### Frontend

animated screenshot demo will be here.

- React app with nested layout
- Tailwind CSS - fully responsive - dark mode / "theatre mode"
- useContext hook for user state
- Navbar, loading animation controlled by global user state
- Modals for user data entry

Access map will be here.

#### Backend

![dbdiagram](/public/dbdiagram.png)

User role map will be here.

- Flask app
- SQLite for development, will be PostgreSQL for deployment
- SQLAlchemy
- Bcrypt for password hashing
- Manually built user/moderator/admin roles
- Marshmallow for serialization and validation

### Goals & lessons learned

- Python object relationships
- User authentication, user/moderator/admin roles - didn't use Flask-User because latest version was yanked
- Connecting API CRUD routes to front-end routes
- Translating backend error messages to frontend errors/alerts
