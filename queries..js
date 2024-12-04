  // insert mamy users after I added myself the first time manually in the document 
  db.users.insertMany([
    { username: "Alice", email: "alice@example.com" },
    { username: "Bob", email: "bob@example.com" },
    { username: "Charlie", email: "charlie@example.com" },
    { username: "Diana", email: "diana@example.com" },
    { username: "Eve", email: "eve@example.com" },
  ]);
  
  //Insert 3 top comments (without replies) into the collection comments, associating them with existing users.

  
  
  db.comments.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "parentCommentId",
        foreignField: "_id",
        as: "parentComment",
      },
    },
  ]);
  

  
  db.comments.aggregate([
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "parentCommentId",
        as: "childComment",
      },
    },
    {
      $match: {
        childComment: { $ne: [] },
      },
    },
  ]);