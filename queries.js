4. consulta con lookup
db.comments.aggregate([{
"$lookup": {
  from: "users",
  localField: "userId",
  foreignField: "_id",
  as: "userObject"
}},
{
"$lookup": {
  from: "comments",
  localField: "parentCommentId",
  foreignField: "_id",
  as: "parentComment"

}}
])


5.1
db.users.insertOne({ username: "Alice2", email: "alice2@example.com" })

db.comments.insertOne({
    userId: ObjectId("67478e025f870f790f226797"),
    content: "Respuesta Nueva Nueva .",
    createdAt: new Date(),
    parentCommentId: ObjectId("67478e1e5f870f790f22679c"),
 })

5.2

db.comments.aggregate([{
"$lookup": {
  from: "comments",
  localField: "_id",
  foreignField: "parentCommentId",
  as: "childComment"

}},
{
"$match": {
  "childComment": {"$ne": []}
}}])

