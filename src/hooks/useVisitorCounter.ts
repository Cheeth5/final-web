import { useState, useEffect } from 'react';

interface VisitorData {
  totalVisits: number;
  uniqueVisitors: number;
  lastVisit: string;
  sessionVisits: number;
}

export const useVisitorCounter = () => {
  const [visitorData, setVisitorData] = useState<VisitorData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    lastVisit: '',
    sessionVisits: 0
  });

  useEffect(() => {
    const updateVisitorCount = () => {
      // Get existing data from localStorage
      const existingData = localStorage.getItem('plastifind_visitor_data');
      const sessionData = sessionStorage.getItem('plastifind_session_visits');
      
      let data: VisitorData;
      let isNewVisitor = false;
      
      if (existingData) {
        data = JSON.parse(existingData);
        
        // Check if it's a new day (new unique visitor)
        const lastVisitDate = new Date(data.lastVisit).toDateString();
        const currentDate = new Date().toDateString();
        
        if (lastVisitDate !== currentDate) {
          isNewVisitor = true;
          data.uniqueVisitors += 1;
        }
        
        data.totalVisits += 1;
        data.lastVisit = new Date().toISOString();
      } else {
        // First time visitor
        isNewVisitor = true;
        data = {
          totalVisits: 1,
          uniqueVisitors: 1,
          lastVisit: new Date().toISOString(),
          sessionVisits: 1
        };
      }

      // Handle session visits
      if (sessionData) {
        data.sessionVisits = parseInt(sessionData) + 1;
      } else {
        data.sessionVisits = 1;
      }

      // Save to localStorage and sessionStorage
      localStorage.setItem('plastifind_visitor_data', JSON.stringify(data));
      sessionStorage.setItem('plastifind_session_visits', data.sessionVisits.toString());
      
      setVisitorData(data);

      // Simulate some realistic visitor growth for demo purposes
      if (data.totalVisits === 1) {
        // Add some base numbers for a more realistic look
        const baseVisits = Math.floor(Math.random() * 500) + 1200; // 1200-1700 base visits
        const baseUnique = Math.floor(baseVisits * 0.7); // ~70% unique visitors
        
        data.totalVisits += baseVisits;
        data.uniqueVisitors += baseUnique;
        
        localStorage.setItem('plastifind_visitor_data', JSON.stringify(data));
        setVisitorData(data);
      }
    };

    updateVisitorCount();
  }, []);

  return visitorData;
};