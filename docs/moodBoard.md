

**Pics or It didn't Happen** 

<h1> Official MoodBoard for Reveal </h1>


### Technologies Used ###

```
- Node JS - Express
- Multer 
- Sharp
- TypeScript
- YAML
- MarkDown
- Jest

```


### Endpoint Structure ###

Reveal API favors a clean design for endpoints with a focus on developer accessibility. The ``imageRouter`` acts as middleware for all image routes; featuring resizing, grayscale, rotation and more. This approach ensures each action is isolated, along with controllers specifically built for it - a masterclass in flexibility for REST APIs.

- image/resize
- image/grayscale
- image/rotate

Future endpoints will follow the same approach as the project grows.






### Prompts ###


- What image processing client you’ll leverage. Sharp appears to be the most popular, but there are also the likes of Jimp.

- How will you architect your API to be ergonomic and organized for the user? Throughout this project, I expect proper, conventional use of HTTP methods and accurate   response codes (i.e., using 200/201/202/204 when appropriate, not just 200 for everything).

- You’ll have to decide if you want an endpoint for each type of manipulation vs. one endpoint for all manipulations vs. something else. How will users provide details? Will you use path parameters, query parameters, or accept a JSON body?

- How will users upload images, and how will you return them? Multipart/form-data or base64 encoded string?

- Where will you host this service? I can’t test this if it only lives on localhost. Pick something with a generous free tier to host APIs and some storage.

**Responses**

- We've opten with Sharp over JIMP due to a much sexier docs website and super accessible documentation structure

- Utilizing status codes 201 for successfull manipulations and 400 for errors. So far, separate endpoints are used for each different manipulation option, with the general intention of making it easier to map different buttons to each endpoint on the client-side

- So far, users will provide details via JSON Body, in future updates, the api will support path and query parameters for certain specific use cases

- For this initial/noob iteration, users will upload images as multi-part/form-data and the api will return them as multipart/form-data

- This service will be hosted on AWS or Vercel or Netlify



### Part 2 Prompts ###

TBD






**Part 2 Choices**

TBU



### Bug Reports and Errors  ###

- Had to figure out general Node JS Backend Structure
- Dealt with Typescript versioning Bug with Express
- Ran into HTTP bug when using the next() function incorrectly 
- Ran into HTTP errors when attempting to perform a response action after ending the HTTP process
- Ran into clarity issues when thinking about path relativity and absoluteness



