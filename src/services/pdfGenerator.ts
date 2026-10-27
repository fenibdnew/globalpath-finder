import { jsPDF } from 'jspdf';
import { ChecklistItem } from '../types';

export interface PdfExportOptions {
  applicantName: string;
  passportNumber: string;
  targetCountry: string;
  visaType: string;
  appointmentDate: string;
  intakeCenter: string;
  dossierNumber: string;
}

export function generateEmbassyChecklistPdf(
  items: ChecklistItem[],
  options: PdfExportOptions
): void {
  // Initialize standard A4 PDF document (210 x 297 mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  let currentY = margin;

  // Colors
  const euroBlue = [0, 51, 153];       // #003399
  const darkSlate = [15, 23, 42];      // #0F172A
  const lightBg = [248, 250, 252];     // #F8FAFC
  const borderGray = [203, 213, 225];  // #CBD5E1
  const textGray = [100, 116, 139];    // #64748B
  const emeraldGreen = [16, 185, 129]; // #10B981

  // Top decorative European bar
  doc.setFillColor(euroBlue[0], euroBlue[1], euroBlue[2]);
  doc.rect(0, 0, pageWidth, 5, 'F');

  currentY = 12;

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(euroBlue[0], euroBlue[1], euroBlue[2]);
  doc.text('EUROPEAN UNION IMMIGRATION & CONSULAR SERVICES', margin, currentY);

  currentY += 6;
  doc.setFontSize(11);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('OFFICIAL DOSSIER DOCUMENT CHECKLIST & INTAKE PROTOCOL', margin, currentY);

  // Subtitle / Standard notation
  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text(
    'Regulation (EU) 2016/1191 & Schengen Consular Standards • Printed: ' +
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    margin,
    currentY
  );

  currentY += 4;
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.4);
  doc.line(margin, currentY, pageWidth - margin, currentY);

  currentY += 5;

  // Applicant & Appointment Details Block
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 28, 2, 2, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 28, 2, 2, 'S');

  const col1X = margin + 4;
  const col2X = margin + 68;
  const col3X = margin + 130;

  // Row 1
  let detailY = currentY + 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text('APPLICANT LEGAL NAME:', col1X, detailY);
  doc.text('TARGET EU MEMBER STATE:', col2X, detailY);
  doc.text('DOSSIER REFERENCE NO:', col3X, detailY);

  detailY += 4.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(options.applicantName || 'Principal Applicant', col1X, detailY);
  doc.text(options.targetCountry || 'Germany (Federal Republic)', col2X, detailY);
  doc.setFont('courier', 'bold');
  doc.setFontSize(9);
  doc.text(options.dossierNumber || 'EPF-2026-VFS-7892', col3X, detailY);

  // Row 2
  detailY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text('PASSPORT NUMBER:', col1X, detailY);
  doc.text('VISA / PERMIT CATEGORY:', col2X, detailY);
  doc.text('APPOINTMENT DATE & INTAKE:', col3X, detailY);

  detailY += 4.5;
  doc.setFont('courier', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text(options.passportNumber || 'A-88291034', col1X, detailY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(options.visaType || 'Chancenkarte (Opportunity Card 2026)', col2X, detailY);
  doc.text(options.appointmentDate || 'November 04, 2026', col3X, detailY);

  currentY += 34;

  // Dossier Verification Metrics Banner
  const completedCount = items.filter(i => i.isCompleted).length;
  const totalCount = items.length;
  const percent = Math.round((completedCount / (totalCount || 1)) * 100);

  doc.setFillColor(euroBlue[0], euroBlue[1], euroBlue[2]);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 8, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `CONSOLIDATED VERIFICATION STATUS: ${completedCount} OF ${totalCount} DOCUMENTS READY (${percent}% COMPLIANCE)`,
    margin + 4,
    currentY + 5.5
  );
  doc.text(
    `INTAKE CENTER: ${options.intakeCenter || 'German Embassy / VFS Global'}`,
    pageWidth - margin - 4,
    currentY + 5.5,
    { align: 'right' }
  );

  currentY += 12;

  // Table Column Headers
  doc.setFillColor(235, 240, 248);
  doc.rect(margin, currentY, pageWidth - margin * 2, 7, 'F');
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.rect(margin, currentY, pageWidth - margin * 2, 7, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);

  doc.text('STATUS', margin + 3, currentY + 4.8);
  doc.text('CATEGORY', margin + 22, currentY + 4.8);
  doc.text('DOCUMENT TITLE & STATUTORY SPECIFICATION', margin + 50, currentY + 4.8);
  doc.text('OFFICER CHECK', pageWidth - margin - 22, currentY + 4.8);

  currentY += 7;

  // Table Body Rows
  items.forEach((item, index) => {
    // Page overflow check
    if (currentY > pageHeight - 45) {
      doc.addPage();
      currentY = margin;
      // Header on new page
      doc.setFillColor(euroBlue[0], euroBlue[1], euroBlue[2]);
      doc.rect(0, 0, pageWidth, 4, 'F');
      currentY = 10;
    }

    const rowHeight = item.description ? 12 : 9;
    const isEven = index % 2 === 0;

    if (isEven) {
      doc.setFillColor(252, 253, 255);
      doc.rect(margin, currentY, pageWidth - margin * 2, rowHeight, 'F');
    }

    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.rect(margin, currentY, pageWidth - margin * 2, rowHeight, 'S');

    // Status Checkbox box
    const checkX = margin + 4;
    const checkY = currentY + 2.5;
    doc.setDrawColor(item.isCompleted ? emeraldGreen[0] : borderGray[0], item.isCompleted ? emeraldGreen[1] : borderGray[1], item.isCompleted ? emeraldGreen[2] : borderGray[2]);
    doc.setLineWidth(0.5);
    doc.rect(checkX, checkY, 4, 4);

    if (item.isCompleted) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]);
      doc.text('X', checkX + 1, checkY + 3.2);
    }

    // Status label
    doc.setFont('helvetica', item.isCompleted ? 'bold' : 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(item.isCompleted ? emeraldGreen[0] : textGray[0], item.isCompleted ? emeraldGreen[1] : textGray[1], item.isCompleted ? emeraldGreen[2] : textGray[2]);
    doc.text(item.isCompleted ? 'VERIFIED' : 'PENDING', margin + 9.5, checkY + 3.2);

    // Category
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(euroBlue[0], euroBlue[1], euroBlue[2]);
    doc.text(item.category.toUpperCase(), margin + 22, currentY + 5);

    // Document Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
    const maxTitleWidth = 108;
    const splitTitle = doc.splitTextToSize(item.title, maxTitleWidth);
    doc.text(splitTitle[0] || item.title, margin + 50, currentY + 4.5);

    // Document Description / Notes
    if (item.description) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(textGray[0], textGray[1], textGray[2]);
      const splitDesc = doc.splitTextToSize(item.description, maxTitleWidth);
      doc.text(splitDesc[0] || '', margin + 50, currentY + 8.5);
    }

    // Officer intake box
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.rect(pageWidth - margin - 18, currentY + 2.5, 12, 5);

    currentY += rowHeight;
  });

  currentY += 5;

  // Consular Guidance & Anti-Fraud Notice Box
  if (currentY > pageHeight - 48) {
    doc.addPage();
    currentY = margin;
  }

  doc.setFillColor(254, 249, 195); // Pale yellow
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 16, 2, 2, 'F');
  doc.setDrawColor(234, 179, 8);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 16, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(133, 77, 14);
  doc.text('CONSULAR INTAKE ADVISORY & ANTI-FRAUD NOTICE (2026/2027):', margin + 3, currentY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(113, 63, 18);
  const adviceText =
    '• All educational certificates and civil status papers must carry the 1961 Hague Apostille and official court translations.\n' +
    '• Submit 2 identical physical copies arranged exactly according to the statutory sequence above. Do not staple original passports.\n' +
    '• Beware of unauthorized intermediaries charging excessive fees. National visas (Type D) are strictly processed via accredited missions.';
  doc.text(adviceText, margin + 3, currentY + 8);

  currentY += 21;

  // Sign-off and Consular Stamp Section
  if (currentY > pageHeight - 35) {
    doc.addPage();
    currentY = margin;
  }

  const signBoxWidth = (pageWidth - margin * 2 - 6) / 2;

  // Applicant Box
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(margin, currentY, signBoxWidth, 24, 1.5, 1.5, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('APPLICANT DECLARATION & SIGNATURE', margin + 3, currentY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text('I declare that all submitted instruments are genuine.', margin + 3, currentY + 8);
  doc.line(margin + 3, currentY + 18, margin + signBoxWidth - 3, currentY + 18);
  doc.text('Signature & Date (DD/MM/YYYY)', margin + 3, currentY + 21.5);

  // Consular Official Box
  const officerX = margin + signBoxWidth + 6;
  doc.roundedRect(officerX, currentY, signBoxWidth, 24, 1.5, 1.5, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkSlate[0], darkSlate[1], darkSlate[2]);
  doc.text('VFS / CONSULAR INTAKE OFFICER ONLY', officerX + 3, currentY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text('Physical seal & biometric verification stamp:', officerX + 3, currentY + 8);
  doc.line(officerX + 3, currentY + 18, officerX + signBoxWidth - 3, currentY + 18);
  doc.text('Officer ID, Signature & Official Mission Stamp', officerX + 3, currentY + 21.5);

  // Footer page numbers & code
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textGray[0], textGray[1], textGray[2]);
  doc.text('EuroPath Finder • European Consular Dossier System', margin, pageHeight - 4);
  doc.text('Page 1 of 1 • Valid for Consular Intake in 2026/2027', pageWidth - margin, pageHeight - 4, { align: 'right' });

  // Save / Trigger Download
  const sanitizedCountry = (options.targetCountry || 'Europe').replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `EuroPath_Consolidated_Embassy_Checklist_${sanitizedCountry}_2026.pdf`;
  doc.save(filename);
}
