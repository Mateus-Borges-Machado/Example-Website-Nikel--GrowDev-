
const modalRegister = new bootstrap.Modal(document.getElementById('register-modal'));
let logged = sessionStorage.getItem('logged');

//CRIAR CONTA
document.getElementById('create-form').addEventListener('submit', function (e) {
    // Prevent form refresh
    e.preventDefault();

    const email = document.getElementById('email-create-input').value;
    const password = document.getElementById('password-create-input').value;

    // Validations
    if (isRegisteredEmail(email)) {
        alert('Este e-mail já está cadastrado.');
        return;
    }

    if (email.length < 5) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    if (password.length < 4) {
        alert('A senha deve ter no mínimo 4 caracteres.');
        return;
    }

    saveAccount({ email: email, password: password, transactions: [] });

    document.getElementById('create-form').reset();

    modalRegister.hide();

    alert('Conta criada com sucesso!');
});


function saveAccount(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
    return;
}

function isRegisteredEmail(email) {
    const account = getAccount(email);
    if (account) {
        return true;
    }
    return false;
}

//LOGAR
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const session = document.getElementById('session-check').checked;

    const account = getAccount(email);

    if (!account || account.password !== password) {
        alert('Ops! Verifique o usuário ou a senha.');
        return;
    }

    saveSession(email, session);
    
    window.location.href = 'home.html';
});

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if (logged) {
        window.location.href = 'home.html';
    }
}

function getAccount(key) {
    return JSON.parse(localStorage.getItem(key));

    if (account) {
        return JSON.parse(account);
    }
    return '';
}

function saveSession(email, saveSession) {
    if (saveSession) {
        localStorage.setItem('session', email);
    }
    sessionStorage.setItem('logged', email);
}

checkLogged();

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password-input');
    const toggleIcon = document.getElementById('toggle-password-visibility');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('bi-eye-slash');
        toggleIcon.classList.add('bi-eye');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('bi-eye');
        toggleIcon.classList.add('bi-eye-slash');
    }
}