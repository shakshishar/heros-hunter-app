
// Function to call the api to fetch data and display on home page
function getCharacters()
{
    const url = `http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=cb3a5a47ab5ea251b473c75fa674f904&hash=361343712de8229c3a048f1c396c118d`
    getCharApi(url)
}
getCharacters()

// Fetching the data of all the characters to display on the home page

async function getCharApi(url)
{
    const res = await fetch(url)
    const data = await res.json()
    renderCharList(data.data.results) 
}

// Rendering the characters list in the homepage

function renderCharList(data)
{
    const charListUl = document.getElementById('charListUl')
    for(let i=0;i<data.length;i++){
        const li = document.createElement('li')
        li.className = 'char'
        li.innerHTML = 
            `
                    <div class="img">
                        <img class="charImg" src="${data[i].thumbnail.path}.jpg" alt="">
                    </div>
                    <div class="details">
                        <p class="name">${data[i].name}</p>
                        <p class="comics">Comics: ${data[i].comics.available}</p>
                        <p class="series">Series: ${data[i].series.available}</p>
                    </div>
            `
        charListUl.append(li)
    }
}

// Fetching the data through Marvel API, according to the input in the searchbar and Storing it in an Array arr.

async function getApi(api_url)
{
    const res = await fetch(api_url)
    const data = await res.json() 
    searchListFunc(data.data.results)
}


// Collecting some element in variables to handle press event

const searchbar = document.getElementById('name')
const ul = document.getElementById('ul')
const searchList = document.getElementById('search-list')
const notFound = document.getElementById('notFound')

// Handling Event when user enter some input in search field

searchbar.onkeyup = function(e)
{
    let userData = e.target.value;
    if(userData!=''){
        while (ul.hasChildNodes())
        {
            ul.firstChild.remove()
        }
        var api_url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${userData}&ts=1&apikey=cb3a5a47ab5ea251b473c75fa674f904&hash=361343712de8229c3a048f1c396c118d`
        getApi(api_url)
    }
    if(userData.length==0){
        searchList.style.display = 'none'
    }
    else{
        searchList.style.display =' block'
    }
}


// Append the searchList according to the data inserted in searchbar

function searchListFunc(data)
{
        // Show and Hide Search List of Characters
        var len = data.length
        if(len==0)
        {
            notFound.style.display = 'block'
        }else{
            notFound.style.display = 'none'
        }
        // Rendering searchList
        for(let i=0;i<len;i++){
            const li = document.createElement('li')
            li.className = 'flex j-sb a-c'
            li.innerHTML = 
                            `
                                <a href=${"/details/details.html?character=" + data[i].id}git class="flex j-sb a-c" style="text-decoration:none;color:black;">
                                    <div class="left flex a-c">
                                        <img src="${data[i].thumbnail.path}.jpg" alt="" id="img1">
                                        <p class="charName" id="charName1">
                                            ${data[i].name}
                                        </p>
                                    </div>
                                </a>
                                <button class="addFav" name="${data[i].name}" id="${data[i].id}"><i class="fa-sharp fa-regular fa-heart"></i></button>
                            `
            // Appending the Character list
            ul.append(li)
        }

        // Taking action on favourite button
        const addFav = document.querySelectorAll('.addFav')

        
        // Pushing data to LocalStorage whenever clicked on the add button
        addFav.forEach((data)=>{
            data.addEventListener('click',function(){
                localStorage.setItem(data.name,data.id)
            })
        })
}
