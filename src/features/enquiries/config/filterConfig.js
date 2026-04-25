import { 
  Filter, 
  Truck, 
  Calendar, 
  CheckCircle2, 
  IndianRupee, 
  Search,
  Layers,
  Users
} from 'lucide-react';

/**
 * Helper to get earliest incomplete task due date
 */
const getEarliestDueDate = (tasks) => {
  if (!tasks || tasks.length === 0) return null;
  const incomplete = tasks.filter(t => !t.isCompleted);
  if (incomplete.length === 0) return null;
  return Math.min(...incomplete.map(t => new Date(t.dueDate).getTime()));
};

/**
 * Enquiry Filter Configuration
 */
export const getEnquiryFilterConfig = (referenceData = {}) => {
  const { users = [], channels = [], cities = [] } = referenceData;

  const supplyUsers = users.filter(u => u.department === 'Supply' || u.department === 'Admin');

  return [
    {
      id: 'type',
      label: 'Type',
      icon: Layers,
      type: 'multi-select',
      options: ['MTO', 'Ready'],
      dataKey: 'type'
    },
    {
      id: 'revRole',
      label: 'Revenue Role',
      icon: Users,
      type: 'multi-select',
      evaluator: (item, value) => {
        if (!value || value.length === 0) return true;
        const itemRoles = item.roles?.revenue?.map(r => r.id) || [];
        return value.some(val => itemRoles.includes(val));
      }
    },
    {
      id: 'channel',
      label: 'Channel',
      icon: Filter,
      type: 'single-select',
      options: channels,
      dataKey: 'leadChannel'
    },
    {
      id: 'supply',
      label: 'Supply',
      icon: Truck,
      type: 'multi-select',
      options: supplyUsers.map(u => u.name),
      evaluator: (item, value) => {
        if (!value || value.length === 0) return true;
        const itemSupply = item.roles?.supply?.map(s => s.name) || [];
        return value.some(val => itemSupply.includes(val));
      }
    },
    {
      id: 'city',
      label: 'City',
      icon: Filter,
      type: 'single-select',
      options: cities,
      dataKey: 'customer.city'
    },
    {
      id: 'leadDate',
      label: 'Lead Date',
      icon: Calendar,
      type: 'date-range',
      dataKey: 'createdOn'
    },
    {
      id: 'revDue',
      label: 'Rev Due',
      icon: CheckCircle2,
      type: 'date-range',
      evaluator: (item, value) => {
        if (!value.start && !value.end) return true;
        const due = getEarliestDueDate(item.tasks?.revenue);
        if (!due) return false;
        if (value.start && due < new Date(value.start).getTime()) return false;
        if (value.end) {
          const endDate = new Date(value.end);
          endDate.setHours(23, 59, 59, 999);
          if (due > endDate.getTime()) return false;
        }
        return true;
      }
    },
    {
      id: 'supDue',
      label: 'Sup Due',
      icon: Truck,
      type: 'date-range',
      evaluator: (item, value) => {
        if (!value.start && !value.end) return true;
        const due = getEarliestDueDate(item.tasks?.supply);
        if (!due) return false;
        if (value.start && due < new Date(value.start).getTime()) return false;
        if (value.end) {
          const endDate = new Date(value.end);
          endDate.setHours(23, 59, 59, 999);
          if (due > endDate.getTime()) return false;
        }
        return true;
      }
    },
    {
      id: 'expectedValue',
      label: 'Expected Value',
      icon: IndianRupee,
      type: 'number-range',
      dataKey: 'commercials.expectedValue'
    },
    {
      id: 'source',
      label: 'Source',
      icon: Search,
      type: 'text-search',
      dataKey: 'source'
    }
  ];
};
