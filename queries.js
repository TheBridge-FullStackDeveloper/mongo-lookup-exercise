[
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userComment"
      }
    },
    {
      $unwind: {
        path: "$userComment",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "comments",
        localField: "parentCommentId",
        foreignField: "_id",
        as: "userCommentParent"
      }
    },
    {
      $unwind: {
        path: "$userCommentParent",
        preserveNullAndEmptyArrays: true
      }
    }
  ]


  db["users"].insertOne({
    username: "Pablo",
    email: "pablo@gmail.com"
  });
  

  db["comments"].insertOne({
    userId: ObjectId("674e31b4a72808d79ed460d5"),
    content: "Respuesta al segundo comentario.",
    createdAt: new Date(),
    parentCommentId: ObjectId("674771794df444b90175a56b"),
  });
  

  [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userComment"
      }
    },
    {
      $unwind: {
        path: "$userComment",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id", 
        foreignField: "parentCommentId", 
        as: "childComments"
      }
    },
    {
      $match: {
        childComments: { $ne: [] } 
      }
    },
    {
      $lookup: {
        from: "comments",
        localField: "parentCommentId",
        foreignField: "_id",
        as: "userCommentParent"
      }
    },
    {
      $unwind: {
        path: "$userCommentParent",
        preserveNullAndEmptyArrays: true
      }
    }
  ]
  