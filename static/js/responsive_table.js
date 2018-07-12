// this modifies the css so the table when displayed on mobile devices
// as defined in eko.css and responsive_table shortcode; the table operates over csv:
// to use the table, use the responsive_table shortcode: {{% responsive_table url="static/data/verblist.csv" sep="," %}}
//make sure to add the parameter "responsivetable: 1" to the frontmatter
// table headers from the input table:
var ths = document.querySelectorAll(".responsive_table thead tr th");
// get the eko.css style sheet (the last one):
var stylesheet = document.styleSheets[document.styleSheets.length-1]; 

// iterate through table headers:
for (i = 0; i < ths.length; i++) { 
    stylesheet.insertRule("@media only screen and (max-width: 800px){.responsive_table td:nth-of-type("+(i+1)+"):before { content: \""+ths[i].innerHTML +"\"; }}");
};
//add nbsp to empty cells () to prevent collapse of td lines when table is rendered on mobile devices:
var tds = document.querySelectorAll(".responsive_table tbody tr td");
tds.forEach(td => {
        td.innerHTML = td.innerHTML+"&nbsp;";
});