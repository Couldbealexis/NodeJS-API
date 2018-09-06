# Node JS RestAPI
This is a simple, just for fun, RestAPI write in nodejs.
This project use:

- Node JS.
- Express.
- MongoDB.
- JWT.

### RoadMap ###

- [x] Login.
- [x] Different user types.
- [x] Admin capabilities.
- [x] Registered User capabilities.
- [x] Routes for Everyone.
- [x] CRUD Products.
- [x] CRUD Users.
- [x] Sortable Products (Name).
- [x] Sortable Products (Likes).
- [x] Pagination Functionality.
- [x] Search Functionality.
- [x] User like a product.
- [x] User buy a product.
- [x] Log of all the buys.
- [x] Set up env
- [ ] Make tests
- [ ] Deploy on Heroku

### Product data structure

	{
	    id: int,
	    name: string,
	    stock: int,
	    price: int,
	    likes: int,
	    last_update: date
	}

**Admin Users**

-   Can Add|Delete products.
-   Can modify price of the products.

**Registered Users**

-   Can buy a product.
-   Can like a product.

**Everyone**

-   Can get a list of all the products.
-   Can use the search feature.