# Api food explorer

This API server is designed to support a restaurant's web client. It allows users to log in as either administrators or clients, unlocking different features. For clients, this includes authenticating their accounts, viewing dishes, and soon they'll be able to mark favorite dishes and place orders. Admins have more control – they can create and delete dishes, upload images, and manage orders (coming soon). In short, this API server makes it easy for both clients and admins to interact with the restaurant's offerings and services.

api live: https://api-food-explorer-hgs3.onrender.com





## Stack utilizada



**Back-end:** Node, Express


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/wicarpessoa/api-node-food-explorer.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Apêndice



**Db Schema**
    

![Db schema](https://i.imgur.com/zSKGQGR.png)

## Rotas

**Users** 

Return  user with user_id
```
GET /users/{user_id} (comming soon)
```
delete  user with user_id
```
DELETE /users/{user_id} (comming soon)
```
Create user
```
POST /users 
```
Update user with user_id
```
PUT /users{user_id} 
```
**Foods**
Return dish with user_id
```
GET /foods/{food_id} 
```
Return all dishes by category_id
```
GET /foods/ 
```
Delete dish with user_id
```
DELETE /foods/{user_id} 
```
Create dish
```
POST /foods 
```
Upload or change dish image with food_id
```
PATCH /foods/avatar/{food_id} 
```

**Categories**
```
GET /categories/ 
```
```
DELETE /categories/{category_id} (comming soon)
```

```
POST /categories/{category_id}  
```

```
PUT /categories/{category_id} (comming soon)
```
**Orders**

get all orders
```
GET /orders/ (comming soon)
```
delete order with order_id
```
 DELETE /orders/{order_id} (comming soon)
```

get all order with order_id
```
GET /orders/{order_id} (comming soon)
```
Create order 
```
POST /orders/ (comming soon)
```
Update order
```
PUT /orders/{order_id} (comming soon)
```

**Sessions**

Autheticate user
```
POST /sessions
```
**Files**

Get imagefile that has img_url
```
GET /files/{img_url}
```
