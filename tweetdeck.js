"use strict";
var INFO =
["plugin", { name: "tweetdeck",
             version: "1.0.0",
             href: "https://github.com/willsALMANJ/pentadactyl-plugins",
             summary: "Tweetdeck navigation and key mappings",
             xmlns: "dactyl" },
    ["author", { href: "https://github.com/willsALMANJ" },
        "Will Shanks"],
    ["license", { href: "http://www.mozilla.org/MPL/2.0/" },
        "Mozilla Public License 2.0"],
    ["project", { name: "Pentadactyl", "min-version": "1.0" }],
    ["p", {},
        "This plugin adds key mappings for selecting columns for scrolling in ",
        "Tweetdeck.  Once a column is selected, any of Pentadactyl's scrolling ",
        "keys (e.g. ", ["k", { name: "j", link: "false" }], " or ",
        ["k", { name: "gg", link: "false" }], ") may be used in it.  The first ",
        "column is selected when ", 
        ["tt", {}, 'https://web.tweetdeck.com'],
        " loads."],
    ["item", {},
        ["tags", {}, "h"],
        ["spec", {}, "h"],
        ["description", { short: "true" },
            ["p", {}, "Select column to the left."]]],
    ["item", {},
        ["tags", {}, "l"],
        ["spec", {}, "l"],
        ["description", { short: "true" },
            ["p", {}, "Select column to the right."]]],
    ["item", {},
        ["tags", {}, "C"],
        ["spec", {}, "<count>C"],
        ["description", { short: "true" },
            ["p", {}, 
            	"Select <count> column (or first column if <count> not specified)."]]],
    ["p", {},
    	"It is recommended that most of the following passkeys be set for ",
    	["tt", {}, 'https://web.tweetdeck.com'],
    	": ", ["str", {}, "rtnpa?s<Left><Right><Up><Down><Return>0"]]];

// Add keybindings for selecting/changing columns in Tweetdeck
// Allows Pentadactyl's scrolling commands (e.g. j, k, <Space>, etc.)
// to work on the columns
var columnIndex=0;
var tdUrl='https://web.tweetdeck.com/';
/* Command version of mappings, etc.
commands.execute(":group tweetdeck -n -desc='group generated by tweetdeck.js plugin' " + 
	"-locs " + tdUrl);
commands.execute(":map l -group tweetdeck -n -count " +
	"-desc 'Focus column to the right' " +
	"-js plugins.tweetdeck.shiftFocus(1,count)");
commands.execute(":map h -group tweetdeck -n -count " +
	"-desc 'Focus column to the left' " +
	"-js plugins.tweetdeck.shiftFocus(-1,count)");
commands.execute(":map -group tweetdeck -n -count " + 
	"-desc 'Focus column <count>' " +
	"C -js plugins.tweetdeck.focusColumn(-1,count)");
commands.execute(":autocmd PageLoad '*' -group tweetdeck -js " +
	"plugins.tweetdeck.pageInit()");
*/
group.mappings.add([modes.NORMAL], ["h"],"Focus column to the left",
    function(args) {shiftFocus(-1,args.count)},{count: true});
group.mappings.add([modes.NORMAL], ["l"],"Focus column to the right",
    function(args) {shiftFocus(1,args.count)},{count: true});
group.mappings.add([modes.NORMAL], ["c"],"Focus column <count>",
    function(args) {focusColumn(-1,args.count)},{count: true});
group.autocmd.add(['PageLoad'],tdUrl,function() {pageInit()});
//group.filter.filters=tdUrl;
commands.execute(":group plugin-tweetdeck -n "+
	"-desc='group generated by tweetdeck.js plugin' -locs " + tdUrl);

function pageInit() {
	window.setTimeout(function() {plugins.tweetdeck.focusColumn(0)}, 3000)
}

function shiftFocus(shiftSign,count) {
	if (typeof count == 'undefined' || !(count > 0)) {
		count=1;
	}
	if (Math.abs(shiftSign) != 1) {
		shiftSign=1;
	}
	var index = columnIndex+shiftSign*count;
	focusColumn(index);
}

function focusColumn(index,count) {
	if (count > 0) {
		index=index+count;
	}
	var columns=gBrowser.contentDocument.getElementsByClassName("js-column-scroller");
		
	if (!columns || !columns.length) {
		return
	}
	
	columnIndex = index % columns.length;
	if (columnIndex < 0) {
		columnIndex+=columns.length;
	}

	columns[columnIndex].focus();
}; 