---
title: How to create a RestAPI in Laravel
description: 'Empower your NuxtJS application with @nuxt/content module: write in
  a content/ directory and fetch your Markdown, JSON, YAML and CSV files through a
  MongoDB like API, acting as a Git-based Headless CMS.'

---
Create API is easy in Laravel

```php{1,3-5}[server.php]
class Purchased extends Mailable
{
    use Queueable, SerializesModels;

    public $orderID;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($orderID)
    {
        $this->orderID = $orderID;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.purchase', ['orderID'=>$this->orderID])->from('contact@careclick.healthcare')->subject('Purchased from CareClick');
    }
}
```