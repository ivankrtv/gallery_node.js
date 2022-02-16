let numOfPage = 0;
const form = document.getElementById("form");

async function getImage(){

    const response = await fetch('http://localhost:3000/api/photo/'+numOfPage);

    const data = await response.json();

    if(data.length == 0){
        return;
    }

    numOfPage++;

    data.forEach(image => {

        const gallery = document.getElementById('grid');

        const newPost = document.createElement('div');
        newPost.appendChild( document.createElement('img') );
        newPost.querySelector('img').src = image.image;
        newPost.appendChild( document.createElement('p') );
        newPost.querySelector('p').innerText = image.name;
        newPost.className = "post";

        gallery.appendChild(newPost);

    });

}

onscroll = async function(){
    if( window.scrollY+1 >= document.documentElement.scrollHeight - document.documentElement.clientHeight ) {
        await getImage();
    }
};


form.onsubmit = async function(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/photo', {
        method: 'POST',
        body: new FormData(form)
    });

    if(res.status === 201){
        alert("Картинка доавблена успешно!");
    }
}

function randomImage(){
    document.location.href = "./randomImage.html";
}