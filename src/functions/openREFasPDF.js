import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {Canvg} from 'canvg';


const generatePdf = async (ref) => {
    const content = ref.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    const margin = 10;
    const tableWidth = pdfWidth - 2 * margin;
    const tableHeight = (imgProps.height * tableWidth) / imgProps.width;
  
    // Загружаем SVG как текст
    const response = await fetch('/Images/cramo-logo.svg');
    const svgText = await response.text();
  
    // Конвертируем SVG в PNG с помощью canvg
    const logoCanvas = document.createElement('canvas');
    const ctx = logoCanvas.getContext('2d');
    const v = Canvg.fromString(ctx, svgText);
    await v.render();
    const logoData = logoCanvas.toDataURL('image/png');
  
    // Устанавливаем размеры логотипа
    const logoWidth = pdfWidth * 0.3; // Логотип занимает 30% ширины страницы
    const logoHeight = (logoCanvas.height * logoWidth) / logoCanvas.width;
    pdf.addImage(logoData, 'PNG', margin, margin, logoWidth, logoHeight);
  
    // Добавляем текст "Ställning 54239" справа от логотипа
    pdf.setFontSize(16);
    pdf.text('Ställning 54239', margin + logoWidth + 10, margin + logoHeight / 2);
  
    // Добавляем таблицу
    pdf.addImage(imgData, 'PNG', margin, margin + logoHeight + 20, tableWidth, tableHeight);
  
    return pdf;
  };

  export default async function  showPDF(ref){
    const pdf =  await generatePdf(ref);
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }