import React, { useState } from 'react';
import { 
  Plane, 
  Train, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Search, 
  DollarSign, 
  ShieldAlert, 
  HelpCircle, 
  FileText,
  MapPin,
  X
} from 'lucide-react';
import { TripPlan } from '../types';

interface TravelPlannerProps {
  trips: TripPlan[];
  onAddTrip: (trip: TripPlan) => void;
  onDeleteTrip: (id: string) => void;
}

export const TravelPlanner: React.FC<TravelPlannerProps> = ({
  trips,
  onAddTrip,
  onDeleteTrip
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('2026-11-20');
  const [returnDate, setReturnDate] = useState('2026-11-27');
  const [budgetEur, setBudgetEur] = useState('450');
  const [transportMode, setTransportMode] = useState<TripPlan['transportMode']>('High-speed Rail (ICE/TGV)');
  const [bookingRef, setBookingRef] = useState('');
  const [notes, setNotes] = useState('');

  const totalBudget = trips.reduce((sum, t) => sum + t.budgetEur, 0);

  const filteredTrips = trips.filter(t => 
    t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.bookingRef && t.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    onAddTrip({
      id: `trip-${Date.now()}`,
      destination: destination.trim(),
      departureDate,
      returnDate,
      budgetEur: parseFloat(budgetEur) || 0,
      transportMode,
      bookingRef: bookingRef.trim(),
      notes: notes.trim()
    });

    setIsModalOpen(false);
    setDestination('');
    setBookingRef('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* Critical 2026 Consular Ticketing Standards Callout */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 rounded-2xl border border-purple-800/40 p-5 space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-base">
              European Transit & Airline Ticketing Protocols (2026/2027)
            </h3>
            <span className="text-xs text-purple-300">Crucial travel advice for first-time national entry visa (Type D) holders</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="font-bold text-amber-300 flex items-center mb-1">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Single-Entry Layover Rule
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Avoid non-direct self-transfer layovers exceeding 12 hours in secondary Schengen airports before entering your designated visa host country, as border police may flag transit inconsistencies.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="font-bold text-blue-300 flex items-center mb-1">
              <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Airline PNR Verification
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Book tickets with verifiable global reservation codes (GDS PNRs). European consular verification bots routinely validate ticket authenticity 48–72 hours prior to physical passport stamping.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="font-bold text-emerald-300 flex items-center mb-1">
              <Train className="w-3.5 h-3.5 mr-1" /> High-Speed Rail & 112
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Use Deutsche Bahn (DB) & SNCF apps booked 60–90 days ahead for Super Sparpreis rates. Dial <strong>112</strong> across all 27 EU nations for multi-language emergency support free of charge.
            </p>
          </div>

        </div>
      </div>

      {/* Budget Summary & Filter Controls */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-bold text-slate-100 text-base">Relocation Scouting & Travel Itineraries</h3>
            <p className="text-xs text-slate-400">Track scouting trips, apartment viewing travels, and embassy visit expenses.</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Planned Budget</span>
              <span className="text-lg font-black text-purple-400">€{totalBudget.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-md shadow-purple-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Plan Trip</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search scouting itineraries, train routes, booking codes..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Trip Itinerary Cards */}
      <div className="space-y-3">
        {filteredTrips.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 text-center text-xs text-slate-400">
            No travel plans or scouting trips match your query.
          </div>
        ) : (
          filteredTrips.map(trip => (
            <div
              key={trip.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 hover:border-slate-700 transition-colors space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-slate-100 text-sm sm:text-base">{trip.destination}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {trip.transportMode}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                    <span>Departure: <strong>{trip.departureDate}</strong></span>
                    <span>•</span>
                    <span>Return: <strong>{trip.returnDate}</strong></span>
                    {trip.bookingRef && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-purple-300">Ref: {trip.bookingRef}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Estimated Budget</span>
                    <span className="text-base font-black text-emerald-400">€{trip.budgetEur}</span>
                  </div>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Remove trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {trip.notes && (
                <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                  {trip.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Trip Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <h3 className="font-bold text-slate-100 text-base">Add Relocation Scouting Route</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrip} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Route & Purpose *</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="e.g. Frankfurt to Berlin (Apartment Viewings)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Departure Date</label>
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={e => setDepartureDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Return Date</label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={e => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Estimated Budget (€)</label>
                  <input
                    type="number"
                    value={budgetEur}
                    onChange={e => setBudgetEur(e.target.value)}
                    placeholder="e.g. 450"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Transport Mode</label>
                  <select
                    value={transportMode}
                    onChange={e => setTransportMode(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="High-speed Rail (ICE/TGV)">High-speed Rail (ICE/TGV)</option>
                    <option value="Flight">Commercial Flight</option>
                    <option value="Regional Rail">Regional Rail (Deutschlandticket)</option>
                    <option value="Bus">Intercity Coach / Bus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">PNR / Reservation Code</label>
                <input
                  type="text"
                  value={bookingRef}
                  onChange={e => setBookingRef(e.target.value)}
                  placeholder="e.g. DB-772910 or LH-9921"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Trip Notes & Scouting Agenda</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Apartment addresses, appointments, transit ticket notes..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                >
                  Save Itinerary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
