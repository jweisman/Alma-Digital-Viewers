# Alma-Digital-Readers

Introduction
------------
This appication provides examples of open source viewers adapted to work with digital resources managed in Ex Libris Alma.

IA Book Reader
--------------
Implementation of the excellent [IA Book Reader](https://github.com/openlibrary/bookreader) for Ex Libris Alma.

### About the App

The [IA Book Reader](https://openlibrary.org/dev/docs/bookreader) was developed by the Internet Archive to provide a reading/viewing experience for scanned books. It is made to work well with books scanned in the format of the Internal Archive. This implementation adapts the `BookReaderDemo` to be used with a scanned book stored in Alma.

More information about this repository is available in this [blog entry](https://developers.exlibrisgroup.com/blog/Using-the-IA-Book-Reader-with-Alma)

*Note*: The `public/iabookreader/BookReader` directory is simply a clone of `https://github.com/openlibrary/bookreader/tree/master/BookReader` and can be updated from there as required.

Light Gallery
-------------
Implementation of the [Light Gallery](http://sachinchoolur.github.io/lightGallery/) photo gallery viewer.

Installation Instructions
-------------------------
On any machine with [Node.js](https://nodejs.org) and [Git](http://git-scm.com/) installed, do the following:

1. Clone this repository: `git clone https://github.com/jweisman/Alma-IABookReader.git`
2. Install dependencies: `npm install`
3. Copy the `config-example.json` file to `config.json` and replace the placeholder values:
  * `alma_host` from the [Alma API Getting Started Guide](https://developers.exlibrisgroup.com/alma/apis)
  * `api_key` from the [Ex Libris Developer Network](https://developers.exlibrisgroup.com/) dashboard
4. Run the application: `npm start`

License
-------
The code for this application is made available under the [MIT license](http://opensource.org/licenses/MIT).