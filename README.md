# Ejercicio de MongoDB: Relacionando Comentarios con Usuarios

## Objetivo

Crear una base de datos en MongoDB para una aplicación de comentarios. Los comentarios estarán relacionados con usuarios y permitirán la creación de hilos de respuesta. Practicarás las operaciones de inserción y el operador `$lookup` para realizar consultas con relaciones.

Por tus queries en un archivo `queries.js`

---

## Instrucciones

### 1. Crear las Colecciones

Crea dos colecciones principales:

1. **`users`**: Contendrá la información de los usuarios.
2. **`comments`**: Contendrá los comentarios realizados por los usuarios, incluyendo la posibilidad de respuestas (hilos).

### 2. Esquema

- **Colección `users`**

  ```json
  {
    "_id": ObjectId,
    "username": String,
    "email": String
  }
  ```

- **Colección `comments`**
  ```json
  {
    "_id": ObjectId,
    "userId": ObjectId, // Relaciona con users
    "content": String,
    "createdAt": Date,
    "parentCommentId": ObjectId // Null si no es una respuesta
  }
  ```

---

### 3. Insertar Datos Iniciales

Puebla las colecciones:

- Inserta al menos **5 usuarios** en la colección `users`.  
  Ejemplo:

  ```javascript
  db.users.insertMany([
    { username: "Alice", email: "alice@example.com" },
    { username: "Bob", email: "bob@example.com" },
    { username: "Charlie", email: "charlie@example.com" },
    { username: "Diana", email: "diana@example.com" },
    { username: "Eve", email: "eve@example.com" },
  ]);
  ```

- Inserta **3 comentarios principales** (sin respuesta) en la colección `comments`, asociándolos con usuarios existentes.  
  Ejemplo:

  ```javascript
  db.comments.insertMany([
    {
      userId: ObjectId("COPIA_EL_ID_DEL_USER_GENERADO"),
      content: "Este es un comentario.",
      createdAt: new Date(),
      parentCommentId: null,
    },
    {
      userId: ObjectId("COPIA_EL_ID_DEL_USER_GENERADO"),
      content: "Otro comentario principal.",
      createdAt: new Date(),
      parentCommentId: null,
    },
    {
      userId: ObjectId("COPIA_EL_ID_DEL_USER_GENERADO"),
      content: "Un comentario más.",
      createdAt: new Date(),
      parentCommentId: null,
    },
  ]);
  ```

- Inserta **respuestas** para algunos comentarios principales (hilos).  
  Ejemplo:
  ```javascript
  db.comments.insertMany([
    {
      userId: ObjectId("COPIA_EL_ID_DEL_USER_GENERADO"),
      content: "Respuesta al primer comentario.",
      createdAt: new Date(),
      parentCommentId: ObjectId("COPIA_EL_ID_DEL_COMENTARIO_GENERADO"),
    },
    {
      userId: ObjectId("COPIA_EL_ID_DEL_USER_GENERADO"),
      content: "Otra respuesta al primer comentario.",
      createdAt: new Date(),
      parentCommentId: ObjectId("COPIA_EL_ID_DEL_COMENTARIO_GENERADO"),
    },
  ]);
  ```

---

### 4. Realiza una Consulta con `$lookup`

Escribe una consulta para obtener todos los comentarios, incluyendo:

- El usuario que hizo el comentario.
- Si es un hilo, muestra también el comentario padre.

---

### 5. Reto Adicional

1. Inserta un nuevo usuario y realiza un comentario que sea una respuesta a un comentario existente.
2. Modifica la consulta anterior para filtrar únicamente los comentarios que tengan un hilo.
