//Variables
const form = document.querySelector('#formulario'),
     lista = document.querySelector('#lista-tweets');

let tweets = [];


//Event Listeners
eventListeners();

function eventListeners(){
    //cdo usuario agrega nuevo tuit
    form.addEventListener('submit', agregarTweet);
    
    //cdo documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; //para evitar error en HTML xq vacio
        console.log(tweets);

        crearHTML();
    })
}


//functions puede ir a cualqier func
function agregarTweet(e){
    e.preventDefault();
    //textarea donde user escribe id="tweet"
    const tweet = document.querySelector('#tweet').value;
    //validacion de campo vacio
    if(tweet === ''){
        mostrarError('Tu mensaje no puede estar vacio');
        return; // previene qe se ejecute más lineas de cod.
    }
    //añadir al arreglo de tuits
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    tweets = [...tweets, tweetObj]
    //añadido al tuit debe crear HTML
    crearHTML();
    //Reiniciar el Formulario
    form.reset()

}

function mostrarError(error){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error;
    mensajeError.classList.add('error')
    //incertar en contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove();      
    }, 3500);
}

//crear HTML con los tuits almacenados
function crearHTML(){

    limpiarHTML(); 

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X'

            //añadir func de eliminar --> arrow xq se pasan parametros
            btnEliminar.onclick = ()=> {
                borrarTweet(tweet.id);
            }

            // crearHTML con lista de tuits
            const li =document.createElement('li');

            //añadir txt
            li.innerText = tweet.tweet;

            //asignar btn
            li.appendChild(btnEliminar);

            //insertar en HTML -lista es un ID
            lista.appendChild(li)            
        });
    }
//agregar al LOCALSTORAGE
    sincronizarStorage();
}

//como acumula porqe appndchild no elimina, limpiamos HTML -p/q no repita el anterior
function limpiarHTML () {
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}

//fnc de eliminar tuit
function borrarTweet(id){
   tweets = tweets.filter(tweet => tweet.id != id) //traemos todos EXCEPTO alqe hice click
   //creo HTML xq debe iterar sobre tuits
   crearHTML()
}

//agregar al storage --hacer JSON xq es una lista
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}