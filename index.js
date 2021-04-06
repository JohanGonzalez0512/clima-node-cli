require('dotenv').config()
const Busquedas = require("./models/busquedas");
const { leerInput,
        inquirerMenu, 
        pausa,
        listarLugares} = require("./helpers/inquirer");


const main = async () => {
    const busquedas = new Busquedas();
    let opt = 0;


    do {
        opt= await inquirerMenu();

        switch( opt ){
            case 1: 
            //  Mostrar mensaje
            const termino = await leerInput('Ciudad: ');
            
            // Buscar los lugares
            const lugares = await busquedas.ciudad( termino);
            
            //Seleecionar el lugar 
            const id= await listarLugares(lugares);

            if (id=== 0) continue;
            // Guardar en DB

            const lugarSel = lugares.find(l=> l.id === id);
            busquedas.agregarHistorial(lugarSel.nombre)

        

            // Clima
            const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
           
            
            // Mostrar resultados 
            console.clear();
            console.log("\nInformacion de la ciudad\n".green);
            console.log('Ciudad:', lugarSel.nombre);
            console.log('Lat:', lugarSel.lat );
            console.log('lng:', lugarSel.lng );
            console.log('Temperatura:', clima.temp );
            console.log('Minimas:', clima.min );
            console.log('Maximas:', clima.max ); 
            console.log('Como esta el clima:', clima.desc.green )
            break;

            case 2:
                busquedas.historialCapitalizado.forEach (( lugar, i ) =>{
                    const idx = `${i + 1 }.`.green;
                    console.log( `${ idx } ${ lugar }` )
                })
            break;

        }


      

       if (opt !== 0 ) await pausa();


    } while ( opt !== 0 );


}

main();