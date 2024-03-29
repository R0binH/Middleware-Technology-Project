# Node.js, Express, EJS & MongoDB- Shoppinglist - CRUD

## Project Description
This project involves the creation of a shopping list. The following technologies were used:

- **Frontend:** HTML, CSS
- **Backend:** Node.js Express Server and EJS (Embedded JavaScript)
- **Persistent Data Storage:** MongoDB
- **Container**ization with [Docker](https://www.docker.com/get-started/)

The application was created with reference to Raddy's tutorial (BUT ITS MY OWN WORK, NO REPO CLONED!): 

- Repository: [https://github.com/RaddyTheBrand/25.NodeJs-Express-EJS-MongoDB--Blog/tree/main](https://github.com/RaddyTheBrand/25.NodeJs-Express-EJS-MongoDB--Blog/tree/main)https://github.com/RaddyTheBrand/25.NodeJs-Express-EJS-MongoDB--Blog/tree/main
- YouTube Playlist: [https://www.youtube.com/watch?v=-foo92lFIto&amp;list=PL4cUxeGkcC9hAJ-ARcYq_z6lDZV7kT1xD&amp;index=1](https://www.youtube.com/watch?v=-foo92lFIto&amp;list=PL4cUxeGkcC9hAJ-ARcYq_z6lDZV7kT1xD&amp;index=1)


## Getting started:

### You need:
- Install [Docker](https://www.docker.com/get-started/) and run a Docker daemon (server)
- Database [(MongoDB) Free Cluster](https://www.mongodb.com/de-de/cloud/atlas/register)
  - Create a new free cluster when you are logged in into [MongoDB Atlas](https://account.mongodb.com/account/login).
  - Click on *Connect* and choose *MongoDB for VS Code*.
  - You need the connection string that will be displayed to you at this point:
    ![mongodb4visualstudiocode](294883515-b169bb4a-d869-420c-a4c0-ffd6785cb298.png)
  - Copy the connection string and store it in the *.env*-file which you have to create first (see next section). 

### Create *.env* file
Create a *.env* file to store your MongoDB connection string credentials. Paste here the string copied in the previous step. Example below:

`MONGODB_URI=mongodb+srv://<username>:<password>@clusterName.xxxxxxx.mongodb.net/shoppinglist`


### Installation

To install and run this project you have to create an Docker-Image:

```batch
docker build -t shoppinglist .
```

Now you can use the image and run it.

Therefore there are two options:
- ```batch
  docker run -p 5000:5000 shoppinglist
  ```

or

- ```batch
  docker-compose up
  ```


You can reach the application on port 5000: [http://localhost:5000/](http://localhost:5000/)

___

*last updated: 17. Jan. 2024*
