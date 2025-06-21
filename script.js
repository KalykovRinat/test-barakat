const FORM_DATA = document.querySelector('.form-data');
const successAlert = document.getElementById('success-alert');
const errorAlert = document.getElementById('error-alert');

FORM_DATA.addEventListener('submit', formSend);

async function formSend(event) {
    event.preventDefault();

    const TOKEN = '7497600082:AAGOmVf0X2omtOEsbeqaa5-cEHSpE75lZpc';
    const CHAT_ID = '-1002657322598';
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const name = FORM_DATA.name.value.trim();
    const phone = FORM_DATA.phone.value.trim();
    const date = FORM_DATA.date.value;
    const time = FORM_DATA.time.value;
    const seats = FORM_DATA.seats.value;

    if (!name || !phone || !date || !time || !seats) {
        showMessage(false);
        return;
    }

    const message = `
<b>Новое бронирование:</b>
👤 Имя: ${name}
📞 Телефон: ${phone}
📅 Дата: ${date}
⏰ Время: ${time}
👥 Кол-во мест: ${seats}
    `;

    try {
        const response = await fetch(URI_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'html'
            }),
        });

        const result = await response.json();

        if (result.ok) {
            showMessage(true);
            FORM_DATA.reset();
        } else {
            showMessage(false);
        }
    } catch (error) {
        console.error(error);
        showMessage(false);
    }
}

function showMessage(success) {
    if (success) {
        successAlert.classList.remove('hidden');
        errorAlert.classList.add('hidden');
    } else {
        errorAlert.classList.remove('hidden');
        successAlert.classList.add('hidden');
    }
}
