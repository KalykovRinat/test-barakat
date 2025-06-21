const menu = {
  "Свежесть": 190,
  "Свежесть по китайский": 190,
  "Шакарап": 185,
  "Гнездо": 265,
  "Острое впечатление": 290,
  "Хрустяшие баклажаны": 290,
  "Салат греческий": 230,
  "Салат цезарь": 300,
  "Оливье": 230,
  "Язык дракона": 310,
  "Лян фу": 160,
  "Капуста по корейский": 140,
  "Салат кимчи": 140,
  "Моровча по корейский": 120,
  "Сет из трех салатов": 200,
  "Лагман по узбекский": 255,
  "Шорпо из баранины": 345,
  "Шорпо по казахски": 230,
  "Чучвара": 230,
  "Мастава": 255,
  "Суп с фрикадельками": 255,
  "Суп с фрикадельками по китайский": 255,
  "Пельмени": 210,
  "Солянка": 335,
  "Борщ красный": 210,
  "Суп с грибами": 255,
  "Рамен": 310,
  "Том ян с курицей": 400,
  "Том ян с морепродуктами": 460,
  "Кимчи": 350,
  "Сантавро": 370,
  "Плов по чайханский": 245,
  "Плов самарканский": 255,
  "Самсы ташкеская": 100,
  "Манты": 255,
  "Манты жареннык": 265,
  "Дапанджи с рисом": 335,
  "Дапанджи с тестом": 335,
  "Куурдак": 520,
  "Кара куурдак": 635,
  "Азу по татарский": 370,
  "Карын сяй": 310,
  "Курица с овошями и рисом": 370,
  "Нагетсы в кисло сладком соусе": 345,
  "Курица жаренная с арахисом": 460,
  "Мясо по китайский с рисом": 405,
  "Босо лагман": 310,
  "Гюру лагман": 310,
  "Ганфан": 310,
  "Пельмени запеченный": 310,
  "Жаренные пельмени": 245,
  "Котлета": 115,
  "Фрикасе с курицей": 290,
  "Бризоль": 230,
  "Бифштекс с глазурью": 195,
  "Сосиски жаренная": 60,
  "Мясо по француски в горшочке": 335
};

const dishSelect = document.getElementById("dish-select");
const dishQuantity = document.getElementById("dish-quantity");
const addDishBtn = document.getElementById("add-dish");
const orderList = document.getElementById("order-list");
const totalPriceEl = document.getElementById("total-price");

const order = [];

for (const dish in menu) {
  const option = document.createElement("option");
  option.value = dish;
  option.textContent = `${dish} (${menu[dish]} с.)`;
  dishSelect.appendChild(option);
}

addDishBtn.addEventListener("click", () => {
  const dish = dishSelect.value;
  const quantity = parseInt(dishQuantity.value);
  if (!dish || quantity < 1) return;
  order.push({ dish, quantity });
  renderOrder();
});

function renderOrder() {
  orderList.innerHTML = "";
  let total = 0;
  order.forEach(({ dish, quantity }) => {
    const price = menu[dish] * quantity;
    total += price;
    const li = document.createElement("li");
    li.textContent = `${dish} — ${quantity} шт. = ${price} с.`;
    orderList.appendChild(li);
  });
  totalPriceEl.textContent = total;
}

document.getElementById("delivery-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = this.name.value;
  const phone = this.phone.value;
  const address = this.address.value;
  const fileInput = this.querySelector('input[type="file"]');
  const file = fileInput.files[0];

  let orderText = "";
  let total = 0;
  order.forEach(({ dish, quantity }) => {
    const price = menu[dish];
    const itemTotal = price * quantity;
    total += itemTotal;
    orderText += `🍽 ${dish}: ${quantity} шт. = ${itemTotal} с.\n`;
  });

  const message = `📦 Новый заказ!
👤 Имя: ${name}
📱 Телефон: ${phone}
📍 Адрес: ${address}

${orderText}
💰 Общая сумма: ${total} с.`;

  const token = "7497600082:AAGOmVf0X2omtOEsbeqaa5-cEHSpE75lZpc";
  const chat_id = "-1002657322598";

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ chat_id, text: message })
  });

  if (file) {
    const formData = new FormData();
    formData.append("chat_id", chat_id);
    formData.append("document", file);
    await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
      method: "POST",
      body: formData
    });
  }

  alert("Заказ и файл отправлены!");
  this.reset();
  order.length = 0;
  renderOrder();
});
function renderOrder() {
  orderList.innerHTML = "";
  let total = 0;

  order.forEach(({ dish, quantity }, index) => {
    const price = menu[dish] * quantity;
    total += price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${dish} — ${quantity} шт. = ${price} с.
      <button class="remove-btn" onclick="removeDish(${index})">Удалить</button>
    `;
    orderList.appendChild(li);
  });

  totalPriceEl.textContent = total;
}

function removeDish(index) {
  order.splice(index, 1);
  renderOrder();
}


  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      order.splice(index, 1);
      renderOrder();
    });
  });

