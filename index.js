
const plansDescription = [
    {
        plan: 'STARTER PLAN',
        description: 'El plan básico comprende sitios web sencillos de tipo informativo, que no tienen tiendas virtuales, múltiples idiomas, ni caraterísticas avanzadas a la medida. Si requieres más características, considera alguno de los paquetes superiores.',
        img: './imgs/starter.svg'
    },
    {
        plan: 'GROWTH PLAN',
        description: 'Tu sitio web con tiendas virtuales o pagos en linea, puede tener múltiples idiomas, y sistema de registro y gestión de usuarios. Si buscas subir de nivel con integraciones a la medida, o desarrollos personalizados como aplicaciones web, CUSTOM PLAN puede ser para ti.',
        img: './imgs/growth.svg'
    },
    {
        plan: 'CUSTOM PLAN',
        description: 'Si buscas integraciones a la medida, o desarrollos personalizados como aplicaciones web o diseños avanzados bajo pedido, CUSTOM PLAN es perfecto para ti. Adicionalmente puedes solicitar beneficios de los demás planes, como tiendas virtuales, pagos en linea, múltiples idiomas, etc.',
        img: './imgs/custom.svg'
    }
]
const quesionnaire = [
    {
        question: '¿Qué tipo de web estás buscando?',
        options: ['Tienda Virtual', 'Sitio Informativo', 'Web con Blog', 'Web a la medida']
    },
    {
        question: '¿Qué diseño quieres que tenga tu Web?',
        options: ['Seguir Referente', 'Usar una plantilla', 'Diseño a Medida', 'Sin Preferencia']
    },
    {
        question: '¿En qué etapa se encuentra tu web?',
        options: ['Idea', 'Boceto listo', 'En desarrollo', 'Lanzada']
    },
    {
        question: '¿Qué tanta información necesita tu web?',
        type: 'inpt',
        options: ['Número de Páginas', 'Número de Productos', 'Cantidad de Idiomas', '']
    },
    {
        question: '¿Necesitas ayuda en la creación de textos o imágenes?',
        type: 'sm',
        options: ['No, yo mismo lo hago', 'Ayuda con textos', 'Imagenes de Stock', 'Ilustración o fotografía a la medida']
    },
    {
        question: '¿Tu web necesita alguno de los siguientes?',
        type: 'sm',
        options: ['Pagos en línea', "Interacción datos externos, APPS o ERP'S", 'Registro usuario/login', '']
    },
    {
        question: '¿Tu web necesita servicios de SEO?',
        options: ['Sí, lo necesito', 'No, yo me encargo', 'No lo sé', '']
    }
]
const detailedInformationSteps = ['General Guideline', 'Reference Website', 'Languages', 'Products or Services', 'Sections', 'External Data'];

var userPrevResponse = null,
    detInfoUploading = false,
    detInfoProgressBarStep = 0,
    alreadyUploaded = [false,false,false,false,false,false];

window.addEventListener('load', function(){
    var revProgressBarStep = 0,
        revProgressBarSteps = [],
        revNavItems = [],
        revOptions = [],
        revOptionsImgs = [],
        revOptionsPs = [],

        
        detInfoProgressBarSteps = [],
        detInfoNavItems = [];

    ( () => {
        //get previous answers
        /*fetch(`https://us-central1-quote-db5a2.cloudfunctions.net/widgets/getUserDocument?email=leidercalvo@gmail.com`)
        .then( response => response.json() )
        .then( r => { 
            userPrevResponse = r;
            let id = r.email.replace('@',''); id = id.replace('.','');
            userPrevResponse.id = id;
            console.log(userPrevResponse);
            next(1, true);
            next(1);

            detInfoUpdates();
        });*/
        var urlParams = new URLSearchParams(window.location.search);
        let email = urlParams.get('email');
        let id = email.replace('@',''); id = id.replace('.','');
        getData('requests/'+id, doc => {
            if(doc !== null){
                userPrevResponse = doc;
                userPrevResponse.id = id;
                console.log(userPrevResponse);
                next(1, true);
                next(1);
                detInfoUpdates();
                checkExternalDataContent();
            }else{
                this.console.log('got to first form')
            }
        });
            
        //create OptionsFields
        [... new Array(4)].forEach( x => {
            var optionFormat = document.createElement( 'div' ),
                imgFormat = document.createElement( 'img' ),
                pFormat = document.createElement( 'p' );

            optionFormat.classList.add('option');
            imgFormat.classList.add('option--img');
            pFormat.classList.add('option--name');

            optionFormat.appendChild(imgFormat);
            optionFormat.appendChild(pFormat);
            document.querySelector('.display--items').appendChild( optionFormat );

            revOptions.push( optionFormat );
            revOptionsImgs.push( imgFormat );
            revOptionsPs.push( pFormat );
        });
        
        createNavItems(7, true);
        createNavItems(detailedInformationSteps.length);

    } )();

    function createNavItems(amount, isReview) {
        [... new Array(amount)].forEach( (x, i) => {
            //Create options navigation
            var navItemFormat = document.createElement( 'div' );
            navItemFormat.classList.add('option');
            navItemFormat.classList.add('nav--option');
            navItemFormat.innerHTML = isReview? `<img src="./imgs/${(i+1)+''+2}.svg" alt="img">` : detailedInformationSteps[i];
            navItemFormat.addEventListener( 'click', () => next(i+1,isReview) );
            document.querySelector(isReview? '.review--nav--items' : '.detInfo--nav--items').appendChild( navItemFormat );
            isReview? revNavItems.push( navItemFormat ) : detInfoNavItems.push( navItemFormat );

            //create progress bar steps
            var progressStep = document.createElement( 'div' );
            progressStep.classList.add('progress-step');
            progressStep.innerHTML = `${(i+1)}` ;
            document.querySelector(isReview?'.review--progress':'.detInfo--progress').appendChild( progressStep );
            isReview? revProgressBarSteps.push( progressStep ):detInfoProgressBarSteps.push( progressStep );
        });
    }

    function checkExternalDataContent() {
        if(userPrevResponse.answers[5][0] === '') document.querySelector('.payment').style.display = 'none';
        if(userPrevResponse.answers[5][1] === '') document.querySelector('.integrations').style.display = 'none';
        if(userPrevResponse.answers[5][2] === '') document.querySelector('.userManagement').style.display = 'none';
    }


    function next(pos, isReview) {
        let barSteps = isReview? revProgressBarSteps : detInfoProgressBarSteps;
        let navItems = isReview? revNavItems : detInfoNavItems;
        //if(!isReview && pos < detInfoProgressBarStep && detInfoProgressBarStep===6) document.querySelector('#detInfo--next').innerHTML = 'Upload<img src="./imgs/nextArrow.svg" alt="">';

        barSteps.forEach( (p, i) => {
            p.classList.remove("is-active");
            p.classList.remove("is-complete");
            navItems[i].classList.remove("selec");
        });

        [... new Array(pos)].forEach( (step, i) => {
            if(i === pos-1){
                barSteps[i].classList.add("is-active");
                navItems[i].classList.add("selec");
                return;
            }
            barSteps[i].classList.add("is-complete");
        });
        isReview? revProgressBarStep = pos : detInfoProgressBarStep = pos;
        isReview? updateInfo_Review(pos-1) : updateInfo_DetailedInfo(pos-1);
    }

    const detailedForms = document.querySelectorAll('.stepForm');
    function updateInfo_DetailedInfo(pos){
        detailedForms.forEach( form => form.style.display = 'none');
        detailedForms[detInfoProgressBarStep-1].style.display = 'flex';
        //if(detInfoProgressBarStep === 6) document.querySelector('#detInfo--next').innerHTML = 'Terminar';
    }

    var revTitle = document.querySelector('.title'),
        revUserAnswer = document.querySelector('.user--answer');
    function updateInfo_Review(pos) {
        revTitle.innerHTML = quesionnaire[pos].question;
        revUserAnswer.innerHTML = ObjectToString(userPrevResponse.answers[pos]);
        
        quesionnaire[pos].options.forEach( (option, i) => {
            revOptions[i].classList.remove('selected');
            checkOptionSelected(pos, option, revOptions[i]);
            if(option !== '') revOptionsImgs[i].src = './imgs/'+(pos+1)+''+(i+1)+'.svg';
            option === '' ? revOptions[i].style.display = 'none' : revOptions[i].style.display = 'flex';
            revOptionsPs[i].innerHTML = option;
        });
    }

    function checkOptionSelected(pos, optionText, optionDiv) {
        const response = userPrevResponse.answers[pos];
        let isSelected = typeof response === 'string' ? optionText === response : Object.values(response).some( r => r === optionText);
        isSelected && optionDiv.classList.add('selected');
    }

    function ObjectToString(object) {
        if(typeof object === 'string') return object;

        var text = [];
        for (const prop in object) {
            object.hasOwnProperty(prop) && object[prop] !== '' && text.push(object[prop])
        }
        return text.join(' -- ');
    }

    const btnHide = document.querySelector('.hide');
    const revNav = document.querySelector('.review--nav');
    const revDisp = document.querySelector('.review--display');
    btnHide.addEventListener('click', ()=> {
        if(btnHide.innerText === 'Hide'){
            btnHide.innerHTML = 'Show <img class="cero" src="./imgs/backArrow.svg" alt="">';
            revNav.style.display = 'none';
            revDisp.style.display = 'none';
        }else {
            btnHide.innerHTML = 'Hide <img src="./imgs/backArrow.svg" alt="">';
            revNav.style.display = 'flex';
            revDisp.style.display = 'flex';
        }
    });

    document.querySelector('#rev--next').addEventListener('click', ()=> {
        if(revProgressBarStep+1 <= userPrevResponse.answers.length) next(revProgressBarStep+1, true);
    });

    document.querySelector('#rev--back').addEventListener('click', ()=> {
        if(revProgressBarStep-1 > 0) next(revProgressBarStep-1, true);
    });

    var next_btn = document.querySelector('#detInfo--next');
    next_btn.addEventListener('click', ()=> {
        if(alreadyUploaded[detInfoProgressBarStep-1]){
            if(detInfoProgressBarStep+1 <= 6 && detInfoUploading===false) {
                next(detInfoProgressBarStep+1);
                next_btn.innerHTML = 'Upload<img src="./imgs/nextArrow.svg" alt="">';
            }else{
                finalScreen();
            }
        }else{
            triggerUploading();
        }
    });


    function finalScreen(){
        console.log(response);
        detailedForms.forEach( form => form.style.display = 'none');
        let detInfo = document.querySelector('.detInfo');
        detInfo.classList.add('final');
        detInfo.innerHTML = `
            <h1 class='title'>Gracias por completar el proceso</h1>
            <h3>Tu orden ha sido generada bajo el plan <strong>${userPrevResponse.plan}</strong>, por valor de: <strong>€ ${userPrevResponse.price}</strong></h3>
        `;
    }


    document.querySelector('#detInfo--back').addEventListener('click', ()=> {
        next_btn.innerHTML = 'Next<img src="./imgs/nextArrow.svg" alt="">';
        if(detInfoProgressBarStep-1 > 0 && detInfoUploading===false) next(detInfoProgressBarStep-1);
    });

    function detInfoUpdates(){
        let sections_amoung = userPrevResponse.answers[3]['0'];
        p_description_sections.innerText = `Nos indicaste que necesitas realizar ${sections_amoung} secciones en tu página, menciona qué te gustaría ver en cada una de ellas. Recuerda que puedes editar el número de secciones arriba (?).`;
        h5_description_sections.innerText = `1 / ${sections_amoung} (#Bloques Quote)`;
    }
    
    edit_answers.addEventListener('click', e => window.location.href = 'https://goconsultingeurope.com/quote/');
});