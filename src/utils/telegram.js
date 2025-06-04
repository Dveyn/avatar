const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

// Кэш для хранения ID пользователей
let cachedUserIds = new Set();

// Функция для получения списка пользователей
const fetchUserIds = async () => {
  try {
    if (!TELEGRAM_BOT_TOKEN) {
      console.error('NEXT_PUBLIC_TELEGRAM_BOT_TOKEN не определен в .env файле');
      return;
    }

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    const data = await response.json();
    
    if (!data.ok) {
      console.error('Ошибка получения обновлений:', data);
      return;
    }

    // Собираем уникальные ID пользователей из всех обновлений
    data.result.forEach(update => {
      if (update.message && update.message.from) {
        cachedUserIds.add(update.message.from.id);
      }
    });

    // Если нашли новых пользователей, отправляем им приветственное сообщение
    if (cachedUserIds.size > 0) {
      console.log('Найдены пользователи:', Array.from(cachedUserIds));
    }
  } catch (error) {
    console.error('Ошибка при получении списка пользователей:', error);
  }
};

export const sendTelegramNotification = async (message) => {
  try {
    // Проверяем наличие токена
    if (!TELEGRAM_BOT_TOKEN) {
      console.error('NEXT_PUBLIC_TELEGRAM_BOT_TOKEN не определен в .env файле');
      return;
    }

    // Если кэш пустой, обновляем список пользователей
    if (cachedUserIds.size === 0) {
      await fetchUserIds();
    }

    // Если после обновления все еще нет пользователей
    if (cachedUserIds.size === 0) {
      try {
        const botInfoResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
        const botInfo = await botInfoResponse.json();
        
        if (!botInfo.ok) {
          console.error('Ошибка получения информации о боте:', botInfo);
          return;
        }

        console.log(`
⚠️ Внимание! Бот не нашел пользователей для отправки уведомлений.
Для настройки:
1. Найдите бота в Telegram: @${botInfo.result.username}
2. Начните с ним диалог, отправив /start
3. Отправьте любое сообщение боту
После этого бот автоматически добавит вас в список получателей уведомлений.
        `);
      } catch (error) {
        console.error('Ошибка при получении информации о боте:', error);
      }
      return;
    }

    // Отправляем сообщение каждому пользователю
    const sendPromises = Array.from(cachedUserIds).map(userId => 
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: userId,
          text: message,
          parse_mode: 'HTML'
        })
      }).then(async (response) => {
        const result = await response.json();
        if (!result.ok) {
          console.error(`Ошибка отправки пользователю ${userId}:`, result);
          // Если пользователь заблокировал бота, удаляем его из списка
          if (result.description.includes('blocked')) {
            cachedUserIds.delete(userId);
          }
          throw new Error(`Ошибка отправки пользователю ${userId}: ${result.description}`);
        }
        return result;
      })
    );

    await Promise.all(sendPromises);
  } catch (error) {
    console.error('Ошибка отправки Telegram уведомления:', error);
  }
}; 
