## API Design, Architecture and Implementation ##


Hey there!

In this document, I'll be detailing my approach to implementing each feature in the challenge list - along with explain underlying architecture choices and diving deeper into API design models as I learn them.

The general structure of this report will be a standard header/topic list for each feature - explaining the technologies required for that feature, the choices made in implementing them and the test cases I've come up with for that particular feature.

## Feature One - A working Node JS Server ##

The first part of building this project involved rolling out a quick server with express. To get this going, I opted for typescript, imported the express router ``middleware?`` and implemented a listener with ``app.listen``. 


## Setting up Basic Routes ##

As previously stated in feature one, our express router is in charge of listening to a http request from a client based on a target endpoint on the server. 

We can create multiple router instances for ``parent`` routes and an easier flow with nested routing.

``const imageRouter = express.Router();``

Then specify parent route
```app.use("/image", imageRouter);```

And implement children/nested routes

```imageRouter.post("/resize", upload.single("photo"), resizePhoto);```

This approach ensures we can separate routing implementation to parts of our app with related features - /Image/image-routes/image-routes.ts






## Swagger Spec ##






## Image Processing - Implementing image rotation ##







## Setting Up MongoDB with Mongoose ##








## Creating Test Cases, the Three As of Testing ##








## Refactoring For MVC Architecture ##









## Implementing Part One ##