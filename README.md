
# WebSpec Example

This repository is meant to evolve into a permanent example of how a WebSpec is made. Before that,
though, it is used primarily as a an area in which to develop this specification style.

## Files

* `index.bs`: This is the Bikeshed source.
* `index.html`: The generated HTML. You can edit that if you really want to, but it will get 
overwritten.
* `run.sh`: A small script that runs the generator, **assuming** you've checked out
  [our own fork of Bikeshed](/webspecs/bikeshed) into a directory parallel to this one.
* `nodemon.sh`: Let's face it, re-running a CLI tool every time you make an edit is tedious. This
  script launches the [nodemon tool](http://nodemon.io/) in such a way that the specification is
  regenerated automatically any time you touch the source. You'll need to install `nodemon` first,
  but frankly, if you haven't already, you're going to like it for much more than just editing
  specs.
* `LICENSE`: This is an example LICENSE for a specification (yes, that too is important).
* `res`: Anything under this directory is resources that are used during the development of this
  example but will be stored elsewhere in a shared location later.
