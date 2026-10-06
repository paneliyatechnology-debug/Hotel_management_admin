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

    .pdf-section, table, .info-grid, .summary-card-right, .hero-ribbon, .kpi-row, .breakdown-section {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
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
      color: #0F766E;
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
      color: #0F766E;
    }
    
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
    }
    
    .badge-success { background: transparent; color: #15803D; border: none; }
    .badge-warning { background: transparent; color: #B45309; border: none; }
    .badge-primary { background: transparent; color: #0F766E; border: none; }
    
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
      background: #092622;
      color: #FFFFFF;
      padding: 10px 16px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .btn-print {
      background: #0F766E;
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

  const hotelName = hotel.name || "MYOWNPMS Luxury Hotel";
  const hotelAddress = hotel.address || hotel.city || "Marine Drive, Mumbai, Maharashtra";
  const hotelGst = hotel.gstin || hotel.settings?.gstin || "27AABCG1234F1Z8";
  const hotelPhone = hotel.phone || hotel.ownerPhone || "+91 98200 12345";
  const invoiceNum = booking.bookingNumber ? `INV-${booking.bookingNumber}` : `INV-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const timeStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const overstay = calculateOverstayFee(booking, hotel);
  const lateFee = Number(booking.lateCheckoutCharge) || Number(overstay.lateFee) || 0;
  const lateHours = Number(booking.lateCheckoutHours) || Number(overstay.chargeableHours) || 0;
  const hourlyRate = Number(booking.hourlyRate) || Number(overstay.hourlyRate) || (lateHours > 0 ? Math.round(lateFee / lateHours) : 0);
  const isLate = lateFee > 0;

  const posTotal = charges.reduce((s, c) => s + (Number(c.amount) || 0), 0);

  // Compute actual stay nights
  const checkInRaw = booking.checkInDate || booking.createdAt;
  const checkOutRaw = booking.checkOutDate;
  let computedNights = 1;
  if (checkInRaw && checkOutRaw) {
    try {
      const d1 = new Date(checkInRaw);
      const d2 = new Date(checkOutRaw);
      const diffDays = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) computedNights = diffDays;
    } catch {
      computedNights = 1;
    }
  }
  const nights = Number(booking.numberOfNights) || Number(booking.nights) || computedNights || 1;

  // Snapshot or calculated values from booking
  const roomBreakdowns = Array.isArray(booking.roomGstBreakdown) && booking.roomGstBreakdown.length > 0 ? booking.roomGstBreakdown : [];

  const rawBookingTotal = Number(booking.totalAmount) || Number(booking.grandTotal) || (booking.paidAmount ? Number(booking.paidAmount) : 3000);
  const originalBookingTotal = isLate && rawBookingTotal > lateFee ? rawBookingTotal - lateFee : rawBookingTotal;

  // Real GST & Taxable Calculations (Fixing NaN / undefined% / ₹0 bugs)
  let defaultGstRate = Number(booking.gstRate);
  if (isNaN(defaultGstRate) || defaultGstRate === undefined || defaultGstRate === null) {
    defaultGstRate = originalBookingTotal > 7500 ? 18 : (originalBookingTotal > 0 ? 12 : 0);
  }

  let taxableVal = Number(booking.taxableAmount);
  let totalGst = Number(booking.gstAmount);

  if (roomBreakdowns.length > 0) {
    taxableVal = roomBreakdowns.reduce((s, r) => s + (Number(r.taxableAmount) || 0), 0);
    totalGst = roomBreakdowns.reduce((s, r) => s + (Number(r.gstAmount) || 0), 0);
  }

  if (isNaN(taxableVal) || taxableVal === undefined || taxableVal === null || taxableVal === 0) {
    if (defaultGstRate > 0) {
      taxableVal = Math.round(originalBookingTotal / (1 + defaultGstRate / 100));
      totalGst = originalBookingTotal - taxableVal;
    } else {
      taxableVal = originalBookingTotal;
      totalGst = 0;
    }
  }

  if (isNaN(totalGst) || totalGst === undefined || totalGst === null) {
    totalGst = Math.max(0, originalBookingTotal - taxableVal);
  }

  const cgstVal = Number(booking.cgstAmount) ?? (roomBreakdowns.length > 0 ? roomBreakdowns.reduce((s, r) => s + (Number(r.cgstAmount) || 0), 0) : Math.round(totalGst / 2));
  const sgstVal = Number(booking.sgstAmount) ?? (roomBreakdowns.length > 0 ? roomBreakdowns.reduce((s, r) => s + (Number(r.sgstAmount) || 0), 0) : Math.max(0, totalGst - cgstVal));

  const mainGstRate = defaultGstRate;
  const mainCgstRate = Number(booking.cgstRate) || (mainGstRate / 2);
  const mainSgstRate = Number(booking.sgstRate) || (mainGstRate / 2);

  const baseRatePerNight = Math.round(taxableVal / nights) || Number(booking.pricePerNight) || Math.round(originalBookingTotal / nights);

  const grandTotalAmount = Number(booking.grandTotal) || (taxableVal + totalGst + lateFee + posTotal) || rawBookingTotal;
  const paidAmount = Number(booking.paidAmount) !== undefined && Number(booking.paidAmount) !== null && !isNaN(Number(booking.paidAmount))
    ? Number(booking.paidAmount)
    : (paymentHistory.length > 0 ? paymentHistory.reduce((s, p) => s + (Number(p.amount) || 0), 0) : grandTotalAmount);

  const balanceDue = Number(booking.dueAmount) !== undefined && !isNaN(Number(booking.dueAmount))
    ? Number(booking.dueAmount)
    : Math.max(0, grandTotalAmount - paidAmount);

  const checkInDateFormatted = booking.checkInDate ? (typeof booking.checkInDate === 'string' ? booking.checkInDate.split('T')[0] : new Date(booking.checkInDate).toLocaleDateString('en-IN')) : "On Record";
  const checkInTimeFormatted = booking.checkInTime ? formatTime12Hour(booking.checkInTime) : "12:00 PM";
  const checkOutDateFormatted = booking.checkOutDate ? (typeof booking.checkOutDate === 'string' ? booking.checkOutDate.split('T')[0] : new Date(booking.checkOutDate).toLocaleDateString('en-IN')) : "Scheduled";
  const checkOutTimeFormatted = formatTime12Hour(booking.checkOutTime || hotel.checkOutTime || "11:00 AM");

  const guestName = guest.fullName || guest.name || booking.guestName || "Valued Guest";
  const guestPhone = guest.mobileNumber || guest.phone || booking.guestPhone || "On Record";
  const guestEmail = guest.email || booking.guestEmail || "guest@hotelfolio.in";
  const govtIdType = guest.idProof?.idType || guest.govtIdType || guest.idType || "Aadhaar";
  const govtIdNumber = guest.idProof?.idNumber || guest.govtIdNumber || guest.idNumber || "Verified On Record";
  const guestAddress = guest.address || guest.city || "Verified On Record";
  const roomNumberDisplay = booking.roomNumber || room.roomNumber || booking.roomAssigned || "101";
  const roomTypeNameDisplay = roomType.name || room.type || booking.roomTypeName || "Executive Suite";

  const html = `
    <!-- Top Branded Executive Header -->
    <div style="background: linear-gradient(135deg, #092622 0%, #0F766E 50%, #14B8A6 100%); border-radius: 16px; padding: 18px 22px; color: #FFFFFF; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 24px rgba(15, 118, 110, 0.25);">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 48px; height: 48px; background: #FFFFFF; border: 2px solid rgba(255,255,255,0.8); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; overflow: hidden; padding: 4px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <img src="/logo.png" alt="${hotelName}" onerror="this.outerHTML='🏨'" style="width:100%;height:100%;object-fit:contain;" />
        </div>
        <div>
          <div style="font-size: 20px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.4px;">${hotelName}</div>
          <div style="font-size: 11px; color: rgba(255, 255, 255, 0.9); font-weight: 600; margin-top: 2px;">
            📍 ${hotelAddress} &bull; 📞 ${hotelPhone}
          </div>
          <div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 4px;  border: none; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; letter-spacing: 0.3px;">
            <span style="width: 6px; height: 6px;  border-radius: 50%; display: inline-block;"></span>
            GSTIN: <strong>${hotelGst}</strong> &bull; Verified Taxpayer
          </div>
        </div>
      </div>

      <div style="text-align: right; border: none; padding: 4px 8px;">
        <div style="font-size: 15px; font-weight: 900; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px;">TAX INVOICE</div>
        <div style="font-size: 13px; font-weight: 800; color: #99F6E4; margin-top: 2px; font-family: monospace;">#${invoiceNum}</div>
        <div style="font-size: 10px; color: rgba(255, 255, 255, 0.85); font-weight: 700; margin-top: 2px;">Date: ${dateStr} &bull; ${timeStr}</div>
      </div>
    </div>

    <!-- 2-Column Guest & Stay Cards -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
      <!-- Billed To Card -->
      <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; position: relative; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 3.5px; background: #0F766E;"></div>
        <div style="font-size: 10.5px; font-weight: 900; color: #0F766E; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          <span>👤</span> BILLED TO (PRIMARY GUEST)
        </div>
        <div style="font-size: 14px; font-weight: 900; color: #0F172A; margin-bottom: 5px;">${guestName}</div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
          📞 Phone: <strong style="color:#0F172A;">${guestPhone}</strong> &bull; ✉️ ${guestEmail}
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 3px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
          <span>🛡️ Govt ID:</span>
          <strong style="color:#0F172A; font-family: monospace;">${govtIdType}: ${govtIdNumber}</strong>
          <span style="display: inline-block; background: transparent; color: #15803D; border: none; padding: 1px 6px; border-radius: 4px; font-size: 9.5px; font-weight: 800;">✓ Verified</span>
        </div>
        <div style="font-size: 11px; color: #475569;">
          🏠 Address: <span style="color:#0F172A;">${guestAddress}</span>
        </div>
      </div>

      <!-- Stay Allocation Card -->
      <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; position: relative; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 3.5px; background: #10B981;"></div>
        <div style="font-size: 10.5px; font-weight: 900; color: #10B981; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          <span>🏨</span> STAY &amp; ROOM ALLOCATION
        </div>
        <div style="font-size: 14px; font-weight: 900; color: #0F172A; margin-bottom: 5px;">
          Room #${roomNumberDisplay} &bull; <span style="font-size: 12px; color: #0F766E; font-weight: 800;">${roomTypeNameDisplay}</span>
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
          📥 Check-In: <strong style="color:#0F172A;">${checkInDateFormatted} (${checkInTimeFormatted})</strong>
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
          📤 Check-Out: <strong style="color:#0F172A;">${checkOutDateFormatted} (${checkOutTimeFormatted})</strong>
        </div>
        <div style="font-size: 11px; color: #475569; display: flex; align-items: center; gap: 6px;">
          <span>⏱️ Duration: <strong>${nights} Night${nights > 1 ? "s" : ""}</strong></span>
          <span>&bull;</span>
          <span>Folio: <strong style="color:#0F766E;">#${booking.bookingNumber || "BK-8921"}</strong></span>
        </div>
        ${isLate ? `
          <div style="margin-top:6px; background:#FEF2F2; border:1px solid #FCA5A5; border-radius:6px; padding:4px 8px; font-size:10.5px; color:#DC2626; font-weight:800;">
            ⚠️ Late Check-Out Surcharge: ${lateHours}h past checkout @ ₹${hourlyRate}/hr (+₹${lateFee.toLocaleString("en-IN")})
          </div>
        ` : ""}
      </div>
    </div>

    <!-- Accompanying Members Section -->
    ${accompanying && accompanying.length > 0 ? `
      <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
        <span>👥</span> ACCOMPANYING FAMILY MEMBERS &amp; CO-GUESTS (${accompanying.length})
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border-radius: 10px; overflow: hidden; border: 1px solid #E2E8F0;">
        <thead>
          <tr style="background: #0F766E; color: #FFFFFF;">
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 35px;">#</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Member Full Name</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Age / Gender</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Relationship</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Govt ID Type</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">ID Proof Number</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 90px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${accompanying.map((m, idx) => `
            <tr style="border-bottom: 1px solid #E2E8F0; background: ${idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
              <td style="padding: 8px 10px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">${idx + 1}</td>
              <td style="padding: 8px 10px; font-size: 11px; font-weight: 800; color: #0F172A;">${m.name || m.fullName || `Member ${idx + 1}`}</td>
              <td style="padding: 8px 10px; font-size: 11px; color: #475569;">${m.age ? `${m.age} yrs` : "-"} / ${m.gender || "-"}</td>
              <td style="padding: 8px 10px; font-size: 11px;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#6D28D9; border:none;">${m.relationship || "Accompanying Guest"}</span></td>
              <td style="padding: 8px 10px; font-size: 11px; font-weight: 700; color: #334155;">${m.idType || "AADHAAR"}</td>
              <td style="padding: 8px 10px; font-size: 11px;"><code style="font-family:monospace; background:#F1F5F9; padding:2px 5px; border-radius:4px; font-size:10.5px;">${m.idNumber || "Verified On Record"}</code></td>
              <td style="padding: 8px 10px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#15803D; border:none;">✓ Verified</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Verified Aadhaar & Govt ID Photo Proofs Section (if uploaded) -->
    ${(() => {
      const primaryFront = guest.idProof?.frontImage || guest.idProof?.frontImageUrl || guest.frontImage || guest.idProofImage || booking.idProof?.frontImage || booking.idProofImage;
      const primaryBack = guest.idProof?.backImage || guest.idProof?.backImageUrl || guest.backImage || guest.idProofBackImage || booking.idProof?.backImage || booking.idProofBackImage;
      const hasAnyIdImages = primaryFront || primaryBack || accompanying.some((m) => m.frontImage || m.backImage || m.idProofImage);

      if (!hasAnyIdImages) return "";

      const allIdCards = [
        {
          name: guestName,
          tag: "Primary Guest",
          tagColor: "#0F766E",
          tagBg: "#CCFBF1",
          idType: govtIdType,
          idNumber: govtIdNumber,
          frontImg: primaryFront,
          backImg: primaryBack,
        },
        ...accompanying.map((m, idx) => ({
          name: m.name || m.fullName || `Co-Guest ${idx + 1}`,
          tag: m.relationship || "Accompanying Guest",
          tagColor: "#6D28D9",
          tagBg: "#EDE9FE",
          idType: m.idType || "AADHAAR",
          idNumber: m.idNumber || "Verified On Record",
          frontImg: m.frontImage || m.frontImageUrl || m.idProofImage || m.idProof?.frontImage || m.idProof?.frontImageUrl,
          backImg: m.backImage || m.backImageUrl || m.idProofBackImage || m.idProof?.backImage || m.idProof?.backImageUrl,
        }))
      ].filter((c) => c.frontImg || c.backImg);

      if (allIdCards.length === 0) return "";

      return `
        <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>🪪</span> VERIFIED GOVT ID &amp; AADHAAR CARD COPIES
          </div>
          <span style="font-size: 10px; color: #15803D; font-weight: 800; background: transparent; padding: 2px 8px; border-radius: 6px; border: none;">
            ✓ Digitally Verified &amp; Archived
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(${allIdCards.length === 1 ? 1 : 2}, 1fr); gap: 10px; margin-bottom: 16px;">
          ${allIdCards.map((card) => `
            <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 10px; box-sizing: border-box;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">
                <div style="font-size: 11px; font-weight: 900; color: #0F172A; display: flex; align-items: center; gap: 5px;">
                  <span>👤 ${card.name}</span>
                  <span style="font-size: 9px; font-weight: 800; color: ${card.tagColor}; background: ${card.tagBg}; padding: 1px 5px; border-radius: 4px;">${card.tag}</span>
                </div>
                <div style="font-size: 9px; font-weight: 800; color: #15803D;">${card.idType}: ${card.idNumber}</div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                ${card.frontImg ? `
                  <div style="height: 80px; border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center;">
                    <img src="${card.frontImg}" alt="Front ID" style="width: 100%; height: 100%; object-fit: contain; background: #F1F5F9;" />
                  </div>
                ` : ""}
                ${card.backImg ? `
                  <div style="height: 80px; border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center;">
                    <img src="${card.backImg}" alt="Back ID" style="width: 100%; height: 100%; object-fit: contain; background: #F1F5F9;" />
                  </div>
                ` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      `;
    })()}

    <!-- Main Itemized Charges Breakdown Table -->
    <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
      <span>📋</span> ITEMIZED ROOM TARIFF, TAXES &amp; EXTRA SERVICES BREAKDOWN
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border-radius: 10px; overflow: hidden; border: 1px solid #CBD5E1; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
      <thead>
        <tr style="background: #0F766E; color: #FFFFFF;">
          <th style="padding: 9px 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 32px;">#</th>
          <th style="padding: 9px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Description of Service / Tariff Charge</th>
          <th style="padding: 9px 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 70px;">HSN/SAC</th>
          <th style="padding: 9px 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 70px;">Qty/Nights</th>
          <th style="padding: 9px 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 75px;">Rate (₹)</th>
          <th style="padding: 9px 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 85px;">Taxable (₹)</th>
          <th style="padding: 9px 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 65px;">GST Rate</th>
          <th style="padding: 9px 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 85px;">Tax Amount</th>
          <th style="padding: 9px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 90px;">Total (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${roomBreakdowns.length > 0 ? roomBreakdowns.map((rb, idx) => {
      const rbNights = Number(rb.nights) || nights || 1;
      const rbGstRate = Number(rb.gstRate) !== undefined && !isNaN(Number(rb.gstRate)) ? Number(rb.gstRate) : defaultGstRate;
      let rbTaxable = Number(rb.taxableAmount);
      let rbFinal = Number(rb.finalAmount);
      if (!rbTaxable || rbTaxable === 0) {
        if (rbFinal && rbFinal > 0) {
          rbTaxable = Math.round(rbFinal / (1 + rbGstRate / 100));
        } else {
          rbTaxable = taxableVal;
        }
      }
      const rbRate = Number(rb.basePrice) || Math.round(rbTaxable / rbNights) || baseRatePerNight;
      const rbGstAmount = Number(rb.gstAmount) !== undefined && !isNaN(Number(rb.gstAmount)) ? Number(rb.gstAmount) : Math.round((rbTaxable * rbGstRate) / 100);
      if (!rbFinal || rbFinal === 0) rbFinal = rbTaxable + rbGstAmount;
      const rbCgstRate = rbGstRate / 2;
      const rbSgstRate = rbGstRate / 2;
      const rbCgstAmt = Math.round(rbGstAmount / 2);
      const rbSgstAmt = rbGstAmount - rbCgstAmt;

      return `
            <tr style="border-bottom: 1px solid #E2E8F0; background: #FFFFFF;">
              <td style="padding: 9px 8px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">${idx + 1}</td>
              <td style="padding: 9px 10px; font-size: 11px;">
                <div style="font-weight: 900; color: #0F172A;">Room #${rb.roomNumber || roomNumberDisplay} &bull; ${rb.roomTypeName || roomTypeNameDisplay}</div>
                <div style="font-size: 10px; color: #64748B; margin-top: 2px;">CGST @ ${rbCgstRate}% (₹${rbCgstAmt.toLocaleString("en-IN")}) + SGST @ ${rbSgstRate}% (₹${rbSgstAmt.toLocaleString("en-IN")})</div>
              </td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-family: monospace; color: #475569;">996311</td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-weight: 700; color: #0F172A;">${rbNights} Night${rbNights > 1 ? "s" : ""}</td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right; color: #334155;">₹${rbRate.toLocaleString("en-IN")}</td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right; font-weight: 700; color: #0F172A;">₹${rbTaxable.toLocaleString("en-IN")}</td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 6px; border-radius:4px; font-size:9.5px; font-weight:800; background:#E0F2FE; color:#0369A1;">${rbGstRate}%</span></td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right; color: #475569;">₹${rbGstAmount.toLocaleString("en-IN")}</td>
              <td style="padding: 9px 10px; font-size: 11.5px; text-align: right; font-weight: 900; color: #059669;">₹${rbFinal.toLocaleString("en-IN")}</td>
            </tr>
          `;
    }).join("") : `
          <tr style="border-bottom: 1px solid #E2E8F0; background: #FFFFFF;">
            <td style="padding: 9px 8px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">1</td>
            <td style="padding: 9px 10px; font-size: 11px;">
              <div style="font-weight: 900; color: #0F172A;">Room #${roomNumberDisplay} &bull; ${roomTypeNameDisplay}</div>
              <div style="font-size: 10px; color: #64748B; margin-top: 2px;">CGST @ ${mainCgstRate}% (₹${cgstVal.toLocaleString("en-IN")}) + SGST @ ${mainSgstRate}% (₹${sgstVal.toLocaleString("en-IN")})</div>
            </td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-family: monospace; color: #475569;">996311</td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-weight: 700; color: #0F172A;">${nights} Night${nights > 1 ? "s" : ""}</td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right; color: #334155;">₹${baseRatePerNight.toLocaleString("en-IN")}</td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right; font-weight: 700; color: #0F172A;">₹${taxableVal.toLocaleString("en-IN")}</td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 6px; border-radius:4px; font-size:9.5px; font-weight:800; background:#E0F2FE; color:#0369A1;">${mainGstRate}%</span></td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right; color: #475569;">₹${totalGst.toLocaleString("en-IN")}</td>
            <td style="padding: 9px 10px; font-size: 11.5px; text-align: right; font-weight: 900; color: #059669;">₹${(taxableVal + totalGst).toLocaleString("en-IN")}</td>
          </tr>
        `}

        ${isLate ? `
          <tr style="border-bottom: 1px solid #E2E8F0; background: #FFF5F5;">
            <td style="padding: 9px 8px; font-size: 11px; text-align: center; font-weight: 700; color: #DC2626;">${(roomBreakdowns.length || 1) + 1}</td>
            <td style="padding: 9px 10px; font-size: 11px;">
              <div style="font-weight: 900; color: #DC2626;">Late Check-Out Penalty Surcharge</div>
              <div style="font-size: 10px; color: #991B1B;">Overstayed ${lateHours} Hours past checkout @ ₹${hourlyRate}/hr</div>
            </td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-family: monospace; color: #475569;">996311</td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-weight: 700;">${lateHours}h</td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right;">₹${hourlyRate.toLocaleString("en-IN")}</td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right; font-weight: 700;">₹${lateFee.toLocaleString("en-IN")}</td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 6px; border-radius:4px; font-size:9.5px; font-weight:800; background:#F1F5F9; color:#475569;">0%</span></td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right;">₹0</td>
            <td style="padding: 9px 10px; font-size: 11.5px; text-align: right; font-weight: 900; color: #DC2626;">₹${lateFee.toLocaleString("en-IN")}</td>
          </tr>
        ` : ""}

        ${charges.map((c, i) => {
      const cAmt = Number(c.amount) || 0;
      return `
            <tr style="border-bottom: 1px solid #E2E8F0; background: ${i % 2 === 0 ? '#F8FAFC' : '#FFFFFF'};">
              <td style="padding: 9px 8px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">${(roomBreakdowns.length || 1) + (isLate ? 1 : 0) + 1 + i}</td>
              <td style="padding: 9px 10px; font-size: 11px;">
                <div style="font-weight: 800; color: #0F172A;">${c.title || c.item || c.serviceName || "POS Room Service / Extra Item"}</div>
                <div style="font-size: 10px; color: #64748B;">Category: <strong>${c.category || "F&B / Sundry"}</strong>${c.reason || c.note ? ` &bull; ${c.reason || c.note}` : ""}</div>
              </td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-family: monospace; color: #475569;">996331</td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-weight: 700;">${c.quantity || 1}</td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right;">₹${cAmt.toLocaleString("en-IN")}</td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right; font-weight: 700;">₹${cAmt.toLocaleString("en-IN")}</td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 6px; border-radius:4px; font-size:9.5px; font-weight:800; background:#F1F5F9; color:#475569;">0%</span></td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right;">₹0</td>
              <td style="padding: 9px 10px; font-size: 11.5px; text-align: right; font-weight: 900; color: #0F172A;">₹${cAmt.toLocaleString("en-IN")}</td>
            </tr>
          `;
    }).join("")}
      </tbody>
    </table>

    <!-- Payment Transaction History Ledger (if any) -->
    ${paymentHistory && paymentHistory.length > 0 ? `
      <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
        <span>💳</span> PAYMENT TRANSACTION HISTORY LEDGER (${paymentHistory.length})
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border-radius: 10px; overflow: hidden; border: 1px solid #E2E8F0;">
        <thead>
          <tr style="background: #0F766E; color: #FFFFFF;">
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 35px;">#</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Receipt / Txn ID</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Date &amp; Time</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Payment Stage</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Method</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right;">Amount (₹)</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 85px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${paymentHistory.map((p, idx) => {
      const pAmt = Number(p.amount) || 0;
      const pMethod = (p.paymentMethod || "CASH").toUpperCase();
      return `
              <tr style="border-bottom: 1px solid #E2E8F0; background: ${idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
                <td style="padding: 8px 10px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">${idx + 1}</td>
                <td style="padding: 8px 10px; font-size: 11px; font-weight: 800; color: #0F766E; font-family: monospace;">#${p.receiptNumber || p.transactionId || "RCP-001"}</td>
                <td style="padding: 8px 10px; font-size: 11px; color: #475569;">${p.formattedDate || (p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : dateStr)}</td>
                <td style="padding: 8px 10px; font-size: 11px; font-weight: 600; color: #334155;">${p.paymentType || "Tariff Advance / Settlement"}</td>
                <td style="padding: 8px 10px; font-size: 11px;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#0F766E; border: none;">${pMethod}</span></td>
                <td style="padding: 8px 10px; font-size: 11px; text-align: right; font-weight: 900; color: #059669;">₹${pAmt.toLocaleString("en-IN")}</td>
                <td style="padding: 8px 10px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#15803D; border: none;">✓ PAID</span></td>
              </tr>
            `;
    }).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Financial Settlement Summary & Terms Dual Container -->
    <div style="display: grid; grid-template-columns: 1fr 340px; gap: 16px; margin-bottom: 20px; align-items: start;">
      <!-- Left: Terms & Statutory Declaration -->
      <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; font-size: 10.5px; color: #475569; line-height: 1.55;">
        <div style="font-weight: 900; color: #0F172A; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
          <span>📌</span> TERMS &amp; STATUTORY GST DECLARATION
        </div>
        <ul style="margin: 0; padding-left: 16px;">
          <li style="margin-bottom: 4px;">All services and room charges are billed in Indian Rupees (INR) subject to statutory GST regulations under HSN/SAC code 996311.</li>
          <li style="margin-bottom: 4px;">Hotel standard check-in time is 12:00 PM and check-out time is 11:00 AM. Overstay fees apply for non-authorized extensions.</li>
          <li>This is a computer-generated tax invoice verified under Section 31 of the Central Goods and Services Tax (CGST) Act, 2017.</li>
        </ul>
      </div>

      <!-- Right: Financial Ledger Card -->
      <div style="background: #FFFFFF; border: 2px solid #CBD5E1; border-radius: 14px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(15, 118, 110, 0.06);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; color: #475569;">
          <span>Room Base Tariff:</span>
          <span style="font-weight: 800; color: #0F172A;">₹${taxableVal.toLocaleString("en-IN")}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; color: #475569;">
          <span>GST (CGST ₹${cgstVal.toLocaleString("en-IN")} + SGST ₹${sgstVal.toLocaleString("en-IN")}):</span>
          <span style="font-weight: 800; color: #0F172A;">₹${totalGst.toLocaleString("en-IN")}</span>
        </div>
        ${posTotal > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; color: #0F766E; font-weight: 700;">
            <span>Extra POS / F&amp;B (${charges.length} items):</span>
            <span style="font-weight: 800;">+₹${posTotal.toLocaleString("en-IN")}</span>
          </div>
        ` : ""}
        ${isLate ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; color: #DC2626; font-weight: 700;">
            <span>Late Checkout Fee (${lateHours}h):</span>
            <span style="font-weight: 800;">+₹${lateFee.toLocaleString("en-IN")}</span>
          </div>
        ` : ""}
        <div style="border-top: 1.5px dashed #CBD5E1; margin: 8px 0;"></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; font-weight: 900; color: #0F172A;">
          <span>Grand Total Payable:</span>
          <span style="color: #059669; font-size: 15px;">₹${grandTotalAmount.toLocaleString("en-IN")}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 12px; font-weight: 800; color: #059669;">
          <span>Total Payments Received:</span>
          <span>−₹${paidAmount.toLocaleString("en-IN")}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 6px; border-top: 1.5px solid #E2E8F0; margin-top: 4px; font-size: 13px; font-weight: 900; color: ${balanceDue <= 0 ? '#059669' : '#DC2626'};">
          <span>Outstanding Balance:</span>
          <span>${balanceDue <= 0 ? '₹0 (✓ Settled)' : `₹${balanceDue.toLocaleString("en-IN")}`}</span>
        </div>
      </div>
    </div>

    <!-- Official Authorization Footer -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 14px; border-top: 1.5px solid #E2E8F0; font-size: 11px; color: #64748B;">
      <div>
        <div style="font-weight: 800; color: #0F172A; font-size: 12px;">Thank you for staying at ${hotelName}!</div>
        <div style="font-size: 10px; color: #94A3B8; margin-top: 2px;">This is a system-generated computer tax invoice &bull; Digitally authenticated by PMS</div>
      </div>
      <div style="text-align: right; width: 220px;">
        <div style="border-bottom: 1.5px dashed #94A3B8; margin-bottom: 6px; height: 35px;"></div>
        <div style="font-size: 10.5px; font-weight: 800; color: #0F172A; text-transform: uppercase;">Authorized Signatory / Cashier</div>
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

  const hotelName = hotel.name || "MYOWNPMS Luxury Hotel";
  const hotelAddress = hotel.address || hotel.city || "Marine Drive, Mumbai, Maharashtra";
  const hotelPhone = hotel.phone || hotel.ownerPhone || "+91 98200 12345";
  const hotelGst = hotel.gstin || hotel.settings?.gstin || "27AABCG1234F1Z8";
  const folioNum = booking.bookingNumber ? `FOLIO-${booking.bookingNumber}` : `FOLIO-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const timeStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const overstay = calculateOverstayFee(booking, hotel);
  const lateFee = Number(booking.lateCheckoutCharge) || Number(overstay.lateFee) || 0;
  const lateHours = Number(booking.lateCheckoutHours) || Number(overstay.chargeableHours) || 0;
  const hourlyRate = Number(booking.hourlyRate) || Number(overstay.hourlyRate) || (lateHours > 0 ? Math.round(lateFee / lateHours) : 0);
  const isLate = lateFee > 0;

  const checkInDateFormatted = booking.checkInDate ? (typeof booking.checkInDate === 'string' ? booking.checkInDate.split('T')[0] : new Date(booking.checkInDate).toLocaleDateString('en-IN')) : "On Record";
  const checkInTimeFormatted = booking.checkInTime ? formatTime12Hour(booking.checkInTime) : "12:00 PM";
  const checkOutDateFormatted = booking.checkOutDate ? (typeof booking.checkOutDate === 'string' ? booking.checkOutDate.split('T')[0] : new Date(booking.checkOutDate).toLocaleDateString('en-IN')) : "Scheduled";
  const checkOutTimeFormatted = formatTime12Hour(booking.checkOutTime || hotel.checkOutTime || "11:00 AM");

  const nights = Number(booking.numberOfNights) || Number(booking.nights) || 1;
  const posTotal = charges.reduce((s, c) => s + (Number(c.amount) || 0), 0);
  const roomBreakdowns = Array.isArray(booking.roomGstBreakdown) && booking.roomGstBreakdown.length > 0 ? booking.roomGstBreakdown : [];

  const rawBookingTotal = Number(booking.totalAmount) || Number(booking.grandTotal) || (booking.paidAmount ? Number(booking.paidAmount) : 3000);
  const originalBookingTotal = isLate && rawBookingTotal > lateFee ? rawBookingTotal - lateFee : rawBookingTotal;

  let defaultGstRate = Number(booking.gstRate);
  if (isNaN(defaultGstRate) || defaultGstRate === undefined || defaultGstRate === null) {
    defaultGstRate = originalBookingTotal > 7500 ? 18 : (originalBookingTotal > 0 ? 12 : 0);
  }

  let taxableVal = Number(booking.taxableAmount);
  let totalGst = Number(booking.gstAmount);

  if (roomBreakdowns.length > 0) {
    taxableVal = roomBreakdowns.reduce((s, r) => s + (Number(r.taxableAmount) || 0), 0);
    totalGst = roomBreakdowns.reduce((s, r) => s + (Number(r.gstAmount) || 0), 0);
  }

  if (isNaN(taxableVal) || taxableVal === undefined || taxableVal === null || taxableVal === 0) {
    if (defaultGstRate > 0) {
      taxableVal = Math.round(originalBookingTotal / (1 + defaultGstRate / 100));
      totalGst = originalBookingTotal - taxableVal;
    } else {
      taxableVal = originalBookingTotal;
      totalGst = 0;
    }
  }

  if (isNaN(totalGst) || totalGst === undefined || totalGst === null) {
    totalGst = Math.max(0, originalBookingTotal - taxableVal);
  }

  const cgstVal = Number(booking.cgstAmount) ?? Math.round(totalGst / 2);
  const sgstVal = Number(booking.sgstAmount) ?? Math.max(0, totalGst - cgstVal);
  const baseRatePerNight = Math.round(taxableVal / nights) || Number(booking.pricePerNight) || Math.round(originalBookingTotal / nights);

  const grandTotalAmount = Number(booking.grandTotal) || (taxableVal + totalGst + lateFee + posTotal) || rawBookingTotal;
  const paidAmount = Number(booking.paidAmount) !== undefined && Number(booking.paidAmount) !== null && !isNaN(Number(booking.paidAmount))
    ? Number(booking.paidAmount)
    : (paymentHistory.length > 0 ? paymentHistory.reduce((s, p) => s + (Number(p.amount) || 0), 0) : grandTotalAmount);

  const dueAmount = Number(booking.dueAmount) !== undefined && !isNaN(Number(booking.dueAmount))
    ? Number(booking.dueAmount)
    : Math.max(0, grandTotalAmount - paidAmount);

  const isPaid = dueAmount <= 0;
  const guestName = guest.fullName || guest.name || booking.guestName || "Valued Guest";
  const guestPhone = guest.mobileNumber || guest.phone || booking.guestPhone || "On Record";
  const guestEmail = guest.email || booking.guestEmail || "Not Provided";
  const guestAddress = guest.address?.city || guest.city || guest.address?.fullAddress || guest.address || "Verified On Record";
  const govtIdType = guest.idProof?.idType || guest.govtIdType || guest.idType || "AADHAAR";
  const govtIdNumber = guest.idProof?.idNumber || guest.govtIdNumber || guest.idNumber || "Verified On Record";
  const roomNumberDisplay = booking.roomNumber || booking.room?.roomNumber || guest.roomAssigned || "101";
  const roomTypeNameDisplay = booking.roomType?.name || booking.roomTypeName || "Executive Suite";

  // Check if any actual ID images exist
  const primaryFront = guest.idProof?.frontImage || guest.idProof?.frontImageUrl || guest.frontImage || guest.idProofImage || booking.idProof?.frontImage || booking.idProofImage;
  const primaryBack = guest.idProof?.backImage || guest.idProof?.backImageUrl || guest.backImage || guest.idProofBackImage || booking.idProof?.backImage || booking.idProofBackImage;
  const hasAnyIdImages = primaryFront || primaryBack || accompanying.some((m) => m.frontImage || m.backImage || m.idProofImage);

  const html = `
    <!-- Top Branded Executive Header -->
    <div style="background: linear-gradient(135deg, #092622 0%, #0F766E 50%, #14B8A6 100%); border-radius: 16px; padding: 18px 22px; color: #FFFFFF; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 24px rgba(15, 118, 110, 0.25);">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 48px; height: 48px; background: #FFFFFF; border: 2px solid rgba(255,255,255,0.8); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; overflow: hidden; padding: 4px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <img src="/logo.png" alt="${hotelName}" onerror="this.outerHTML='🏨'" style="width:100%;height:100%;object-fit:contain;" />
        </div>
        <div>
          <div style="font-size: 20px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.4px;">${hotelName}</div>
          <div style="font-size: 11px; color: rgba(255, 255, 255, 0.9); font-weight: 600; margin-top: 2px;">
            📍 ${hotelAddress} &bull; 📞 ${hotelPhone}
          </div>
          <div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 4px; border: none; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; letter-spacing: 0.3px;">
            <span style="width: 6px; height: 6px; background: #4ADE80; border-radius: 50%; display: inline-block;"></span>
            GSTIN: <strong>${hotelGst}</strong> &bull; Verified Property
          </div>
        </div>
      </div>

      <div style="text-align: right; border: none; padding: 4px 8px;">
        <div style="font-size: 15px; font-weight: 900; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px;">GUEST STAY FOLIO</div>
        <div style="font-size: 13px; font-weight: 800; color: #99F6E4; margin-top: 2px; font-family: monospace;">#${booking.bookingNumber || folioNum}</div>
        <div style="font-size: 10px; color: rgba(255, 255, 255, 0.85); font-weight: 700; margin-top: 2px;">Date: ${dateStr} &bull; ${timeStr}</div>
      </div>
    </div>

    <!-- 2-Column Guest & Stay Cards -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
      <!-- Primary Guest Profile Card -->
      <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; position: relative; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 3.5px; background: #0F766E;"></div>
        <div style="font-size: 10.5px; font-weight: 900; color: #0F766E; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          <span>👤</span> PRIMARY GUEST PROFILE
        </div>
        <div style="font-size: 14px; font-weight: 900; color: #0F172A; margin-bottom: 5px;">${guestName}</div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
          📞 Phone: <strong style="color:#0F172A;">${guestPhone}</strong> &bull; ✉️ ${guestEmail}
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 3px; display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
          <span>🛡️ Govt ID:</span>
          <strong style="color:#0F172A; font-family: monospace;">${govtIdType}: ${govtIdNumber}</strong>
          <span style="display: inline-block; background: transparent; color: #15803D; border: none; padding: 1px 6px; border-radius: 4px; font-size: 9.5px; font-weight: 800;">✓ Verified</span>
        </div>
        <div style="font-size: 11px; color: #475569;">
          🏠 Address: <span style="color:#0F172A;">${guestAddress}</span>
        </div>
      </div>

      <!-- Stay Allocation Card -->
      <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; position: relative; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
        <div style="position: absolute; top: 0; left: 0; right: 0; height: 3.5px; background: #10B981;"></div>
        <div style="font-size: 10.5px; font-weight: 900; color: #10B981; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          <span>🏨</span> STAY &amp; ROOM ALLOCATION
        </div>
        <div style="font-size: 14px; font-weight: 900; color: #0F172A; margin-bottom: 5px;">
          Room #${roomNumberDisplay} &bull; <span style="font-size: 12px; color: #0F766E; font-weight: 800;">${roomTypeNameDisplay}</span>
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
          📥 Check-In: <strong style="color:#0F172A;">${checkInDateFormatted} (${checkInTimeFormatted})</strong>
        </div>
        <div style="font-size: 11px; color: #475569; margin-bottom: 3px;">
          📤 Check-Out: <strong style="color:#0F172A;">${checkOutDateFormatted} (${checkOutTimeFormatted})</strong>
        </div>
        <div style="font-size: 11px; color: #475569; display: flex; align-items: center; gap: 6px;">
          <span>⏱️ Duration: <strong>${nights} Night${nights > 1 ? "s" : ""}</strong></span>
          <span>&bull;</span>
          <span>Status: <strong style="color:#059669;">${guest.status || "IN-HOUSE"}</strong></span>
        </div>
        ${isLate ? `
          <div style="margin-top:6px; background:#FEF2F2; border:1px solid #FCA5A5; border-radius:6px; padding:4px 8px; font-size:10.5px; color:#DC2626; font-weight:800;">
            ⚠️ Late Check-Out: ${lateHours}h overstay @ ₹${hourlyRate}/hr (+₹${lateFee.toLocaleString("en-IN")})
          </div>
        ` : ""}
      </div>
    </div>

    <!-- Accompanying Members Section -->
    ${accompanying && accompanying.length > 0 ? `
      <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
        <span>👥</span> ACCOMPANYING FAMILY MEMBERS &amp; CO-GUESTS (${accompanying.length})
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border-radius: 10px; overflow: hidden; border: 1px solid #E2E8F0;">
        <thead>
          <tr style="background: #0F766E; color: #FFFFFF;">
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 35px;">#</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Member Full Name</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Age / Gender</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Relationship</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Govt ID Type</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">ID Proof Number</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 90px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${accompanying.map((m, idx) => `
            <tr style="border-bottom: 1px solid #E2E8F0; background: ${idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
              <td style="padding: 8px 10px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">${idx + 1}</td>
              <td style="padding: 8px 10px; font-size: 11px; font-weight: 800; color: #0F172A;">${m.name || m.fullName || `Member ${idx + 1}`}</td>
              <td style="padding: 8px 10px; font-size: 11px; color: #475569;">${m.age ? `${m.age} yrs` : "-"} / ${m.gender || "-"}</td>
              <td style="padding: 8px 10px; font-size: 11px;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#6D28D9; border:none;">${m.relationship || "Accompanying Guest"}</span></td>
              <td style="padding: 8px 10px; font-size: 11px; font-weight: 700; color: #334155;">${m.idType || "AADHAAR"}</td>
              <td style="padding: 8px 10px; font-size: 11px;"><code style="font-family:monospace; background:#F1F5F9; padding:2px 5px; border-radius:4px; font-size:10.5px;">${m.idNumber || "Verified On Record"}</code></td>
              <td style="padding: 8px 10px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#15803D; border:none;">✓ Verified</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Verified Aadhaar & Govt ID Photo Proofs Section (if photos are uploaded) -->
    ${hasAnyIdImages ? (() => {
      const allIdCards = [
        {
          name: guestName,
          tag: "Primary Guest",
          tagColor: "#0F766E",
          tagBg: "#CCFBF1",
          idType: govtIdType,
          idNumber: govtIdNumber,
          frontImg: primaryFront,
          backImg: primaryBack,
        },
        ...accompanying.map((m, idx) => ({
          name: m.name || m.fullName || `Co-Guest ${idx + 1}`,
          tag: m.relationship || "Accompanying Guest",
          tagColor: "#6D28D9",
          tagBg: "#EDE9FE",
          idType: m.idType || "AADHAAR",
          idNumber: m.idNumber || "Verified On Record",
          frontImg: m.frontImage || m.frontImageUrl || m.idProofImage || m.idProof?.frontImage || m.idProof?.frontImageUrl,
          backImg: m.backImage || m.backImageUrl || m.idProofBackImage || m.idProof?.backImage || m.idProof?.backImageUrl,
        }))
      ].filter((c) => c.frontImg || c.backImg);

      if (allIdCards.length === 0) return "";

      return `
        <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>🪪</span> VERIFIED GOVT ID &amp; AADHAAR CARD COPIES
          </div>
          <span style="font-size: 10px; color: #15803D; font-weight: 800; background: transparent; padding: 2px 8px; border-radius: 6px; border: none;">
            ✓ Digitally Verified &amp; Archived
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(${allIdCards.length === 1 ? 1 : 2}, 1fr); gap: 10px; margin-bottom: 16px;">
          ${allIdCards.map((card) => `
            <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 10px; padding: 10px; box-sizing: border-box;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">
                <div style="font-size: 11px; font-weight: 900; color: #0F172A; display: flex; align-items: center; gap: 5px;">
                  <span>👤 ${card.name}</span>
                  <span style="font-size: 9px; font-weight: 800; color: ${card.tagColor}; background: ${card.tagBg}; padding: 1px 5px; border-radius: 4px;">${card.tag}</span>
                </div>
                <div style="font-size: 9px; font-weight: 800; color: #15803D;">${card.idType}: ${card.idNumber}</div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                ${card.frontImg ? `
                  <div style="height: 80px; border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center;">
                    <img src="${card.frontImg}" alt="Front ID" style="width: 100%; height: 100%; object-fit: contain; background: #F1F5F9;" />
                  </div>
                ` : ""}
                ${card.backImg ? `
                  <div style="height: 80px; border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center;">
                    <img src="${card.backImg}" alt="Back ID" style="width: 100%; height: 100%; object-fit: contain; background: #F1F5F9;" />
                  </div>
                ` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      `;
    })() : ""}

    <!-- Allocated Rooms Breakdown Table (if multiple rooms exist) -->
    ${roomsDetail && roomsDetail.length > 0 ? `
      <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
        <span>🛏️</span> ALLOCATED ROOMS &amp; TARIFF BREAKDOWN (${roomsDetail.length})
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border-radius: 10px; overflow: hidden; border: 1px solid #CBD5E1;">
        <thead>
          <tr style="background: #0F766E; color: #FFFFFF;">
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 35px;">#</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Room Number</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Category / Type</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 80px;">Nights</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 100px;">Rate / Night (₹)</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 110px;">Total (₹)</th>
            <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 90px;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${roomsDetail.map((rm, idx) => `
            <tr style="border-bottom: 1px solid #E2E8F0; background: ${idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
              <td style="padding: 8px 10px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">${idx + 1}</td>
              <td style="padding: 8px 10px; font-size: 11px; font-weight: 900; color: #0F766E;">Room #${rm.roomNumber}</td>
              <td style="padding: 8px 10px; font-size: 11px; font-weight: 700; color: #334155;">${rm.roomType || "Standard Room"}</td>
              <td style="padding: 8px 10px; font-size: 11px; text-align: center; font-weight: 700; color: #0F172A;">${rm.numberOfNights || 1} Night(s)</td>
              <td style="padding: 8px 10px; font-size: 11px; text-align: right; color: #475569;">₹${(rm.pricePerNight || 0).toLocaleString("en-IN")}</td>
              <td style="padding: 8px 10px; font-size: 11px; text-align: right; font-weight: 900; color: #059669;">₹${(rm.roomTotal || 0).toLocaleString("en-IN")}</td>
              <td style="padding: 8px 10px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#0F766E; border: none;">${rm.status || "OCCUPIED"}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Main Itemized Tariff & Services Breakdown -->
    <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
      <span>📋</span> ITEMIZED ROOM TARIFF, TAXES &amp; EXTRA CHARGES BREAKDOWN
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border-radius: 10px; overflow: hidden; border: 1px solid #CBD5E1; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
      <thead>
        <tr style="background: #0F766E; color: #FFFFFF;">
          <th style="padding: 9px 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 32px;">#</th>
          <th style="padding: 9px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Description of Service / Tariff Charge</th>
          <th style="padding: 9px 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 70px;">HSN/SAC</th>
          <th style="padding: 9px 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 70px;">Qty/Nights</th>
          <th style="padding: 9px 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 75px;">Rate (₹)</th>
          <th style="padding: 9px 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 85px;">Taxable (₹)</th>
          <th style="padding: 9px 6px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 65px;">GST Rate</th>
          <th style="padding: 9px 8px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 85px;">Tax Amount</th>
          <th style="padding: 9px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right; width: 90px;">Total (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #E2E8F0; background: #FFFFFF;">
          <td style="padding: 9px 8px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">1</td>
          <td style="padding: 9px 10px; font-size: 11px;">
            <div style="font-weight: 900; color: #0F172A;">Room #${roomNumberDisplay} &bull; ${roomTypeNameDisplay}</div>
            <div style="font-size: 10px; color: #64748B; margin-top: 2px;">CGST @ ${defaultGstRate / 2}% (₹${cgstVal.toLocaleString("en-IN")}) + SGST @ ${defaultGstRate / 2}% (₹${sgstVal.toLocaleString("en-IN")})</div>
          </td>
          <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-family: monospace; color: #475569;">996311</td>
          <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-weight: 700; color: #0F172A;">${nights} Night${nights > 1 ? "s" : ""}</td>
          <td style="padding: 9px 8px; font-size: 11px; text-align: right; color: #334155;">₹${baseRatePerNight.toLocaleString("en-IN")}</td>
          <td style="padding: 9px 8px; font-size: 11px; text-align: right; font-weight: 700; color: #0F172A;">₹${taxableVal.toLocaleString("en-IN")}</td>
          <td style="padding: 9px 6px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 6px; border-radius:4px; font-size:9.5px; font-weight:800; background: transparent; color:#0F766E;">${defaultGstRate}%</span></td>
          <td style="padding: 9px 8px; font-size: 11px; text-align: right; color: #475569;">₹${totalGst.toLocaleString("en-IN")}</td>
          <td style="padding: 9px 10px; font-size: 11.5px; text-align: right; font-weight: 900; color: #059669;">₹${(taxableVal + totalGst).toLocaleString("en-IN")}</td>
        </tr>

        ${isLate ? `
          <tr style="border-bottom: 1px solid #E2E8F0; background: #FFF5F5;">
            <td style="padding: 9px 8px; font-size: 11px; text-align: center; font-weight: 700; color: #DC2626;">2</td>
            <td style="padding: 9px 10px; font-size: 11px;">
              <div style="font-weight: 900; color: #DC2626;">Late Check-Out Surcharge</div>
              <div style="font-size: 10px; color: #991B1B;">Overstayed ${lateHours}h @ ₹${hourlyRate}/hr</div>
            </td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-family: monospace; color: #475569;">996311</td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-weight: 700;">${lateHours}h</td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right;">₹${hourlyRate.toLocaleString("en-IN")}</td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right; font-weight: 700;">₹${lateFee.toLocaleString("en-IN")}</td>
            <td style="padding: 9px 6px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 6px; border-radius:4px; font-size:9.5px; font-weight:800; background:#F1F5F9; color:#475569;">0%</span></td>
            <td style="padding: 9px 8px; font-size: 11px; text-align: right;">₹0</td>
            <td style="padding: 9px 10px; font-size: 11.5px; text-align: right; font-weight: 900; color: #DC2626;">₹${lateFee.toLocaleString("en-IN")}</td>
          </tr>
        ` : ""}

        ${charges.map((c, i) => {
      const cAmt = Number(c.amount) || 0;
      return `
            <tr style="border-bottom: 1px solid #E2E8F0; background: ${i % 2 === 0 ? '#F8FAFC' : '#FFFFFF'};">
              <td style="padding: 9px 8px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">${(isLate ? 2 : 1) + 1 + i}</td>
              <td style="padding: 9px 10px; font-size: 11px;">
                <div style="font-weight: 800; color: #0F172A;">${c.title || c.item || c.serviceName || "POS Room Service"}</div>
                <div style="font-size: 10px; color: #64748B;">Category: <strong>${c.category || "F&B / Sundry"}</strong></div>
              </td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-family: monospace; color: #475569;">996331</td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center; font-weight: 700;">${c.quantity || 1}</td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right;">₹${cAmt.toLocaleString("en-IN")}</td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right; font-weight: 700;">₹${cAmt.toLocaleString("en-IN")}</td>
              <td style="padding: 9px 6px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 6px; border-radius:4px; font-size:9.5px; font-weight:800; background:#F1F5F9; color:#475569;">0%</span></td>
              <td style="padding: 9px 8px; font-size: 11px; text-align: right;">₹0</td>
              <td style="padding: 9px 10px; font-size: 11.5px; text-align: right; font-weight: 900; color: #0F172A;">₹${cAmt.toLocaleString("en-IN")}</td>
            </tr>
          `;
    }).join("")}
      </tbody>
    </table>

    <!-- Payment Transaction History Ledger -->
    <div style="font-size: 11.5px; font-weight: 900; color: #0F172A; text-transform: uppercase; margin: 14px 0 6px 0; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
      <span>💳</span> PAYMENT TRANSACTION HISTORY LEDGER (${paymentHistory.length})
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border-radius: 10px; overflow: hidden; border: 1px solid #E2E8F0;">
      <thead>
        <tr style="background: #0F766E; color: #FFFFFF;">
          <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 35px;">#</th>
          <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Receipt / Txn ID</th>
          <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Date &amp; Time</th>
          <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Stage</th>
          <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: left;">Method</th>
          <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: right;">Amount (₹)</th>
          <th style="padding: 8px 10px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; text-align: center; width: 85px;">Status</th>
        </tr>
      </thead>
      <tbody>
        ${paymentHistory.length > 0 ? paymentHistory.map((p, idx) => {
      const pAmt = Number(p.amount) || 0;
      const pMethod = (p.paymentMethod || "CASH").toUpperCase();
      return `
            <tr style="border-bottom: 1px solid #E2E8F0; background: ${idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
              <td style="padding: 8px 10px; font-size: 11px; text-align: center; font-weight: 700; color: #64748B;">${idx + 1}</td>
              <td style="padding: 8px 10px; font-size: 11px; font-weight: 800; color: #0F766E; font-family: monospace;">#${p.receiptNumber || p.transactionId || "RCP-001"}</td>
              <td style="padding: 8px 10px; font-size: 11px; color: #475569;">${p.formattedDate || (p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : dateStr)}</td>
              <td style="padding: 8px 10px; font-size: 11px; font-weight: 600; color: #334155;">${p.paymentType || "Settlement"}</td>
              <td style="padding: 8px 10px; font-size: 11px;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#0F766E; border:none;">${pMethod}</span></td>
              <td style="padding: 8px 10px; font-size: 11px; text-align: right; font-weight: 900; color: #059669;">₹${pAmt.toLocaleString("en-IN")}</td>
              <td style="padding: 8px 10px; font-size: 11px; text-align: center;"><span style="display:inline-block; padding:2px 7px; border-radius:5px; font-size:9.5px; font-weight:800; background: transparent; color:#15803D; border:none;">✓ PAID</span></td>
            </tr>
          `;
    }).join("") : `
          <tr>
            <td colspan="7" style="text-align: center; padding: 12px; color: #64748B; font-size: 11px;">No transaction records logged yet.</td>
          </tr>
        `}
      </tbody>
    </table>

    <!-- Financial Settlement Summary & Notes Dual Container -->
    <div style="display: grid; grid-template-columns: 1fr 340px; gap: 16px; margin-bottom: 20px; align-items: start;">
      <!-- Left: Stay Notes & Rules -->
      <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: 14px; padding: 14px 16px; font-size: 10.5px; color: #475569; line-height: 1.55;">
        <div style="font-weight: 900; color: #0F172A; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
          <span>📌</span> STAY FOLIO &amp; BILLING POLICY
        </div>
        <ul style="margin: 0; padding-left: 16px;">
          <li style="margin-bottom: 4px;">This stay folio reflects complete itemized room and point-of-sale consumption for this guest cycle.</li>
          <li style="margin-bottom: 4px;">Standard check-out is 11:00 AM. Key cards must be returned to the Front Desk at final settlement.</li>
          <li>All room tariff and extra charges are subject to statutory GST regulations under SAC 996311.</li>
        </ul>
      </div>

      <!-- Right: Financial Ledger Card -->
      <div style="background: #FFFFFF; border: 2px solid #CBD5E1; border-radius: 14px; padding: 14px 18px; box-shadow: 0 4px 14px rgba(15, 118, 110, 0.06);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; color: #475569;">
          <span>Room Base Tariff:</span>
          <span style="font-weight: 800; color: #0F172A;">₹${taxableVal.toLocaleString("en-IN")}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; color: #475569;">
          <span>GST (CGST ₹${cgstVal.toLocaleString("en-IN")} + SGST ₹${sgstVal.toLocaleString("en-IN")}):</span>
          <span style="font-weight: 800; color: #0F172A;">₹${totalGst.toLocaleString("en-IN")}</span>
        </div>
        ${posTotal > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; color: #0F766E; font-weight: 700;">
            <span>Extra POS / F&amp;B (${charges.length} items):</span>
            <span style="font-weight: 800;">+₹${posTotal.toLocaleString("en-IN")}</span>
          </div>
        ` : ""}
        ${isLate ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11px; color: #DC2626; font-weight: 700;">
            <span>Late Checkout Fee (${lateHours}h):</span>
            <span style="font-weight: 800;">+₹${lateFee.toLocaleString("en-IN")}</span>
          </div>
        ` : ""}
        <div style="border-top: 1.5px dashed #CBD5E1; margin: 8px 0;"></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; font-weight: 900; color: #0F172A;">
          <span>Grand Total Payable:</span>
          <span style="color: #059669; font-size: 15px;">₹${grandTotalAmount.toLocaleString("en-IN")}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 12px; font-weight: 800; color: #059669;">
          <span>Total Payments Received:</span>
          <span>−₹${paidAmount.toLocaleString("en-IN")}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 6px; border-top: 1.5px solid #E2E8F0; margin-top: 4px; font-size: 13px; font-weight: 900; color: ${dueAmount <= 0 ? '#059669' : '#DC2626'};">
          <span>Outstanding Balance:</span>
          <span>${dueAmount <= 0 ? '₹0 (✓ Settled)' : `₹${dueAmount.toLocaleString("en-IN")}`}</span>
        </div>
      </div>
    </div>

    <!-- Official Authorization Footer -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 14px; border-top: 1.5px solid #E2E8F0; font-size: 11px; color: #64748B;">
      <div>
        <div style="font-weight: 800; color: #0F172A; font-size: 12px;">Thank you for choosing ${hotelName}!</div>
        <div style="font-size: 10px; color: #94A3B8; margin-top: 2px;">Official Guest Stay Folio &bull; Verified and Digitally Sealed by PMS Front Desk</div>
      </div>
      <div style="text-align: right; width: 220px;">
        <div style="border-bottom: 1.5px dashed #94A3B8; margin-bottom: 6px; height: 35px;"></div>
        <div style="font-size: 10.5px; font-weight: 800; color: #0F172A; text-transform: uppercase;">Guest / Cashier Signature</div>
      </div>
    </div>
  `;

  openPrintOrSavePDF(`Guest_Folio_${(guest.fullName || guestName || "Guest").replace(/\s+/g, "_")}_${Date.now()}`, html);
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

    <div style="background: transparent;border:2px solid #86EFAC;border-radius:14px;padding:20px;text-align:center;margin-bottom:24px;">
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
        <div class="doc-title" style="color:#0F766E;">Network Directory</div>
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

/**
 * 11. Generate & Download Official Guest Govt ID / Aadhaar Proof PDF
 * File is named strictly with the guest's name: ID_Proof_[Guest_Name].pdf
 */
export function downloadGuestIdProofPDF(data = {}, hotel = {}) {
  const guest = data.guest || {};
  const booking = data.activeBooking || guest.activeBooking || {};
  const accompanying = data.accompanyingGuests || booking.accompanyingGuests || guest.accompanyingGuests || [];

  const hotelName = hotel.name || "MYOWNPMS Luxury Hotel";
  const hotelAddress = hotel.address || hotel.city || "Marine Drive, Mumbai, Maharashtra";
  const hotelPhone = hotel.phone || hotel.ownerPhone || "+91 98200 12345";
  const hotelGst = hotel.gstin || hotel.settings?.gstin || "27AABCG1234F1Z8";

  const guestName = guest.fullName || guest.name || booking.guestName || "Valued Guest";
  const guestPhone = guest.mobileNumber || guest.phone || booking.guestPhone || "On Record";
  const guestEmail = guest.email || booking.guestEmail || "Not Provided";
  const guestAddress = guest.address?.city || guest.city || guest.address?.fullAddress || guest.address || "Verified On Record";
  const govtIdType = guest.idProof?.idType || guest.govtIdType || guest.idType || "AADHAAR";
  const govtIdNumber = guest.idProof?.idNumber || guest.govtIdNumber || guest.idNumber || "Verified On Record";
  const roomNumberDisplay = booking.roomNumber || booking.room?.roomNumber || guest.roomAssigned || "101";

  const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const timeStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const primaryFront = guest.idProof?.frontImage || guest.idProof?.frontImageUrl || guest.frontImage || guest.idProofImage || booking.idProof?.frontImage || booking.idProofImage;
  const primaryBack = guest.idProof?.backImage || guest.idProof?.backImageUrl || guest.backImage || guest.idProofBackImage || booking.idProof?.backImage || booking.idProofBackImage;

  const allMembers = [
    {
      name: guestName,
      tag: "Primary Guest",
      tagColor: "#0F766E",
      tagBg: "#CCFBF1",
      idType: govtIdType,
      idNumber: govtIdNumber,
      phone: guestPhone,
      email: guestEmail,
      address: guestAddress,
      roomNumber: roomNumberDisplay,
      frontImg: primaryFront,
      backImg: primaryBack,
    },
    ...accompanying.map((m, idx) => ({
      name: m.name || m.fullName || `Co-Guest ${idx + 1}`,
      tag: m.relationship || "Accompanying Guest",
      tagColor: "#6D28D9",
      tagBg: "#EDE9FE",
      idType: m.idType || "AADHAAR",
      idNumber: m.idNumber || "Verified On Record",
      phone: m.phone || guestPhone,
      email: m.email || "-",
      address: guestAddress,
      roomNumber: roomNumberDisplay,
      frontImg: m.frontImage || m.frontImageUrl || m.idProofImage || m.idProof?.frontImage || m.idProof?.frontImageUrl,
      backImg: m.backImage || m.backImageUrl || m.idProofBackImage || m.idProof?.backImage || m.idProof?.backImageUrl,
    }))
  ];

  const html = `
    <!-- Top Branded Executive Header -->
    <div class="pdf-section" style="background: linear-gradient(135deg, #092622 0%, #0F766E 50%, #14B8A6 100%); border-radius: 16px; padding: 18px 22px; color: #FFFFFF; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 24px rgba(15, 118, 110, 0.25);">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 48px; height: 48px; background: #FFFFFF; border: 2px solid rgba(255,255,255,0.8); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; overflow: hidden; padding: 4px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <img src="/logo.png" alt="${hotelName}" onerror="this.outerHTML='🏨'" style="width:100%;height:100%;object-fit:contain;" />
        </div>
        <div>
          <div style="font-size: 20px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.4px;">${hotelName}</div>
          <div style="font-size: 11px; color: rgba(255, 255, 255, 0.9); font-weight: 600; margin-top: 2px;">
            📍 ${hotelAddress} &bull; 📞 ${hotelPhone}
          </div>
          <div style="display: inline-flex; align-items: center; gap: 5px; margin-top: 4px; border: none; padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 800; letter-spacing: 0.3px;">
            <span style="width: 6px; height: 6px; background: #4ADE80; border-radius: 50%; display: inline-block;"></span>
            GSTIN: <strong>${hotelGst}</strong> &bull; Verified Property
          </div>
        </div>
      </div>

      <div style="text-align: right; border: none; padding: 4px 8px;">
        <div style="font-size: 14px; font-weight: 900; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px;">GOVT ID PROOF DOSSIER</div>
        <div style="font-size: 13px; font-weight: 800; color: #99F6E4; margin-top: 2px;">${guestName}</div>
        <div style="font-size: 10px; color: rgba(255, 255, 255, 0.85); font-weight: 700; margin-top: 2px;">Date: ${dateStr} &bull; ${timeStr}</div>
      </div>
    </div>

    <!-- Verified Badge Ribbon -->
    <div class="pdf-section" style="background: transparent; border: 1.5px solid #86EFAC; border-radius: 12px; padding: 10px 16px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 16px;">🛡️</span>
        <div>
          <div style="font-size: 12px; font-weight: 900; color: #15803D;">GOVERNMENT IDENTIFICATION RECORD</div>
          <div style="font-size: 10px; color: #166534;">Digitally captured, encrypted &amp; verified for compliance with regulatory guest registration norms.</div>
        </div>
      </div>
      <span style="background: transparent; color: #15803D; border: none; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 900;">
        ✓ DIGITALLY VERIFIED
      </span>
    </div>

    <!-- ID Cards for Each Person -->
    ${allMembers.map((m, idx) => `
      <div class="pdf-section" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 14px; padding: 16px; margin-bottom: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 8px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 15px; font-weight: 900; color: #0F172A;">👤 ${m.name}</div>
            <span style="font-size: 10px; font-weight: 800; color: ${m.tagColor}; background: ${m.tagBg}; padding: 2px 8px; border-radius: 6px;">${m.tag}</span>
          </div>
          <div style="font-size: 12px; font-weight: 900; color: #0F172A;">
            ${m.idType}: <span style="font-family: monospace; color: #0F766E;">${m.idNumber}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px; font-size: 11px; color: #475569; background: #FFFFFF; padding: 10px; border-radius: 8px; border: 1px solid #E2E8F0;">
          <div>📞 Contact: <strong style="color:#0F172A;">${m.phone}</strong></div>
          <div>🏨 Room: <strong style="color:#0F172A;">#${m.roomNumber}</strong></div>
          <div>🏠 City / Address: <strong style="color:#0F172A;">${m.address}</strong></div>
        </div>

        <div style="display: grid; grid-template-columns: ${m.frontImg && m.backImg ? "1fr 1fr" : "1fr"}; gap: 14px;">
          <div style="border: 1.5px solid #CBD5E1; border-radius: 10px; overflow: hidden; background: #FFFFFF; padding: 8px;">
            <div style="font-size: 10.5px; font-weight: 800; color: #64748B; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
              📄 Front Side Photo
            </div>
            ${m.frontImg ? `
              <div style="height: 220px; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; background: #F8FAFC; display: flex; align-items: center; justify-content: center;">
                <img src="${m.frontImg}" alt="Front ID Photo" style="width: 100%; height: 100%; object-fit: contain;" />
              </div>
            ` : `
              <div style="height: 120px; border: 1.5px dashed #CBD5E1; border-radius: 8px; background: #F8FAFC; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94A3B8;">
                <span style="font-size: 24px;">🪪</span>
                <span style="font-size: 11px; font-weight: 700; margin-top: 4px;">Verified on Physical Record</span>
                <span style="font-size: 10px;">Number: ${m.idNumber}</span>
              </div>
            `}
          </div>

          ${m.backImg || (m.frontImg && !m.backImg && allMembers.length === 1) ? `
            <div style="border: 1.5px solid #CBD5E1; border-radius: 10px; overflow: hidden; background: #FFFFFF; padding: 8px;">
              <div style="font-size: 10.5px; font-weight: 800; color: #64748B; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                📄 Back Side Photo
              </div>
              ${m.backImg ? `
                <div style="height: 220px; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; background: #F8FAFC; display: flex; align-items: center; justify-content: center;">
                  <img src="${m.backImg}" alt="Back ID Photo" style="width: 100%; height: 100%; object-fit: contain;" />
                </div>
              ` : `
                <div style="height: 120px; border: 1.5px dashed #CBD5E1; border-radius: 8px; background: #F8FAFC; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94A3B8;">
                  <span style="font-size: 20px;">📄</span>
                  <span style="font-size: 11px; font-weight: 700; margin-top: 4px;">No Back Image Attached</span>
                  <span style="font-size: 10px;">Single-sided document</span>
                </div>
              `}
            </div>
          ` : ""}
        </div>
      </div>
    `).join("")}

    <!-- Official Authorization Footer -->
    <div class="pdf-section" style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 14px; border-top: 1.5px solid #E2E8F0; font-size: 11px; color: #64748B; margin-top: 14px;">
      <div>
        <div style="font-weight: 800; color: #0F172A; font-size: 12px;">${hotelName} &bull; Security &amp; Compliance Wing</div>
        <div style="font-size: 10px; color: #94A3B8; margin-top: 2px;">Official Regulatory ID Proof Record &bull; Digitally Signed &amp; Archived</div>
      </div>
      <div style="text-align: right; width: 220px;">
        <div style="border-bottom: 1.5px dashed #94A3B8; margin-bottom: 6px; height: 35px;"></div>
        <div style="font-size: 10.5px; font-weight: 800; color: #0F172A; text-transform: uppercase;">Front Desk Officer / Verified</div>
      </div>
    </div>
  `;

  const cleanGuestName = (guest.fullName || guestName || "Guest").replace(/[^a-zA-Z0-9_\-]/g, "_");
  openPrintOrSavePDF(`ID_Proof_${cleanGuestName}`, html);
}

