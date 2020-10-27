---
title: How to build a REST API in Laravel
description: Let us build a REST API using Laravel and a package called passport
createdat: '2020-07-29T00:00:00.000+01:00'
createdAt: 2020-07-29T00:00:00+01:00

---
### **What is an API?**

A server-side web **API** is a programmatic interface consisting of one or more publicly exposed endpoints to define a request. The response message usually returns a JSON or XML format.

A web API has the following characteristics :

* Programmatic interface
* Endpoints
* Request-response message
* JSON or XML
* Stateless

#### **What is REST?**

* An architecture
* Centres on the transfer of presentations of resources
* A client makes a request when it wants a change of state

**STRENGTHS**

* Leverages on the power of HTTP
* Part by part or loose coupling

**CONSTRAINT**

* APIs are stateless, which means no client context stored between request(no session). API uses **token** as a means of authorization.

Laravel uses Laravel Passport, which provides a full [OAuth2](https://oauth.net/2/ "OAuth2") implementation.

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

`App/User.php`

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

`App/Providers/AuthServiceProvider.php`

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

`config/auth.php`

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

`routes/api.php`

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

#### **Step 7: Create API Responser**

We are going to create our API responser by creating a `Traits` folder in our `App` folder, so our path looks like this `App\Traits\ApiResponser`

```php
<?php

namespace App\Traits;
use Illuminate\Http\Response;

trait ApiResponser{
    
    /**
     * Build success response
     *
     * @param  string|array $data
     * @param  int $code
     * @return json
     */
    public function successResponse($data, $code = Response::HTTP_OK)
    {
      return response()->json(['data'=>$data], $code);
    }


    /**
     * Build error response
     *
     * @param  string|array $data
     * @param  int $code
     * @return json
     */
    public function errorResponse($message, $code)
    {
      return response()->json(['error'=>$message,'code'=>$code], $code);
    }

}
```

#### **Step 8: Let us create our AuthController**

You can generate it using `php artisan make:controller AuthController`

`App/Http/Controllers/API/AuthController.php`

```php
<?php

namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponser;
use App\User;
use Validator;

class AuthController extends Controller
{
	use ApiResponser;
    //create user
    public function signup(Request $request)
    {
        $v = Validator::make($request->all(), [
            'name' => 'required|string|',
            'email' => 'required|string|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        if($v->fails()){
            return $this->errorResponse($v->errors(), 422);       
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        if($user){
            $success['token'] =  $user->createToken('token')->accessToken;
            $success['message'] = "Registration was successfull";
            return $this->successResponse($success);
        }
        else{
            $error = "Sorry! Registration is not successfull.";
            return $this->errorResponse($error, 401); 
        }
        
    }
    
    //login
    public function login(Request $request)
    {
        $v = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required'
        ]);

        if($v->fails()){
            return $this->errorResponse($v->errors(), 422);       
        }

        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials)){
            $error = "Invalid Credentials";
            return $this->errorResponse($error, 401);
        }
        $user = $request->user();
        $success['token'] =  $user->createToken('token')->accessToken;
        return $this->successResponse($success);
    }

    //logout
    public function logout(Request $request)
    {
        
        $user = $request->user()->token()->revoke();
        if($user){
            $success['message'] = "Successfully logged out.";
            return $this->successResponse($success);
        }
        else{
            $error = "Something went wrong, try again.";
            return $this->errorResponse($error, 401);
        }
        
    }

    //me
    public function me(Request $request)
    {
        $user = $request->user();
        if($user){
            return $this->successResponse($user);
        }
        else{
            $error = "User not found";
            return $this->errorResponse($error, 401);
        }
    }
}
```

You can go ahead and test the API using [Insomnia](https://insomnia.rest/ "insomnia") which is my favourite API Client or [Postman](https://www.postman.com/ "Postman") based on your preference.

You can leave a comment below if you have any issues testing the API.