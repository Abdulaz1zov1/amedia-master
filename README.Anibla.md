# Anibla Server | by King_Jewel


>Test domen http://anibla-project.herokuapp.com/
>


## Api For Auth

```
/api/auth/register  | POST
/api/auth/login     | POST
/api/auth/forgotpassword    | POST
/api/auth/resetpassword/:resettoken    | PUT

Protected APIs

/api/auth/me   | GET
/api/auth/updatedetails | PUT
/api/auth/updatepassword    | PUT


```
> Register User
```
* name: String 
* email: String
* password: String
ixtiyoriy=>
* role: publisher(default user)
* status: VIP(default oddiy)
* balance: Number(agar status VIP bo'lsa)
```
> Login User
```
* email, 
* password
```
> Parolni qayta tiklash(forgotpassword)
```
* email
```
> Parolni qayta tiklash(resetpassword/:resettoken)
```
* password: String
```
> User o'z ma'lumotlarini o'zgartirishi(updatedetails)
```
* name: String 
* email: String
* tel: Number(+998 avtomat beriladi)
```
> User o'z parolini o'zgartirishi(updatepassword)
```
* currentPassword: String 
* newPassword: String
```
> Protected API larda HEADER da token jo`natish kerak

```
Authorization: Bearer token
```

## Api For Admin panel

```
> Private API larda HEADER da token jo`natish va "role" o'zgaruvchisi 'admin' yoki 'publisher' 
bo'lishi keraks

```

*****************************
```Category

* Public (Hamma uchun ochiq)
/api/category  | GET

* Private (Admin va Publisher uchun)
/api/category  | POST
/api/category/:categoryId  | GET

* Private (Admin uchun)
/api/category/:Id  | PUT
/api/category/:categoryId  | DELETE

```
> Category yaratish uchun
```
* nameuz: String 
* nameru: String
```
*****************************
```Product(product bu bir qism yoki bir video dan iborat bo'lganlar uchun)

* Public (Hamma uchun ochiq)
/api/category/:categoryId/products  | GET
/api/products/:productId  | GET

* Private (Admin va Publisher uchun)
/api/category/:categoryId/products  | POST
/api/products/:productId/photo  | PUT

* Private (Admin uchun)
/api/products/:productId  | PUT
/api/products/:productId  | DELETE

> Product yaratish uchun
```
* nameuz: String 
* nameru: String
* country: String
* year: String
* describtionuz: String
* describtionru: String
* videoLink: String
* files: (image file)
```

*****************************

```Video(video bu bir nechta qismdan iborat bo'lganlar product(serial,anime) uchun)

* Public (Hamma uchun ochiq)
/api/products/:productId/video  | GET
/api/video/:videoId  | GET

* Private (Admin va Publisher uchun)
/api/products/:productId/video  | POST

* Private (Admin uchun)
/api/video/:videoId  | PUT
/api/video/:videoId  | DELETE

> Video yaratish uchun
```
* videoLink: String
* episode: Number,
* season: Number
```

*****************************

```Admin user CRUD bn ishlash
* Private(faqat Admin)
/api/users/  | POST
/api/users/  | GET
/api/users/:id  | GET
/api/users/:id  | PUT
/api/users/:id  | DELETE

> USER yaratish uchun
```
* name: String 
* email: String
* password: String
ixtiyoriy=>
* role: publisher(default user)
* status: VIP(default oddiy)
* balance: Number(agar status VIP bo'lsa)
```
```
### API For JANR
```


* Public (Hamma uchun ochiq)
/api/janr  | GET

* Private (Admin va Publisher uchun)
/api/janr  | POST
/api/janr/:8Id  | GET

* Private (Admin uchun)
/api/janr/:Id  | PUT
/api/janr/:Id  | DELETE

```
> Janr yaratish uchun
```
* nameuz: String 
* nameru: String
```

```

### API USER uchun qo'shimcha

* Comment yozish uchun(Private ya'ni tokeni bor foydalanuvchilar)
/api/products/:productId/comment | POST


> Comment yozish uchun
```
* message: String
```

* Rating(baholash) uchun(Private ya'ni tokeni bor foydalanuvchilar faqat bir marta)
/api/products/:productId/rating | POST


> Rating(baholash) uchun
```
* rating: Number(1 va 5 orasidagi butun son)
```
