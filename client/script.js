let numOfPart = 0;

function getPicters(){
    fetch('http://localhost:3000/api/photo/'+numOfPart)
    .then((response)=> 
        response.json()
    )
    .then((data)=>{
        console.log(data);
        data.forEach(image => {
            let grid = document.getElementById("grid");
            let pic = grid.appendChild( document.createElement('div') );
            pic.width = '200px';
            pic.height = '200px'
            let span = pic.appendChild( document.createElement('span') );
            span.innerHTML = image.name;
            let img = pic.appendChild(document.createElement('img'));
            img.src = image.image;
        });
    });
}