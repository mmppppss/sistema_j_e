# Sistema de informacion para la ONG Joven esperanza
Proyecto para la materia de Sistemas de Informacion I
Integrantes:
    - Flores Prado Josue Miguel
    - Nuñez Ardaya Melissa Shanner
    - Pozo Soliz Marthel Pedro

## Descripción:
El sistema de informacion se encarga de la gestión de la información de la ONG Joven Esperanza.

## ToDo
- [x] Manejar sesion con JWT json web token
- [ ] manejar peticiones get, post, del, update
- [ ] definir rutas
- [ ] hacer frontend

## Estructura de archivos:
```
/
├── api/                            #Carpeta de la api
│   │
│   ├── src/                        #Codigos de funcionamientos
│   │   ├── config/                 #Carpeta de configuraciones
│   │   │   └── Database.php        #Conexion con la base de datos
│   │   ├── models/                 #Carpeta de modelos
│   │   └── controllers/            #Carpeta de controladores
│   │
│   ├── public/                     #Carpeta publica
│   │   ├── login.php               #Pagina de inicio y manejador de peticiones
│   │   └── index.php               #Login y manejo de sesion
│   └─── .env                       #Variables de entorno
│
├── frontend/                       #Carpeta frontend REACT
│
└── README.md                       #README
```

## Flujo de aplicacion:
```
              ┌─────────┐
              │DATABASE │
              └┬────────┘
               │      ▲  
               ▼      │  
┌─────────┐──►┌───────┴─┐
│ CLIENTE │   │   API   │
└─────────┘◄──└─────────┘
```

## Flujo de API:
```
                 ┌───────────┐                   
                 │ DATABASE  │                   
                 └─────────┬─┘                   
                   ▲       │                     
                   │       ▼             ┌───┐   
                 ┌─┴─────────┐ True─────►│JWT│   
Credenciales ──► │ Login.php │           └─┬─┘   
                 └───────────┘ False       │     
                       ▲         │         │     
                       └─────────┘         │     
                                           │     
                                           │     
                 ┌───────────┐             │     
   Peticion  ───►│ Index.php │◄────────────┘     
                 └───────────┘                   
                     JWT?                        
                      ▼                          
                GET POST UP DEL   ┌─────────────┐
                 │   │   │   └───►│ Controlador │
                 │   │   │        └─────────────┘
                 │   │   │        ┌─────────────┐
                 │   │   └───────►│ Controlador │
                 │   │            └─────────────┘
                 │   │            ┌─────────────┐
                 │   └───────────►│ Controlador │
                 │                └─────────────┘
                 │                ┌─────────────┐
                 └───────────────►│ Controlador │
                                  └─────────────┘
```
