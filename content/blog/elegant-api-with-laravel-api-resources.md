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

    use Illuminate\Http\Request;
    
    use Illuminate\Support\Facades\Route;
    
    
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    
    	return $request->user();
    
    });

The above code returns

    {
    	id:1,
        name:"Michael Oke"
        email:"okesm@yahoo.com",
        created_at: "2022-03-31 02:45:56",
        updated_at: "2022-03-31 02:45:56",
    }

We want to transform this to satisfy the below condition:

1. Remove `updated_at`
2. Transform `created_at` to human readable format
3. Split  `name` to `firstname` and `lastname`
4. Transform first letter of `firstname` and `lastname` to capital letter (accessor)