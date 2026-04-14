import { mockUsers } from '@/mocks/mockData.js';

/**
 * Format Indian Currency
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Get User Initials from IDs
 */
export const getUserInitials = (userIds) => {
  if (!userIds || userIds.length === 0) return null;
  return userIds.map(id => {
    const user = mockUsers.find(u => u.id === id);
    return user ? user.initials : null;
  }).filter(Boolean);
};

/**
 * Get Urgency Info based on due date
 */
export const getUrgencyInfo = (tasks) => {
  if (!tasks || tasks.length === 0) return { text: '-', color: 'text-gray-400' };
  
  const incompleteTasks = tasks.filter(t => !t.isCompleted);
  if (incompleteTasks.length === 0) return { text: '-', color: 'text-gray-400' };

  // Find earliest due date
  const earliestTask = incompleteTasks.reduce((earliest, current) => {
    return new Date(current.dueDate) < new Date(earliest.dueDate) ? current : earliest;
  });

  const dueDate = new Date(earliestTask.dueDate);
  dueDate.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `Overdue by ${Math.abs(diffDays)}d`, color: 'text-red-600 font-bold' };
  }
  if (diffDays === 0) {
    return { text: 'Today', color: 'text-orange-600 font-bold' };
  }
  if (diffDays === 1) {
    return { text: 'Tomorrow', color: 'text-primary font-medium' };
  }
  if (diffDays > 1 && diffDays <= 7) {
    return { text: `In ${diffDays} days`, color: 'text-gray-600' };
  }
  
  return { 
    text: new Date(earliestTask.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }), 
    color: 'text-gray-400' 
  };
};

/**
 * Format Date for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: '2-digit'
  });
};
