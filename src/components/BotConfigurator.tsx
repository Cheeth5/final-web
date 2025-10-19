import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Cpu, Zap, Palette, Upload, CheckCircle, Send } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  cost: number;
}

const SENSOR_OPTIONS: Feature[] = [
  { id: 'lidar', name: 'Advanced LiDAR for Complex Terrain', cost: 2500 },
  { id: 'water_quality', name: 'Water Quality Sensor', cost: 1800 },
];

const POWER_OPTIONS: Feature[] = [
  { id: 'solar', name: 'Solar Charging Panel', cost: 1500 },
  { id: 'extended_battery', name: 'Extended Battery Pack', cost: 1200 },
];

const BASE_BOT_COST = 10000;

const BotConfigurator = () => {
  const [numBots, setNumBots] = useState(1);
  const [selectedSensors, setSelectedSensors] = useState<string[]>([]);
  const [selectedPower, setSelectedPower] = useState<string[]>([]);
  const [botColor, setBotColor] = useState('#3b82f6'); // Default blue
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // e.g., 0.1 for 10%
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });

  const [quoteForm, setQuoteForm] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFeatureToggle = (featureId: string, type: 'sensor' | 'power') => {
    const state = type === 'sensor' ? selectedSensors : selectedPower;
    const setState = type === 'sensor' ? setSelectedSensors : setSelectedPower;
    if (state.includes(featureId)) {
      setState(state.filter(id => id !== featureId));
    } else {
      setState([...state, featureId]);
    }
  };

  const handlePromoCodeApply = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'LABI10') {
      setDiscount(0.10);
      setPromoMessage({ text: '10% discount applied!', type: 'success' });
    } else if (code === 'SAVE20') {
      setDiscount(0.20);
      setPromoMessage({ text: '20% discount applied!', type: 'success' });
    } else if (code === '') {
      setDiscount(0);
      setPromoMessage({ text: '', type: '' });
    } else {
      setDiscount(0);
      setPromoMessage({ text: 'Invalid promo code.', type: 'error' });
    }
  };

  const { subtotal, discountAmount, totalCost } = useMemo(() => {
    let featuresCost = 0;
    selectedSensors.forEach(id => {
      featuresCost += SENSOR_OPTIONS.find(f => f.id === id)?.cost || 0;
    });
    selectedPower.forEach(id => {
      featuresCost += POWER_OPTIONS.find(f => f.id === id)?.cost || 0;
    });
    const subtotal = (BASE_BOT_COST + featuresCost) * numBots;
    const discountAmount = subtotal * discount;
    const totalCost = subtotal - discountAmount;
    return { subtotal, discountAmount, totalCost };
  }, [numBots, selectedSensors, selectedPower, discount]);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const selectedFeatures = [
      ...selectedSensors.map(id => SENSOR_OPTIONS.find(f => f.id === id)?.name),
      ...selectedPower.map(id => POWER_OPTIONS.find(f => f.id === id)?.name),
    ].filter(Boolean);

    const emailBody = `
      New Labi-Bot Configuration Quote Request:
      -----------------------------------------
      Organization: ${quoteForm.name}
      Email: ${quoteForm.email}
      -----------------------------------------
      Number of Bots: ${numBots}
      Custom Color: ${botColor}
      Promo Code Applied: ${promoCode.toUpperCase() || 'None'}
      Selected Features:
      ${selectedFeatures.length > 0 ? selectedFeatures.map(f => `- ${f}`).join('\n') : 'None'}
      -----------------------------------------
      Subtotal: $${subtotal.toLocaleString()}
      Discount: -$${discountAmount.toLocaleString()}
      Estimated Total Cost: $${totalCost.toLocaleString()}
    `;

    try {
      const response = await fetch('https://formspree.io/f/movkblrz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ subject: `Labi-Bot Quote Request from ${quoteForm.name}`, message: emailBody, _replyto: quoteForm.email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setQuoteForm({ name: '', email: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left side: Visuals and Summary */}
      <div className="space-y-8">
        {/* Bot Visual */}
        <div className="bg-gray-100 rounded-xl p-4 aspect-video flex items-center justify-center relative overflow-hidden">
          <div 
            className="absolute inset-0 transition-colors duration-300"
            style={{ backgroundColor: botColor, opacity: 0.2 }}
          />
          <img src="/WhatsApp Image 2025-07-10 at 19.00.45.jpeg" alt="Labi-Bot" className="relative z-10 max-h-full max-w-full object-contain" />
        </div>

        {/* Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Configuration Summary</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex justify-between"><span>Number of Bots:</span> <span className="font-medium">{numBots}</span></li>
            {[...selectedSensors, ...selectedPower].map(id => {
              const feature = [...SENSOR_OPTIONS, ...POWER_OPTIONS].find(f => f.id === id);
              return <li key={id} className="flex justify-between"><span>{feature?.name}</span> <span className="font-medium text-green-600">+${feature?.cost.toLocaleString()}</span></li>;
            })}
          </ul>
          <div className="border-t border-gray-200 my-4" />
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600"><span>Subtotal:</span> <span>${subtotal.toLocaleString()}</span></div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discount * 100}%):</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center text-2xl font-bold">
              <span className="text-gray-800">Total Cost:</span>
              <span className="text-sky-600">${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Controls and Form */}
      <div className="space-y-8">
        {/* Configuration Options */}
        <div className="space-y-6">
          <div>
            <label htmlFor="numBots" className="block text-sm font-medium text-gray-700 mb-2">Number of Labi-Bots</label>
            <input type="range" id="numBots" min="1" max="20" value={numBots} onChange={(e) => setNumBots(parseInt(e.target.value, 10))} className="w-full" />
          </div>

          {/* Sensor Packages */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3"><Cpu className="w-5 h-5 text-gray-500" />Sensor Packages</h4>
            <div className="space-y-2">
              {SENSOR_OPTIONS.map(opt => (
                <label key={opt.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input type="checkbox" checked={selectedSensors.includes(opt.id)} onChange={() => handleFeatureToggle(opt.id, 'sensor')} className="h-5 w-5 rounded text-sky-600 focus:ring-sky-500" />
                  <span className="flex-1">{opt.name}</span>
                  <span className="text-sm font-medium text-gray-500">+${opt.cost}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Power Options */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3"><Zap className="w-5 h-5 text-gray-500" />Power Options</h4>
            <div className="space-y-2">
              {POWER_OPTIONS.map(opt => (
                <label key={opt.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input type="checkbox" checked={selectedPower.includes(opt.id)} onChange={() => handleFeatureToggle(opt.id, 'power')} className="h-5 w-5 rounded text-sky-600 focus:ring-sky-500" />
                  <span className="flex-1">{opt.name}</span>
                  <span className="text-sm font-medium text-gray-500">+${opt.cost}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Customization */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3"><Palette className="w-5 h-5 text-gray-500" />Customization</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <label htmlFor="botColor" className="block text-sm font-medium text-gray-700 mb-2">Bot Color</label>
                <input type="color" id="botColor" value={botColor} onChange={(e) => setBotColor(e.target.value)} className="w-full h-10 rounded-md" />
              </div>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6">
            <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                id="promoCode" 
                placeholder="e.g., LABI10" 
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button onClick={handlePromoCodeApply} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Apply</button>
            </div>
            {promoMessage.text && (
              <p className={`text-sm mt-2 ${promoMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{promoMessage.text}</p>
            )}
          </div>
        </div>

        {/* Quote Form */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Request a Quote</h3>
          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            <div>
              <label htmlFor="orgName" className="sr-only">Organization Name</label>
              <input type="text" id="orgName" placeholder="Organization Name" required value={quoteForm.name} onChange={e => setQuoteForm({...quoteForm, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="quoteEmail" className="sr-only">Email Address</label>
              <input type="email" id="quoteEmail" placeholder="Email Address" required value={quoteForm.email} onChange={e => setQuoteForm({...quoteForm, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <p>Quote request sent successfully!</p>
              </div>
            )}
            {submitStatus === 'error' && <p className="text-red-600">Failed to send quote. Please try again.</p>}

            <button type="submit" disabled={isSubmitting} className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Quote Request</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BotConfigurator;