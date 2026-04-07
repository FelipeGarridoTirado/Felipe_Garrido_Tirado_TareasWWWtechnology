function nextStep(step) {
	let tabTrigger = document.querySelector(
		`button[data-bs-target="#step${step}"]`
	);

	let tab = new bootstrap.Tab(tabTrigger);
	tab.show();
    updateProgress(step);
}

function previousStep(step) {
	let tabTrigger = document.querySelector(
		`button[data-bs-target="#step${step}"]`
	);

	let tab = new bootstrap.Tab(tabTrigger);
	tab.show();
    updateProgress(step);
}

function submitForm() {

    showAlert('Registration completed successfully', 'success');
}

function showAlert(message, type) {
	let area = document.getElementById("alert-area");
	let alert = document.createElement("div");

	alert.className = "alert alert-" + type;
	alert.textContent = message;

	area.appendChild(alert);
	setTimeout(() => alert.remove(), 3000);
}

function validateStep1() {
    // 1. Obtener los valores de los inputs de nombre y email
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();

    // 2. Comprobar si alguno de los dos está vacío
    if (name === "" || email === "") {
        // 3. Llamar a la función showAlert con el mensaje y el tipo 'danger'
        showAlert('Please fill all fields', 'danger');
        
        // 4. Devolver false para detener el avance al siguiente paso
        return false;
    }

    // 5. Si todo está correcto, devolver true
    return true;
}

function handleStep1Next() {
    // Primero, ejecutamos la validación
    let isValid = validateStep1();

    // Si la validación es exitosa (devuelve true), entonces avanzamos al Paso 2
    if (isValid) {
        nextStep(2);
    }
    // Si isValid es false, la función showAlert (dentro de validateStep1) ya habrá 
    // avisado al usuario, y no hacemos nada más, quedándonos en el Paso 1.
}

function updateProgress(step) {
	let progress = document.getElementById("wizardProgress");
	let percent = (step / 3) * 100;

	progress.style.width = percent + "%";
}