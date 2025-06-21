document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('order-modal').style.display = 'block';
        
        const comboCard = this.closest('.combo-card');
        const comboName = comboCard.querySelector('h3').innerText;
        document.getElementById('selected-combo').innerText = comboName;
    });
});

document.querySelector('.modal .close').addEventListener('click', function() {
    document.getElementById('order-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('order-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const address = this.address.value.trim();
    const phone = this.phone.value.trim();
    const receipt = this.receipt.files[0];
    const selectedCombo = document.getElementById('selected-combo').innerText;

    const botToken = '7497600082:AAGOmVf0X2omtOEsbeqaa5-cEHSpE75lZpc';
    const chatId = '-1002657322598';

    if (!receipt) {
        alert('❗ Пожалуйста, загрузите чек.');
        return;
    }

    let formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', `📦 Новый заказ!\n\n🍽 Комбо: ${selectedCombo}\n👤 Имя: ${name}\n🏠 Адрес: ${address}\n📞 Телефон: ${phone}`);
    formData.append('document', receipt);

    fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('✅ Заказ отправлен! Мы скоро свяжемся с вами.');
            document.getElementById('order-form').reset();
            document.getElementById('order-modal').style.display = 'none';
        } else {
            alert('❌ Ошибка отправки. Попробуйте ещё раз.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('❌ Ошибка отправки.');
    });
});
