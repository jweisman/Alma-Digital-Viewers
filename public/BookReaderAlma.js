var qs = parseQs();
var mms_id = qs['mms_id'] || prompt("Please enter the BIB's MMD_ID");
var rep_id = qs['rep_id'] || prompt("Please enter the representation's PID");

$.getJSON( "alma/bibs/" + mms_id + 
	"/representations/" + rep_id + 
	"/files?limit=100&expand=url", function( data ) {
  var pages = data;
  $.getJSON("alma/bibs/" + mms_id + 
  	"?view=brief", function( data ) {
  	var bib = data;
  	initBR(pages, bib);
  })
});

function parseQs() {
	var vars = [], hash;
	    var q = document.URL.split('?')[1];
	    if(q != undefined){
	        q = q.split('&');
	        for(var i = 0; i < q.length; i++){
	            hash = q[i].split('=');
	            var pound = hash[1].indexOf('#');
	            hash[1] = pound > 0 ? 
	            	hash[1].slice(0, pound) : hash[1];
	            vars.push(hash[1]);
	            vars[hash[0]] = hash[1];
	        }
	}
	return vars;
}

function initBR(pages, bib) {
	// Adapted from https://github.com/openlibrary/bookreader/blob/master/BookReaderDemo/BookReaderJSSimple.js
	// This file shows the minimum you need to provide to BookReader to display a book
	//
	// Copyright(c)2008-2009 Internet Archive. Software license AGPL version 3.

	// Create the BookReader object
	br = new BookReader();

	// Return the width of a given page.  Here we assume all images are 800 pixels wide
	br.getPageWidth = function(index) {
	    return 800;
	}

	// Return the height of a given page.  Here we assume all images are 1200 pixels high
	br.getPageHeight = function(index) {
	    return 1200;
	}

	// We load the images from archive.org -- you can modify this function to retrieve images
	// using a different URL structure
	br.getPageURI = function(index, reduce, rotate) {
	    // reduce and rotate are ignored in this simple implementation, but we
	    // could e.g. look at reduce and load images from a different directory
	    // or pass the information to an image server
	    return pages.representation_file[index].url;
	}

	// Return which side, left or right, that a given page should be displayed on
	br.getPageSide = function(index) {
	    if (0 == (index & 0x1)) {
	        return 'R';
	    } else {
	        return 'L';
	    }
	}

	// This function returns the left and right indices for the user-visible
	// spread that contains the given index.  The return values may be
	// null if there is no facing page or the index is invalid.
	br.getSpreadIndices = function(pindex) {   
	    var spreadIndices = [null, null]; 
	    if ('rl' == this.pageProgression) {
	        // Right to Left
	        if (this.getPageSide(pindex) == 'R') {
	            spreadIndices[1] = pindex;
	            spreadIndices[0] = pindex + 1;
	        } else {
	            // Given index was LHS
	            spreadIndices[0] = pindex;
	            spreadIndices[1] = pindex - 1;
	        }
	    } else {
	        // Left to right
	        if (this.getPageSide(pindex) == 'L') {
	            spreadIndices[0] = pindex;
	            spreadIndices[1] = pindex + 1;
	        } else {
	            // Given index was RHS
	            spreadIndices[1] = pindex;
	            spreadIndices[0] = pindex - 1;
	        }
	    }
	    
	    return spreadIndices;
	}

	// For a given "accessible page index" return the page number in the book.
	//
	// For example, index 5 might correspond to "Page 1" if there is front matter such
	// as a title page and table of contents.
	br.getPageNum = function(index) {
	    return index+1;
	}

	// Total number of leafs
	br.numLeafs = pages.representation_file.length;

	// Book title and the URL used for the book title link
	br.bookTitle= bib.title + " by " + bib.author;
	br.bookUrl  = 'http://exlibrisgroup.com';

	// Override the path used to find UI images
	br.imagesBaseURL = 'BookReader/images/';

	br.getEmbedCode = function(frameWidth, frameHeight, viewParams) {
	    return "Embed code not supported in bookreader demo.";
	}

	// Let's go!
	br.init();

	// read-aloud and search need backend compenents and are not supported in the demo
	$('#BRtoolbar').find('.read').hide();
	$('#textSrch').hide();
	$('#btnSrch').hide();
}