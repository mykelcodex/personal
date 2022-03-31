---
title: Elegant API with Laravel API Resources
description: Building an elegant API comes with alot of delibrations, a good developer
  consider the structure, simplicity, clean code, readability and consistency of an
  API.
createdAt: 2022-03-31T00:00:00+01:00

---
Building an elegant API comes with alot of delibrations, a good developer consider the structure, simplicity, clean code, readability and consistency of an API. Laravel API Resources gives you all the flexibility you need to structure your API and perform transformation based on your need. Laravel API Resource sits between your Eloquent model and your JSON responses. You may want to display certain attributes on your user model or include certain relationships in your JSON responses, creating all these in your model can be messy and **CRUDDY BY DESIGN.** Laravel API Resources kicks in and provides a seamless way to organize and transform your API structure, add relationships etc with little effort and a clean code which is the end goal.

We will take a look at the **CRUDDY BY DESIGN** way of building an API in Laravel and also look at the **ELEGANT BY DESIGN** way of building an API in Laravel.

**CRUDDY BY DESIGN**

In our `routes/api.php`, let us return the user's object.

```php
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

	return $request->user();

});
```

The above code returns

    {
    	id:1,
        name:"Michael Oke"
        email:"okesm@yahoo.com",
        created_at: "2022-03-31 02:45:56",
        updated_at: "2022-03-31 02:45:56",
    }

We want to transform the above API to satisfy the below condition:

* Remove `updated_at`
* Transform `created_at` to human readable format
* Split  `name` to `firstname` and `lastname`
* Transform first letter of `firstname` and `lastname` to capital letter (accessor)

In our `App\Models\User.php` , we are going to perform the modification.

```php
<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
	
    //Append it
    
    protected $appends = ['firstName','lastName'];
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'updated_at'   //Remove updated_at
        'name' //Remove name
    ];

	/**
     * Create created_at attribute to transform date
     *
     * @var array<string, string>
     */
     public function getCreatedAtAttribute(){
     	return $this->created_at->diffForHumans();
     }
     
     
     /**
     * Create firstname and capitalize it
     *
     * @var array<string, string>
     */
     public function getFirstNameAttribute(){
     	return ucfirst(explode('', $this->name)[0]);
     }
     
     /**
     * Create lastname and capitalize it
     *
     * @var array<string, string>
     */
     public function getLastNameAttribute(){
     	return ucfirst(explode('', $this->name)[1]);
     }
     

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
```

This will return a new `User` object

```php
{
	id:1,
    firstName:"Michael"
    lastName:"Oke"
    email:"okesm@yahoo.com",
    created_at: "3 minutes ago",
}
```