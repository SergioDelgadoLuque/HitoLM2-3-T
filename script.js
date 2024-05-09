let surveyData = []; // Aquí almacenaremos los datos de la encuesta

function loadData() {
    fetch('Encuesta_Educativa_Completa.json')
        .then(response => response.json())
        .then(data => {
            surveyData = data;
            displayData(data);
        })
        .catch(error => console.error('Error loading the data:', error));
}

function displayData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
                    <h2>${item["Centro Educativo"]}</h2>
                    <p>Grado: ${item.Grado}</p>
                    <p>Sexo: ${item.Sexo}</p>
                    <p>Satisfacción: ${item.Satisfacción}</p>
                    <p>Interés en Actividades Extracurriculares: ${item["Interés en Actividades Extracurriculares"]}</p>
                `;
        container.appendChild(div);
    });
}

function applyFilters() {
    const sexoFilter = document.getElementById('sexo').value;
    const gradoFilter = document.getElementById('grado').value.toLowerCase(); // Convertir a minúsculas para hacer coincidencias insensibles a mayúsculas y minúsculas
    const actividadesFilter = document.getElementById('actividades').value;

    const filteredData = surveyData.filter(item => {
        // Aplicar filtro por sexo
        if (sexoFilter !== "" && item.Sexo !== sexoFilter) {
            return false; // Si el sexo no coincide, filtrar este elemento
        }

        // Aplicar filtro por grado
        if (gradoFilter !== "" && !item.Grado.toLowerCase().includes(gradoFilter)) {
            return false; // Si el grado no coincide, filtrar este elemento
        }

        // Aplicar filtro por interés en actividades extracurriculares
        if (actividadesFilter !== "" && item["Interés en Actividades Extracurriculares"] !== actividadesFilter) {
            return false; // Si el interés en actividades extracurriculares no coincide, filtrar este elemento
        }

        return true; // El elemento coincide con todos los filtros, mantenerlo en los resultados filtrados
    });

    displayData(filteredData); // Mostrar los datos filtrados
}

// Cargar los datos al cargar la página
window.onload = loadData;