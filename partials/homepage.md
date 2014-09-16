
# Why a static site?

In  terms of publishing textual content and images, a static site is much faster, more secure, costs less, and is highly scalable -- it won't slow to a crawl or crash due to increased traffic.

But maybe you just want to use [Wordpress](http://wordpress.com) or [Tumblr](http://tumblr.com)?

There comes a time in your life when as a creator you must create! Your technical curiousity compels you to return to the joy and freedom of using your own tools and _owning_ your content.

You fire up your text-editor and create a masterpiece. A quick switch over to the terminal allows you to execute "publish" like some hipster techno-wizard -- lines of output race down your black terminal screen until finally you see **"completed!"**

You verify your website is updated, bring up Facebook, twitter, gchat, and snapchat(?), <kbd>CTRL</kbd>+<kbd>V</kbd> your domain into the appropriate boxes and you pause for three triumphant seconds before finally proclaiming...

**"I made that!"**


# Why ruhoh?


**Ruhoh is _straightforward._**
Ruhoh doesn't want you to program your website; it wants you to publish content!
Use HTML, CSS, and javascript like you would naturally, but have the _power_ of automation and tooling there when you want it.

**Focus on content not programming.**
Ruhoh is language-agnostic, it's not strictly tied to any one language so you don't need to know ruby or do any programming if you don't want to. However, it turns out to be a good way to learn.

**Focus on _Web Publishing_ and nothing else.**
Ruhoh prioritizes web-publishing specific optimizations like SEO-optimized permalink structures, cononical redirects, microformats, RSS/ATOM feed generation, robust internationalization, textual search, comments, and so on.

**Onions**
Ruhoh should be _immediately_ usable and effective for beginners and experts alike. All functionality should be intuitive and simple to uncover and learn. As your experience grows and you dive deeper into customizations, the layers of power, functionality, and extensibility should elegantly peel away from ruhoh like an onion. You don't have to use them, but they will be there.


# Who should use ruhoh?

Ruhoh is built for users looking to publish content online. _Publishing_ content is not the same as creating web apps so ruhoh is not an application framework and you don't have to be a programmer.

You:

- Are technically curious.
- Are interested in _basic_ web programming such as HTML, CSS, and javascript.
- Value _owning your own content_.
- May be jaded by hosted solutions like [Wordpress](http://wordpress.com) and [Tumblr](http://tumblr.com).
- Are probably not cool with NSA surveillance.

Knowledge of ruby is not required, but since ruby can be a pain to install, it's best if you are capable of setting up a 1.9+ ruby environment locally.

Ruhoh is pretty technical, but the goal is to be accessible and _intuitive_ for beginners.

Beginners are welcomed and encouragd to grow with ruhoh's functionality as experience and curiousity dictates. Experts can _immediately_ take full advantage of ruhoh's modular architecture and straightforward APIs. Nearly all features are powered by standalone "service libraries" that can be overloaded or swapped.

# Core Goals


1. **Prioritize Web Publishing.**
  Work will focus on delivering the best publishing experience and utilizing the web's latest standards for maintaining published content on the Internet.
1. **Beginner Friendly.**
  Simplicity will be the highest measure of success. Publishing should be modeled from _standard_ HTML, CSS, and javascript workflows.
  Ruhoh should be a transparent layer that enables _power_, _automation_, and _extensibility_ but only when desired.
1. **Language-agnostic.**
  A language-specific workflow _places focus on the tool rather than the content_. Therefore ruhoh's core design and interface should be completely free from language-dependent knowledge or paradigms.
1. **Freely Customizable.**
  Ruhoh provides many core features such as URL formatting, markdown rendering, tags, automatic summarization, etc. These functions should expose themselves merely as "services" that the user can override, extend, replace, or re-implement without worry.
1. **Obsessive Separation of Concerns**
  Ruhoh is designed around three principle layers of functionality which are obsessively kept separated as much as possible.
  1. **Content Layer**
    Text, data, and media based content; all your great writings and thoughts.
  1. **View Layer**
    The programming logic that processes and connects your content to the presentation layer.  
    This layer is enabled by [Mustache](http://mustache.github.com/) which heavily encapsulates programming logic.
  1. **Presentation Layer**
    The HTML structure, stylesheets, fonts, and Javascripts that present your content.

