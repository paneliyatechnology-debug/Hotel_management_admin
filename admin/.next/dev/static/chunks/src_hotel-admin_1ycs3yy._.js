(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/hotel-admin/components/HotelAdminDashboard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HotelAdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Box/Box.mjs [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/Alert/Alert.mjs [app-client] (ecmascript) <export default as Alert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/context/ThemeContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ConfirmDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/ConfirmDialog.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$SettingsView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/SettingsView.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$HotelOverviewPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hotel-admin/pages/HotelOverviewPage.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$DailyCollectionsPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hotel-admin/pages/DailyCollectionsPage.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$GuestDirectoryPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hotel-admin/pages/GuestDirectoryPage.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$StaffTeamPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hotel-admin/pages/StaffTeamPage.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$RoomTypesPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hotel-admin/pages/RoomTypesPage.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$SubscriptionPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hotel-admin/pages/SubscriptionPage.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function HotelAdminDashboard({ user, activeNav = 0, onTabChange }) {
    _s();
    const { themeConfig } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"])();
    const [hotelSettings, setHotelSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(user?.hotel?.settings || {
        checkInTime: "14:00",
        checkOutTime: "12:00",
        timezone: "Asia/Kolkata"
    });
    const [dashboardData, setDashboardData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rooms, setRooms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [roomTypes, setRoomTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [guests, setGuests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [staffList, setStaffList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        message: "",
        severity: "success"
    });
    // Filters & Searches
    const [guestSearch, setGuestSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [guestFilter, setGuestFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ALL");
    const [staffSearch, setStaffSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [staffRoleFilter, setStaffRoleFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ALL");
    const [selectedFloor, setSelectedFloor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ALL");
    const [selectedStatus, setSelectedStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ALL");
    // Modals & Drawers
    const [guestModal, setGuestModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        mode: "ADD",
        data: getInitialGuestForm()
    });
    const [viewGuestModal, setViewGuestModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        guest: null
    });
    const [staffModal, setStaffModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        mode: "ADD",
        data: getInitialStaffForm()
    });
    const [viewStaffModal, setViewStaffModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        staff: null
    });
    const [roomModal, setRoomModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        mode: "ADD",
        data: getInitialRoomForm()
    });
    const [typeModal, setTypeModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        mode: "ADD",
        data: {
            name: "",
            basePrice: 4000,
            maxAdults: 2,
            maxChildren: 1,
            description: ""
        }
    });
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        title: "",
        message: "",
        onConfirm: null
    });
    function getInitialRoomForm() {
        return {
            _id: "",
            roomNumber: "",
            roomType: roomTypes[0]?._id || "",
            floor: 1,
            seatingCapacity: 2,
            customPricePerNight: "",
            status: "AVAILABLE",
            notes: ""
        };
    }
    function getInitialGuestForm() {
        return {
            _id: "",
            name: "",
            email: "",
            phone: "",
            idType: "AADHAAR",
            idNumber: "",
            address: "",
            roomAssigned: "101",
            checkInDate: new Date().toISOString().split("T")[0],
            checkOutDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
            totalAmount: 7000,
            status: "IN-HOUSE"
        };
    }
    function getInitialStaffForm() {
        return {
            _id: "",
            name: "",
            email: "",
            phone: "",
            role: "RECEPTIONIST",
            shift: "Morning (07:00 - 15:00)",
            idType: "AADHAAR",
            idNumber: "",
            salary: 28000,
            status: "ACTIVE",
            password: ""
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HotelAdminDashboard.useEffect": ()=>{
            fetchAllData();
        }
    }["HotelAdminDashboard.useEffect"], []);
    const fetchAllData = async ()=>{
        setLoading(true);
        try {
            const [dashRes, roomsRes, typesRes, staffRes, guestsRes, profileRes, bookRes] = await Promise.allSettled([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.DASHBOARD),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.ROOMS),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.ROOM_TYPES),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.RECEPTIONISTS),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].RECEPTIONIST.GUESTS),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.PROFILE),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].RECEPTIONIST.BOOKINGS)
            ]);
            if (profileRes.status === "fulfilled" && profileRes.value?.data?.settings) {
                setHotelSettings(profileRes.value.data.settings);
            }
            if (dashRes.status === "fulfilled" && dashRes.value?.data) {
                setDashboardData(dashRes.value.data);
            }
            if (roomsRes.status === "fulfilled" && (roomsRes.value?.data || Array.isArray(roomsRes.value))) {
                setRooms(roomsRes.value.data || roomsRes.value || []);
            }
            if (typesRes.status === "fulfilled" && (typesRes.value?.data || Array.isArray(typesRes.value))) {
                setRoomTypes(typesRes.value.data || typesRes.value || []);
            }
            if (staffRes.status === "fulfilled" && (staffRes.value?.data || Array.isArray(staffRes.value))) {
                setStaffList(staffRes.value.data || staffRes.value || []);
            }
            if (guestsRes.status === "fulfilled" && (guestsRes.value?.data || Array.isArray(guestsRes.value))) {
                setGuests(guestsRes.value.data || guestsRes.value || []);
            }
            if (bookRes.status === "fulfilled" && (bookRes.value?.data || Array.isArray(bookRes.value))) {
                setBookings(bookRes.value.data || bookRes.value || []);
            }
        } catch (err) {
            console.error("Data load error:", err);
        } finally{
            setLoading(false);
        }
    };
    const showToast = (message, severity = "success")=>{
        setNotification({
            show: true,
            message,
            severity
        });
        setTimeout(()=>setNotification({
                show: false,
                message: "",
                severity: "success"
            }), 4000);
    };
    // Guest CRUD Handlers
    const handleSaveGuest = async (e)=>{
        e.preventDefault();
        const guestName = guestModal.data.name || guestModal.data.fullName;
        const guestPhone = guestModal.data.phone || guestModal.data.mobileNumber;
        if (!guestName || !guestPhone) {
            showToast("Guest name and phone number are required", "error");
            return;
        }
        try {
            const payload = {
                fullName: guestName,
                mobileNumber: guestPhone,
                email: guestModal.data.email || "",
                address: guestModal.data.address || "",
                idType: guestModal.data.idType || "AADHAAR",
                idNumber: guestModal.data.idNumber || "PENDING"
            };
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].RECEPTIONIST.GUESTS, {
                method: "POST",
                body: payload
            });
            if (res.data) {
                const savedGuest = {
                    ...res.data,
                    name: res.data.fullName,
                    phone: res.data.mobileNumber,
                    idType: res.data.idProof?.idType || payload.idType,
                    idNumber: res.data.idProof?.idNumber || payload.idNumber
                };
                const existingIdx = guests.findIndex((g)=>g._id === savedGuest._id || g.mobileNumber === savedGuest.mobileNumber);
                if (existingIdx >= 0) {
                    const updated = [
                        ...guests
                    ];
                    updated[existingIdx] = savedGuest;
                    setGuests(updated);
                } else {
                    setGuests([
                        savedGuest,
                        ...guests
                    ]);
                }
                await fetchAllData();
                showToast("Guest record saved to database successfully!");
            }
            setGuestModal({
                open: false,
                mode: "ADD",
                data: getInitialGuestForm()
            });
        } catch (err) {
            showToast(err.message || "Failed to save guest record", "error");
        }
    };
    const handleDeleteGuest = (guest)=>{
        setConfirmDelete({
            open: true,
            title: "Delete Guest Record",
            message: `Are you sure you want to delete guest record for "${guest.name || guest.fullName}"? This action cannot be undone.`,
            onConfirm: async ()=>{
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].RECEPTIONIST.DELETE_GUEST(guest._id), {
                        method: "DELETE"
                    });
                    await fetchAllData();
                    showToast("Guest record deleted from database.");
                } catch (err) {
                    showToast(err.message || "Failed to delete guest", "error");
                } finally{
                    setConfirmDelete({
                        open: false,
                        title: "",
                        message: "",
                        onConfirm: null
                    });
                }
            }
        });
    };
    // Staff CRUD Handlers
    const handleSaveStaff = async (e)=>{
        e.preventDefault();
        if (!staffModal.data.name || !staffModal.data.email || !staffModal.data.phone) {
            showToast("Name, Email, and Phone are required for staff", "error");
            return;
        }
        try {
            const payload = {
                name: staffModal.data.name,
                email: staffModal.data.email,
                phone: staffModal.data.phone,
                role: staffModal.data.role || "RECEPTIONIST",
                employeeId: staffModal.data.idNumber || undefined
            };
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.RECEPTIONISTS, {
                method: "POST",
                body: payload
            });
            if (res.data) {
                setStaffList([
                    res.data,
                    ...staffList
                ]);
                showToast(res.message || "New staff member onboarded and credentials emailed!");
            }
            setStaffModal({
                open: false,
                mode: "ADD",
                data: getInitialStaffForm()
            });
        } catch (err) {
            showToast(err.message || "Failed to create staff account", "error");
        }
    };
    const handleToggleStaffStatus = async (staff)=>{
        const nextStatus = staff.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.UPDATE_RECEPTIONIST_STATUS(staff._id), {
                method: "PUT",
                body: {
                    status: nextStatus
                }
            });
            setStaffList(staffList.map((s)=>s._id === staff._id ? {
                    ...s,
                    status: nextStatus
                } : s));
            showToast(`Staff member '${staff.name}' is now ${nextStatus}.`);
        } catch (err) {
            showToast(err.message || "Failed to update staff status", "error");
        }
    };
    const handleDeleteStaff = (staff)=>{
        setConfirmDelete({
            open: true,
            title: "Remove Staff Member",
            message: `Are you sure you want to remove "${staff.name}" (${staff.role || "Receptionist"}) from the hotel staff directory?`,
            onConfirm: async ()=>{
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.DELETE_RECEPTIONIST(staff._id), {
                        method: "DELETE"
                    });
                    setStaffList(staffList.filter((s)=>s._id !== staff._id));
                    showToast("Staff member removed from database.");
                } catch (err) {
                    showToast(err.message || "Failed to remove staff member", "error");
                } finally{
                    setConfirmDelete({
                        open: false,
                        title: "",
                        message: "",
                        onConfirm: null
                    });
                }
            }
        });
    };
    // Individual Rooms CRUD Handlers
    const handleSaveRoom = async (e)=>{
        e.preventDefault();
        if (!roomModal.data.roomNumber || !roomModal.data.roomType) {
            showToast("Room number and room category are required", "error");
            return;
        }
        try {
            const payload = {
                roomNumber: roomModal.data.roomNumber,
                roomType: roomModal.data.roomType,
                floor: Number(roomModal.data.floor) || 1,
                seatingCapacity: Number(roomModal.data.seatingCapacity) || 2,
                customPricePerNight: roomModal.data.customPricePerNight ? Number(roomModal.data.customPricePerNight) : undefined,
                status: roomModal.data.status || "AVAILABLE",
                notes: roomModal.data.notes || ""
            };
            if (roomModal.mode === "EDIT" && roomModal.data._id) {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.UPDATE_ROOM(roomModal.data._id), {
                    method: "PUT",
                    body: payload
                });
                if (res.data) {
                    setRooms(rooms.map((r)=>r._id === roomModal.data._id ? res.data : r));
                    showToast(`Room ${res.data.roomNumber} updated successfully!`);
                }
            } else {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.ROOMS, {
                    method: "POST",
                    body: payload
                });
                if (res.data) {
                    setRooms([
                        res.data,
                        ...rooms
                    ]);
                    showToast(`Room ${res.data.roomNumber} created successfully!`);
                }
            }
            setRoomModal({
                open: false,
                mode: "ADD",
                data: getInitialRoomForm()
            });
        } catch (err) {
            showToast(err.message || "Failed to save room", "error");
        }
    };
    const handleDeleteRoom = (room)=>{
        setConfirmDelete({
            open: true,
            title: "Remove Room",
            message: `Are you sure you want to remove Room "${room.roomNumber}" (Floor ${room.floor})?`,
            onConfirm: async ()=>{
                try {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.DELETE_ROOM(room._id), {
                        method: "DELETE"
                    });
                    setRooms(rooms.filter((r)=>r._id !== room._id));
                    showToast(`Room ${room.roomNumber} removed.`);
                } catch (err) {
                    showToast(err.message || "Failed to delete room", "error");
                } finally{
                    setConfirmDelete({
                        open: false,
                        title: "",
                        message: "",
                        onConfirm: null
                    });
                }
            }
        });
    };
    const handleUpdateRoomStatus = async (room, newStatus)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.UPDATE_ROOM_STATUS(room._id), {
                method: "PUT",
                body: {
                    status: newStatus
                }
            });
            setRooms(rooms.map((r)=>r._id === room._id ? {
                    ...r,
                    status: newStatus
                } : r));
            showToast(`Room ${room.roomNumber} status set to ${newStatus}.`);
        } catch (err) {
            showToast(err.message || "Failed to update room status", "error");
        }
    };
    // Room Type CRUD Handlers
    const handleSaveRoomType = async (e)=>{
        e.preventDefault();
        if (!typeModal.data.name || !typeModal.data.basePrice) {
            showToast("Category name and base price are required", "error");
            return;
        }
        try {
            const payload = {
                name: typeModal.data.name,
                description: typeModal.data.description || "",
                basePrice: Number(typeModal.data.basePrice),
                capacity: {
                    adults: Number(typeModal.data.maxAdults || 2),
                    children: Number(typeModal.data.maxChildren || 1)
                }
            };
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.ROOM_TYPES, {
                method: "POST",
                body: payload
            });
            if (res.data) {
                setRoomTypes([
                    res.data,
                    ...roomTypes
                ]);
                showToast("Room category saved to database successfully!");
            }
            setTypeModal({
                open: false,
                mode: "ADD",
                data: {
                    name: "",
                    basePrice: 4000,
                    maxAdults: 2,
                    maxChildren: 1,
                    description: ""
                }
            });
        } catch (err) {
            showToast(err.message || "Failed to save room category", "error");
        }
    };
    const handleDeleteRoomType = (roomType)=>{
        setConfirmDelete({
            open: true,
            title: "Archive Room Category",
            message: `Are you sure you want to soft-delete / archive "${roomType.name}"? Active bookings and revenue records will remain safe.`,
            onConfirm: async ()=>{
                try {
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].HOTEL_ADMIN.DELETE_ROOM_TYPE(roomType._id), {
                        method: "DELETE"
                    });
                    setRoomTypes(roomTypes.filter((rt)=>rt._id !== roomType._id));
                    showToast(res.message || "Room category archived successfully.");
                } catch (err) {
                    showToast(err.message || "Failed to delete room category", "error");
                } finally{
                    setConfirmDelete({
                        open: false,
                        title: "",
                        message: "",
                        onConfirm: null
                    });
                }
            }
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            p: {
                xs: 2,
                sm: 3,
                md: 4
            },
            bgcolor: themeConfig.bgMain,
            minHeight: "100%"
        },
        children: [
            notification.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$Alert$2f$Alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Alert$3e$__["Alert"], {
                severity: notification.severity,
                sx: {
                    position: "fixed",
                    top: 24,
                    right: 24,
                    zIndex: 9999,
                    boxShadow: themeConfig.shadowModal,
                    borderRadius: 0,
                    bgcolor: notification.severity === "success" ? "#FAF9F6" : "#FFF5F5",
                    border: `1px solid ${notification.severity === "success" ? themeConfig.success : themeConfig.danger}`
                },
                children: notification.message
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 419,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ConfirmDialog$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: confirmDelete.open,
                title: confirmDelete.title,
                message: confirmDelete.message,
                onConfirm: confirmDelete.onConfirm,
                onClose: ()=>setConfirmDelete({
                        open: false,
                        title: "",
                        message: "",
                        onConfirm: null
                    })
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 437,
                columnNumber: 7
            }, this),
            activeNav === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$HotelOverviewPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                user: user,
                dashboardData: dashboardData,
                rooms: rooms,
                guests: guests,
                bookings: bookings,
                hotelSettings: hotelSettings,
                selectedFloor: selectedFloor,
                setSelectedFloor: setSelectedFloor,
                selectedStatus: selectedStatus,
                setSelectedStatus: setSelectedStatus,
                onRefresh: fetchAllData,
                onTabChange: onTabChange
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 447,
                columnNumber: 9
            }, this),
            activeNav === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$DailyCollectionsPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                user: user,
                hotelSettings: hotelSettings,
                onRefreshOverview: fetchAllData
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 465,
                columnNumber: 9
            }, this),
            activeNav === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$GuestDirectoryPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                guests: guests,
                guestSearch: guestSearch,
                setGuestSearch: setGuestSearch,
                guestFilter: guestFilter,
                setGuestFilter: setGuestFilter,
                guestModal: guestModal,
                setGuestModal: setGuestModal,
                viewGuestModal: viewGuestModal,
                setViewGuestModal: setViewGuestModal,
                hotelSettings: hotelSettings,
                onSaveGuest: handleSaveGuest,
                onDeleteGuest: handleDeleteGuest,
                getInitialGuestForm: getInitialGuestForm
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 474,
                columnNumber: 9
            }, this),
            activeNav === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$StaffTeamPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                staffList: staffList,
                staffSearch: staffSearch,
                setStaffSearch: setStaffSearch,
                staffRoleFilter: staffRoleFilter,
                setStaffRoleFilter: setStaffRoleFilter,
                staffModal: staffModal,
                setStaffModal: setStaffModal,
                viewStaffModal: viewStaffModal,
                setViewStaffModal: setViewStaffModal,
                onSaveStaff: handleSaveStaff,
                onDeleteStaff: handleDeleteStaff,
                onToggleStaffStatus: handleToggleStaffStatus,
                getInitialStaffForm: getInitialStaffForm
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 493,
                columnNumber: 9
            }, this),
            activeNav === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$RoomTypesPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                rooms: rooms,
                roomTypes: roomTypes,
                roomModal: roomModal,
                setRoomModal: setRoomModal,
                typeModal: typeModal,
                setTypeModal: setTypeModal,
                onSaveRoom: handleSaveRoom,
                onDeleteRoom: handleDeleteRoom,
                onUpdateRoomStatus: handleUpdateRoomStatus,
                onSaveRoomType: handleSaveRoomType,
                onDeleteRoomType: handleDeleteRoomType,
                getInitialRoomForm: getInitialRoomForm
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 512,
                columnNumber: 9
            }, this),
            activeNav === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hotel$2d$admin$2f$pages$2f$SubscriptionPage$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                user: user,
                subscription: dashboardData?.subscription || user?.hotel?.subscription,
                onRefresh: fetchAllData
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 530,
                columnNumber: 9
            }, this),
            activeNav === 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$SettingsView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                user: {
                    ...user,
                    hotel: {
                        ...user?.hotel,
                        settings: hotelSettings
                    }
                },
                onUpdateHotelSettings: (newSettings)=>setHotelSettings(newSettings)
            }, void 0, false, {
                fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
                lineNumber: 539,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/hotel-admin/components/HotelAdminDashboard.jsx",
        lineNumber: 416,
        columnNumber: 5
    }, this);
}
_s(HotelAdminDashboard, "WeoujWdQ91xO5OodNEyx0qkPefw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$context$2f$ThemeContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppTheme"]
    ];
});
_c = HotelAdminDashboard;
var _c;
__turbopack_context__.k.register(_c, "HotelAdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hotel-admin/layout/HotelAdminLayout.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HOTEL_ADMIN_NAV",
    ()=>HOTEL_ADMIN_NAV,
    "default",
    ()=>HotelAdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$layout$2f$DashboardLayout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/layout/DashboardLayout.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Dashboard.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Person$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Person.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$People$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/People.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Layers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Stars$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Stars.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Settings.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Payments$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/Payments.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const HOTEL_ADMIN_NAV = [
    {
        label: "Dashboard & Home",
        shortLabel: "Overview",
        path: "overview",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "small"
        }, void 0, false, {
            fileName: "[project]/src/hotel-admin/layout/HotelAdminLayout.jsx",
            lineNumber: 15,
            columnNumber: 80
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "Daily Collections Hub",
        shortLabel: "Collections",
        path: "daily-collections",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Payments$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "small"
        }, void 0, false, {
            fileName: "[project]/src/hotel-admin/layout/HotelAdminLayout.jsx",
            lineNumber: 16,
            columnNumber: 97
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "Guest Directory",
        shortLabel: "Guests",
        path: "guests",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Person$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "small"
        }, void 0, false, {
            fileName: "[project]/src/hotel-admin/layout/HotelAdminLayout.jsx",
            lineNumber: 17,
            columnNumber: 75
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "Hotel Staff Team",
        shortLabel: "Staff",
        path: "staff",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$People$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "small"
        }, void 0, false, {
            fileName: "[project]/src/hotel-admin/layout/HotelAdminLayout.jsx",
            lineNumber: 18,
            columnNumber: 74
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "Room Types & Tariffs",
        shortLabel: "Rooms",
        path: "rooms",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "small"
        }, void 0, false, {
            fileName: "[project]/src/hotel-admin/layout/HotelAdminLayout.jsx",
            lineNumber: 19,
            columnNumber: 78
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "Subscription & Trial",
        shortLabel: "Plans",
        path: "subscriptions",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Stars$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "small"
        }, void 0, false, {
            fileName: "[project]/src/hotel-admin/layout/HotelAdminLayout.jsx",
            lineNumber: 20,
            columnNumber: 86
        }, ("TURBOPACK compile-time value", void 0))
    },
    {
        label: "Profile & Settings",
        shortLabel: "Settings",
        path: "settings",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "small"
        }, void 0, false, {
            fileName: "[project]/src/hotel-admin/layout/HotelAdminLayout.jsx",
            lineNumber: 21,
            columnNumber: 82
        }, ("TURBOPACK compile-time value", void 0))
    }
];
function HotelAdminLayout({ user, activeTab, onTabChange, onLogout, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$layout$2f$DashboardLayout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        user: user,
        navItems: HOTEL_ADMIN_NAV,
        activeTab: activeTab,
        onTabChange: onTabChange,
        onLogout: onLogout,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/hotel-admin/layout/HotelAdminLayout.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = HotelAdminLayout;
var _c;
__turbopack_context__.k.register(_c, "HotelAdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_hotel-admin_1ycs3yy._.js.map