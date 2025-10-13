import React, { useState } from 'react';
import { 
  Cpu, 
  Camera, 
  Battery, 
  Zap, 
  Eye, 
  Navigation, 
  Shield, 
  Wifi, 
  Clock, 
  Ruler, 
  Weight, 
  Target,
  Settings,
  DollarSign,
  Trash2,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Gauge
} from 'lucide-react';

const TechnicalSpecs = () => {
  const [activeTab, setActiveTab] = useState('hardware');

  const tabs = [
    { id: 'hardware', label: 'Hardware', icon: <Cpu className="w-5 h-5" /> },
    { id: 'ai', label: 'AI Performance', icon: <Eye className="w-5 h-5" /> },
    { id: 'operational', label: 'Operations', icon: <Settings className="w-5 h-5" /> },
    { id: 'comparison', label: 'Performance', icon: <BarChart3 className="w-5 h-5" /> }
  ];

  const hardwareSpecs = [
    {
      category: "Computing Platform",
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
      specs: [
        { label: "Primary Processor", value: "NVIDIA Jetson AGX Xavier" },
        { label: "AI Performance", value: "32 TOPS (INT8)" },
        { label: "GPU", value: "512-core Volta GPU" },
        { label: "CPU", value: "8-core ARM v8.2 64-bit" }
      ]
    },
    {
      category: "Vision System",
      icon: <Camera className="w-6 h-6 text-green-500" />,
      specs: [
        { label: "Primary Cameras", value: "2x RedDragon Cameras" },
        { label: "AI Models per Camera", value: "Dedicated YOLOv11-pose" },
        { label: "Future Enhancement", value: "360° Camera (Planned)" },
        { label: "Detection Range", value: "5 meters" }
      ]
    },
    {
      category: "Sensors & Navigation",
      icon: <Navigation className="w-6 h-6 text-purple-500" />,
      specs: [
        { label: "Obstacle Avoidance", value: "Ultrasonic Sensors" },
        { label: "Future Upgrade", value: "LiDAR Integration (Planned)" },
        { label: "Navigation", value: "Autonomous Pathfinding" },
        { label: "Response Time", value: "100ms" }
      ]
    },
    {
      category: "Physical Specifications",
      icon: <Ruler className="w-6 h-6 text-orange-500" />,
      specs: [
        { label: "Height", value: "50 cm" },
        { label: "Length", value: "72 cm" },
        { label: "Width", value: "50 cm" },
        { label: "Weight", value: "30 kg" }
      ]
    },
    {
      category: "Power System",
      icon: <Battery className="w-6 h-6 text-red-500" />,
      specs: [
        { label: "Battery Type", value: "2x LiPo 4S" },
        { label: "Capacity", value: "5200mAh each" },
        { label: "Total Capacity", value: "10,400mAh" },
        { label: "Charging", value: "Standard LiPo Charger" }
      ]
    },
    {
      category: "Build Quality",
      icon: <Shield className="w-6 h-6 text-gray-500" />,
      specs: [
        { label: "Chassis Material", value: "Aluminum Construction" },
        { label: "Durability", value: "Beach Environment Ready" },
        { label: "Status", value: "Prototype Phase" },
        { label: "Weather Resistance", value: "Coastal Conditions" }
      ]
    }
  ];

  const aiSpecs = [
    {
      title: "Detection Accuracy",
      value: "86%",
      description: "Overall detection accuracy for plastic waste and human behavior",
      icon: <Target className="w-8 h-8 text-green-500" />,
      color: "green"
    },
    {
      title: "Processing Speed",
      value: "20 FPS",
      description: "Real-time video analysis and object detection",
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      color: "yellow"
    },
    {
      title: "Model Architecture",
      value: "YOLOv11-pose",
      description: "Custom fine-tuned model for beach environment",
      icon: <Cpu className="w-8 h-8 text-blue-500" />,
      color: "blue"
    },
    {
      title: "Training Dataset",
      value: "10,000 Images",
      description: "Specialized beach and coastal environment training data",
      icon: <Eye className="w-8 h-8 text-purple-500" />,
      color: "purple"
    }
  ];

  const operationalSpecs = [
    {
      category: "Connectivity",
      specs: [
        { label: "Wi-Fi Range", value: "80 meters", icon: <Wifi className="w-5 h-5 text-blue-500" /> },
        { label: "Data Transmission", value: "Real-time Analytics", icon: <TrendingUp className="w-5 h-5 text-green-500" /> },
        { label: "Network Type", value: "Secure Local Network", icon: <Shield className="w-5 h-5 text-gray-500" /> }
      ]
    },
    {
      category: "Storage & Capacity",
      specs: [
        { label: "Waste Storage", value: "6 Plastic Bottles", icon: <Trash2 className="w-5 h-5 text-orange-500" /> },
        { label: "Data Storage", value: "Local + Cloud Sync", icon: <Settings className="w-5 h-5 text-purple-500" /> },
        { label: "Operating Time", value: "Battery Dependent", icon: <Clock className="w-5 h-5 text-red-500" /> }
      ]
    },
    {
      category: "Maintenance",
      specs: [
        { label: "Service Interval", value: "Battery Discharge Cycle", icon: <Battery className="w-5 h-5 text-yellow-500" /> },
        { label: "Self-Diagnostics", value: "Continuous Monitoring", icon: <Gauge className="w-5 h-5 text-blue-500" /> },
        { label: "Maintenance Type", value: "Minimal Manual Intervention", icon: <CheckCircle className="w-5 h-5 text-green-500" /> }
      ]
    }
  ];

  const performanceData = [
    {
      metric: "Development Cost",
      value: "$8,000",
      description: "Current prototype development investment",
      trend: "baseline",
      icon: <DollarSign className="w-6 h-6 text-green-500" />
    },
    {
      metric: "Detection Efficiency",
      value: "86% Accuracy",
      description: "AI-powered plastic and behavior detection",
      trend: "up",
      icon: <Target className="w-6 h-6 text-blue-500" />
    },
    {
      metric: "Coverage Area",
      value: "5m Radius",
      description: "Effective detection and monitoring range",
      trend: "stable",
      icon: <Eye className="w-6 h-6 text-purple-500" />
    },
    {
      metric: "Response Speed",
      value: "100ms",
      description: "Real-time detection to action response",
      trend: "up",
      icon: <Zap className="w-6 h-6 text-yellow-500" />
    }
  ];

  const futureEnhancements = [
    {
      feature: "LiDAR Integration",
      description: "Enhanced 3D mapping and obstacle detection",
      timeline: "Next Version",
      impact: "Improved Navigation"
    },
    {
      feature: "360° Camera System",
      description: "Complete environmental awareness and monitoring",
      timeline: "Development Phase",
      impact: "Full Coverage Detection"
    },
    {
      feature: "Extended Battery Life",
      description: "Longer operational periods between charges",
      timeline: "Hardware Optimization",
      impact: "Increased Efficiency"
    },
    {
      feature: "Advanced AI Models",
      description: "Higher accuracy and new detection capabilities",
      timeline: "Continuous Improvement",
      impact: "Enhanced Performance"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Specifications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical details and performance metrics for Labib-Bot's advanced autonomous beach cleaning system
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-12 bg-white rounded-2xl p-2 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-sky-500 hover:bg-sky-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Hardware Specifications */}
        {activeTab === 'hardware' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hardwareSpecs.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    {category.icon}
                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600 font-medium">{spec.label}</span>
                        <span className="text-gray-900 font-semibold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Performance */}
        {activeTab === 'ai' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aiSpecs.map((spec, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <div className="flex justify-center mb-4">
                    {spec.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{spec.value}</h3>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">{spec.title}</h4>
                  <p className="text-gray-600">{spec.description}</p>
                </div>
              ))}
            </div>

            {/* AI Model Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">YOLOv11-pose Model Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Model Architecture</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Custom fine-tuned YOLOv11-pose</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Dual camera implementation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Real-time pose estimation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Beach environment optimized</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Training Specifications</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>10,000 specialized training images</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>Beach and coastal environments</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>Plastic waste detection focus</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span>Human behavior analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Operational Specifications */}
        {activeTab === 'operational' && (
          <div className="space-y-8">
            {operationalSpecs.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      {spec.icon}
                      <div>
                        <p className="font-semibold text-gray-900">{spec.value}</p>
                        <p className="text-sm text-gray-600">{spec.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Future Enhancements */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Planned Enhancements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {futureEnhancements.map((enhancement, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{enhancement.feature}</h4>
                      <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full">
                        {enhancement.timeline}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{enhancement.description}</p>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{enhancement.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Comparison */}
        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceData.map((data, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    {data.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{data.value}</h3>
                  <h4 className="font-semibold text-gray-700 mb-2">{data.metric}</h4>
                  <p className="text-sm text-gray-600">{data.description}</p>
                </div>
              ))}
            </div>

            {/* Cost Analysis */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Development Investment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">$8,000</h4>
                  <p className="text-gray-600">Prototype Development Cost</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">86%</h4>
                  <p className="text-gray-600">Detection Accuracy Achieved</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">20 FPS</h4>
                  <p className="text-gray-600">Real-time Processing Speed</p>
                </div>
              </div>
            </div>

            {/* Competitive Advantages */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Competitive Advantages</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dual AI Processing</h4>
                      <p className="text-gray-600">Two dedicated YOLOv11 models for enhanced accuracy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-time Response</h4>
                      <p className="text-gray-600">100ms response time for immediate action</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Specialized Training</h4>
                      <p className="text-gray-600">Custom dataset for beach environments</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Robust Construction</h4>
                      <p className="text-gray-600">Aluminum build for coastal durability</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Scalable Technology</h4>
                      <p className="text-gray-600">Proven prototype ready for production scaling</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Future-Ready Design</h4>
                      <p className="text-gray-600">Planned LiDAR and 360° camera integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalSpecs;