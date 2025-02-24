import { PDFDocument, rgb, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

async function fetchImage(imageUrl) {
  const response = await fetch(imageUrl);
  return await response.arrayBuffer();
}

async function fetchFont(url) {
  const response = await fetch(url);
  return await response.arrayBuffer();
}

export async function generateCharacterBlock(avatar) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  // Фон блока
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    color: rgb(0.85, 0.9, 1),
    borderColor: rgb(0.4, 0.5, 0.9),
    borderWidth: 2,
  });

  // Заголовок
  page.drawRectangle({
    x: 20,
    y: height - 80,
    width: width - 40,
    height: 40,
    color: rgb(0.4, 0.5, 0.9),
  });

  const fontBytes = await fetchFont('/fonts/Manrope.ttf');
  const font = await pdfDoc.embedFont(fontBytes);

  page.drawText(avatar.name, {
    x: 40,
    y: height - 65,
    size: 18,
    font,
    color: rgb(1, 1, 1),
  });

  // Левый столбец: Ресурс и Тень
  let currentY = height - 140;
  const leftColumnX = 40;

  page.drawText('РЕСУРС', {
    x: leftColumnX,
    y: currentY,
    size: 14,
    font,
    color: rgb(0, 0, 0.5),
  });

  const resources = avatar.resources.slice(0, 5);

  currentY -= 20;
  resources.forEach((res) => {
    page.drawText(res, {
      x: leftColumnX + 10,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 18;
  });

  currentY -= 10;
  page.drawText('ТЕНЬ', {
    x: leftColumnX,
    y: currentY,
    size: 14,
    font,
    color: rgb(0, 0, 0.5),
  });

  const shadows = avatar.shadow.slice(0, 5);

  currentY -= 20;
  shadows.forEach((shadow) => {
    page.drawText(shadow, {
      x: leftColumnX + 10,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 18;
  });

  // Изображение персонажа по центру
  const imageBytes = await fetchImage(avatar.imgProfile);
  const pngImage = await pdfDoc.embedPng(imageBytes);
  const imgDims = pngImage.scale(0.2);
  page.drawImage(pngImage, {
    x: (width - imgDims.width) / 2,
    y: 220,
    width: imgDims.width,
    height: imgDims.height,
  });

  // Правый столбец: Характер персонажа
  let rightColumnX = width / 2 + imgDims.width / 2 + 20;
  let descY = height - 140;

  page.drawText('ХАРАКТЕР ПЕРСОНАЖА', {
    x: rightColumnX,
    y: descY,
    size: 14,
    font,
    color: rgb(0, 0, 0.5),
  });



  const description = avatar.desc;
  const wrappedDesc = wrapText(description, font, 12, width / 2 - 160);
  descY -= 25;
  wrappedDesc.forEach((line) => {
    page.drawText(line, {
      x: rightColumnX,
      y: descY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    descY -= 16;
  });

  let secondPage = pdfDoc.addPage([842, 595]);
  let { secondWidth, secondHeight } = page.getSize();
  let margin = 40;
  currentY = 555;

  // Функция для создания новой страницы
  const addNewPage = () => {
    secondPage = pdfDoc.addPage([842, 595]);
    secondWidth = secondPage.getWidth();
    secondHeight = secondPage.getHeight();
    currentY = secondHeight - margin;
  };

  // Функция для рисования заголовка
  const drawSectionTitle = (title) => {
    if (currentY < margin + 50) addNewPage();
    secondPage.drawText(title, {
      x: margin,
      y: currentY,
      size: 16,
      font,
      color: rgb(0, 0, 0.5),
    });
    currentY -= 30;
  };

  // Функция для вывода списка с проверкой на переполнение
  const drawContentList = (contentList) => {
    contentList && contentList.forEach((item, index) => {
      
   
      const wrappedLines = wrapText(`${index + 1}. ${item}`, font, 12, secondWidth - 2 * margin - 20);
      console.log(item, wrappedLines)
      wrappedLines.forEach((line) => {
        if (currentY < margin + 20) addNewPage();
        secondPage.drawText(line, {
          x: margin + 10,
          y: currentY,
          size: 12,
          font,
          color: rgb(0.1, 0.1, 0.1),
        });
        currentY -= 20;
      });
    });
  };

  // Проходим по разделам
  const sections = [
    { title: 'Ресурсы', content: avatar.resources },
    { title: 'Тень', content: avatar.shadow },
    { title: 'Проявления в действиях в ресурсе', content: avatar.manifestationsInActions },
    { title: 'Проявления в действиях тени', content: avatar.manifestationsInShadowActions },
    { title: 'Рекомендации', content: avatar.recommendations },
  ];

  for (const section of sections) {
    drawSectionTitle(section.title);
    drawContentList(section.content);
  }

  return await pdfDoc.save();
}

function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    const lineTest = currentLine + word + ' ';
    const lineWidth = font.widthOfTextAtSize(lineTest, fontSize);
    if (lineWidth > maxWidth && currentLine !== '') {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine = lineTest;
    }
  });
  if (currentLine) lines.push(currentLine.trim());

  return lines;
}
