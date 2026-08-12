import React from 'react';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';
import { UserFinancialState } from '../../types';
import { calculateSalaryAllocation } from '../../calculations/allocationEngine';
import { calculateFinancialHealthScore } from '../../calculations/healthScoreEngine';

interface PdfExporterProps {
  userState: UserFinancialState;
}

export const PdfReportExporter: React.FC<PdfExporterProps> = ({ userState }) => {
  const exportPdf = () => {
    const doc = new jsPDF();
    const allocation = calculateSalaryAllocation(userState);
    const health = calculateFinancialHealthScore(userState);

    // Header
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('SalaryWise - Financial Plan Report', 14, 18);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(52, 211, 153); // emerald-400
    doc.text('Created & Designed by Harsh', 14, 26);

    doc.setTextColor(148, 163, 184);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 145, 26);

    // Summary Section
    let y = 45;
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Monthly Income & Allocation Summary', 14, y);

    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Monthly In-Hand Income: Rs. ${userState.monthlySalary.toLocaleString('en-IN')}`, 14, y);
    doc.text(`Financial Health Score: ${health.totalScore} / 100 (${health.rating})`, 120, y);

    y += 10;
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, 182, 35, 'F');

    y += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Category', 20, y);
    doc.text('Recommended Allocation', 80, y);
    doc.text('Percentage', 150, y);

    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(`Essential Needs`, 20, y);
    doc.text(`Rs. ${allocation.recommendedAllocation.needs.toLocaleString('en-IN')}`, 80, y);
    doc.text(`${allocation.recommendedAllocation.needsPercent}%`, 150, y);

    y += 5;
    doc.text(`Debt / EMIs`, 20, y);
    doc.text(`Rs. ${allocation.recommendedAllocation.debt.toLocaleString('en-IN')}`, 80, y);
    doc.text(`${allocation.recommendedAllocation.debtPercent}%`, 150, y);

    y += 5;
    doc.text(`Emergency Fund`, 20, y);
    doc.text(`Rs. ${allocation.recommendedAllocation.emergency.toLocaleString('en-IN')}`, 80, y);
    doc.text(`${allocation.recommendedAllocation.emergencyPercent}%`, 150, y);

    y += 5;
    doc.text(`Investments`, 20, y);
    doc.text(`Rs. ${allocation.recommendedAllocation.investments.toLocaleString('en-IN')}`, 80, y);
    doc.text(`${allocation.recommendedAllocation.investmentsPercent}%`, 150, y);

    y += 5;
    doc.text(`Lifestyle & Wants`, 20, y);
    doc.text(`Rs. ${allocation.recommendedAllocation.wants.toLocaleString('en-IN')}`, 80, y);
    doc.text(`${allocation.recommendedAllocation.wantsPercent}%`, 150, y);

    // Reasoning
    y += 15;
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Personalized Guidance & Reasoning', 14, y);

    y += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    allocation.allocationReasoning.forEach((reason) => {
      const splitText = doc.splitTextToSize(`• ${reason}`, 180);
      doc.text(splitText, 14, y);
      y += splitText.length * 5;
    });

    // Strengths & Warnings
    y += 4;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Strengths & Action Items:', 14, y);

    y += 5;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    health.positivePoints.forEach((pt) => {
      doc.setTextColor(22, 101, 52);
      doc.text(pt, 14, y);
      y += 4.5;
    });

    health.warningPoints.forEach((wpt) => {
      doc.setTextColor(153, 27, 27);
      doc.text(wpt, 14, y);
      y += 4.5;
    });

    // Footer Attribution
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.text(
      'SalaryWise • Designed & Built by Harsh. Educational financial planner. Market investments involve risk.',
      14,
      285
    );

    doc.save(`SalaryWise_Plan_${userState.monthlySalary}.pdf`);
  };

  return (
    <button
      onClick={exportPdf}
      className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
    >
      <Download className="w-4 h-4" />
      <span>Download PDF Report</span>
    </button>
  );
};
