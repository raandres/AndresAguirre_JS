//*****************************************************************
// Definicion de la estructura de operaciones

class Operacion{
    constructor (numero, descripcion){
        this.numero = numero,
        this.descripcion = descripcion
    }
}


const Operacion1 = new Operacion(1, "Suma");
const Operacion2 = new Operacion(2, "Resta");
const Operacion3 = new Operacion(3, "Multiplicacion");
const Operacion4 = new Operacion(4, "Division");
let resultado = 0;
//*****************************************************************



//*****************************************************************
// Definicion de funciones matemáticas

function sumar(numero1, numero2)
{
    resultado = numero1 + numero2;
    alert (`El resultado de la suma es ${resultado}`);
}

function restar(numero1, numero2)
{
    resultado = numero1 - numero2;
    alert (`El resultado de la resta es ${resultado}`);
}

function multiplicar(numero1, numero2)
{
    resultado = numero1 * numero2;
    alert (`El resultado de la multiplicación es ${resultado}`);
}

function dividir(numero1, numero2)
{
    while(numero2 == 0) //se pide ingresar un nuevo valor para numero2 hasta que sea distinto de 0
    {
        numero2 = parseInt(prompt(`La division que desea realizar no es posible, por favor ingrese otro numero distinto de cero`));
    }
    resultado = numero1 / numero2;
    alert (`El resultado de la división es ${resultado}`);
}
//*****************************************************************


//*****************************************************************
//Funcion para lectura de datos
function IngresarNumero()
{
    numero1 = parseInt(prompt(`Ingresa el primer número`));
    numero2 = parseInt(prompt(`Ingresa el segundo número`));
}
//*****************************************************************

//*****************************************************************
// Definicion de variables
let numero1 = 0;
let numero2 = 0;
let cuenta = 0;
//*****************************************************************

let Usuario = prompt (`Ingrese su nombre`);

let Opcion = parseInt(prompt(`Hola ${Usuario}, estas son las operaciones que se pueden realizar\n 
                            Selecciona la operacion que desees.\n
                            ${Operacion1.numero} - ${Operacion1.descripcion}
                            ${Operacion2.numero} - ${Operacion2.descripcion}
                            ${Operacion3.numero} - ${Operacion3.descripcion}
                            ${Operacion4.numero} - ${Operacion4.descripcion}
                            Para salir ingresar la opcion 0\n`));

do
{
    switch(Opcion)
    {
        case 0:
            continue;
        case 1:
            IngresarNumero()
            sumar(numero1, numero2)
            break;
        case 2:
            IngresarNumero()
            restar(numero1, numero2)
            break;
        case 3:
            IngresarNumero()
            multiplicar(numero1, numero2)
            break;
        case 4:
            IngresarNumero()
            dividir(numero1, numero2)
            break;
        default:
            alert("El numero seleccionado no coincide con una operacion.")
    }

    //vuelvo a leer el valor de opcion para realizar una nueva accion
    Opcion = parseInt(prompt(`Hola ${Usuario}, estas son las operaciones que se pueden realizar\n 
                            Selecciona la operacion que desees.\n
                            ${Operacion1.numero} - ${Operacion1.descripcion}
                            ${Operacion2.numero} - ${Operacion2.descripcion}
                            ${Operacion3.numero} - ${Operacion3.descripcion}
                            ${Operacion4.numero} - ${Operacion4.descripcion}
                            Para salir ingresar la opcion 0\n`));

    cuenta+=1; //cuenta la cantidad de operaciones realizadas
    //console.log(cuenta); //muestra en consola la variables cuenta
}while(Opcion != 0); //el do while corre mientras opcion es distinto de 0

if(cuenta == 0) //muestra una alerta cuando no se realizaron operaciones
{
    alert(`No se realizó ninguna operación`);
}
if (cuenta == 1) //muestra una alerta cuando se realizo 1 operacion
{
    alert(`Se realizó solo 1 operación`);
}
if (cuenta >= 2) //muestra una alerta cuando se realizaron x operaciones
{
    alert(`Se realizaron ${cuenta} operaciones`);
}