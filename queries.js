db.comments.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userObject",
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

db.users.insertOne({ username: "Edward", email: "edward@example.com" });

db.comments.insertOne({
  userId: ObjectId("6749abcc106e3411a78d154f"),
  content: "New answer",
  createdAt: new Date(),
  parentCommentId: ObjectId("67478e1e5f870f790f22679c"),
});

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
