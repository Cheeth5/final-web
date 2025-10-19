import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Cpu, 
  Camera, 
  Shield, 
  Waves, 
  Users, 
  MapPin, 
  ChevronDown,
  Mail,
  Phone,
  Award,
  Trash2,
  Eye,
  Volume2,
  Navigation,
  Leaf,
  Globe,
  Building,
  Send,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Settings,
  X,
  FileText,
  Menu,
  Box,
  Activity,
  Lightbulb,
  Calculator,
  SlidersHorizontal
} from 'lucide-react';
import TechnicalSpecs from './components/TechnicalSpecs';
import Gallery from './components/Gallery';
import VisitorCounter from './components/VisitorCounter';
import LiveStats from './components/LiveStats';
import LanguageSelector from './components/LanguageSelector';
import Robot3DViewer from './components/Robot3DViewer';
import LiveBeachMonitoring from './components/LiveBeachMonitoring';
import CostSimulator from './components/CostSimulator';
import BotConfigurator from './components/BotConfigurator';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { currentLanguage, changeLanguage, t, isRTL } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');
  const [activeStep, setActiveStep] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [showMonitoring, setShowMonitoring] = useState(false);
  const [showCostSimulator, setShowCostSimulator] = useState(false);
  const [showBotConfigurator, setShowBotConfigurator] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [demoSubmitStatus, setDemoSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-advance the "How It Works" steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu when clicking outside or on overlay
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Set document direction and language
  useEffect(() => {
    if (currentLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  // Smooth scroll function with animation
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle navigation clicks with smooth scrolling
  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Wait for page to render then scroll
      setTimeout(() => smoothScrollTo(sectionId), 100);
    } else {
      smoothScrollTo(sectionId);
    }
  };

  // Handle logo click to go to home and scroll to top
  const handleLogoClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu if open
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Wait for page to render then scroll to top
      setTimeout(() => scrollToTop(), 100);
    } else {
      scrollToTop();
    }
  };

  // Handle Learn More button with smooth scroll
  const handleLearnMore = () => {
    smoothScrollTo('about');
  };

  // Handle demo request modal
  const handleRequestDemo = () => {
    setShowDemoModal(true);
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  const closeDemoModal = () => {
    setShowDemoModal(false);
    setDemoSubmitStatus('idle');
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoSubmitting(true);
    setDemoSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/movkblrz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'Demo Request -  Labib-Bot',
          name: demoFormData.name,
          email: demoFormData.email,
          company: demoFormData.company,
          phone: demoFormData.phone,
          location: demoFormData.location,
          message: `DEMO REQUEST: ${demoFormData.message}`,
          _replyto: demoFormData.email,
        }),
      });

      if (response.ok) {
        setDemoSubmitStatus('success');
        setDemoFormData({ name: '', email: '', company: '', phone: '', location: '', message: '' });
      } else {
        setDemoSubmitStatus('error');
      }
    } catch (error) {
      console.error('Demo form submission error:', error);
      setDemoSubmitStatus('error');
    } finally {
      setIsDemoSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/movkblrz', { // 👈 Replace with your new Formspree endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const capabilities = [
    {
      icon: <Trash2 className="w-8 h-8 text-sky-500" />,
      title: t.capabilities.detection.title,
      description: t.capabilities.detection.description
    },
    {
      icon: <Eye className="w-8 h-8 text-sky-500" />,
      title: t.capabilities.monitoring.title,
      description: t.capabilities.monitoring.description
    },
    {
      icon: <Volume2 className="w-8 h-8 text-sky-500" />,
      title: t.capabilities.alerts.title,
      description: t.capabilities.alerts.description
    },
    {
      icon: <Cpu className="w-8 h-8 text-sky-500" />,
      title: t.capabilities.ai.title,
      description: t.capabilities.ai.description
    }
  ];

  const steps = [
    {
      number: "01",
      title: t.steps.detection.title,
      description: t.steps.detection.description,
      icon: <Eye className="w-12 h-12 text-white" />
    },
    {
      number: "02", 
      title: t.steps.navigation.title,
      description: t.steps.navigation.description,
      icon: <Navigation className="w-12 h-12 text-white" />
    },
    {
      number: "03",
      title: t.steps.alert.title,
      description: t.steps.alert.description,
      icon: <Camera className="w-12 h-12 text-white" />
    },
    {
      number: "04",
      title: t.steps.reporting.title,
      description: t.steps.reporting.description,
      icon: <Shield className="w-12 h-12 text-white" />
    }
  ];

  const techStack = [
    { name: "NVIDIA Jetson AGX Xavier", description: t.techStack.nvidia },
    { name: "YOLOv11-pose", description: t.techStack.yolo },
    { name: "Advanced Flask Dashboard", description: t.techStack.dashboard },
    { name: "Secure Offline Wi-Fi", description: t.techStack.wifi }
  ];

  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-amber-500" />,
      title: t.achievements.award.title,
      description: t.achievements.award.description
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      title: t.achievements.tested.title,
      description: t.achievements.tested.description
    },
    {
      icon: <Building className="w-8 h-8 text-blue-500" />,
      title: t.achievements.ready.title,
      description: t.achievements.ready.description
    }
  ];

  if (currentPage === 'specs') {
    return <TechnicalSpecs />;
    }

    if (currentPage === 'gallery') {
      return <Gallery />;
  }

  return (
  <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <img 
                src="/logo-alt-dark-transparent.png" 
                alt="PlastiFind Logo" 
                className="h-16 w-auto cursor-pointer transition-transform hover:scale-105"
                onClick={handleLogoClick}
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
              <button 
                onClick={handleLogoClick}
                className={`transition-colors hover:scale-105 transform duration-200 ${currentPage === 'home' ? 'text-sky-500' : 'text-gray-700 hover:text-sky-500'}`}
              >
                {t.nav.home}
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className="text-gray-700 hover:text-sky-500 transition-all duration-200 hover:scale-105 transform"
              >
                {t.nav.about}
              </button>
              <button 
                onClick={() => handleNavClick('how-it-works')}
                className="text-gray-700 hover:text-sky-500 transition-all duration-200 hover:scale-105 transform"
              >
                {t.nav.howItWorks}
              </button>
                      <button 
                        onClick={() => setCurrentPage('gallery')}
                        className={`transition-colors hover:scale-105 transform duration-200 ${currentPage === 'gallery' ? 'text-sky-500' : 'text-gray-700 hover:text-sky-500'}`}
                      >
                        Gallery
                      </button>
              <button 
                onClick={() => setCurrentPage('specs')}
                className={`flex items-center space-x-1 transition-all duration-200 hover:scale-105 transform ${currentPage === 'specs' ? 'text-sky-500' : 'text-gray-700 hover:text-sky-500'}`}
              >
                <FileText className="w-4 h-4" />
                <span>{t.nav.techSpecs}</span>
              </button>
              <button 
                onClick={() => setShow3DViewer(true)}
                className="flex items-center space-x-1 text-gray-700 hover:text-sky-500 transition-all duration-200 hover:scale-105 transform"
              >
                <Box className="w-4 h-4" />
                <span>3D Model</span>
              </button>
              <button 
                onClick={() => setShowMonitoring(true)}
                className="flex items-center space-x-1 text-gray-700 hover:text-sky-500 transition-all duration-200 hover:scale-105 transform"
              >
                <Activity className="w-4 h-4" />
                <span>Live Demo</span>
              </button>
              <button 
                onClick={() => setShowCostSimulator(true)}
                className="flex items-center space-x-1 text-gray-700 hover:text-sky-500 transition-all duration-200 hover:scale-105 transform"
              >
                <Calculator className="w-4 h-4" />
                <span>Cost Simulator</span>
              </button>
              <button 
                onClick={() => setShowBotConfigurator(true)}
                className="flex items-center space-x-1 text-gray-700 hover:text-sky-500 transition-all duration-200 hover:scale-105 transform"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Build Your Bot</span>
              </button>
              <button 
                onClick={() => handleNavClick('impact')}
                className="text-gray-700 hover:text-sky-500 transition-all duration-200 hover:scale-105 transform"
              >
                {t.nav.impact}
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-gray-700 hover:text-sky-500 transition-all duration-200 hover:scale-105 transform"
              >
                {t.nav.contact}
              </button>
              
              {/* Language Selector */}
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={changeLanguage}
              />
              
              <button 
                onClick={handleRequestDemo}
                className="bg-sky-500 text-white px-6 py-2 rounded-full hover:bg-sky-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                {t.nav.requestDemo}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={changeLanguage}
              />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-button p-2 rounded-lg text-gray-600 hover:text-sky-500 hover:bg-gray-100 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden animate-fade-in" />
      )}

      {/* Mobile Menu Slide-out */}
      <div className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-menu ${
        isMobileMenuOpen ? 'translate-x-0' : (isRTL ? '-translate-x-full' : 'translate-x-full')
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <img 
              src="/logo-alt-dark-transparent.png" 
              alt="PlastiFind Logo" 
              className="h-16 w-auto cursor-pointer"
              onClick={handleLogoClick}
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:text-sky-500 hover:bg-gray-100 transition-all duration-200"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 py-6">
            <div className="space-y-1 px-6">
              <button 
                onClick={handleLogoClick}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 'home' 
                    ? `bg-sky-50 text-sky-600 border-${isRTL ? 'r' : 'l'}-4 border-sky-500` 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-sky-600'
                }`}
              >
                {t.nav.home}
              </button>
              
              <button 
                onClick={() => handleNavClick('about')}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600 transition-all duration-200`}
              >
                {t.nav.about}
              </button>
              
              <button 
                onClick={() => handleNavClick('how-it-works')}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600 transition-all duration-200`}
              >
                {t.nav.howItWorks}
              </button>
                <button 
                  onClick={() => {
                    setCurrentPage('gallery');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === 'gallery' 
                      ? `bg-sky-50 text-sky-600 border-${isRTL ? 'r' : 'l'}-4 border-sky-500` 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-sky-600'
                  }`}
                >
                  Gallery
                </button>
              
              <button 
                onClick={() => {
                  setCurrentPage('specs');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentPage === 'specs' 
                    ? `bg-sky-50 text-sky-600 border-${isRTL ? 'r' : 'l'}-4 border-sky-500` 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-sky-600'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t.nav.techSpecs}</span>
              </button>

              <button 
                onClick={() => {
                  setShow3DViewer(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600 transition-all duration-200 flex items-center space-x-2`}
              >
                <Box className="w-4 h-4" />
                <span>3D Model</span>
              </button>

              <button 
                onClick={() => {
                  setShowMonitoring(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600 transition-all duration-200 flex items-center space-x-2`}
              >
                <Activity className="w-4 h-4" />
                <span>Live Demo</span>
              </button>

              <button 
                onClick={() => {
                  setShowCostSimulator(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600 transition-all duration-200 flex items-center space-x-2`}
              >
                <Calculator className="w-4 h-4" />
                <span>Cost Simulator</span>
              </button>

              <button 
                onClick={() => {
                  setShowBotConfigurator(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600 transition-all duration-200 flex items-center space-x-2`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Build Your Bot</span>
              </button>

              <button 
                onClick={() => handleNavClick('impact')}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600 transition-all duration-200`}
              >
                {t.nav.impact}
              </button>
              
              <button 
                onClick={() => handleNavClick('contact')}
                className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600 transition-all duration-200`}
              >
                {t.nav.contact}
              </button>
            </div>

            {/* Mobile Demo Button */}
            <div className="px-6 mt-8">
              <button 
                onClick={handleRequestDemo}
                className="w-full bg-sky-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-sky-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>{t.nav.requestDemo}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-gray-100">
            <div className={`text-center text-sm text-gray-500`}>
              <p>&copy; 2025 Labi-Bot</p>
              <p>{t.footer.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Robot Viewer */}
      <Robot3DViewer 
        isOpen={show3DViewer} 
        onClose={() => setShow3DViewer(false)} 
      />

      {/* Live Beach Monitoring Modal */}
      {showMonitoring && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[95vh] overflow-y-auto transform animate-fade-in-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Live Beach Monitoring Dashboard</h2>
                <p className="text-gray-600">Real-time simulation of Labib-Bot's detection and monitoring capabilities</p>
              </div>
              <button 
                onClick={() => setShowMonitoring(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 transform duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <LiveBeachMonitoring />
            </div>
          </div>
        </div>
      )}

      {/* Cost Simulator Modal */}
      {showCostSimulator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col transform animate-fade-in-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Cost Simulator</h2>
                <p className="text-gray-600">Estimate the cost for your beach cleaning project.</p>
              </div>
              <button 
                onClick={() => setShowCostSimulator(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 transform duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <CostSimulator />
            </div>
          </div>
        </div>
      )}

      {/* Bot Configurator Modal */}
      {showBotConfigurator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col transform animate-fade-in-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Build Your Labi-Bot</h2>
                <p className="text-gray-600">Customize your bot and get an instant cost estimate.</p>
              </div>
              <button 
                onClick={() => setShowBotConfigurator(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 transform duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <BotConfigurator />
            </div>
          </div>
        </div>
      )}

      {/* Demo Request Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform animate-fade-in-up">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{t.demo.title}</h2>
                <button 
                  onClick={closeDemoModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 transform duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-8">
                {t.demo.description}
              </p>

              <form onSubmit={handleDemoSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="demo-name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.demo.form.name} *
                    </label>
                    <input
                      type="text"
                      id="demo-name"
                      required
                      value={demoFormData.name}
                      onChange={(e) => setDemoFormData({...demoFormData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                      placeholder={t.demo.form.namePlaceholder}
                      disabled={isDemoSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="demo-email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.demo.form.email} *
                    </label>
                    <input
                      type="email"
                      id="demo-email"
                      required
                      value={demoFormData.email}
                      onChange={(e) => setDemoFormData({...demoFormData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                      placeholder={t.demo.form.emailPlaceholder}
                      disabled={isDemoSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="demo-company" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.demo.form.company}
                    </label>
                    <input
                      type="text"
                      id="demo-company"
                      value={demoFormData.company}
                      onChange={(e) => setDemoFormData({...demoFormData, company: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                      placeholder={t.demo.form.companyPlaceholder}
                      disabled={isDemoSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="demo-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.demo.form.phone}
                    </label>
                    <input
                      type="tel"
                      id="demo-phone"
                      value={demoFormData.phone}
                      onChange={(e) => setDemoFormData({...demoFormData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                      placeholder={t.demo.form.phonePlaceholder}
                      disabled={isDemoSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="demo-location" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.demo.form.location}
                  </label>
                  <input
                    type="text"
                    id="demo-location"
                    value={demoFormData.location}
                    onChange={(e) => setDemoFormData({...demoFormData, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder={t.demo.form.locationPlaceholder}
                    disabled={isDemoSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="demo-message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.demo.form.message}
                  </label>
                  <textarea
                    id="demo-message"
                    rows={4}
                    value={demoFormData.message}
                    onChange={(e) => setDemoFormData({...demoFormData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder={t.demo.form.messagePlaceholder}
                    disabled={isDemoSubmitting}
                  />
                </div>

                {demoSubmitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-green-700 font-medium">{t.demo.success}</p>
                    </div>
                  </div>
                )}

                {demoSubmitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                    <p className="text-red-700 font-medium">{t.demo.error}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isDemoSubmitting}
                    className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 ${
                      isDemoSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-sky-500 hover:bg-sky-600 hover:shadow-lg'
                    } text-white`}
                  >
                    {isDemoSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t.demo.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.demo.submit}</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={closeDemoModal}
                    className="flex-1 sm:flex-none px-6 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
                    disabled={isDemoSubmitting}
                  >
                    {t.demo.cancel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/15Untitled.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-blue-900/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
              <span className="text-sky-300 block">{t.hero.subtitle}</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button 
                onClick={handleRequestDemo}
                className="bg-sky-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                {t.hero.requestDemo}
              </button>
              <button 
                onClick={handleLearnMore}
                className="border-2 border-white text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-sky-900 transition-all duration-300 transform hover:scale-105"
              >
                {t.hero.learnMore}
              </button>
              <button 
                onClick={() => setShow3DViewer(true)}
                className="border-2 border-sky-300 text-sky-300 px-6 py-2 rounded-full text-sm font-semibold hover:bg-sky-300 hover:text-sky-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Box className="w-4 h-4" />
                <span>View 3D Model</span>
              </button>
              <button 
                onClick={() => setShowMonitoring(true)}
                className="border-2 border-green-300 text-green-300 px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-300 hover:text-green-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Activity className="w-4 h-4" />
                <span>Live Demo</span>
              </button>
              <button 
                onClick={() => setShowCostSimulator(true)}
                className="border-2 border-yellow-300 text-yellow-300 px-6 py-2 rounded-full text-sm font-semibold hover:bg-yellow-300 hover:text-yellow-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Cost Simulator</span>
              </button>
              <button 
                onClick={() => setShowBotConfigurator(true)}
                className="border-2 border-indigo-300 text-indigo-300 px-6 py-2 rounded-full text-sm font-semibold hover:bg-indigo-300 hover:text-indigo-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Build Your Bot</span>
              </button>
            </div>
            {/* Download PDF Button */}
            <div className="flex justify-center mt-6">
              <a
                href="/Labi%20bot%20(1)_compressed.pdf"
                download
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full text-sm shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <FileText className="w-6 h-6 mr-2" />
                Download Robot Guide (PDF)
              </a>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* About Labib-Bot Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.about.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setShow3DViewer(true)}
                className="inline-flex items-center space-x-2 bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                <Box className="w-5 h-5" />
                <span>Explore 3D Model</span>
              </button>
              <button 
                onClick={() => setShowMonitoring(true)}
                className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                <Activity className="w-5 h-5" />
                <span>View Live Demo</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-hover"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 bg-sky-50 rounded-full">
                    {capability.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{capability.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.howItWorks.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.howItWorks.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-2xl transition-all duration-500 ${
                  activeStep === index 
                    ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white transform scale-105 shadow-2xl' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                    activeStep === index ? 'bg-white/20' : 'bg-sky-100'
                  }`}>
                    {activeStep === index ? step.icon : <span className="text-sky-500 font-bold text-xl">{step.number}</span>}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className={`leading-relaxed ${activeStep === index ? 'text-sky-100' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && !isRTL && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
                {index < steps.length - 1 && isRTL && (
                  <div className="hidden lg:block absolute top-1/2 -left-4 transform -translate-y-1/2 rotate-180">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.impact.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.impact.description}
            </p>
          </div>
          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.impact.cleaner.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.impact.cleaner.description}
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.impact.behavior.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.impact.behavior.description}
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.impact.scalable.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.impact.scalable.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.techStack.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.techStack.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-sky-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{tech.name}</h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.achievements.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.achievements.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-6">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section className="py-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">{t.company.title}</h2>
              <p className="text-xl text-sky-100 mb-6 leading-relaxed">
                <strong>{t.company.mission.label}:</strong> {t.company.mission.text}
              </p>
              <p className="text-lg text-sky-100 mb-8 leading-relaxed">
                {t.company.description}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-sky-200" />
                  <span className="text-sky-100">{t.company.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-sky-200" />
                  <span className="text-sky-100">{t.company.impact}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">{t.company.whyChoose.title}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-sky-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t.company.whyChoose.ai.title}</h4>
                    <p className="text-sky-100 text-sm">{t.company.whyChoose.ai.description}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-sky-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t.company.whyChoose.proven.title}</h4>
                    <p className="text-sky-100 text-sm">{t.company.whyChoose.proven.description}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-sky-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t.company.whyChoose.expertise.title}</h4>
                    <p className="text-sky-100 text-sm">{t.company.whyChoose.expertise.description}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-sky-200 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t.company.whyChoose.scalable.title}</h4>
                    <p className="text-sky-100 text-sm">{t.company.whyChoose.scalable.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - NEW */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Innovators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate team of engineers and environmentalists dedicated to cleaning our coastlines.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {/* Example Team Member Card */}
            <div className="text-center">
              <img 
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg" 
                src="/1.jpg" 
                alt="Cheith Chouk"
              />
              <h3 className="text-xl font-bold text-gray-900">Cheith Chouk</h3>
              <p className="text-sky-600 font-medium">Robotics Engineer</p>
              <p className="text-gray-500 mt-2 text-sm">
                "Bringing intelligent robotics to life to solve real-world environmental challenges is my passion."
              </p>
            </div>
            {/* New Team Member Card */}
            <div className="text-center">
              <img 
                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg" 
                src="/2.png" // Placeholder image
                alt="Jasser Riahi"
              />
              <h3 className="text-xl font-bold text-gray-900">Jasser Riahi</h3>
              <p className="text-sky-600 font-medium">AI Engineer</p>
              <p className="text-gray-500 mt-2 text-sm">
                "Training machines to see and understand our world, one dataset at a time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.info.title}</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.contact.info.email}</h4>
                    <p className="text-gray-600">cheethchouk@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.contact.info.phone}</h4>
                    <p className="text-gray-600">+216 56 233 389</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.contact.info.location}</h4>
                    <p className="text-gray-600">{t.contact.info.locationValue}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder={t.contact.form.namePlaceholder}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder={t.contact.form.emailPlaceholder}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                    placeholder={t.contact.form.companyPlaceholder}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                    disabled={isSubmitting}
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-green-700 font-medium">{t.contact.success}</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                    <p className="text-red-700 font-medium">{t.contact.error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-sky-500 hover:bg-sky-600 hover:shadow-lg'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.send}</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Analytics */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Analytics Section */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LiveStats />
              </div>
              <div>
                <VisitorCounter />
              </div>
            </div>
          </div>

          {/* Footer Content */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <img 
                  src="/logo-alt-dark-transparent.png" 
                  alt="PlastiFind Logo" 
                  className="h-8 w-auto brightness-0 invert cursor-pointer"
                  onClick={handleLogoClick}
                />
              </div>
              <div className="text-gray-400 text-center md:text-right">
                <p>&copy; 2025 Labib-Bot. {t.footer.rights}</p>
                <p className="text-sm mt-1">{t.footer.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;