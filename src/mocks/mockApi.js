/**
 * src/mockApi.js
 * * Pure JS simulated API.
 * * Enforces async/await patterns, try/catch error handling, and mock upload progress.
 */

import { mockEnquiries, mockUsers, mockChannels, MOCK_CUSTOMERS } from './mockData.js';
import { ENQUIRY_STATUS } from '../constants/enquiryConstants.js';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false';

// Simulated network latency (in milliseconds)
const NETWORK_DELAY = 800;

/**
 * Helper function to simulate network delays.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 1. Fetch all enquiries (For the Master List Pane)
 */
export const fetchEnquiries = async () => {
  if (USE_MOCK) {
    await delay(NETWORK_DELAY);
    // Simulating a successful fetch
    return [...mockEnquiries];
  } else {
    // const response = await fetch('/api/v1/enquiries');
    // if (!response.ok) throw new Error('Failed to fetch enquiries');
    // return await response.json();
    return [];
  }
};

/**
 * 1.1 Fetch all users
 */
export const fetchUsers = async () => {
  await delay(500);
  return [...mockUsers];
};

/**
 * 1.2 Fetch all channels
 */
export const fetchChannels = async () => {
  await delay(NETWORK_DELAY);
  return [...mockChannels];
};

/**
 * 1.3 Fetch all customers
 */
export const fetchCustomers = async () => {
  await delay(NETWORK_DELAY);
  return [...MOCK_CUSTOMERS];
};

/**
 * 2. Save or Update an Enquiry
 * Expects a clean JSON DTO (Data Transfer Object). 
 * File objects should NOT be in this payload (they are uploaded separately).
 */
export const saveEnquiry = async (enquiryData) => {
  await delay(NETWORK_DELAY);

  if (!enquiryData) {
    throw new Error("Invalid payload: Enquiry data is required.");
  }

  // Simulate server-side ID generation for new enquiries
  const savedData = {
    ...enquiryData,
    id: enquiryData.id && enquiryData.id !== "NEW ENQUIRY" 
      ? enquiryData.id 
      : `ENQ-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
  };

  return savedData;
};

/**
 * 3. File Upload Gatekeeper (Satisfies Section 12)
 * Simulates uploading a raw File object to an S3 bucket.
 * Fires progress events so the UI can show a loading bar.
 * Resolves with a clean JSON object containing the URL (which gets attached to the Enquiry).
 */
export const uploadAttachment = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    // Client-Side Gatekeeping: Validate size before "uploading"
    const MAX_SIZE_MB = 10;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return reject(new Error(`File ${file.name} exceeds the ${MAX_SIZE_MB}MB limit.`));
    }

    let progress = 0;
    
    // Simulate chunked upload progress
    const uploadInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 10; // Jump by 10-35%
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadInterval);
        
        // Fire final progress update
        if (typeof onProgress === 'function') onProgress(progress);

        // Resolve with the purely textual DTO (S3 URL simulation)
        resolve({
          id: `f_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: `/mocks/s3-bucket/${encodeURIComponent(file.name)}`
        });
      } else {
        // Fire intermediate progress update
        if (typeof onProgress === 'function') onProgress(progress);
      }
    }, 400); // Tick every 400ms
  });
};

/**
 * 4. Delete an Attachment
 */
export const deleteAttachment = async (fileId) => {
  await delay(500);
  if (!fileId) throw new Error("File ID required for deletion.");
  return { success: true, message: "File deleted successfully" };
};

/**
 * 5. Update Task Status (Simulating a quick patch request)
 */
export const updateTaskStatus = async (taskId, isCompleted) => {
  await delay(300); // Faster delay for micro-interactions
  return { taskId, isCompleted, updatedAt: new Date().toISOString() };
};

/**
 * 6. Change Enquiry Status (Convert or Drop)
 * Specific endpoint to handle the Convert and Drop Modals.
 */
export const changeEnquiryStatus = async (enquiryId, newStatus, dropReason = null) => {
  await delay(600);
  
  if (!enquiryId) throw new Error("Enquiry ID is required.");
  if (![ENQUIRY_STATUS.ACTIVE, ENQUIRY_STATUS.CONVERTED, ENQUIRY_STATUS.DROPPED].includes(newStatus)) {
    throw new Error("Invalid status provided.");
  }

  return {
    id: enquiryId,
    status: newStatus,
    dropReason: newStatus === ENQUIRY_STATUS.DROPPED ? dropReason : null,
    updatedAt: new Date().toISOString()
  };
};

/**
 * 7. Create a New Task
 * specific endpoint to handle the Task Composer submission.
 */
export const createTask = async (enquiryId, taskData) => {
  await delay(500);

  if (!enquiryId || !taskData.actionText) {
    throw new Error("Enquiry ID and Action Text are required to create a task.");
  }

  // Simulate server-side ID and timestamp generation
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 5);
  const dept = taskData.assignedTo.startsWith('u_001') || taskData.assignedTo.startsWith('u_002') ? 'rev' : 'sup';
  
  return {
    ...taskData,
    id: `t_${dept}_${timestamp}_${randomStr}`,
    isCompleted: false,
    createdAt: new Date().toISOString()
  };
};
