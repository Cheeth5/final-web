import React from 'react';
import { Users, Eye, TrendingUp, Clock } from 'lucide-react';
import { useVisitorCounter } from '../hooks/useVisitorCounter';

const VisitorCounter = () => {
  const visitorData = useVisitorCounter();

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getTimeAgo = (dateString: string) => {
    if (!dateString) return 'Just now';
    
    const now = new Date();
    const lastVisit = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - lastVisit.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Website Analytics</h3>
        <div className="flex items-center space-x-1 text-green-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl">
          <div className="flex justify-center mb-2">
            <Eye className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(visitorData.totalVisits)}
          </div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
          <div className="flex justify-center mb-2">
            <Users className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(visitorData.uniqueVisitors)}
          </div>
          <div className="text-sm text-gray-600">Unique Visitors</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
          <div className="flex justify-center mb-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {visitorData.sessionVisits}
          </div>
          <div className="text-sm text-gray-600">Session Views</div>
        </div>
        
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
          <div className="flex justify-center mb-2">
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {getTimeAgo(visitorData.lastVisit)}
          </div>
          <div className="text-sm text-gray-600">Last Visit</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Engagement Rate</span>
          <span className="font-semibold text-gray-900">
            {((visitorData.sessionVisits / visitorData.totalVisits) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;