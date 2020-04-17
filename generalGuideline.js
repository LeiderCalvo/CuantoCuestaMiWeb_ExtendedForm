const imageTypes = ['image/gif', 'image/jpeg', 'image/png'];

window.addEventListener('load', function(){
    let response = [{},{},{},{},{},{}];

    document.querySelectorAll('.ta').forEach( (textArea, i) => 
        textArea.addEventListener('change', e => {
            var pos = parseInt(textArea.dataset.pos),
                prop = textArea.dataset.prop? textArea.dataset.prop : 'textArea';
            response[pos][prop] = e.target.value;
            this.console.log(response);
        })
    );
/*
    inp_gguideline.onchange = e => {
        var acceptedFiles = e.target.files;

        var reader = new FileReader();
        reader.onload = e => {
            response.file = e.target.result;
            this.console.log(acceptedFiles);

            var doc = document.createElement( 'div' );
            doc.classList.add('row');
            doc.classList.add('document');
            doc.innerHTML = `<img src=${imageTypes.includes(acceptedFiles[0].type)? e.target.result :'./imgs/doc.svg'} alt="doc">
            <div><h5>${acceptedFiles[0].name}</h5><p>Estado del doc</p></div>`;
            files_loaded_gguideline.appendChild(doc);
        }
        reader.readAsDataURL(acceptedFiles[0]);

    };*/
});