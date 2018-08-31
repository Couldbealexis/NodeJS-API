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
- [ ] Sortable Products (Name).
- [ ] Sortable Products (Likes).
- [ ] Pagination Functionality.
- [ ] Search Functionality.
- [x] User like a product.
- [ ] User buy a product.
- [ ] Log of all the buys.

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