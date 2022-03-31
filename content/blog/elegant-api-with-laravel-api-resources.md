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

```php
{
	id:1,
    name:"Michael Oke"
    email:"okesm@yahoo.com",
    created_at: "2022-03-31 02:45:56",
    updated_at: "2022-03-31 02:45:56",
}
```

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
use Carbon\Carbon;

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
     	return Carbon::parse($this->created_at)->diffForHumans();
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

Not bad right? But it can be better, let's do it the **ELEGANT DESIGN PATTERN**

Generate a new resource for your `User` model using `php artisan make:resource UserResource` . This will create a new folder for us in our `HTTP` directory.

`App\Http\Resources\UserResource`

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
```

In the `toArray` method, that is where we get to do all the transformation and restructuring before we serve it for consumption.

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
        	'id'=>$this->id,
            'firstname' => uc_first(explode(' ',$this->name)[0]),
            'lastname' => uc_first(explode(' ',$this->name)[1]),
            'created_at' => Carbon::parse($this->created_at)->diffForHumans();
        ];
    }
}
```

That's it, all you need to do now is to import your `UserResource`

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\UserResource;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {

	return new UserResource($request->user());

});
```

This will return the **JSON** response below

```php
{
	id:1,
    firstname:"Michael"
    lastname:"Oke"
    email:"okesm@yahoo.com",
    created_at: "3 minutes ago",
}
```

The `UserResource` can be used across your app. You can read more on the [Laravel Website]()