---
title: Flexibility in CSS with TailwindCSS
description: A utility-first CSS framework for rapidly building custom designs.

---

Not until today, BootstrapCSS is the most used CSS Framework. It provides some already made widgets like cards, badges, buttons, tables, breadcrumb, carousel, modal, nav, navbar, pagination, popover, spinners, etc. This made it a lot easier for a backend guy to do some frontend and still be comfortable. 

I have been a front-end developer for 4 years now, and [Bootstrap CSS](https://bootstrap.com "BootstrapCSS")  and has been my major CSS framework, I love it then because of rapid development in my projects but there were certain concerns that I have with it.

* **Imposes Design**

  Bootstrap widgets come with default color and a style of design, customizing it to your own taste can be tiring.
* **Design Style**

  Changing the bootstrap design style takes a lot of time and effort.  About 50% of the website using bootstrap was unknown because of the design style because building a custom design in bootstrap is tedious.
* **Color Palette**

  Bootstrap does not provide much support for its color palette as the only colors provided are just ten.

I began a search for a new framework that will solve the above issues, then I came across [TailwindCSS](https://tailwindcss.com/ "Tailwindcss") and I was blown &#128562 at what it has to offer. If you're looking for a framework that comes with a menu of predesigned widgets to build your site with, Tailwind might not be the right framework for you. But if you want a huge head start implementing a custom design with its own identity, Tailwind might be just what you're looking for. Below are the reasons why you should use [TailwindCSS](https://tailwindcss.com "Tailwindcss") for your next project.

![](https://dotdev.co/wp-content/uploads/2019/06/stateofcss2019.png)

* **Utility first - Responsive to the core**

  Every Tailwind utility also comes with responsive variants, making it extremely easy to build responsive interfaces without resorting to custom CSS.
* **Component-friendly**

  While you can do a _lot_ with just utility classes, as a project grows it can be useful to codify common patterns into higher-level abstractions.
* **Designed to be customized**

  If it makes sense to be customizable, Tailwind lets you customize it. This includes colors, border sizes, font weights, spacing utilities, breakpoints, shadows, and tons more.

  Tailwind is written in [**PostCSS**](http://postcss.org/) and configured in JavaScript, which means you have the full power of a real programming language at your fingertips.

  Tailwind is more than a CSS framework, _it's an engine for creating design systems._

  ```js
  // tailwind.config.js
  module.exports = {
    theme: {
      screens: {
        tablet: '768px',
        desktop: '1024px',
      },
      colors: {
        primary: {
          100: '#ebf8ff',
          300: '#90cdf4',
          500: '#4299e1',
          700: '#2b6cb0',
          900: '#2a4365',
        },
        secondary: {
          100: '#fffff0',
          300: '#faf089',
          500: '#ecc94b',
          700: '#b7791f',
          900: '#744210',
        },
      },
      extend: {
        boxShadow: {
          huge: '0 30px 60px -15px rgba(0, 0, 0, .25)'
        }
      }
    }
  }
  ```
* **Color Palatte**

  TailwindCSS has a lot of nice colors you can work with. It is fully customizable, which means you can add your preferred color and use it across your project. In the theme configuration, you can specify your preferred color

  ```js
  // tailwind.config.js
  module.exports = {
    theme: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        display: ['Gilroy', 'sans-serif'],
        body: ['Graphik', 'sans-serif'],
      },
      borderWidth: {
        default: '1px',
        '0': '0',
        '2': '2px',
        '4': '4px',
      },
      extend: {
        colors: {
          cyan: '#9cdbff', //Custom cyan color
        },
        spacing: {
          '96': '24rem',
          '128': '32rem',
        }
      }
    }
  }
  ```
  * **Adding your own plugin**

    You can create your own custom plugin and add to you `tailwind.config.js`

    ```js
    // tailwind.config.js
    module.exports = {
      plugins: [
        require('./plugins/yourplugin') //Custom plugin
      ],
    }
    ```

    You pull in [TailwindCSS ](https://tailwindcss.com/docs/installation "Tailwind Docs")from the official and follow the installation guide.