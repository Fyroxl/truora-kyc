export const countries = [
    { value: "ALL", label: "Any country", requiresSales: false },
    { value: "CO", label: "Colombia", requiresSales: false },
    { value: "CL", label: "Chile", requiresSales: false },
    { value: "MX", label: "Mexico", requiresSales: false },
    { value: "PE", label: "Peru", requiresSales: false },
    { value: "BR", label: "Brazil", requiresSales: true },
    { value: "CR", label: "Costa Rica", requiresSales: true },
    { value: "VE", label: "Venezuela", requiresSales: true },
    { value: "PA", label: "Panama", requiresSales: true }
];


export const documentTypes = [
    { value: "national-id", label: "National ID" },
    { value: "passport", label: "Passport" },
    { value: "foreign-id", label: "Foreign ID" },
    { value: "pep", label: "Special Stay Permit (PEP)" },
    { value: "ppt", label: "Temporary Protection Permit (PPT)", requiresSales: true },
    { value: "driver-license", label: "Driver's License" },
    { value: "invoice", label: "Invoice" },
    { value: "identity-card", label: "Identity Card" }
];
