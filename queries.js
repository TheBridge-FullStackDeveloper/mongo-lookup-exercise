/* *****************************************************************************

DENTRO DE MONGO DB COMPASS LO HICE DENTRO DE LA SHELL 

***************************************************************************** */


/* Se crean las colecciones users & comments */

/* Insertar Datos adicionales */

db.users.insertMany([
    { username: "Alice", email: "alice@example.com" },
    { username: "Bob", email: "bob@example.com" },
    { username: "Charlie", email: "charlie@example.com" },
    { username: "Diana", email: "diana@example.com" },
    { username: "Eve", email: "eve@example.com" },
]);

/* Insertar Comentarios */

db.comments.insertMany([
    {
      userId: ObjectId("ID_DE_ALICE"),
      content: "Este es un comentario.",
      createdAt: new Date(),
      parentCommentId: null,
    },
    {
      userId: ObjectId("ID_DE_BOB"),
      content: "Otro comentario principal.",
      createdAt: new Date(),
      parentCommentId: null,
    },
    {
      userId: ObjectId("ID_DE_CHARLIE"),
      content: "Un comentario más.",
      createdAt: new Date(),
      parentCommentId: null,
    },
]);

/* Insertar Respuestas a Comentarios */

db.comments.insertMany([
    {
      userId: ObjectId("ID_DE_DIAN"),
      content: "Respuesta al primer comentario.",
      createdAt: new Date(),
      parentCommentId: ObjectId("ID_DEL_COMENTARIO_1"),
    },
    {
      userId: ObjectId("ID_DE_EVE"),
      content: "Otra respuesta al primer comentario.",
      createdAt: new Date(),
      parentCommentId: ObjectId("ID_DEL_COMENTARIO_1"),
    },
]);

/* Relacionar comentarios con usarios */

db.comments.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
]);

/* $LOOKUP */ 

/* Relaciona comentarios con usuarios */ 

db.comments.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
]);

/* Relacionar comentarios con sus respuestas */ 

db.comments.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
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
    {
      $unwind: "$user",
    },
]);

/* Insertar nuevo usario y comentario en hilo */ 

db.users.insertOne({
    username: "Frank",
    email: "frank@example.com",
  });
  
  db.comments.insertOne({
    userId: ObjectId("ID_DE_FRANK"),
    content: "Una respuesta al segundo comentario.",
    createdAt: new Date(),
    parentCommentId: ObjectId("ID_DEL_COMENTARIO_2"),
});

/* Filtrar solo comentarios en hilo */

db.comments.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
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
    {
      $unwind: "$user",
    },
    {
      $match: {
        parentCommentId: { $ne: null },
      },
    },
]);
  
  
  
  


  
  
  