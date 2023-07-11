Handlebars.registerHelper('isArrOneEleLong', function (arr) {
    return arr.length === 1;
});

async function searchWord() {

    // fetch meaning of word
    const word = document.getElementById('searchInput').value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const data = await fetch(url)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err));

    // pass data to template

    // get inner HTML of script tag with template inside
    const template = document.getElementById('results-template').innerHTML;

    // compile the template after selecting it
    // function returns another function that accepts data to be mapped out to the template
    const compiledTemplate = Handlebars.compile(template);

    // send data to template for use and compile it to html
    const html = compiledTemplate({ word: data[0].word, definitions: data[0].meanings });

    // add template to html with data
    document.getElementById('hbs-root').innerHTML = html;
};

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener("click", searchWord);