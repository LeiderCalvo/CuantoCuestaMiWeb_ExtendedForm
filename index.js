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
    var reviewOptions = document.querySelector('.options');

    function getDocument (){
        fetch(`https://us-central1-quote-db5a2.cloudfunctions.net/widgets/getUserDocument?email=leidercalvo@gmail.com`)
        .then( response => response.json() )
        .then( r => console.log(r) );
    }
    getDocument();

    //createOptionsFields
    ( () => {
        [... new Array(4)].forEach( x => {
            var optionFormat = document.createElement( 'div' );
            optionFormat.classList.add('option');
            optionFormat.innerHTML = `<img src="./imgs/11.svg" alt="img" class='img icon'><p class="option--name">Name</p>` ;
            reviewOptions.appendChild( optionFormat );
        })
    } )();
});