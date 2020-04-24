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
        }
        
        document.querySelectorAll('.ta').forEach( textArea => 
            textArea.addEventListener('change', e => textArea_change_listener(textArea, e))
        );

    //File input loaders
        let files_loaded = Array.prototype.slice.call(document.querySelectorAll('.files_loaded')),
            file_loaders = Array.prototype.slice.call(document.querySelectorAll('.file--loader'));
        
        function inpFile_change_listener(inp_file, i){  
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
                }
                reader.readAsDataURL(acceptedFiles[0]);
                
            }
        }

        document.querySelectorAll('.inp_loader').forEach( (inp_file, i) => inpFile_change_listener(inp_file, i));

    /*   SPECIFICS   */
    //General Guideline just have textArea and file input, so its done

    //Reference Website
        let websites_amoung = 1;
        btn_add_refWeb.onclick = e => add_website('refWeb', 'row_refWeb', 1, websites_amoung);

    //Languages
        ( ()=>{
            const languages = ['English','Spanish','French','German','Portuguese','Italian','Dutch','Catalan','Mandarin','Arabic','Hindi','Russian'];
            languages.forEach( l => {
                let option = this.document.createElement('option'),
                    id = Math.random().toString(36).substr(2, 9);
                option.value = l;
                option.innerText = l;
                select_main_language.appendChild(option);

                option = this.document.createElement('div');
                option.classList.add('row');
                option.innerHTML = `<input id='check_languajes${id}' type="checkbox" name="${l}"></input><p>${l}</p>`;
                row_secondary_language.appendChild(option);

                this.document.querySelector('#check_languajes'+id).addEventListener('change', e => {
                    if(e.target.checked){
                        response[2]['secondary_languajes'] = response[2]['secondary_languajes']? [...response[2]['secondary_languajes'], e.target.name] : [e.target.name];
                    }else{
                        response[2]['secondary_languajes'] = response[2]['secondary_languajes'].filter( val => val !== e.target.name )
                    }
                    this.console.log(response);
                });
            })
        })();

    //Products or services just have file input, so its done

    //Sections
        let sections_amoung = 1;
        btn_add_sections.onclick = e => {
            let id = Math.random().toString(36).substr(2, 9),
                section = this.document.createElement('section');

            section.classList.add('row');
            section.innerHTML = `
                <div class="description">
                    <h5>Description, instructions:</h5>
                    <textarea id='ta_sections${id}' data-pos='4' data-prop='textArea${sections_amoung}' class='ta' type="text" placeholder="I like when they show their projects with a movement in the background images(?)"></textarea>
                </div>
                <div class="visualRef">
                    <h5>Visual Reference</h5>
                    <div class="file--loader">
                        <p>Attach files here. Theres 2 files max limit.</p>
                        <input type="file" id='inpt_file_sections${id}' data-pos='4' data-prop='inptFile${sections_amoung}' data-max='2' class="inp_loader">
                    </div>
                    <div id='files_loaded_sections${id}' class="row files--loaded files_loaded"></div>
                </div>`;
            container_sections.appendChild(section);

            let ta = this.document.querySelector('#ta_sections'+id);
            ta.addEventListener('change', e => textArea_change_listener(ta, e));
            files_loaded.push( this.document.querySelector('#files_loaded_sections'+id) );

            let inpFile = this.document.querySelector('#inpt_file_sections'+id);
            file_loaders.push(inpFile);
            inpFile_change_listener(inpFile, (files_loaded.length-1));

            sections_amoung++;
        }

    //External data
    let websites_payment_amoung = 1;
    btn_add_payment.onclick = e => add_website('payment', 'websites_payment', 5, websites_payment_amoung);

    function add_website(section, parent, pos, amoung_ref) {
        let id = Math.random().toString(36).substr(2, 9),
            div = this.document.createElement('div');

        div.classList.add('website');
        div.innerHTML = `<h5>Link</h5>
        <input type="text" id='link_${section}${id}' data-prop='link${amoung_ref}' data-pos='${pos}' placeholder="www.goconsulting.com">
        <h5>Description, instructions:</h5>
        <textarea id='ta_${section}${id}' data-pos='${pos}' data-prop='textArea${amoung_ref}' class='ta' type="text" placeholder="I like when they show their projects with a movement in the background images(?)"></textarea>`;
        document.querySelector('#'+parent).appendChild(div);

        let ta = this.document.querySelector('#ta_'+section+id);
        ta.addEventListener('change', e => textArea_change_listener(ta, e));

        let link = this.document.querySelector('#link_'+section+id);
        link.addEventListener('change', e => link_change_listener(link,e));

        section === 'payment'? websites_payment_amoung++ : websites_amoung++;
    }


    let step = 0;
    document.querySelector('#detInfo--next').addEventListener('click', ()=> {
        let obj = {};
        obj[detailedInformationSteps[step].replace(' ', '')] = response[0];
        this.console.log(obj);
        this.console.log(JSON.stringify(obj));
        /*fetch(`https://us-central1-quote-db5a2.cloudfunctions.net/widgets/updateUser?email=${userPrevResponse.email}&&obj=${JSON.stringify( obj )}`, {method: 'PUT'})
            .then( resp => resp.text())
            .catch( err => console.error(err) );*/
    });
});