const imageTypes = ['image/gif', 'image/jpeg', 'image/png'];

window.addEventListener('load', function(){
    let response = [{},{},{},{},{},{}];

    document.querySelectorAll('.ta').forEach( textArea => 
        textArea.addEventListener('change', e => {
            let pos = parseInt(textArea.dataset.pos),
                prop = textArea.dataset.prop? textArea.dataset.prop : 'textArea';
            response[pos][prop] = e.target.value;
            this.console.log(response);
        })
    );

    let files_loaded = document.querySelectorAll('.files_loaded'),
        file_loaders = document.querySelectorAll('.file--loader');

    document.querySelectorAll('.inp_loader').forEach( (inp_file, i) => {
        let pos = parseInt(inp_file.dataset.pos),
            prop = inp_file.dataset.prop? inp_file.dataset.prop : 'inpFile',
            max = parseInt(inp_file.dataset.max);

            
        inp_file.onchange = e => {
            let acceptedFiles = e.target.files;
            var reader = new FileReader();

            let id = Math.random().toString(36).substr(2, 9),
                doc = document.createElement( 'div' );
                doc.classList.add('row');
                doc.classList.add('document');
                doc.innerHTML = `<img src='./imgs/doc.svg' id='${'img'+id}' alt="doc">
                <div><h5>${acceptedFiles[0].name}</h5><p class='loading' id='${'p'+id}'>Cargando...</p></div>`;
                files_loaded[i].appendChild(doc);
            
            reader.onload = e => {
                response[pos][prop] = response[pos][prop]? [...response[pos][prop], e.target.result] : [e.target.result];

                let p = this.document.querySelector(`#${'p'+id}`);
                p.innerText = 'Cargado';
                p.classList.remove('loading');

                if(imageTypes.includes(acceptedFiles[0].type))
                    document.querySelector(`#${'img'+id}`).src = e.target.result;
                
                if(response[pos][prop].length === max){
                    inp_file.disabled = true;
                    file_loaders[i].style.opacity = .3;
                }
                this.console.log(response)
            }
            reader.readAsDataURL(acceptedFiles[0]);
            
        }
    });

});