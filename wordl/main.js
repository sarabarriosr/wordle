let resultElement = document.querySelector('.result');
let rowID = 1;
let mainContainer = document.querySelector('.main-conteiner');

//peticion al API de palabras
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '61f553adc9msh90c37391b8ea9bbp16791djsn87ed31ea170b',
        'x-rapidapi-host': 'random-words-spanish-and-french.p.rapidapi.com',
        'Content-Type': 'application/json'
    }
}
fetch('https://random-words-spanish-and-french.p.rapidapi.com/spanish/one-word/5', options)
    .then(result => result.json())
    .then(data => {
        
        let world = data;
        let worldArray = world.toUpperCase().split('');
        console.log(worldArray);
        console.log(world);
        
        let actualRow = document.querySelector('.row');
        drawSquares(actualRow);
        listenInput(actualRow);
        addfocus(actualRow);


        function listenInput(actualRow) {
            let squeres = actualRow.querySelectorAll('.square');
            squeres = [...squeres]; //transformar NodeList --> array

            let userInput = [] // array vacio para luego guardar lo que el usuario haya escrito
            //para escuchar cuando se escribe algo 
            squeres.forEach(Element => {
                Element.addEventListener('input', () => {
                    // Si no se ha borrado
                    if (event.inputType !== 'deleteContentBackward') {
                        //agarrar el ingreso del usuario
                        userInput.push(event.target.value.toUpperCase()); //transformamos en mayusculas para luego guardar en el array userInput

                        if (event.target.nextElementSibling) {
                            event.target.nextElementSibling.focus();
                        } else {
                            //crear el arreglo con las letras
                            //buscar el contenido de la fila anterior
                            //Armar un arreglo con el resultado antes de comparar
                            let squaresFilled = document.querySelectorAll('.square');
                            squaresFilled = [...squaresFilled];
                            let lastFiveSquaresFilled = squaresFilled.slice(-5);
                            let finalUserInput = [];
                            lastFiveSquaresFilled.forEach(Element => {
                                finalUserInput.push(Element.value.toUpperCase());
                            });


                            //cambiar estilos si existe la letra pero no esta en la posicion correcta
                            let existIndexArray = existLetter(worldArray, finalUserInput);

                            //cambiar los estilos 
                            existIndexArray.forEach(Element => {

                                squeres[Element].classList.add('gold');
                            });

                            //array que comparara para luego agregar estilos
                            let rightIndex = compareArray(worldArray, finalUserInput);
                            console.log(rightIndex);
                            rightIndex.forEach(Element => {
                                squeres[Element].classList.add('green');
                            })

                            // Si los arreglos son iguales
                            if (rightIndex.length == worldArray.length) {
                                showResult('Ganaste!')
                                return;
                            }

                            //crear una nueva fila
                            let actualRow = createRow();
                            if (!actualRow) {
                                return;
                            }
                            drawSquares(actualRow);
                            listenInput(actualRow);
                            addfocus(actualRow);

                        }

                    } else {
                        userInput.pop();
                    }
                    console.log(userInput);

                });

            })

        }


        //funciones
        function compareArray(array1, array2) {
            let iqualsIndex = [];
            array1.forEach((Element, index) => {
                if (Element == array2[index]) {
                    console.log(`En la posicion ${index} si son iguales`);
                    iqualsIndex.push(index);
                } else {
                    console.log(`En la posicion ${index} no son iguales`);
                }
            });
            return iqualsIndex;
        }

        function existLetter(array1, array2) {
            let existIndexArray = [];
            array2.forEach((Element, index) => {
                if (array1.includes(Element)) {
                    existIndexArray.push(index);
                }
            });
            return existIndexArray;
        }
        function createRow() {
            rowID++;
            if (rowID <= 5) {
                let newRow = document.createElement('div');
                newRow.classList.add('row');
                newRow.setAttribute('id', rowID);
                mainContainer.appendChild(newRow);
                return newRow;
            } else {
                showResult('Intentalo de nuevo!')

            }

        }

        function drawSquares(actualRow) {
            worldArray.forEach((item, index) => {  //por cada elemento que hay en el arreglo se imprime
                if (index == 0) {
                    actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`; //esto representa un recuardo    
                } else {
                    actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`; //esto representa un recuardo
                }
            });
        }
        function addfocus(actualRow) {
            let focusElement = actualRow.querySelector('.focus'); //esto es para cuando se recarga la pagina, el cursor este en el primer recuadro
            focusElement.focus();

        }
        //funcion que mostrara el mensaje de exito o error
        function showResult(textMsg) {
            if (textMsg == 'Intentalo de nuevo!') {
                resultElement.innerHTML = `<p>${textMsg}</p>
        <p>La palabra secreta es: ${world}</p>
    <button class="button">Reiniciar</button>`;
                let buttonReset = document.querySelector('.button');
                buttonReset.addEventListener('click', () => {
                    location.reload();
                })

            } else {
                resultElement.innerHTML = `<p>${textMsg}</p>
    <button class="button">Reiniciar</button>`;
                let buttonReset = document.querySelector('.button');
                buttonReset.addEventListener('click', () => {
                    location.reload();
                })


            }

        }

    });

