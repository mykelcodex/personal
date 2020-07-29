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

* Add the Laravel\\Passport\\HasApiTokens trait to your App/User model.

App\\User.php

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

* The next step is to register our passport routes, `Passport::routes()` method within the `boot` method of your `AuthServiceProvider`

App\\Providers\\AuthServiceProvider.php

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