import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Eye, 
  Trash2, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Waves,
  Clock,
  Target,
  Zap,
  Camera,
  X,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface DetectionEvent {
  id: string;
  type: 'plastic' | 'littering' | 'collection';
  location: { x: number; y: number };
  timestamp: Date;
  confidence: number;
  description: string;
}

interface RobotPosition {
  x: number;
  y: number;
  heading: number;
  status: 'patrolling' | 'investigating' | 'collecting' | 'returning';
}

interface BeachZone {
  id: string;
  name: string;
  coordinates: { x: number; y: number; width: number; height: number };
  status: 'clean' | 'monitored' | 'alert';
  lastCleaned: Date;
  detectionCount: number;
}

const LiveBeachMonitoring = () => {
  const [isActive, setIsActive] = useState(true);
  const [detectionEvents, setDetectionEvents] = useState<DetectionEvent[]>([]);
  const [robotPosition, setRobotPosition] = useState<RobotPosition>({
    x: 50,
    y: 50,
    heading: 0,
    status: 'patrolling'
  });
  const [beachZones] = useState<BeachZone[]>([
    {
      id: 'zone1',
      name: 'North Beach',
      coordinates: { x: 10, y: 10, width: 35, height: 25 },
      status: 'clean',
      lastCleaned: new Date(Date.now() - 2 * 60 * 60 * 1000),
      detectionCount: 0
    },
    {
      id: 'zone2',
      name: 'Central Beach',
      coordinates: { x: 50, y: 20, width: 40, height: 30 },
      status: 'monitored',
      lastCleaned: new Date(Date.now() - 4 * 60 * 60 * 1000),
      detectionCount: 2
    },
    {
      id: 'zone3',
      name: 'South Beach',
      coordinates: { x: 15, y: 55, width: 30, height: 35 },
      status: 'alert',
      lastCleaned: new Date(Date.now() - 6 * 60 * 60 * 1000),
      detectionCount: 5
    },
    {
      id: 'zone4',
      name: 'Pier Area',
      coordinates: { x: 70, y: 60, width: 25, height: 30 },
      status: 'clean',
      lastCleaned: new Date(Date.now() - 1 * 60 * 60 * 1000),
      detectionCount: 1
    }
  ]);

  const [stats, setStats] = useState({
    totalDetections: 0,
    plasticCollected: 0,
    alertsIssued: 0,
    areasCovered: 0,
    uptime: '99.2%',
    batteryLevel: 85
  });

  // Simulate robot movement and detection events
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Update robot position
      setRobotPosition(prev => {
        const newX = prev.x + (Math.random() - 0.5) * 3;
        const newY = prev.y + (Math.random() - 0.5) * 3;
        const newHeading = prev.heading + (Math.random() - 0.5) * 30;
        
        return {
          x: Math.max(5, Math.min(95, newX)),
          y: Math.max(5, Math.min(95, newY)),
          heading: newHeading,
          status: Math.random() > 0.8 ? 'investigating' : 'patrolling'
        };
      });

      // Generate random detection events
      if (Math.random() > 0.7) {
        const eventTypes = ['plastic', 'littering', 'collection'] as const;
        const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        const newEvent: DetectionEvent = {
          id: Date.now().toString(),
          type: eventType,
          location: {
            x: Math.random() * 90 + 5,
            y: Math.random() * 90 + 5
          },
          timestamp: new Date(),
          confidence: Math.random() * 0.3 + 0.7,
          description: getEventDescription(eventType)
        };

        setDetectionEvents(prev => [newEvent, ...prev.slice(0, 9)]);
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalDetections: prev.totalDetections + 1,
          plasticCollected: eventType === 'collection' ? prev.plasticCollected + 1 : prev.plasticCollected,
          alertsIssued: eventType === 'littering' ? prev.alertsIssued + 1 : prev.alertsIssued,
          areasCovered: Math.min(100, prev.areasCovered + 0.1)
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getEventDescription = (type: DetectionEvent['type']) => {
    const descriptions = {
      plastic: [
        'Plastic bottle detected near shoreline',
        'Food wrapper identified in sand',
        'Plastic bag spotted by rocks',
        'Bottle cap found in vegetation'
      ],
      littering: [
        'Person dropping litter detected',
        'Improper waste disposal observed',
        'Littering behavior identified',
        'Unauthorized dumping detected'
      ],
      collection: [
        'Plastic bottle collected successfully',
        'Waste item retrieved and stored',
        'Debris collection completed',
        'Target item secured in storage'
      ]
    };
    
    return descriptions[type][Math.floor(Math.random() * descriptions[type].length)];
  };

  const getEventIcon = (type: DetectionEvent['type']) => {
    switch (type) {
      case 'plastic':
        return <Trash2 className="w-4 h-4 text-orange-500" />;
      case 'littering':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'collection':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getZoneColor = (status: BeachZone['status']) => {
    switch (status) {
      case 'clean':
        return 'bg-green-200 border-green-400';
      case 'monitored':
        return 'bg-yellow-200 border-yellow-400';
      case 'alert':
        return 'bg-red-200 border-red-400';
    }
  };

  const resetSimulation = () => {
    setDetectionEvents([]);
    setStats({
      totalDetections: 0,
      plasticCollected: 0,
      alertsIssued: 0,
      areasCovered: 0,
      uptime: '99.2%',
      batteryLevel: 85
    });
    setRobotPosition({
      x: 50,
      y: 50,
      heading: 0,
      status: 'patrolling'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Live Beach Monitoring</h3>
            <p className="text-sm text-gray-600">Real-time Labib-Bot activity simulation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause' : 'Resume'}</span>
          </button>
          
          <button
            onClick={resetSimulation}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-xl text-center">
          <Eye className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.totalDetections}</div>
          <div className="text-xs text-gray-600">Detections</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center">
          <Trash2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.plasticCollected}</div>
          <div className="text-xs text-gray-600">Collected</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl text-center">
          <AlertTriangle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.alertsIssued}</div>
          <div className="text-xs text-gray-600">Alerts</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl text-center">
          <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.areasCovered.toFixed(1)}%</div>
          <div className="text-xs text-gray-600">Coverage</div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl text-center">
          <Clock className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.uptime}</div>
          <div className="text-xs text-gray-600">Uptime</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl text-center">
          <Zap className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.batteryLevel}%</div>
          <div className="text-xs text-gray-600">Battery</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-xl p-6 h-96 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Beach Map - Live Tracking</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live</span>
              </div>
            </div>
            
            {/* Beach zones */}
            {beachZones.map((zone) => (
              <div
                key={zone.id}
                className={`absolute border-2 border-dashed rounded-lg ${getZoneColor(zone.status)} opacity-60`}
                style={{
                  left: `${zone.coordinates.x}%`,
                  top: `${zone.coordinates.y}%`,
                  width: `${zone.coordinates.width}%`,
                  height: `${zone.coordinates.height}%`
                }}
              >
                <div className="absolute top-1 left-1 text-xs font-medium text-gray-700">
                  {zone.name}
                </div>
                <div className="absolute bottom-1 right-1 text-xs text-gray-600">
                  {zone.detectionCount} items
                </div>
              </div>
            ))}
            
            {/* Robot position */}
            <div
              className="absolute w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg transition-all duration-1000 ease-in-out"
              style={{
                left: `${robotPosition.x}%`,
                top: `${robotPosition.y}%`,
                transform: `translate(-50%, -50%) rotate(${robotPosition.heading}deg)`
              }}
            >
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute top-0 left-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-white transform -translate-x-1/2 -translate-y-1"></div>
            </div>
            
            {/* Detection events on map */}
            {detectionEvents.slice(0, 5).map((event, index) => (
              <div
                key={event.id}
                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse`}
                style={{
                  left: `${event.location.x}%`,
                  top: `${event.location.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: event.type === 'plastic' ? '#f97316' : event.type === 'littering' ? '#ef4444' : '#22c55e',
                  opacity: 1 - (index * 0.2)
                }}
              />
            ))}
            
            {/* Waves animation */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-300 to-transparent opacity-50">
              <Waves className="w-full h-full text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Live Activity Feed</h4>
            <Camera className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {detectionEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Waiting for detection events...</p>
              </div>
            ) : (
              detectionEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          {event.timestamp.toLocaleTimeString()}
                        </p>
                        <span className="text-xs font-medium text-gray-600">
                          {(event.confidence * 100).toFixed(0)}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Robot Status */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Labib-Bot Status</h5>
              <p className="text-sm text-gray-600 capitalize">
                Currently {robotPosition.status.replace('_', ' ')} • Battery: {stats.batteryLevel}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900">Position</div>
              <div className="text-gray-600">
                {robotPosition.x.toFixed(0)}, {robotPosition.y.toFixed(0)}
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Heading</div>
              <div className="text-gray-600">{robotPosition.heading.toFixed(0)}°</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Speed</div>
              <div className="text-gray-600">2.3 m/s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBeachMonitoring;