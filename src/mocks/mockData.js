/**
 * src/mockData.js
 * * Pure JS mock data to enforce agnostic UI data models.
 * * Theme: B2B Fabrics (Brands & Garment Manufacturers)
 */

// 1. User Directory (For Context Pane Role Assigners and Top Navigation)
export const mockUsers = [
  { id: 'u_001', name: 'Aarav Patel', initials: 'AP', department: 'Revenue' },
  { id: 'u_002', name: 'Priya Sharma', initials: 'PS', department: 'Revenue' },
  { id: 'u_003', name: 'Rohan Gupta', initials: 'RG', department: 'Supply' },
  { id: 'u_004', name: 'Neha Singh', initials: 'NS', department: 'Supply' },
];

// 2. Mock Lookup Lists (For actual Select dropdowns defined in the blueprint)
export const mockChannels = ['Trade Show', 'Direct Outreach', 'B2B Portal', 'Referral', 'Inbound Web'];
export const mockProbabilities = ['High (80%)', 'Medium (50%)', 'Low (20%)'];

// 2.5 Customers List (For Autocomplete)
export const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'Stitchwell Garments Ltd.' },
  { id: 'c2', name: 'Aura Boutique Label' },
  { id: 'c3', name: 'Fabrito Textiles' },
  { id: 'c4', name: 'Global Apparel Group' },
  { id: 'c5', name: 'Urban Threads Co.' }
];

// 3. The Master Enquiry Dataset
export const mockEnquiries = [
  {
    id: 'ENQ-2026-089',
    orderId: 'ORD-1042',
    status: 'Active',           // 'Active', 'Converted', 'Dropped'
    dropReason: null,           
    createdOn: '2026-04-05',    
    
    // Context: Identity & Customer
    customer: {
      name: 'Stitchwell Garments Ltd.',
      poc: 'Vikram Desai',
      contact: '+91 98765 43210',
      city: 'Tirupur'            // Treated as standard text input
    },

    // Context: Lead Block
    leadOverview: 'Requirement for 10,000 meters of 100% Organic Cotton Twill (250 GSM).',
    leadDetails: 'End use: Menswear Chinos. Client requires lab dips for Pantone 19-4052 (Classic Blue) and Pantone 19-0303 (Jet Black) before confirming the bulk PO. Shrinkage must be under 3%.',

    // Context: Metadata
    type: 'MTO',                // 'MTO' (Custom Milling) or 'Ready' (Stock)
    leadDate: '2026-04-10',
    channel: 'Trade Show',

    // Context: Commercials
    commercials: {
      orderValue: 1850000,      // e.g., ₹18.5 Lakhs
      probability: 'High (80%)',
      expectedValue: 1480000    
    },

    // Context: Assigned Roles
    roles: {
      revenue: [{ id: 'u_001', name: 'Aarav Patel' }],
      supply: [{ id: 'u_003', name: 'Rohan Gupta' }]
    },

    // Context: Attachment Tray
    files: [
      { id: 'f_101', name: 'tech_pack_chinos.pdf', size: 2500000, type: 'application/pdf', url: '/mocks/tech_pack.pdf' },
      { id: 'f_102', name: 'pantone_references.png', size: 1024500, type: 'image/png', url: '/mocks/pantone.png' }
    ],

    // Action Items
    tasks: {
      revenue: [
        {
          id: 't_rev_01',
          actionText: 'Send preliminary bulk pricing including freight to Tirupur',
          remark: 'Ensure we highlight the GOTS certification surcharge separately.',
          dueDate: '2026-04-08',
          isCompleted: false,
          assignedTo: 'u_001'
        },
        {
          id: 't_rev_02',
          actionText: 'Follow up on fabric swatch booklet sent last week',
          remark: '',
          dueDate: '2026-04-06',
          isCompleted: true,
          assignedTo: 'u_002'
        }
      ],
      supply: [
        {
          id: 't_sup_01',
          actionText: 'Check greige fabric availability for 10k meters',
          remark: 'Need to confirm if the Surat mill has enough yarn allocation for this month.',
          dueDate: '2026-04-09',
          isCompleted: false,
          assignedTo: 'u_003'
        },
        {
          id: 't_sup_02',
          actionText: 'Initiate lab dips for Classic Blue and Jet Black',
          remark: 'Client needs 3 options per color.',
          dueDate: '2026-04-12',
          isCompleted: false,
          assignedTo: 'u_004'
        }
      ]
    }
  },
  {
    id: 'ENQ-2026-090',
    orderId: null,
    status: 'Dropped',
    dropReason: 'Client MOQ requirement was only 500 meters per color. Redirected them to our ready-stock portal, but they specifically wanted a custom blend we cannot mill at that volume.',
    createdOn: '2026-04-06',    
    
    customer: {
      name: 'Aura Boutique Label',
      poc: 'Karan Mehra',
      contact: '+91 99887 76655',
      city: 'Mumbai'
    },

    leadOverview: 'Custom Poly-Viscose blend for summer blazers.',
    leadDetails: 'Looking for a highly breathable PV blend with 5% elastane.',
    
    type: 'MTO',
    leadDate: '2026-04-07',
    channel: 'Inbound Web',

    commercials: {
      orderValue: 125000,
      probability: 'Low (20%)',
      expectedValue: 25000
    },

    roles: {
      revenue: [{ id: 'u_002', name: 'Priya Sharma' }],
      supply: []
    },

    files: [],
    
    tasks: {
      revenue: [],
      supply: []
    }
  }
];
