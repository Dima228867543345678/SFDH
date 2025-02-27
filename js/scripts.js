const brokerUrl = "ws://192.168.0.105:9001"; // WebSocket-порт
const topic = "ai/command"; // Топик для сообщений

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
    console.log("✅ Подключено к MQTT!");
    client.subscribe(topic); // Подписываемся на топик
});

client.on("error", (err) => {
    console.error("❌ Ошибка MQTT:", err);
});

// Отправка сообщения (с проверкой подключения)
function sendMessage(message) {
    if (client.connected) {
        client.publish(topic, message);
        console.log(`📤 Отправлено: ${message}`);
    } else {
        console.error("⚠️ MQTT не подключён! Сообщение не отправлено.");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.device-button').forEach(button => {
        const deviceNumber = button.getAttribute('data-led-id'); // Получаем значение кастомного атрибута
        const isActive = localStorage.getItem(`device-${deviceNumber}`) === "true";

        if (isActive) {
            button.classList.add('active'); // Восстанавливаем активное состояние
        }

        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const newState = button.classList.contains('active');

            localStorage.setItem(`device-${deviceNumber}`, newState); // Сохраняем состояние

            const command = newState ? "turn_on_led_strip" : "turn_off_led_strip";

            const message = JSON.stringify({
                commands: [{ group: "led_strip", command: command, number: deviceNumber }]
            });

            sendMessage(message); // Отправляем MQTT команду
        });
    });
});



