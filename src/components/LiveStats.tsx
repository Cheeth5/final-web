import React, { useState, useEffect } from 'react';
import { Eye, Users, Globe, TrendingUp } from 'lucide-react';

const LiveStats = () => {
  const [stats, setStats] = useState({
    currentViewers: 0,
    todayVisitors: 0,
    totalViews: 0,
    countries: 0
  });

  useEffect(() => {
    // Simulate live stats with realistic numbers
    const updateStats = () => {
      const baseViewers = Math.floor(Math.random() * 8) + 3; // 3-10 current viewers
      const todayBase = Math.floor(Math.random() * 150) + 200; // 200-350 today
      const totalBase = parseInt(localStorage.getItem('plastifind_total_views') || '0');
      
      if (totalBase === 0) {
        const initialTotal = Math.floor(Math.random() * 2000) + 5000; // 5000-7000 initial
        localStorage.setItem('plastifind_total_views', initialTotal.toString());
        setStats({
          currentViewers: baseViewers,
          todayVisitors: todayBase,
          totalViews: initialTotal,
          countries: Math.floor(Math.random() * 20) + 45 // 45-65 countries
        });
      } else {
        setStats({
          currentViewers: baseViewers,
          todayVisitors: todayBase,
          totalViews: totalBase + Math.floor(Math.random() * 5), // Slowly increment
          countries: Math.floor(Math.random() * 20) + 45
        });
      }
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Website Stats</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-sky-100">Real-time</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Eye className="w-5 h-5 text-sky-200" />
          </div>
          <div className="text-xl font-bold">{stats.currentViewers}</div>
          <div className="text-xs text-sky-200">Online Now</div>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Users className="w-5 h-5 text-sky-200" />
          </div>
          <div className="text-xl font-bold">{formatNumber(stats.todayVisitors)}</div>
          <div className="text-xs text-sky-200">Today</div>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-sky-200" />
          </div>
          <div className="text-xl font-bold">{formatNumber(stats.totalViews)}</div>
          <div className="text-xs text-sky-200">Total Views</div>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Globe className="w-5 h-5 text-sky-200" />
          </div>
          <div className="text-xl font-bold">{stats.countries}</div>
          <div className="text-xs text-sky-200">Countries</div>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;