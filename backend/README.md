# ***Task Manager: Back-End, Base de datos***

#### Con "Task Manager" podremos crear tareas, editarlas, eliminarlas o restaurarlas desde la papelera de reciclaje. Al crear una tarea tendremos los campos titulo, una descripción, un estado y una fecha de vencimiento para poder identificarla. Al editar tendremos la opción de agregar un comentario, en caso de ser necesario, para especificar por que motivo estamos editando dicha tarea.

#### BACKEND:
- Node Js
- Express
- SQL Server
- MSSQL
- Cors
- Dotenv
- Nodemon

<br>

## Como iniciar la app:

1. Descargar el proyecto: https://github.com/Rocio-Ch/taskManager
2. Abrir SQL Management Studio y crear una base de datos
3. Una vez creada la base de datos, haga click derecho sobre el nombre de su base de datos y seleccione: 'New Query'
4. En ella pega estas querys, selecciona todo el contenido y presiona "Execute" para ejecutarlas: 
~~~

CREATE TABLE status (
   id INT PRIMARY KEY NOT NULL,
   name Varchar(50) NOT NULL
);

CREATE TABLE task (
   id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
   title Varchar(35) NOT NULL,
   description Varchar(80) NOT NULL,
   created_at datetime NOT NULL DEFAULT GETDATE(),
   updated_at datetime,
   status_id int NOT NULL,
   expires_at datetime NOT NULL,
   is_active BIT NOT NULL DEFAULT 1,
   FOREIGN KEY (status_id) REFERENCES status(id)
);

CREATE TABLE history (
   id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
   update_status_at datetime NOT NULL DEFAULT GETDATE(),
   comment Varchar(50),
   status_id int NOT NULL,
   task_id int NOT NULL,
   FOREIGN KEY (status_id) REFERENCES status(id),
   FOREIGN KEY (task_id) REFERENCES task(id)
);

Insert into status(id,name)
values(1,'Completed'), (2,'Pending'),(3,'In progress');
~~~

5. Agregue un archivo `.env` en la raiz del proyecto y coloque estas variables de entorno, completando segun corresponda.
~~~
DB_NAME="nombreBaseDeDatos"
DB_PWD="contraseña"  
DB_USER="nombreDeUsario"    
~~~
4. Instalar las dependencias necesarias ejecutando el comando `npm install` en la raiz del proyecto.
5. Escribir el comando `npm run start:dev` en el directorio raiz para iniciar el proyecto en modo desarrollador
6. Listo!
