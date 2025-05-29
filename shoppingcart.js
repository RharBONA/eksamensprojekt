//Pernille Java script start 

setTimeout(function(){
    const productInfobox = document.querySelectorAll('.product-info-container');

    const productInfoHandler = {
        toggleDescription(Infobox) {
            const description = Infobox.querySelector('.product-description');
            const erSynlig = description.style.display === 'block';

            if (erSynlig) {
                description.style.display = 'none';
                Infobox.classList.remove('active');
            }
            else{
                description.style.display = 'block';
                Infobox.classList.add('active');
            }
        }
    };

    productInfobox.forEach(Infobox => {
        Infobox.addEventListener('click', () => productInfoHandler.toggleDescription(Infobox));
    });
}, 1000);

//Pernille Java script end