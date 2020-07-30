---
title: How to build a REST API in Laravel
description: Let us build a REST API using Laravel and a package called passport

---
### What is REST?

**Representational state transfer** (**REST**) is a [software architectural](https://en.wikipedia.org/wiki/Software_architecture "Software architecture") [style](https://en.wikipedia.org/wiki/Architectural_style "Architectural style") that defines a set of constraints to be used for creating [Web services](https://en.wikipedia.org/wiki/Web_service "Web service"). Web services that conform to the REST architectural style, called _RESTful_ Web services, provide interoperability between computer systems on the [Internet](https://en.wikipedia.org/wiki/Internet "Internet"). RESTful Web services allow the requesting systems to access and manipulate textual representations of [Web resources](https://en.wikipedia.org/wiki/Web_resource "Web resource") by using a uniform and predefined set of [stateless](https://en.wikipedia.org/wiki/Stateless_protocol "Stateless protocol") operations.\[[wiki](https://en.wikipedia.org/wiki/Representational_state_transfer "wikipedia")\]. In short, **REST** determines how the API looks.

**What is an API?**

An **API** is an application programming interface. It is a set of rules that allow programs to talk to each other. The developer creates the API on the server and allows the client to talk to it. API is stateless which means they are not sustained by sessions. They use a **token** as a means of authentication.

Laravel API makes API Authentication using Laravel Passport, which provides a full OAuth2 implementation.

#### **Step 1: Install Laravel using composer, a php package manager**

Read more about setting up Laravel using composer on the [Laravel documentation](https://laravel.com/docs/5.8 "Laravel Documentation")

    composer create-project --prefer-dist laravel/laravel api

#### **Step 2: Install Laravel Passport**

Navigate to your project directory `cd api`  and install Laravel passport using composer

    composer require laravel/passport

#### **Step 3: Run passport migration**

We will go ahead and run all passport migrations, this will create some tables in our database.

    php artisan migrate

#### **Run passport install command**

This command will create the encryption keys needed to generate secure access tokens.

    php artisan passport:install

#### **Step 5: Passport configuration**

Let us configure passport

* Add the `Laravel\Passport\HasApiTokens` trait to your `App/User` model.

App/User.php

```php
<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
```

* The next step is to register our passport routes, `Passport::routes()` method within the `boot` method of your `AuthServiceProvider`

App/Providers/AuthServiceProvider.php

```php
<?php

namespace App\Providers;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
        Passport::routes();
    }
}
```

* Lastly, we are going to alter the driver of our api in `config\auth`

config/auth.php

```php
<?php

return [

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'passport',
            'provider' => 'users',
            'hash' => false,
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],

         'users' => [
             'driver' => 'database',
             'table' => 'users',
         ],
    ],

  

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,
        ],
    ],

];
```

#### Step 6: **Create API routes**

routes/api.php

```php
<?php

use Illuminate\Http\Request;

Route::group([ 'prefix' => 'v1/auth'], function (){ 
    Route::group(['middleware' => ['guest:api']], function () {
        Route::post('login', 'API\AuthController@login');
        Route::post('signup', 'API\AuthController@signup');
    });
    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'API\AuthController@logout');
        Route::get('me', 'API\AuthController@me');
    });
}); 
```

#### **Step 7: Let us create our AuthController**

You can generate it using `php artisan make:controller AuthController`

App/Http/Controllers/API/AuthController.php

```php
<?php

namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\User;
use Validator;

class AuthController extends Controller
{
    //create user
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|',
            'email' => 'required|string|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);       
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        if($user){
            $success['token'] =  $user->createToken('token')->accessToken;
            $success['message'] = "Registration was successfull";
            return response()->json($success, 200);
        }
        else{
            $error = "Sorry! Registration is not successfull.";
            return response()->json($error, 401); 
        }
        
    }
    
    //login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);       
        }

        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials)){
            $error = "Invalid Credentials";
            return response()->json($error, 401);
        }
        $user = $request->user();
        $success['token'] =  $user->createToken('token')->accessToken;
        return $this->sendResponse($success);
    }

    //logout
    public function logout(Request $request)
    {
        
        $user = $request->user()->token()->revoke();
        if($user){
            $success['message'] = "Successfully logged out.";
            return response()->json($success, 200);
        }
        else{
            $error = "Something went wrong, try again.";
            return response()->json($error, 401);
        }
            
        
    }

    //me
    public function me(Request $request)
    {
        //$id = $request->user()->id;
        $user = $request->user();
        if($user){
            return response()->json($user, 200);
        }
        else{
            $error = "user not found";
            return response()->json($error, 401);
        }
    }
}
```