Part 1: The Horizontals

So you've created the MVP (minimum viable product) for your API and shared it with some friends. However, they keep comparing it to what Google Photos can do - where you can do some filters, but it also allows users to store images and upload/download/manipulate them at will. You agree that image storage should be the next logical step for your API (Hopefully, you picked a service host provider that integrates nicely with a storage product with a generous free tier).

You will create a few more endpoints/options for your API service for this task. Users should be able to

    Upload an image to be stored,
    Get a list of images stored (the image name/id, not the actual image),
    Download an image by name/id,
    Perform a supported manipulation on a stored image (specified by image name/id) and return the manipulated image. Brownie points if you allow the user to save an uploaded copy of the manipulated image.

Of course, since you now have a user base, you'll also need a database and a way to authenticate users' requests. In this task, you'll also have a user sign-up endpoint. For now, you'll only support username+password authentication. Feel free to enforce whatever validations you'd like (i.e., all usernames must be unique, a minimum length for passwords, etc.). You can also have the sign-up API optionally collect useful personal information like name, DOB, location. Before storing the username and password in a DB, you should first salt and hash it. All APIs (including those from the previous task) will now be protected routes (requiring auth). Since we're making a REST API service, we won't have the idea of a user session. Instead, the user will pass authentication headers with each request. The header should be in a form where the key is auth, and the value is a base64 encoded username;password.

    Note: This is not a sufficient or advised approach for authenticating. This approach is structured explicitly as a teaching goal to give some experience with salting, hashing, encryption, and encoding. Later on, we will implement a better auth story.

Questions to consider:

    Does your existing API design structure support this expansion in a smooth way that makes sense to a consumer of the API?
    Would it be smoother to have one upload/download/delete endpoint and use the correct HTTP method to differentiate?
    What hashing function/library should you use? Do efficiency considerations of the hashing algorithm change, given you'll have to perform encryption on a per request basis?
    What database type meets your needs now and potentially in the future? How do you design/structure data you're hoping to store?
    Does it make sense to collect some personal info from the client at this point? What data is necessary? What data is useful?
    Do you need to limit the total available storage of a given user?

At the end of part 1, you should deliver:

    The new endpoints specified above enable users to upload, download, store, and manipulate images.
    A user login endpoint
    A database to hold details (plus schema, if necessary)
    Storage solution to host images
