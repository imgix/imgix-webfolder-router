![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)

imgix-webfolder-router
======================

A node.js server to map multiple `top-level folders` to `Base URLs`. When you point an [imgix](http://www.imgix.com) "Web Folder" source's Base URL at this server then you can effectively have multiple "Web Folder" imgix sources but only use one. This also allows you to add more `Base URLs` to a single imgix hostname by simply updating the server's config file.

* [Example Overview](#example-overview)
* [Warnings and Recommendations](#warnings-recs)
* [Alternatives](#alts)

<a name="getting-started"></a>
Example Overview
----------------

This example overview uses an example configuration for "yourcompany.com" to show you how this works.

#### Getting started

Clone this repo and run `npm install`.

#### Configuration

Create a configuration file by copying the template `cp config.example.js config.js`. As an example, we make a fake config for "yourcompany.com".

    module.exports = {
        webFolderRoutes: {
            // keys will be the top-level paths that will point to a Base URL
            "blog": "http://blog.yourcompany.com/wp-content/",
            "site": "http://yourcompany.com/images/",
            "app": "http://www.example.com/application/v2/storage/assets"
        },

        port: 9444
    }

#### Running

`node server.js # for example running on yourcompany.com`

#### Creating imgix source

In the [imgix webapp](https://webapp.imgix.com) a new "Web Folder" source would look like this:

![imgix Web Folder Source create screenshot](http://jackangers.imgix.net/source_webfolder_multi3.png)

#### Route/Fetch Examples

So now the single `http://yourcompany.imgix.net` can fetch images from multiple Base URLs by using the top-level paths that were defined in your `config.js`.

**"site" example**

`http://yourcompany.imgix.net/site/team/our_ceo.jpg` => `http://yourcompany.com/images/team/our_ceo.jpg`

**"blog" example**

`http://yourcompany.imgix.net/blog/uploads/2013/01/photo.jpg` => `http://blog.yourcompany.com/wp-content/uploads/2013/01/photo.jpg`

**"app" example**

`http://yourcompany.imgix.net/app/logo.jpg` => `http://www.example.com/application/v2/storage/assets/logo.jpg`

<a name="warnings-recs"></a>
Warnings and Recommendations
----------------------------

* This will potentially cause slower fetch times due to the use of redirects. This **only** applies to the first time the image is requested via imgix.
* Run this process under supervision
* This server would be a single-point of failure for images. It may be necessary to run this behind a load balancer.


<a name="alts"></a>
Alternatives
------------
You can achieve similar functionality by running a reverse proxy. For further details on this method contact [support@imgix.com](mailto:support@imgix.com)