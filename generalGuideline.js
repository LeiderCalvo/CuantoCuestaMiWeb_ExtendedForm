const imageTypes = ['image/gif', 'image/jpeg', 'image/png'];

window.addEventListener('load', function(){
    
    let response = [{},{},{},{},{},{}];

    //Links
        function link_change_listener (link, e){
            let pos = parseInt(link.dataset.pos),
                prop = link.dataset.prop? link.dataset.prop : 'link';
            response[pos][prop] = e.target.value;
            this.console.log(response);
        }

        document.querySelectorAll('.link').forEach( link => 
            link.addEventListener('change', e => link_change_listener(link, e))
        );
    
    //TextAreas
        function textArea_change_listener (textArea, e){
            let pos = parseInt(textArea.dataset.pos),
                prop = textArea.dataset.prop? textArea.dataset.prop : 'textArea';
            response[pos][prop] = e.target.value;
            this.console.log(response);
        }
        
        document.querySelectorAll('.ta').forEach( textArea => 
            textArea.addEventListener('change', e => textArea_change_listener(textArea, e))
        );

    //File input loaders
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

    /*   SPECIFICS   */
    //General Guideline just have textArea and file input, so its done

    //Reference Website
    let websites_amoung = 1;
        btn_add_refWeb.onclick = e => {
            let id = Math.random().toString(36).substr(2, 9),
                div = this.document.createElement('div');

            div.classList.add('website');
            div.innerHTML = `<h5>Link</h5>
            <input type="text" id='link_refWeb${id}' data-prop='link${websites_amoung}' data-pos='1' placeholder="www.goconsulting.com">
            <h5>Description, instructions:</h5>
            <textarea id='ta_refWeb${id}' data-pos='1' data-prop='textArea${websites_amoung}' class='ta' type="text" placeholder="I like when they show their projects with a movement in the background images(?)"></textarea>`;
            row_refWeb.appendChild(div);

            let ta = this.document.querySelector('#ta_refWeb'+id);
            ta.addEventListener('change', e => textArea_change_listener(ta, e));

            let link = this.document.querySelector('#link_refWeb'+id);
            link.addEventListener('change', e => link_change_listener(link,e));

            websites_amoung++;
        }

    //Languages
    ( ()=>{
        const languages = ['English','Spanish','French','German','Portuguese','Italian','Dutch','Catalan','Mandarin','Arabic','Hindi','Russian'];
        languages.forEach( l => {
            let option = this.document.createElement('option');
            option.value = l;
            option.innerText = l;
            select_main_language.appendChild(option);

            option = this.document.createElement('div');
            option.classList.add('row');
            option.innerHTML = `<input type="checkbox" name="${l}"></input><p>${l}</p>`;
            row_secondary_language.appendChild(option);
        })
    })();

    select_main_language.addEventListener('change', e => {
        response[2].main_languaje = e.target.value;
        this.console.log(response);
    })

    inp_other_language.addEventListener('change', e => {
        response[2].other_language = e.target.value;
        this.console.log(response);
    })

    //Products or services just have file input, so its done

    //Sections -------looks hard

    //External data -- also hard
});