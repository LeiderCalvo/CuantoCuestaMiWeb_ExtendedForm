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

window.addEventListener('load', function(){
    var  userPrevResponse = null,
        title = document.querySelector('.title'),
        progressBarStep = 0,
        progressBarSteps = [],
        
        reviewOptions = document.querySelector('.display--items'),
        userAnswer = document.querySelector('.user--answer'),
        navItems = [],
        options = [],
        optionsImgs = [],
        optionsPs = [];

    ( () => {
        //get previous answers
        fetch(`https://us-central1-quote-db5a2.cloudfunctions.net/widgets/getUserDocument?email=leidercalvo@gmail.com`)
        .then( response => response.json() )
        .then( r => { 
            userPrevResponse = r;
            next(1);
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
            reviewOptions.appendChild( optionFormat );

            options.push( optionFormat );
            optionsImgs.push( imgFormat );
            optionsPs.push( pFormat );
        });
        
        [... new Array(7)].forEach( (x, i) => {
            //Create options navigation
            var navItemFormat = document.createElement( 'div' );
            navItemFormat.classList.add('option');
            navItemFormat.classList.add('nav--option');
            navItemFormat.innerHTML = `<img src="./imgs/${(i+1)+''+2}.svg" alt="img">`;
            navItemFormat.addEventListener('click', ()=>next(i+1));
            document.querySelector('.nav--items').appendChild( navItemFormat );
            navItems.push( navItemFormat );

            //create progress bar steps
            var progressStep = document.createElement( 'div' );
            progressStep.classList.add('progress-step');
            progressStep.innerHTML = `${(i+1)}` ;
            document.querySelector('.progress').appendChild( progressStep );
            progressBarSteps.push( progressStep );
        });

    } )();


    function next(pos) {
        progressBarSteps.forEach( (p, i) => {
            p.classList.remove("is-active");
            p.classList.remove("is-complete");
            navItems[i].classList.remove("selec");
        });

        [... new Array(pos)].forEach( (step, i) => {
            if(i === pos-1){
                progressBarSteps[i].classList.add("is-active");
                navItems[i].classList.add("selec");
                return;
            }
            progressBarSteps[i].classList.add("is-complete");
        });
        progressBarStep = pos;
        updateInfo(pos-1);
    }

    function updateInfo(pos) {
        title.innerHTML = quesionnaire[pos].question;
        userAnswer.innerHTML = ObjectToString(userPrevResponse.answers[pos]);
        
        quesionnaire[pos].options.forEach( (option, i) => {
            options[i].classList.remove('selected');
            checkOptionSelected(pos, option, options[i]);
            if(option !== '') optionsImgs[i].src = './imgs/'+(pos+1)+''+(i+1)+'.svg';
            option === '' ? options[i].style.display = 'none' : options[i].style.display = 'flex';
            optionsPs[i].innerHTML = option;
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

    document.querySelector('.next').addEventListener('click', ()=> {
        if(progressBarStep+1 <= userPrevResponse.answers.length) next(progressBarStep+1);
    });

    document.querySelector('.back').addEventListener('click', ()=> {
        if(progressBarStep-1 > 0) next(progressBarStep-1);
    });
});