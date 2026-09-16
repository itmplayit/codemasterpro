import { useState } from 'react'
import jsPDF from 'jspdf'

export default function PDFCertificate({ certificate, userName, courseTitle }) {
  const [generating, setGenerating] = useState(false)

  const generatePDF = () => {
    setGenerating(true)
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      // Background
      doc.setFillColor(15, 15, 18)
      doc.rect(0, 0, 297, 210, 'F')

      // Border
      doc.setDrawColor(251, 191, 36)
      doc.setLineWidth(2)
      doc.rect(10, 10, 277, 190)

      doc.setDrawColor(251, 191, 36)
      doc.setLineWidth(0.5)
      doc.rect(13, 13, 271, 184)

      // Title
      doc.setTextColor(255, 255, 255)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(32)
      doc.text('CERTIFICATE', 148.5, 40, { align: 'center' })

      doc.setFontSize(14)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(200, 200, 200)
      doc.text('OF COMPLETION', 148.5, 48, { align: 'center' })

      // Line
      doc.setDrawColor(251, 191, 36)
      doc.setLineWidth(0.5)
      doc.line(100, 55, 197, 55)

      // Content
      doc.setTextColor(180, 180, 180)
      doc.setFontSize(12)
      doc.text('This is to certify that', 148.5, 70, { align: 'center' })

      doc.setTextColor(255, 255, 255)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(28)
      doc.text(userName || 'Student Name', 148.5, 85, { align: 'center' })

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(180, 180, 180)
      doc.setFontSize(12)
      doc.text('has successfully completed', 148.5, 95, { align: 'center' })

      doc.setTextColor(251, 191, 36)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(18)
      doc.text(courseTitle || 'Course Title', 148.5, 110, { align: 'center' })

      doc.setTextColor(150, 150, 150)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.text(`Certificate ID: ${certificate?.certificate_id || 'CM-XXXX'}`, 148.5, 135, { align: 'center' })
      doc.text(`Issued: ${new Date(certificate?.issued_at || Date.now()).toLocaleDateString()}`, 148.5, 142, { align: 'center' })
      doc.text(`Verify at: codemaster.pro/verify/${certificate?.certificate_id}`, 148.5, 149, { align: 'center' })

      // Footer
      doc.setTextColor(100, 100, 100)
      doc.setFontSize(8)
      doc.text('CodeMaster Pro • Professional Coding Education • XAMPP MySQL + ReactJS + Razorpay', 148.5, 190, { align: 'center' })

      doc.save(`${courseTitle || 'certificate'}_${certificate?.certificate_id || 'CM'}.pdf`)
    } catch (err) {
      console.error(err)
      alert('PDF generation failed: ' + err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button onClick={generatePDF} disabled={generating} className="flex-1 btn-primary !py-2 text-sm flex items-center justify-center gap-2">
      {generating ? 'Generating...' : 'Download PDF'}
    </button>
  )
}
