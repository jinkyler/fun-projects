function onFormSubmit(e) {
  var responses = e.values; // ข้อมูลที่ได้รับจากฟอร์ม
  var taskName = responses[1]; // Task Name ที่กรอกในฟอร์ม (สมมุติเป็นคอลัมน์ที่ 1)
  var status = responses[2]; // สถานะที่กรอกในฟอร์ม (สมมุติเป็นคอลัมน์ที่ 2)

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('info');
  var data = sheet.getDataRange().getValues();
  
  // หา Task ที่ตรงกันในชีต info
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == taskName) { // ถ้า Task Name ตรงกัน
      sheet.getRange(i + 1, 6).setValue(status); // อัปเดตคอลัมน์สถานะในชีต
      break;
    }
  }
  
  // รับอีเมลของผู้กรอกและตัดชื่อผู้กรอก
  var email = Session.getActiveUser().getEmail(); // รับอีเมล
  var senderName = email.substring(0, email.indexOf('@')); // ตัดชื่อก่อนเครื่องหมาย @

  // สร้างข้อความแจ้งเตือน
  var message = "📌 Task: " + taskName + "\n" +
                "📋 Status: " + status + "\n" +
                "👤 Sender: " + senderName; // ใช้ชื่อผู้กรอก

  var botToken = "7629640390:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1Q4"; // ใส่ Telegram Bot Token
  var chatId = "XXXXXXXXX"; // ใส่ Chat ID ของกลุ่มหรือบุคคล
  sendToTelegram(botToken, chatId, message);
}

function sendTelegramNotification() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('info');
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    var task = data[i][0];
    var round = data[i][1];
    var customerName = data[i][2];
    var action = data[i][3];

    var startDate = new Date(data[i][6]); 
    var endDate = new Date(data[i][7]);

    var formattedStartDate = Utilities.formatDate(startDate, Session.getScriptTimeZone(), "dd-MM-yyyy");
    var formattedEndDate = Utilities.formatDate(endDate, Session.getScriptTimeZone(), "dd-MM-yyyy");

    var today = new Date();
    today.setHours(9, 0, 0, 0); 
    var formattedToday = Utilities.formatDate(today, Session.getScriptTimeZone(), "dd-MM-yyyy");

    Logger.log("Formatted Start Date: " + formattedStartDate + " - Today: " + formattedToday);

    if (formattedStartDate === formattedToday) {
      var message = "📌 Task: " + task + "\n" +
                    "🔄 Round: " + round + "\n" +
                    "🏢 Customer Name: " + customerName + "\n" +
                    "🛠 Action: " + action + "\n" +
                    "🟢 Start Date: " + formattedStartDate + "\n" +
                    "🛑 End Date: " + formattedEndDate + "\n" +
                    "👤 Owner: " + data[i][8] + "\n" +
                    "🔗 กรุณาคลิกลิงก์เพื่อตอบกลับสถานะ: https://forms.gle/pEuubi5BPyQL2bRg6";

      var botToken = "7629640390:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1Q4"; // ใส่ Telegram Bot Token
      var chatId = "XXXXXXXXX"; // ใส่ Chat ID
      sendToTelegram(botToken, chatId, message);
    }
  }
}

function sendToTelegram(botToken, chatId, message) {
  var url = "https://api.telegram.org/bot" + botToken + "/sendMessage";
  var payload = {
    "chat_id": chatId,
    "text": message,
    "parse_mode": "Markdown"
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}
