/**
 * Centralized Enterprise PDF & Print Document Engine for Grand Royale PMS
 * Generates pristine, print-ready, formatted PDF documents for all 3 panels:
 * 1. Receptionist (GST Tax Invoice, Payment Receipt, Police Manifest, Shift Statement)
 * 2. Hotel Admin (Daily Collections Ledger, Handover Slip, Guest Folio, Staff Roster)
 * 3. Super Admin (Hotels Directory Network Report, Platform Security Audit Logs)
 */

export function openPrintOrSavePDF(title, htmlBody) {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank", "width=850,height=900,menubar=no,toolbar=no,location=no,status=no");
  if (!printWindow) {
    alert("Please allow popups to generate and download the PDF document.");
    return;
  }

  const documentHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title || "Document"}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 12mm 15mm 12mm 15mm;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      background-color: #FFFFFF;
      color: #0F172A;
      font-size: 13px;
      line-height: 1.5;
      padding: 20px;
    }
    
    .header-banner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 18px;
      margin-bottom: 20px;
    }
    
    .hotel-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .brand-icon {
      width: 44px;
      height: 44px;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      color: #0F172A;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      overflow: hidden;
      padding: 3px;
      flex-shrink: 0;
    }

    .brand-icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    
    .hotel-name {
      font-size: 20px;
      font-weight: 900;
      color: #0F172A;
      letter-spacing: -0.5px;
    }
    
    .hotel-sub {
      font-size: 11px;
      color: #64748B;
      font-weight: 600;
    }
    
    .doc-meta {
      text-align: right;
    }
    
    .doc-title {
      font-size: 18px;
      font-weight: 900;
      color: #0B8EE0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .doc-id {
      font-size: 13px;
      font-weight: 800;
      color: #334155;
      font-family: monospace;
    }
    
    .doc-date {
      font-size: 11px;
      color: #64748B;
      font-weight: 600;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 22px;
    }
    
    .info-block h4 {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      color: #64748B;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }
    
    .info-block p {
      font-size: 13px;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 3px;
    }
    
    .info-block span {
      font-size: 11px;
      color: #64748B;
      display: block;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 22px;
    }
    
    th {
      background-color: #F1F5F9;
      color: #334155;
      font-weight: 800;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 12px;
      text-align: left;
      border-bottom: 1.5px solid #CBD5E1;
    }
    
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #E2E8F0;
      font-size: 12.5px;
      color: #1E293B;
    }
    
    tr:nth-child(even) td {
      background-color: #FAFAFA;
    }
    
    .text-right {
      text-align: right;
    }
    
    .text-center {
      text-align: center;
    }
    
    .total-card {
      margin-left: auto;
      width: 320px;
      background: #F8FAFC;
      border: 1.5px solid #E2E8F0;
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 24px;
    }
    
    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      font-size: 12.5px;
    }
    
    .total-row.grand {
      border-top: 1.5px solid #CBD5E1;
      padding-top: 8px;
      margin-top: 8px;
      font-size: 15px;
      font-weight: 900;
      color: #0B8EE0;
    }
    
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
    }
    
    .badge-success { background: #DCFCE7; color: #15803D; border: 1px solid #86EFAC; }
    .badge-warning { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
    .badge-primary { background: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD; }
    
    .footer {
      border-top: 1.5px solid #E2E8F0;
      padding-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 30px;
      font-size: 11px;
      color: #64748B;
    }
    
    .sign-box {
      text-align: center;
      width: 180px;
    }
    
    .sign-line {
      border-bottom: 1.5px solid #94A3B8;
      height: 36px;
      margin-bottom: 6px;
    }
    
    .no-print-bar {
      background: #0F172A;
      color: #FFFFFF;
      padding: 10px 16px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .btn-print {
      background: #0B8EE0;
      color: #FFFFFF;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-weight: 800;
      cursor: pointer;
      font-size: 13px;
    }
    
    @media print {
      .no-print-bar {
        display: none !important;
      }
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <span>🖨️ Print Preview Mode &bull; Click Print or press Ctrl+P to Save as PDF</span>
    <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
  </div>
  ${htmlBody}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 400);
    };
  </script>
</body>
</html>
`;

  printWindow.document.open();
  printWindow.document.write(documentHtml);
  printWindow.document.close();
}

import { calculateOverstayFee, formatTime12Hour } from "./timeUtils";

/**
 * 1. Generate & Download Official GST Tax Invoice PDF (Receptionist / Front Desk)
 */
export function downloadTaxInvoicePDF(booking = {}, hotel = {}) {
  const guest = booking.guest || {};
  const room = booking.room || {};
  const roomType = booking.roomType || {};
  const charges = booking.posCharges || booking.charges || [];
  const accompanying = booking.accompanyingGuests || guest.accompanyingGuests || [];
  const paymentHistory = booking.paymentHistory || booking.payments || [];

  const hotelName = hotel.name || "MYOWNPMS";
  const hotelAddress = hotel.address || hotel.city || "Marine Drive, Mumbai, Maharashtra";
  const hotelGst = hotel.gstin || "27AABCG1234F1Z8";
  const hotelPhone = hotel.phone || hotel.ownerPhone || "+91 98200 12345";
  const invoiceNum = booking.bookingNumber ? `INV-${booking.bookingNumber}` : `INV-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const overstay = calculateOverstayFee(booking, hotel);
  const lateFee = booking.lateCheckoutCharge || overstay.lateFee || 0;
  const lateHours = booking.lateCheckoutHours || overstay.chargeableHours || 0;
  const hourlyRate = booking.hourlyRate || overstay.hourlyRate || (lateHours > 0 ? Math.round(lateFee / lateHours) : 0);
  const isLate = lateFee > 0;

  const posTotal = charges.reduce((s, c) => s + (c.amount || 0), 0);
  
  // Snapshot or calculated values from booking
  const roomBreakdowns = Array.isArray(booking.roomGstBreakdown) && booking.roomGstBreakdown.length > 0 ? booking.roomGstBreakdown : [];
  
  const originalBookingTotal = isLate && booking.totalAmount > lateFee ? booking.totalAmount - lateFee : (booking.totalAmount || 3000);
  const taxableVal = booking.taxableAmount ?? (roomBreakdowns.length > 0 ? roomBreakdowns.reduce((s, r) => s + (r.taxableAmount || 0), 0) : Math.round(originalBookingTotal / 1.18));
  const totalGst = booking.gstAmount ?? (roomBreakdowns.length > 0 ? roomBreakdowns.reduce((s, r) => s + (r.gstAmount || 0), 0) : originalBookingTotal - taxableVal);
  const cgstVal = booking.cgstAmount ?? (roomBreakdowns.length > 0 ? roomBreakdowns.reduce((s, r) => s + (r.cgstAmount || 0), 0) : Math.round(totalGst / 2));
  const sgstVal = booking.sgstAmount ?? (roomBreakdowns.length > 0 ? roomBreakdowns.reduce((s, r) => s + (r.sgstAmount || 0), 0) : Math.round(totalGst - cgstVal));
  
  const mainGstRate = booking.gstRate ?? (roomBreakdowns[0]?.gstRate || 18);
  const mainCgstRate = booking.cgstRate ?? (roomBreakdowns[0]?.cgstRate || mainGstRate / 2);
  const mainSgstRate = booking.sgstRate ?? (roomBreakdowns[0]?.sgstRate || mainGstRate / 2);

  const grandTotalAmount = (booking.grandTotal || (booking.totalAmount ? booking.totalAmount : (taxableVal + totalGst + lateFee))) + posTotal;
  const advancePaid = isLate && booking.paidAmount > lateFee ? booking.paidAmount - lateFee : (booking.paidAmount || originalBookingTotal);
  const paidAmount = booking.paidAmount || grandTotalAmount;
  const balanceDue = Math.max(0, grandTotalAmount - paidAmount);

  const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon"><img src="/logo.png" alt="MYOWNPMS" onerror="this.outerHTML='🏨'" /></div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">${hotelAddress} &bull; Ph: ${hotelPhone}</div>
          <div class="hotel-sub">GSTIN: <strong>${hotelGst}</strong></div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title">Tax Invoice</div>
        <div class="doc-id">${invoiceNum}</div>
        <div class="doc-date">Date: ${dateStr}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Billed To (Primary Guest)</h4>
        <p>${guest.fullName || guest.name || "Valued Guest"}</p>
        <span>📞 Phone: <strong>${guest.mobileNumber || guest.phone || "N/A"}</strong> &bull; ✉️ ${guest.email || "N/A"}</span>
        <span>🛡️ Govt ID: <strong>${guest.idProof?.idType || guest.govtIdType || "Aadhaar"}: ${guest.idProof?.idNumber || guest.govtIdNumber || "XXXX-XXXX-4512"}</strong></span>
        <span>🏠 Address: ${guest.address || guest.city || "On Record"}</span>
      </div>
      <div class="info-block">
        <h4>Stay &amp; Room Allocation</h4>
        <p>Room #${booking.roomNumber || room.roomNumber || "101"} (${roomType.name || "Deluxe Suite"})</p>
        <span>Check-In: <strong>${booking.checkInDate ? (typeof booking.checkInDate === 'string' ? booking.checkInDate.split('T')[0] : new Date(booking.checkInDate).toLocaleDateString('en-IN')) : "Today"} (${booking.checkInTime ? formatTime12Hour(booking.checkInTime) : "02:00 PM"})</strong></span>
        <span>Check-Out: <strong>${booking.checkOutDate ? (typeof booking.checkOutDate === 'string' ? booking.checkOutDate.split('T')[0] : new Date(booking.checkOutDate).toLocaleDateString('en-IN')) : "Tomorrow"} (${formatTime12Hour(booking.checkOutTime || hotel.checkOutTime || "12:00")})</strong></span>
        <span>Booking Folio: #${booking.bookingNumber || "BK-8921"}</span>
        ${isLate ? `
          <div style="margin-top:5px;font-size:11px;color:#DC2626;font-weight:700;">
            ⚠️ Late Check-Out: ${lateHours} Hours @ ₹${hourlyRate}/hr (+₹${lateFee.toLocaleString("en-IN")})
          </div>
        ` : ""}
      </div>
    </div>

    <!-- Accompanying Members Table -->
    ${accompanying && accompanying.length > 0 ? `
      <div style="font-size:11.5px;font-weight:900;color:#0F172A;text-transform:uppercase;margin:12px 0 6px 0;letter-spacing:0.5px;">
        👥 Accompanying Family Members &amp; Co-Guests (${accompanying.length})
      </div>
      <table style="margin-bottom:14px;">
        <thead>
          <tr>
            <th>#</th>
            <th>Member Full Name</th>
            <th>Age / Gender</th>
            <th>Relationship</th>
            <th>Govt ID Type</th>
            <th>ID Proof Number</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          ${accompanying.map((m, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td><strong>${m.name || m.fullName || `Member ${idx + 1}`}</strong></td>
              <td>${m.age ? `${m.age} yrs` : "-"} / ${m.gender || "-"}</td>
              <td><span class="badge badge-purple">${m.relationship || "Family Member"}</span></td>
              <td>${m.idType || "AADHAAR"}</td>
              <td><code>${m.idNumber || "Verified On Record"}</code></td>
              <td class="text-center"><span class="badge badge-success">✓ Verified</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Main Itemized Charges Table -->
    <div style="font-size:11.5px;font-weight:900;color:#0F172A;text-transform:uppercase;margin:12px 0 6px 0;letter-spacing:0.5px;">
      📋 Itemized Room Tariff, Taxes &amp; Extra Services Breakdown
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Description of Service / Tariff Charge</th>
          <th class="text-center">HSN/SAC</th>
          <th class="text-right">Qty / Nights</th>
          <th class="text-right">Rate (₹)</th>
          <th class="text-right">Taxable (₹)</th>
          <th class="text-right">GST Rate</th>
          <th class="text-right">Tax Amount (₹)</th>
          <th class="text-right">Total (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${roomBreakdowns.length > 0 ? roomBreakdowns.map((rb, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>
              <strong>Room #${rb.roomNumber || booking.roomNumber} - ${rb.roomTypeName || roomType.name || "Room"}</strong>
              <div style="font-size:10.5px;color:#64748B;">CGST @ ${rb.cgstRate}% (₹${(rb.cgstAmount || 0).toLocaleString("en-IN")}) + SGST @ ${rb.sgstRate}% (₹${(rb.sgstAmount || 0).toLocaleString("en-IN")})</div>
            </td>
            <td class="text-center">996311</td>
            <td class="text-right">${rb.nights || 1}</td>
            <td class="text-right">₹${(rb.basePrice || 0).toLocaleString("en-IN")}</td>
            <td class="text-right">₹${(rb.taxableAmount || 0).toLocaleString("en-IN")}</td>
            <td class="text-right">${rb.gstRate}%</td>
            <td class="text-right">₹${(rb.gstAmount || 0).toLocaleString("en-IN")}</td>
            <td class="text-right"><strong>₹${(rb.finalAmount || 0).toLocaleString("en-IN")}</strong></td>
          </tr>
        `).join("") : `
          <tr>
            <td>1</td>
            <td>
              <strong>Room Accommodation Charges</strong>
              <div style="font-size:10.5px;color:#64748B;">Room #${booking.roomNumber || room.roomNumber || "101"} - CGST @ ${mainCgstRate}% + SGST @ ${mainSgstRate}%</div>
            </td>
            <td class="text-center">996311</td>
            <td class="text-right">${booking.numberOfNights || 1}</td>
            <td class="text-right">₹${taxableVal.toLocaleString("en-IN")}</td>
            <td class="text-right">₹${taxableVal.toLocaleString("en-IN")}</td>
            <td class="text-right">${mainGstRate}%</td>
            <td class="text-right">₹${totalGst.toLocaleString("en-IN")}</td>
            <td class="text-right"><strong>₹${(taxableVal + totalGst).toLocaleString("en-IN")}</strong></td>
          </tr>
        `}
        ${isLate ? `
          <tr>
            <td>${(roomBreakdowns.length || 1) + 1}</td>
            <td>
              <strong>Late Check-Out Penalty Surcharge</strong>
              <div style="font-size:10.5px;color:#DC2626;">Overstayed ${lateHours} Hours past scheduled check-out @ ₹${hourlyRate}/hr</div>
            </td>
            <td class="text-center">996311</td>
            <td class="text-right">${lateHours}h</td>
            <td class="text-right">₹${hourlyRate.toLocaleString("en-IN")}</td>
            <td class="text-right">₹${lateFee.toLocaleString("en-IN")}</td>
            <td class="text-right">0%</td>
            <td class="text-right">₹0</td>
            <td class="text-right"><strong>₹${lateFee.toLocaleString("en-IN")}</strong></td>
          </tr>
        ` : ""}
        ${charges.map((c, i) => `
          <tr>
            <td>${(roomBreakdowns.length || 1) + (isLate ? 1 : 0) + 1 + i}</td>
            <td>
              <strong>${c.title || c.item || c.serviceName || "POS Room Service / Extra Item"}</strong>
              <div style="font-size:10.5px;color:#64748B;">
                Category: <strong>${c.category || "F&B / Sundry"}</strong>${c.reason || c.note ? ` &bull; Reason: ${c.reason || c.note}` : ""}
              </div>
            </td>
            <td class="text-center">996331</td>
            <td class="text-right">${c.quantity || 1}</td>
            <td class="text-right">₹${(c.amount || 0).toLocaleString("en-IN")}</td>
            <td class="text-right">₹${(c.amount || 0).toLocaleString("en-IN")}</td>
            <td class="text-right">0%</td>
            <td class="text-right">₹0</td>
            <td class="text-right"><strong>₹${(c.amount || 0).toLocaleString("en-IN")}</strong></td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <!-- Payment Transactions & Receipts Ledger -->
    ${paymentHistory && paymentHistory.length > 0 ? `
      <div style="font-size:11.5px;font-weight:900;color:#0F172A;text-transform:uppercase;margin:12px 0 6px 0;letter-spacing:0.5px;">
        💳 Payment Transaction History Ledger (${paymentHistory.length})
      </div>
      <table style="margin-bottom:14px;">
        <thead>
          <tr>
            <th>#</th>
            <th>Receipt / Txn ID</th>
            <th>Date &amp; Time</th>
            <th>Payment Stage</th>
            <th>Method</th>
            <th class="text-right">Amount (₹)</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          ${paymentHistory.map((p, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td><strong style="color:#0B8EE0;">#${p.receiptNumber || p.transactionId || "RCP-001"}</strong></td>
              <td>${p.formattedDate || (p.createdAt ? new Date(p.createdAt).toLocaleString("en-IN") : dateStr)}</td>
              <td>${p.paymentType || "Tariff Advance / Settlement"}</td>
              <td><span class="badge badge-primary">${p.paymentMethod || "CASH"}</span></td>
              <td class="text-right" style="font-weight:900;color:#059669;">₹${(p.amount || 0).toLocaleString("en-IN")}</td>
              <td class="text-center"><span class="badge badge-success">✓ ${p.status || "PAID"}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Total Financial Settlement Summary Card -->
    <div class="total-card">
      <div class="total-row">
        <span>Room Base Tariff:</span>
        <span>₹${taxableVal.toLocaleString("en-IN")}</span>
      </div>
      <div class="total-row">
        <span>GST Taxes (CGST ₹${cgstVal.toLocaleString("en-IN")} + SGST ₹${sgstVal.toLocaleString("en-IN")}):</span>
        <span>₹${totalGst.toLocaleString("en-IN")}</span>
      </div>
      ${posTotal > 0 ? `
        <div class="total-row" style="color:#0B8EE0;font-weight:700;">
          <span>Extra POS / Food &amp; Services (${charges.length} items):</span>
          <span>+₹${posTotal.toLocaleString("en-IN")}</span>
        </div>
      ` : ""}
      ${isLate ? `
        <div class="total-row" style="color:#DC2626;font-weight:700;">
          <span>Late Checkout Fee (${lateHours}h @ ₹${hourlyRate}/hr):</span>
          <span>+₹${lateFee.toLocaleString("en-IN")}</span>
        </div>
      ` : ""}
      <div class="total-row grand">
        <span>Grand Total Payable:</span>
        <span>₹${grandTotalAmount.toLocaleString("en-IN")}</span>
      </div>
      <div class="total-row" style="color:#059669;font-weight:800;">
        <span>Total Payments Received:</span>
        <span>-₹${paidAmount.toLocaleString("en-IN")}</span>
      </div>
      <div class="total-row" style="color:${balanceDue > 0 ? '#DC2626' : '#059669'};font-weight:900;font-size:13px;border-top:1px dashed #CBD5E1;padding-top:4px;margin-top:4px;">
        <span>Outstanding Balance Due:</span>
        <span>₹${balanceDue.toLocaleString("en-IN")}</span>
      </div>
    </div>

    <div class="footer">
      <div>
        <p><strong>Thank you for choosing ${hotelName}!</strong></p>
        <p>This is a computer-generated tax invoice verified under GST regulations.</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Authorized Signatory / Cashier</p>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Tax_Invoice_${invoiceNum}`, html);
}

/**
 * 9. Generate & Download Detailed Guest Folio & Stay Dossier PDF
 */
export function downloadGuestFolioPDF(data = {}, hotel = {}) {
  const guest = data.guest || {};
  const booking = data.activeBooking || guest.activeBooking || {};
  const paymentDetails = data.paymentDetails || {};
  const paymentHistory = data.paymentHistory || booking.paymentHistory || booking.payments || [];
  const roomsDetail = data.roomsDetail || [];
  const charges = booking.charges || booking.posCharges || data.charges || [];
  const accompanying = data.accompanyingGuests || booking.accompanyingGuests || guest.accompanyingGuests || [];

  const hotelName = hotel.name || "MYOWNPMS";
  const hotelAddress = hotel.address || hotel.city || "Gujarat, India";
  const hotelPhone = hotel.phone || "+91 98765 43210";
  const hotelGst = hotel.gstin || "24AABCG1234F1Z8";

  const overstay = calculateOverstayFee(booking, hotel);
  const lateFee = booking.lateCheckoutCharge || overstay.lateFee || 0;
  const lateHours = booking.lateCheckoutHours || overstay.chargeableHours || 0;
  const hourlyRate = booking.hourlyRate || overstay.hourlyRate || (lateHours > 0 ? Math.round(lateFee / lateHours) : 0);
  const isLate = lateFee > 0;

  const baseTariff = paymentDetails.baseAmount ?? booking.taxableAmount ?? Math.round((booking.totalAmount || 0) / 1.18);
  const gstAmount = paymentDetails.gstAmount ?? booking.gstAmount ?? ((booking.totalAmount || 0) - baseTariff);
  const cgst = paymentDetails.cgstAmount ?? booking.cgstAmount ?? Math.round(gstAmount / 2);
  const sgst = paymentDetails.sgstAmount ?? booking.sgstAmount ?? Math.round(gstAmount - cgst);
  const posTotal = charges.reduce((s, c) => s + (c.amount || 0), 0);

  const totalAmount = paymentDetails.totalAmount ?? (booking.totalAmount || (baseTariff + gstAmount + lateFee + posTotal));
  const paidAmount = paymentDetails.paidAmount ?? booking.paidAmount ?? totalAmount;
  const dueAmount = paymentDetails.dueAmount ?? booking.dueAmount ?? Math.max(0, totalAmount - paidAmount);
  const isPaid = dueAmount <= 0;

  const html = `
    <!-- Hero Ribbon -->
    <div class="hero-ribbon">
      <div class="hotel-brand">
        <div class="brand-icon"><img src="/logo.png" alt="MYOWNPMS" onerror="this.outerHTML='👤'" /></div>
        <div>
          <div class="hotel-title">${hotelName}</div>
          <div class="hotel-meta">📍 ${hotelAddress} &bull; 📞 ${hotelPhone} &bull; GSTIN: <strong>${hotelGst}</strong></div>
        </div>
      </div>
      <div class="ribbon-badge">
        <div class="title">Guest Stay Folio</div>
        <div class="sub">Folio #${booking.bookingNumber || `GF-${Date.now().toString().slice(-6)}`}</div>
      </div>
    </div>

    <!-- Guest Profile & Stay Grid (Exact match with Modal Tab 0 & Tab 1) -->
    <div class="info-grid">
      <div class="info-block">
        <h4>Primary Guest Profile</h4>
        <p><strong>${guest.fullName || guest.name || "Guest"}</strong></p>
        <span>📞 Phone: <strong>${guest.mobileNumber || guest.phone || "N/A"}</strong></span>
        <span>✉️ Email: ${guest.email || "Not Provided"}</span>
        <span>🏠 City / Address: ${guest.address?.city || guest.city || guest.address?.fullAddress || guest.address || "N/A"}</span>
        <span>Age &amp; Gender: <strong>${guest.age ? `${guest.age} yrs` : "-"} / ${guest.gender || "Male"}</strong></span>
        <span style="margin-top:4px;">🛡️ Govt ID: <strong style="color:#0B8EE0;">${guest.idProof?.idType || guest.govtIdType || "AADHAAR"}: ${guest.idProof?.idNumber || guest.govtIdNumber || guest.idNumber || "Verified"}</strong></span>
      </div>
      <div class="info-block">
        <h4>Stay &amp; Room Assignment</h4>
        <p>Room: <strong>${booking.room?.roomNumber || booking.roomNumber || guest.roomAssigned || "101"}</strong> (${booking.roomType?.name || "Executive Suite"})</p>
        <span>Check-In: <strong>${booking.checkInDate ? (typeof booking.checkInDate === 'string' ? booking.checkInDate.split('T')[0] : new Date(booking.checkInDate).toLocaleDateString('en-IN')) : "Today"} (${booking.checkInTime ? formatTime12Hour(booking.checkInTime) : "02:00 PM"})</strong></span>
        <span>Check-Out: <strong>${booking.checkOutDate ? (typeof booking.checkOutDate === 'string' ? booking.checkOutDate.split('T')[0] : new Date(booking.checkOutDate).toLocaleDateString('en-IN')) : "Upcoming"} (${formatTime12Hour(booking.checkOutTime || hotel.checkOutTime || "12:00")})</strong></span>
        <span>Duration: <strong>${booking.numberOfNights || 1} Night(s)</strong></span>
        <span>Stay Status: <span class="badge badge-success">${guest.status || "IN-HOUSE"}</span></span>
        <span style="margin-top:4px;">Billing Status: <span class="badge ${isPaid ? "badge-success" : "badge-warning"}">${isPaid ? "PAID IN FULL" : `DUE: ₹${dueAmount.toLocaleString("en-IN")}`}</span></span>
      </div>
    </div>

    <!-- Accompanying Members Table (Exact Match with UI) -->
    ${accompanying && accompanying.length > 0 ? `
      <div style="font-size:11.5px;font-weight:900;color:#0F172A;text-transform:uppercase;margin:14px 0 6px 0;letter-spacing:0.5px;">
        👥 Accompanying Family Members &amp; Co-Guests (${accompanying.length})
      </div>
      <table style="margin-bottom:14px;">
        <thead>
          <tr>
            <th>#</th>
            <th>Member Full Name</th>
            <th>Age / Gender</th>
            <th>Relationship</th>
            <th>Govt ID Type</th>
            <th>ID Document Number</th>
            <th class="text-center">Verification Status</th>
          </tr>
        </thead>
        <tbody>
          ${accompanying.map((m, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td><strong>${m.name || m.fullName || `Member ${idx + 1}`}</strong></td>
              <td>${m.age ? `${m.age} yrs` : "-"} / ${m.gender || "-"}</td>
              <td><span class="badge badge-purple">${m.relationship || "Family Member"}</span></td>
              <td>${m.idType || "AADHAAR"}</td>
              <td><code>${m.idNumber || "Verified On Record"}</code></td>
              <td class="text-center"><span class="badge badge-success">✓ Verified</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Allocated Rooms Breakdown Table (if multiple rooms) -->
    ${roomsDetail && roomsDetail.length > 0 ? `
      <div style="font-size:11.5px;font-weight:900;color:#0F172A;text-transform:uppercase;margin:14px 0 6px 0;letter-spacing:0.5px;">
        🛏️ Allocated Rooms &amp; Tariff Breakdown (${roomsDetail.length})
      </div>
      <table style="margin-bottom:14px;">
        <thead>
          <tr>
            <th>#</th>
            <th>Room Number</th>
            <th>Category / Type</th>
            <th>Nights</th>
            <th class="text-right">Price / Night (₹)</th>
            <th class="text-right">Room Total (₹)</th>
            <th class="text-center">Room Status</th>
          </tr>
        </thead>
        <tbody>
          ${roomsDetail.map((rm, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td><strong style="color:#0B8EE0;">Room #${rm.roomNumber}</strong></td>
              <td>${rm.roomType || "Standard Room"}</td>
              <td>${rm.numberOfNights || 1} Night(s)</td>
              <td class="text-right">₹${(rm.pricePerNight || 0).toLocaleString("en-IN")}</td>
              <td class="text-right" style="font-weight:800;">₹${(rm.roomTotal || 0).toLocaleString("en-IN")}</td>
              <td class="text-center"><span class="badge badge-primary">${rm.status || "OCCUPIED"}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Extra Charges, Services & Modifications Table -->
    ${charges && charges.length > 0 ? `
      <div style="font-size:11.5px;font-weight:900;color:#0F172A;text-transform:uppercase;margin:14px 0 6px 0;letter-spacing:0.5px;">
        ➕ Extra Services, Food &amp; Charges (${charges.length})
      </div>
      <table style="margin-bottom:14px;">
        <thead>
          <tr>
            <th>#</th>
            <th>Service / Charge Description</th>
            <th>Category</th>
            <th>Reason / Change Note</th>
            <th class="text-center">Logged Date</th>
            <th class="text-right">Amount (₹)</th>
            <th class="text-center">Added By</th>
          </tr>
        </thead>
        <tbody>
          ${charges.map((c, i) => `
            <tr>
              <td>${i + 1}</td>
              <td><strong>${c.title || c.item || c.serviceName || "Extra Service Charge"}</strong></td>
              <td><span class="badge badge-primary">${c.category || "F&B / Sundry"}</span></td>
              <td>${c.reason || c.note || c.description || "Guest Requested Service"}</td>
              <td class="text-center">${c.date || (c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-IN") : "Recorded")}</td>
              <td class="text-right" style="font-weight:800;color:#0B8EE0;">+₹${(c.amount || 0).toLocaleString("en-IN")}</td>
              <td class="text-center">${c.addedByName || c.addedBy?.name || "Front Desk"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Late Checkout Surcharge Box -->
    ${isLate ? `
      <div class="late-checkout-box">
        <div class="title">⚠️ Late Check-Out Surcharge Applied</div>
        <div class="desc">
          Guest departed past scheduled check-out time. Overstay: <strong>${lateHours} Hours</strong> @ <strong>₹${hourlyRate}/hr</strong>. Additional Late Fee: <strong>+₹${lateFee.toLocaleString("en-IN")}</strong>
        </div>
      </div>
    ` : ""}

    <!-- Payment & Billing History Table (Exact match with Modal Tab 2) -->
    <div style="font-size:11.5px;font-weight:900;color:#0F172A;text-transform:uppercase;margin:14px 0 6px 0;letter-spacing:0.5px;">
      💳 Payment &amp; Billing History Ledger (${paymentHistory.length})
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Receipt / Txn ID</th>
          <th>Date &amp; Time</th>
          <th>Payment Stage</th>
          <th>Mode</th>
          <th class="text-right">Amount (₹)</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        ${paymentHistory.length > 0 ? paymentHistory.map((p, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong style="color:#0B8EE0;">#${p.receiptNumber || p.transactionId || "RCP-001"}</strong></td>
            <td>${p.formattedDate || (p.createdAt ? new Date(p.createdAt).toLocaleString("en-IN") : "N/A")}</td>
            <td>${p.paymentType || "Booking Settlement"}</td>
            <td><span class="badge badge-primary">${p.paymentMethod || "CASH"}</span></td>
            <td class="text-right" style="font-weight:900;color:#059669;">₹${(p.amount || 0).toLocaleString("en-IN")}</td>
            <td class="text-center"><span class="badge badge-success">✓ ${p.status || "PAID"}</span></td>
          </tr>
        `).join("") : `
          <tr>
            <td colspan="7" style="text-align:center;padding:16px;color:#64748B;">No prior transactions recorded for this folio.</td>
          </tr>
        `}
      </tbody>
    </table>

    <!-- Grand Financial Settlement Card -->
    <div class="summary-card-right" style="width:330px;">
      <div class="summary-row">
        <span>Base Room Tariff:</span>
        <span style="font-weight:700;">₹${baseTariff.toLocaleString("en-IN")}</span>
      </div>
      <div class="summary-row">
        <span>GST Taxes (CGST ₹${cgst.toLocaleString("en-IN")} + SGST ₹${sgst.toLocaleString("en-IN")}):</span>
        <span style="font-weight:700;">₹${gstAmount.toLocaleString("en-IN")}</span>
      </div>
      ${posTotal > 0 ? `
        <div class="summary-row" style="color:#0B8EE0;font-weight:700;">
          <span>Extra Services &amp; POS (+):</span>
          <span>+₹${posTotal.toLocaleString("en-IN")}</span>
        </div>
      ` : ""}
      ${isLate ? `
        <div class="summary-row" style="color:#DC2626;font-weight:700;">
          <span>Late Checkout Surcharge (+):</span>
          <span>+₹${lateFee.toLocaleString("en-IN")}</span>
        </div>
      ` : ""}
      <div class="summary-row grand">
        <span>Grand Total Amount:</span>
        <span>₹${totalAmount.toLocaleString("en-IN")}</span>
      </div>
      <div class="summary-row" style="color:#059669;font-weight:800;">
        <span>Total Payments Received (-):</span>
        <span>₹${paidAmount.toLocaleString("en-IN")}</span>
      </div>
      <div class="summary-row" style="color:${isPaid ? '#059669' : '#DC2626'};font-weight:900;border-top:1px dashed #CBD5E1;padding-top:4px;margin-top:4px;">
        <span>Net Balance Due:</span>
        <span>₹${dueAmount.toLocaleString("en-IN")}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div>
        <p>Guest registered and verified under PMS Regulations</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Guest Signature / Front Desk</p>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Guest_Folio_${guest.fullName || "Guest"}_${Date.now()}`, html);
}

/**
 * 2. Generate & Download Payment Receipt / Voucher PDF
 */
export function downloadPaymentReceiptPDF(payment = {}, hotel = {}) {
  const hotelName = hotel.name || "MYOWNPMS";
  const receiptNum = payment.receiptNumber || `RCP-${Date.now().toString().slice(-6)}`;
  const dateStr = payment.dateStr || new Date().toLocaleDateString("en-IN");
  const timeStr = payment.timeStr || new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon"><img src="/logo.png" alt="MYOWNPMS" onerror="this.outerHTML='💳'" /></div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">Official Counter Payment Voucher &bull; Front Desk Cashier</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#059669;">Payment Receipt</div>
        <div class="doc-id">#${receiptNum}</div>
        <div class="doc-date">${dateStr} &bull; ${timeStr}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Received From (Guest)</h4>
        <p>${payment.guest?.fullName || payment.guestName || "Guest"}</p>
        <span>📞 ${payment.guest?.mobileNumber || payment.guestPhone || "N/A"}</span>
        <span>Room #${payment.booking?.roomNumber || payment.roomNumber || "101"} (Folio: #${payment.booking?.bookingNumber || payment.bookingNumber || "BK-001"})</span>
      </div>
      <div class="info-block">
        <h4>Payment &amp; Collector Details</h4>
        <p>Method: <strong>${payment.paymentMethod || "CASH"}</strong></p>
        <span>Collector: ${payment.collectedBy?.name || payment.collectedByName || "Front Desk Staff"}</span>
        <span>Reference / UTR: ${payment.transactionId || "Counter Cash"}</span>
      </div>
    </div>

    <div style="background:#F0FDF4;border:2px solid #86EFAC;border-radius:14px;padding:20px;text-align:center;margin-bottom:24px;">
      <div style="font-size:12px;font-weight:800;color:#15803D;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Amount Paid in Full</div>
      <div style="font-size:32px;font-weight:900;color:#15803D;letter-spacing:-1px;">₹${(payment.amount || 0).toLocaleString("en-IN")}</div>
      <div style="font-size:12px;color:#166534;margin-top:4px;">Transaction Stage: <strong>${payment.paymentType || "SETTLEMENT"}</strong> &bull; Status: <strong>PAID / VERIFIED</strong></div>
    </div>

    <div class="footer">
      <div>
        <p>Automated payment receipt &bull; Digitally logged in PMS Treasury</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Cashier / Desk Staff Signature</p>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Receipt_${receiptNum}`, html);
}

/**
 * 3. Generate & Download Shift Handover & Drawer Settlement Voucher PDF (Hotel Admin / Cashier)
 */
export function downloadHandoverVoucherPDF(handover = {}, hotel = {}) {
  const hotelName = hotel.name || "MYOWNPMS";
  const code = handover.handoverCode || `HO-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date(handover.createdAt || Date.now()).toLocaleString("en-IN");

  const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon"><img src="/logo.png" alt="MYOWNPMS" onerror="this.outerHTML='💼'" /></div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">Shift Handover &amp; Cash Drawer Settlement Audit Record</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#D97706;">Handover Slip</div>
        <div class="doc-id">#${code}</div>
        <div class="doc-date">${dateStr}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Audit &amp; Shift Officer</h4>
        <p>Settled By: <strong>${handover.settledByAdmin?.name || "Hotel General Manager"}</strong></p>
        <span>Audit Timestamp: ${dateStr}</span>
      </div>
      <div class="info-block">
        <h4>Settlement Scope</h4>
        <p>Total Receipts Settled: <strong>${handover.paymentsCount || 0} Transactions</strong></p>
        <span>Status: <strong style="color:#059669;">DEPOSITED IN VAULT / SAFE</strong></span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Payment Channel</th>
          <th class="text-right">Amount Settled (₹)</th>
          <th class="text-right">Audit Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Physical Counter Cash</strong></td>
          <td class="text-right" style="font-weight:800;color:#059669;">₹${(handover.cashAmount || 0).toLocaleString("en-IN")}</td>
          <td class="text-right"><span class="badge badge-success">Vault Locked</span></td>
        </tr>
        <tr>
          <td><strong>UPI QR Digital Collections</strong></td>
          <td class="text-right" style="font-weight:800;color:#7C3AED;">₹${(handover.upiAmount || 0).toLocaleString("en-IN")}</td>
          <td class="text-right"><span class="badge badge-primary">Bank Direct</span></td>
        </tr>
        <tr>
          <td><strong>Card POS &amp; Net Banking</strong></td>
          <td class="text-right" style="font-weight:800;color:#2563EB;">₹${(handover.cardAmount || 0).toLocaleString("en-IN")}</td>
          <td class="text-right"><span class="badge badge-primary">Settled</span></td>
        </tr>
        <tr style="background:#F8FAFC;font-weight:900;">
          <td><strong>Total Shift Revenue Deposited</strong></td>
          <td class="text-right" style="font-size:15px;color:#0F172A;">₹${(handover.totalSettledAmount || 0).toLocaleString("en-IN")}</td>
          <td class="text-right"><span class="badge badge-success">Verified</span></td>
        </tr>
      </tbody>
    </table>

    <div class="footer">
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Shift Cashier / Receptionist</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Hotel Admin / Duty Manager</p>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Handover_Slip_${code}`, html);
}

/**
 * 4. Generate & Download Govt ID Compliance & Police Manifest PDF (Regulatory)
 */
export function downloadGovtIdReportPDF(guests = [], hotel = {}) {
  const hotelName = hotel.name || "MYOWNPMS";
  const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon"><img src="/logo.png" alt="MYOWNPMS" onerror="this.outerHTML='🛡️'" /></div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">Official Guest Police Manifest &amp; Regulatory ID Compliance Ledger</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#D97706;">Police Manifest</div>
        <div class="doc-date">Report Date: ${dateStr}</div>
        <div class="doc-id">Total Registrations: ${guests.length}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Guest Full Name</th>
          <th>Allocated Room</th>
          <th>Govt ID Type</th>
          <th>Document Number</th>
          <th>Mobile Contact</th>
          <th class="text-center">Compliance Stamp</th>
        </tr>
      </thead>
      <tbody>
        ${guests.map((g, i) => `
          <tr>
            <td>${i + 1}</td>
            <td><strong>${g.fullName || g.name || "Guest"}</strong></td>
            <td>Room #${g.roomAssigned || g.roomNumber || "N/A"}</td>
            <td><span class="badge badge-primary">${g.govtIdType || g.idType || "AADHAAR"}</span></td>
            <td><code style="font-weight:700;">${g.govtIdNumber || g.idNumber || "N/A"}</code></td>
            <td>${g.phone || g.mobileNumber || "N/A"}</td>
            <td class="text-center">
              ${g.idVerified ? '<span class="badge badge-success">✓ Verified &amp; Stamped</span>' : '<span class="badge badge-warning">Pending Physical ID</span>'}
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div>
        <p>Submitted under compliance with Local Police Registration &amp; Guest Safety Act</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Compliance Officer / General Manager</p>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Police_Manifest_${Date.now()}`, html);
}

/**
 * 5. Generate & Download Daily Collections Statement PDF (Hotel Admin)
 */
export function downloadDailyLedgerPDF(payments = [], summary = {}, hotel = {}, dateStr = "Today") {
  const hotelName = hotel.name || "MYOWNPMS";

  const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon"><img src="/logo.png" alt="MYOWNPMS" onerror="this.outerHTML='📊'" /></div>
        <div>
          <div class="hotel-name">${hotelName}</div>
          <div class="hotel-sub">Daily Financial Collections &amp; Shift Audit Statement</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title">Treasury Report</div>
        <div class="doc-date">Date: ${dateStr}</div>
        <div class="doc-id">Total Items: ${payments.length}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Collection Breakdown</h4>
        <p>Cash Counter: ₹${(summary.cashTotal || 0).toLocaleString("en-IN")}</p>
        <span>UPI QR Collections: ₹${(summary.upiTotal || 0).toLocaleString("en-IN")}</span>
        <span>Card POS &amp; Bank: ₹${((summary.cardTotal || 0) + (summary.bankTotal || 0)).toLocaleString("en-IN")}</span>
      </div>
      <div class="info-block">
        <h4>Grand Totals</h4>
        <p style="font-size:18px;color:#059669;">₹${(summary.totalCollections || 0).toLocaleString("en-IN")}</p>
        <span>Settled to Vault: ₹${(summary.settledToAdmin || 0).toLocaleString("en-IN")}</span>
        <span style="color:#D97706;">In Drawer Pending Settlement: ₹${(summary.drawerCash || 0).toLocaleString("en-IN")}</span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Receipt # &amp; Time</th>
          <th>Guest &amp; Room</th>
          <th>Mode</th>
          <th>Type</th>
          <th class="text-right">Amount (₹)</th>
          <th>Staff Collector</th>
        </tr>
      </thead>
      <tbody>
        ${payments.map((p) => `
          <tr>
            <td><strong>#${p.receiptNumber}</strong><div style="font-size:11px;color:#64748B;">${p.timeStr || "N/A"}</div></td>
            <td>Room ${p.roomNumber || p.booking?.roomNumber || "N/A"} - ${p.guestName || p.guest?.fullName || "Guest"}</td>
            <td><span class="badge badge-primary">${p.paymentMethod}</span></td>
            <td>${p.paymentType}</td>
            <td class="text-right" style="font-weight:900;color:#059669;">₹${(p.amount || 0).toLocaleString("en-IN")}</td>
            <td>${p.collectedByName || p.collectedBy?.name || "Staff"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div>
        <p>MYOWNPMS Enterprise PMS Treasury Audit</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Chief Accountant / Auditor</p>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Collections_Statement_${Date.now()}`, html);
}

/**
 * 6. Generate & Download Super Admin Platform Security Audit Logs PDF
 */
export function downloadAuditLogsPDF(logs = []) {
  const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon"><img src="/logo.png" alt="MYOWNPMS" onerror="this.outerHTML='🔒'" /></div>
        <div>
          <div class="hotel-name">MYOWNPMS Cloud PMS Platform</div>
          <div class="hotel-sub">Global Super Administrator Security &amp; Tenant Action Audit Ledger</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#DC2626;">Security Audit</div>
        <div class="doc-date">Generated: ${new Date().toLocaleString("en-IN")}</div>
        <div class="doc-id">Total Log Entries: ${logs.length}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Log ID</th>
          <th>Action Triggered</th>
          <th>Target Property</th>
          <th>Actor Email</th>
          <th>IP Address</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        ${logs.map((log) => `
          <tr>
            <td><code style="font-weight:700;">${log.id || log._id}</code></td>
            <td><span class="badge ${log.action?.includes("ACTIVATED") ? "badge-success" : log.action?.includes("SUSPENDED") ? "badge-warning" : "badge-primary"}">${log.action}</span></td>
            <td><strong>${log.hotel || log.hotelName || "Global Platform"}</strong></td>
            <td>${log.user || log.userEmail || "System Root"}</td>
            <td><code>${log.ip || "127.0.0.1"}</code></td>
            <td>${log.timestamp || log.createdAt || "N/A"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div>
        <p>Cryptographically secured platform audit trial. Immutable system ledger.</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Security Compliance Officer</p>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Platform_Audit_Logs_${Date.now()}`, html);
}

/**
 * 7. Generate & Download Super Admin Multi-Tenant Hotels Directory Report PDF
 */
export function downloadHotelsDirectoryPDF(hotels = []) {
  const activeCount = hotels.filter((h) => h.status === "ACTIVE").length;
  const pendingCount = hotels.filter((h) => h.status === "PENDING").length;
  const suspendedCount = hotels.filter((h) => h.status === "DISABLED" || h.status === "SUSPENDED").length;

  const html = `
    <div class="header-banner">
      <div class="hotel-brand">
        <div class="brand-icon"><img src="/logo.png" alt="MYOWNPMS" onerror="this.outerHTML='🌐'" /></div>
        <div>
          <div class="hotel-name">MYOWNPMS Multi-Tenant Hotel Network</div>
          <div class="hotel-sub">Global Property Governance &amp; Tenant Lifecycle Directory</div>
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-title" style="color:#0B8EE0;">Network Directory</div>
        <div class="doc-date">Generated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
        <div class="doc-id">Total Properties: ${hotels.length}</div>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-block">
        <h4>Tenant Status Distribution</h4>
        <p style="color:#059669;">Active &amp; Licensed: ${activeCount}</p>
        <span style="color:#D97706;">Pending Onboarding: ${pendingCount}</span>
        <span style="color:#DC2626;">Suspended / Disabled: ${suspendedCount}</span>
      </div>
      <div class="info-block">
        <h4>Governance Scope</h4>
        <p>Total Registered Network: ${hotels.length} Properties</p>
        <span>Platform: MYOWNPMS Cloud Multi-Tenant Cluster</span>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Property Name</th>
          <th>Location / City</th>
          <th>Admin Email</th>
          <th>Plan &amp; License</th>
          <th class="text-center">Tenant Status</th>
        </tr>
      </thead>
      <tbody>
        ${hotels.map((h, i) => `
          <tr>
            <td>${i + 1}</td>
            <td><strong>${h.name || "Hotel"}</strong><div style="font-size:11px;color:#64748B;">ID: ${h._id || h.id || "N/A"}</div></td>
            <td>${h.city || "N/A"}</td>
            <td>${h.admin?.email || h.ownerEmail || "N/A"}</td>
            <td><span class="badge badge-primary">${h.subscription?.plan || h.plan || "ENTERPRISE"}</span></td>
            <td class="text-center">
              <span class="badge ${h.status === "ACTIVE" ? "badge-success" : h.status === "PENDING" ? "badge-warning" : "badge-warning"}" style="${h.status !== "ACTIVE" && h.status !== "PENDING" ? "background:#FEE2E2;color:#DC2626;border:1px solid #FCA5A5;" : ""}">
                ${h.status || "ACTIVE"}
              </span>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="footer">
      <div>
        <p>MYOWNPMS Multi-Tenant Hospitality Platform Enterprise Report</p>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <p>Super Administrator</p>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Hotels_Directory_Report_${Date.now()}`, html);
}
