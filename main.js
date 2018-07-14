// Services worker

    if ('serviceWorker' in navigator){
        console.log('Puedes usar services worker en tu navegador');
        navigator.serviceWorker.register('./sw.js')
                               .then(res => console.log('ServiceWorker cargado correctamente', res))
                               .catch(err => console.log('ServiceWorker no se puedo cargar', err));
    }else {
        console.log(' No puedes usar services worker en tu navegador')
    }


// Scroll suaviazdo
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault(); // evitar que se vaya al enlance

         // console.log($("#services").offset().top);
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
});