  // insert mamy users after I added myself the first time manually in the document 
  db.users.insertMany([
    { username: "Alice", email: "alice@example.com" },
    { username: "Bob", email: "bob@example.com" },
    { username: "Charlie", email: "charlie@example.com" },
    { username: "Diana", email: "diana@example.com" },
    { username: "Eve", email: "eve@example.com" },
  ]);
  
  //Insert 3 top comments (without replies) into the collection comments, associating them with existing users.
  db.comments.insertMany([
    {
      userId: ObjectId("674f5b4b00b0a2faa493a61f"),
      content: "Este es un comentario.",
      createdAt: new Date(),
      parentCommentId: null,
    },
    {
      userId: ObjectId("674f5b4b00b0a2faa493a620"),
      content: "Otro comentario principal.",
      createdAt: new Date(),
      parentCommentId: null,
    },
    {
      userId: ObjectId("674f5b4b00b0a2faa493a621"),
      content: "Un comentario más.",
      createdAt: new Date(),
      parentCommentId: null,
    },
  ]);



//Insert replies for some main comments (threads).

  db.comments.insertMany([
    {
      userId: ObjectId("674f5b4b00b0a2faa493a622"),
      content: "Respuesta al primer comentario.",
      createdAt: new Date(),
      parentCommentId: ObjectId("674f5b4b00b0a2faa493a61f"),
    },
    {
      userId: ObjectId("674f5b4b00b0a2faa493a623"),
      content: "Otra respuesta al primer comentario.",
      createdAt: new Date(),
      parentCommentId: ObjectId("674f5b4b00b0a2faa493a61f"),
    },
  ]);
  
//Make a Consultation with$lookup
//Type a query to get all comments including:
//The user who made the comment.
//If it is a thread, also show the parent comment.



db.comments.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails"
      }
    },
    {
      $lookup: {
        from: "comments",
        localField: "parentCommentId",
        foreignField: "_id",
        as: "parentComment"
      }
    }
  ]);