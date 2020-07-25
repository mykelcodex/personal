---
title: Another Test
description: "Hello! My name is Oke Michael, i am a software engineer based in Nigeria.
  I spend most of time on the web which means i focus majorly on the web\U0001F61C.
  I am a huge fan of PHP and Javascript even after the release of PHP 7 which is super
  fast \U0001F60D. I have built a good number of applications using PHP and Javascript."

---
Hello! My name is Oke Michael, i am a software engineer based in Nigeria. I spend most of time on the web which means i focus majorly on the web😜. I am a huge fan of PHP and Javascript even after the release of PHP 7 which is super fast 😍. I have built a good number of applications using PHP and Javascript. These days, i focus on building web interfaces using [Laravel](https://laravel.com/), [Vuejs](https://vuejs.org/) and [TailwindCSS](https://tailwindcss.com/). I love to contribute to the open source community. I also get my hands typing with tools like [NuxtJS](https://nuxtjs.org/), [InertiaJS](https://inertiajs.com/) and [AplineJS](https://github.com/alpinejs/alpine) based on the project and client's requirement.

Mentors: [Taylor Otwell](htts://twitter.com/taylorotwell), [Evan You](https://twitter.com/youyuxi), [Adam Wathan](https://twitter.com/adamwathan), [Jeffrey Way](https://twitter/jeffrey_way), [Jonathan Reinink](https://twitter.com/reinink).

```php
 public function adddoctor(Request $request){
        
        $dob = Carbon::parse($request->dob)->toDateString();
        User::create([
            'name'=>$request->firstname.' '.$request->lastname,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'gender'=>$request->gender,
            'dob'=>$dob,
            'country'=>$request->country['name'],
            'state'=>$request->state['name'],
            'address'=>$request->address,
            'role'=>'doctor',
            'password'=>bcrypt($request->phone),
        ])->doctors()->create([
            'residency'=>$request->residency,
            'fellowship'=>$request->fellowship,
            'license_country'=>$request->license_country['name'],
            'license_state'=>$request->license_state['name'],
            'license'=>$request->license,
            'expiration'=>$request->expiration,
            'specialty'=>$request->specialty,
            'degree'=>$request->degree,

        ]);
        return response()->json('Doctor added successfully', 200);

        
    }
```

just testing again

Regards