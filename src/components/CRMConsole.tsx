/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CRMLead } from "../types";
import { 
  Lock, ArrowRight, CheckCircle, Users, Briefcase, 
  Search, ShieldAlert, Sparkles, Filter, Trash2, Calendar, 
  MapPin, CheckSquare, Clock, Globe, HelpCircle, Star, Phone, 
  MessageSquare, User, Building, Mail, ChevronRight, Download, PlusCircle
} from "lucide-react";

// Initial realistic enterprise leads to showcase CRM beauty on first view
const SEED_LEADS: CRMLead[] = [
  {
    id: "lead-1",
    name: "Siddharth Mehta",
    email: "s.mehta@reliance.co.in",
    organization: "Reliance Corporate Strategy",
    website: "https://www.reliance.co.in",
    interest: "team-training",
    message: "Interested in organizing a dedicated 3-day onsite SEO & AEO training workshop for our 45-member global digital marketing and content strategy team.",
    status: "In Discussion",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Initial discussion completed. Siddharth requested tailored custom modules addressing e-commerce schema optimization and schema mapping."
  },
  {
    id: "lead-2",
    name: "Dr. Amanda Ross",
    email: "amanda.r@forbes.com",
    organization: "Forbes Media Group LLC",
    website: "https://forbes.com",
    interest: "aeo-audit",
    message: "Seeking a professional premium audit on our domain's eligibility for direct conversational search answers, voice citations, and zero-click answer snippets on regional queries.",
    status: "Proposal Sent",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Sent comprehensive audit proposal of $8,500. Awaiting signature from content vp."
  },
  {
    id: "lead-3",
    name: "Amir Khan",
    email: "contact@techindia-ventures.com",
    organization: "TechIndia Analytics",
    website: "https://techindia-ventures.com",
    interest: "seo-strategy",
    message: "We launched a next-gen data analytics suite. Need custom end-to-end strategy to compete in organic search queries and capture high-volume PAA (People Also Ask) sections.",
    status: "New",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    notes: ""
  },
  {
    id: "lead-4",
    name: "John Miller",
    email: "j.miller@dundermifflin.com",
    organization: "Dunder Mifflin Paper Co.",
    website: "https://dundermifflin.com",
    interest: "custom-project",
    message: "We need an integrated AI search strategy review. Our regional domains are struggling to rank in voice answers on smart home speaker systems.",
    status: "Nurturing",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    notes: "Nurtured via regular newsletters. Will re-engage next month."
  }
];

interface CRMConsoleProps {
  onClose?: () => void;
}

export default function CRMConsole({ onClose }: CRMConsoleProps) {
  const [leads, setLeads] = useState<CRMLead[]>(() => {
    const saved = localStorage.getItem("lms_crm_leads");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SEED_LEADS;
      }
    }
    // Set seed data if not present
    localStorage.setItem("lms_crm_leads", JSON.stringify(SEED_LEADS));
    return SEED_LEADS;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("lms_crm_auth") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterInterest, setFilterInterest] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

  // Save leads to local storage on changes
  useEffect(() => {
    localStorage.setItem("lms_crm_leads", JSON.stringify(leads));
  }, [leads]);

  // Handle password submission (Passcode changed to 8366)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = passwordInput.trim();
    if (normalized === "8366") {
      setIsAuthenticated(true);
      localStorage.setItem("lms_crm_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid access password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("lms_crm_auth");
    setPasswordInput("");
  };

  // Status updates
  const handleUpdateStatus = (id: string, newStatus: CRMLead["status"]) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return { ...lead, status: newStatus };
      }
      return lead;
    }));
  };

  // Add notes
  const handleSaveNotes = (id: string) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return { ...lead, notes: newNoteText };
      }
      return lead;
    }));
    setNewNoteText("");
  };

  // Delete lead
  const handleDeleteLead = (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead record permanently?")) {
      setLeads(prev => prev.filter(l => l.id !== id));
      if (activeLeadId === id) {
        setActiveLeadId(null);
      }
    }
  };

  // Filter logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.message && lead.message.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesInterest = filterInterest === "all" || lead.interest === filterInterest;
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;

    return matchesSearch && matchesInterest && matchesStatus;
  });

  // Calculate statistics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "New").length;
  const inDiscussion = leads.filter(l => l.status === "In Discussion").length;
  const proposalSent = leads.filter(l => l.status === "Proposal Sent").length;
  const completedLeads = leads.filter(l => l.status === "Completed").length;

  // Selected lead
  const activeLead = leads.find(l => l.id === activeLeadId) || null;

  // Sync note input state when active lead changes
  useEffect(() => {
    if (activeLead) {
      setNewNoteText(activeLead.notes || "");
    } else {
      setNewNoteText("");
    }
  }, [activeLeadId]);

  // Clean date utility
  const formatCompactDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return isoString;
    }
  };

  // Export to JSON data uri
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Mastery_LMS_CRM_Leads_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-md overflow-hidden animate-fade-in font-sans" id="crm-panel-container">
      {/* Header of the console */}
      <div className="bg-neutral-900 px-5 py-4 flex items-center justify-between text-white border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-500 p-2 text-neutral-900 rounded-lg shadow-sm">
            <Briefcase size={16} />
          </div>
          <div>
            <h3 className="font-sans font-extrabold text-sm tracking-tight leading-none">
              Enterprise Lead Management &amp; CRM
            </h3>
            <p className="text-[10px] text-neutral-400 font-mono mt-0.5 tracking-wider uppercase font-bold">
              Amrish Kumar Singh - Consulting Office
            </p>
          </div>
        </div>
        
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-2.5 py-1 text-[10px] uppercase font-mono font-bold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-md border border-neutral-700/50 transition-all cursor-pointer"
          >
            Lock Terminal
          </button>
        )}
      </div>

      {/* Auth Screen or CRM Portal */}
      {!isAuthenticated ? (
        <div className="p-6 max-w-sm mx-auto my-8 space-y-5 flex flex-col items-center text-center">
          <div className="p-4 bg-amber-50 text-amber-700 rounded-2xl border border-amber-150 shadow-3xs">
            <Lock size={32} className="stroke-[1.75]" />
          </div>
          
          <div className="space-y-1">
            <h4 className="font-sans font-extrabold text-neutral-900 text-base">
              Secure Lead CRM Lock
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
              Access is restricted. Enter your professional administrative passcode to review consulting, training, and custom audit project leads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-3">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-neutral-400 block">
                Administrative Passphrase
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white text-xs text-neutral-850 font-mono tracking-widest focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 placeholder-neutral-305"
              />
            </div>

            {authError && (
              <div className="flex gap-2 p-2.5 bg-red-50 text-red-700 border border-red-150 rounded-xl text-[11px] text-left leading-relaxed">
                <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-neutral-905 hover:bg-neutral-800 text-white font-sans font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Unlock Admin Terminal</span>
              <ArrowRight size={13} />
            </button>
          </form>
        </div>
      ) : (
        <div className="p-4 sm:p-5 space-y-5">
          {/* Top stats ribbons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 bg-neutral-50 border border-neutral-200/65 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Total Leads</span>
                <Users size={14} className="text-neutral-500" />
              </div>
              <p className="text-xl font-sans font-extrabold text-neutral-900">
                {totalLeads} <span className="text-xs font-medium text-neutral-450 font-sans">leads</span>
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/50 border border-amber-200/50 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-amber-600">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">active discussions</span>
                <MessageSquare size={14} />
              </div>
              <p className="text-xl font-sans font-extrabold text-amber-800">
                {inDiscussion} <span className="text-xs font-medium text-amber-600/70">leads</span>
              </p>
            </div>

            <div className="p-3.5 bg-blue-50/50 border border-blue-200/50 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-blue-600">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">proposals sent</span>
                <Sparkles size={14} />
              </div>
              <p className="text-xl font-sans font-extrabold text-blue-800">
                {proposalSent} <span className="text-xs font-medium text-blue-600/70">sent</span>
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50/50 border border-emerald-200/50 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-emerald-600">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">closed / won</span>
                <CheckCircle size={14} />
              </div>
              <p className="text-xl font-sans font-extrabold text-emerald-800">
                {completedLeads} <span className="text-xs font-medium text-emerald-600/70">wins</span>
              </p>
            </div>
          </div>

          {/* Interactive Filtering controls specifically optimized to look good on mobile too */}
          <div className="flex flex-col lg:flex-row gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-150">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={14} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by name, company, email, or message contents..."
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-neutral-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-400 placeholder-neutral-400 font-sans"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Filter size={11} className="text-neutral-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">Interest:</span>
              </div>
              <select
                value={filterInterest}
                onChange={(e) => setFilterInterest(e.target.value)}
                className="px-2 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-sans text-neutral-700 cursor-pointer"
              >
                <option value="all">All Interests</option>
                <option value="team-training">Corporate Team Training</option>
                <option value="aeo-audit">AEO & Snippet Audit</option>
                <option value="seo-strategy">Enterprise SEO Strategy</option>
                <option value="custom-project">Custom Engagement</option>
                <option value="other">Other Inquiry</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-sans text-neutral-700 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="In Discussion">In Discussion</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Nurturing">Nurturing</option>
              </select>

              <button
                onClick={handleExportJSON}
                title="Download CRM database as JSON"
                className="px-2.5 py-1 bg-neutral-200/70 hover:bg-neutral-200 border border-neutral-300/60 rounded-lg text-[11px] font-sans font-bold text-neutral-700 inline-flex items-center gap-1 transition-all cursor-pointer"
              >
                <Download size={11} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* CRM Layout: Split Pane for Large screen, collapsible List-Detail for Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left Column: Lead Cards Table list (7 cols on lg, full on normal) */}
            <div className="col-span-1 lg:col-span-6 space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider bg-white py-1">
                <span>Leads Match: {filteredLeads.length}</span>
                <span>Active Database</span>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="p-8 text-center bg-neutral-50/50 border border-dashed border-neutral-200 rounded-2xl space-y-2">
                  <p className="text-xs text-neutral-500 font-sans">No matching leads found.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setFilterInterest("all"); setFilterStatus("all"); }}
                    className="text-[11px] text-neutral-900 font-bold underline transition-all cursor-pointer"
                  >
                    Clear Search Filters
                  </button>
                </div>
              ) : (
                filteredLeads.map(lead => {
                  const isActive = lead.id === activeLeadId;
                  
                  // Label helper for interest type
                  const getInterestTag = (interest: string) => {
                    switch (interest) {
                      case "team-training": return "Corporate Training";
                      case "aeo-audit": return "AEO Audit Setup";
                      case "seo-strategy": return "SEO Strategy Review";
                      case "custom-project": return "Custom Delivery";
                      default: return "General Inquiry";
                    }
                  };

                  // Status pill custom styling
                  const getStatusClass = (status: string) => {
                    switch (status) {
                      case "New": return "bg-red-50 text-red-700 border-red-200/50";
                      case "In Discussion": return "bg-amber-50 text-amber-700 border-amber-200/50";
                      case "Proposal Sent": return "bg-blue-50 text-blue-700 border-blue-200/50";
                      case "Scheduled": return "bg-purple-50 text-purple-700 border-purple-200/50";
                      case "Completed": return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
                      default: return "bg-neutral-100 text-neutral-600 border-neutral-250";
                    }
                  };

                  return (
                    <div
                      key={lead.id}
                      onClick={() => setActiveLeadId(lead.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                        isActive 
                          ? "bg-neutral-900 text-white border-neutral-900 shadow-sm" 
                          : "bg-white hover:bg-neutral-50/70 text-neutral-900 border-neutral-200"
                      }`}
                    >
                      {/* Flex header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <p className={`font-sans font-extrabold text-xs leading-tight ${isActive ? "text-white" : "text-neutral-900"}`}>
                            {lead.name}
                          </p>
                          <p className={`text-[11px] font-medium ${isActive ? "text-neutral-300" : "text-neutral-500"}`}>
                            {lead.organization}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className={`text-[9px] font-mono font-extrabold border px-2 py-0.5 rounded-full ${getStatusClass(lead.status)}`}>
                            {lead.status}
                          </span>
                          <span className={`text-[9px] font-mono leading-none ${isActive ? "text-neutral-400" : "text-neutral-400"}`}>
                            {formatCompactDate(lead.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Brief line of message */}
                      {lead.message && (
                        <p className={`text-[11px] leading-relaxed mt-2.5 line-clamp-1 italic ${isActive ? "text-neutral-350" : "text-neutral-500"}`}>
                          &ldquo;{lead.message}&rdquo;
                        </p>
                      )}

                      {/* Interest badge with custom segment info */}
                      <div className="flex flex-col gap-2 mt-3 pt-2.5 border-t border-neutral-200/10">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wide rounded-md px-1.5 py-0.5 ${
                            isActive 
                              ? "bg-neutral-800 text-emerald-400 border border-neutral-700" 
                              : "bg-neutral-100 text-neutral-700"
                          }`}>
                            {getInterestTag(lead.interest)}
                          </span>
                          
                          <ChevronRight size={12} className={isActive ? "text-white animate-bounce-horizontal" : "text-neutral-300"} />
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className={`text-[8px] font-mono tracking-wider px-1.5 py-0.5 rounded-md ${
                            isActive ? "bg-white/15 text-neutral-100 border border-white/10" : "bg-neutral-50 border border-neutral-200 text-neutral-600"
                          }`}>
                            👤 {lead.userProfile ? lead.userProfile.toUpperCase() : "PROFESSIONAL"}
                          </span>
                          <span className={`text-[8px] font-mono tracking-wider px-1.5 py-0.5 rounded-md ${
                            isActive ? "bg-white/15 text-neutral-100 border border-white/10" : "bg-neutral-50 border border-neutral-200 text-neutral-600"
                          }`}>
                            💼 {lead.serviceType ? lead.serviceType.toUpperCase() : "TRAINING"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Lead Comprehensive Detail view (5 cols on lg) */}
            <div className="col-span-1 lg:col-span-6 animate-fade-in">
              {activeLead ? (
                <div className="bg-neutral-50 rounded-2xl border border-neutral-205 p-4 sm:p-5 space-y-4 shadow-3xs">
                  
                  {/* Client title banner block */}
                  <div className="pb-4 border-b border-neutral-200/80 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-emerald-600">
                        Active Lead Dossier
                      </p>
                      <h4 className="font-sans font-extrabold text-neutral-900 text-sm sm:text-base leading-snug">
                        {activeLead.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 font-medium">
                        {activeLead.organization}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteLead(activeLead.id)}
                      title="Permanently remove lead from database"
                      className="p-2 text-neutral-450 hover:text-red-650 hover:bg-white rounded-xl transition-all cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Contact specifications details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-3 bg-white rounded-xl border border-neutral-200/60 leading-none">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">Email Coordinates</span>
                      <a 
                        href={`mailto:${activeLead.email}`} 
                        className="text-xs font-bold text-neutral-800 hover:text-neutral-900 hover:underline inline-flex items-center gap-1 leading-none"
                      >
                        <Mail size={11} className="text-neutral-455" />
                        <span>{activeLead.email}</span>
                      </a>
                    </div>
                    
                    <div className="p-3 bg-white rounded-xl border border-neutral-200/60 leading-none">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">Target Website</span>
                      {activeLead.website ? (
                        <a 
                          href={activeLead.website} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs font-bold text-neutral-800 hover:text-neutral-950 hover:underline inline-flex items-center gap-1 leading-none"
                        >
                          <Globe size={11} className="text-neutral-455" />
                          <span className="truncate max-w-[120px]">{activeLead.website.replace("https://", "").replace("www.", "")}</span>
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-neutral-400">None Provided</span>
                      )}
                    </div>
                  </div>

                  {/* Profile and Inquiry segments */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-3 bg-white rounded-xl border border-neutral-200/60 text-left">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">Client Profile Segment</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-sans font-bold text-neutral-800 capitalize">
                          👤 {activeLead.userProfile || "Industry Professional"}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-neutral-200/60 text-left">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">Inquiry Service Form</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-sans font-bold text-neutral-800 capitalize">
                          💼 {activeLead.serviceType || "Training Sessions"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submitted Inquiry Statement text */}
                  <div className="p-4 bg-white rounded-xl border border-neutral-200/60 space-y-2">
                    <div className="flex items-center gap-1">
                      <MessageSquare size={12} className="text-neutral-450" />
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wide text-neutral-400">Client Inquiry Details:</span>
                    </div>
                    <p className="text-xs text-neutral-650 leading-relaxed italic">
                      &ldquo;{activeLead.message}&rdquo;
                    </p>
                  </div>

                  {/* Status Action Workflow Control */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
                      Pipeline State Progress:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                      {(["New", "In Discussion", "Proposal Sent", "Scheduled", "Completed", "Nurturing"] as CRMLead["status"][]).map(st => {
                        const isCurrent = activeLead.status === st;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleUpdateStatus(activeLead.id, st)}
                            className={`px-1 py-1.5 rounded-lg text-[9px] font-sans font-bold text-center border transition-all cursor-pointer ${
                              isCurrent 
                                ? "bg-neutral-900 border-neutral-900 text-white font-extrabold shadow-3xs" 
                                : "bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600"
                            }`}
                          >
                            {st}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inline Consult Administrative Notes section */}
                  <div className="space-y-2 border-t border-neutral-200/80 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-450">
                        Consultant Office Worklogs &amp; Notes
                      </span>
                      <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase bg-emerald-50 px-1 rounded">
                        Saves Locally
                      </span>
                    </div>

                    <textarea
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Input consulting notes, agreed package details, workshop dates, pricing strategies, or diagnostic audit findings..."
                      rows={3}
                      className="w-full p-2.5 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-hidden focus:ring-1 focus:ring-neutral-400 placeholder-neutral-400 font-sans"
                    />

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleSaveNotes(activeLead.id)}
                        className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-sans font-bold rounded-lg transition-all shadow-3xs cursor-pointer"
                      >
                        Action Log Notes
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-neutral-50/70 rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-neutral-400 font-sans space-y-2">
                  <Briefcase size={28} className="mx-auto text-neutral-350 stroke-[1.5]" />
                  <p className="text-xs font-medium">Select an inquiry from the client lead list to view comprehensive details, message history, change status, or record notes.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Separate beautifully designed component form overlay for submitting a lead anywhere
interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export function LeadFormModal({ isOpen, onClose, onSubmitSuccess }: LeadFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [website, setWebsite] = useState("");
  const [interest, setInterest] = useState<CRMLead["interest"]>("team-training");
  const [userProfile, setUserProfile] = useState<CRMLead["userProfile"]>("professional");
  const [serviceType, setServiceType] = useState<CRMLead["serviceType"]>("training");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Formulate new lead with profile + service configuration
    const newLead: CRMLead = {
      id: "lead-" + Date.now().toString(36),
      name: name.trim(),
      email: email.trim(),
      organization: organization.trim(),
      website: website.trim() ? (website.toLowerCase().startsWith("http") ? website.trim() : `https://${website.trim()}`) : "",
      interest,
      message: message.trim(),
      status: "New",
      createdAt: new Date().toISOString(),
      notes: "",
      userProfile,
      serviceType
    };

    // Grab existing leads and save
    setTimeout(() => {
      try {
        const savedLeadsRaw = localStorage.getItem("lms_crm_leads");
        let existingLeads: CRMLead[] = savedLeadsRaw ? JSON.parse(savedLeadsRaw) : SEED_LEADS;
        
        // Add to head
        existingLeads = [newLead, ...existingLeads];
        localStorage.setItem("lms_crm_leads", JSON.stringify(existingLeads));
      } catch (err) {
        console.error("Local storage error during lead submission", err);
      }

      setLoading(false);
      setIsSuccess(true);
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }, 850);
  };

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setOrganization("");
    setWebsite("");
    setInterest("team-training");
    setUserProfile("professional");
    setServiceType("training");
    setMessage("");
    setIsSuccess(false);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-neutral-900/75 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in" id="lead-form-modal">
      <div className="bg-white rounded-2xl border border-neutral-150 shadow-2xl max-w-lg w-full overflow-hidden animate-scale-up text-neutral-900 flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* Aesthetic design top stripe banner */}
        <div className="bg-neutral-900 px-6 py-4.5 text-white flex items-center justify-between shrink-0">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">Consultant Engagement Request</span>
            <h3 className="font-sans font-extrabold text-sm sm:text-base leading-none">
              Work Directly With Amrish
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-all text-xs font-mono p-1 bg-neutral-800 rounded-md border border-neutral-700/50 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 scrollbar-none">
            <p className="text-xs text-neutral-500 leading-relaxed font-sans mt-0">
              Submit your project outline or custom cohort training interest. Your inquiry will be safely routed using the profile specifications below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">Your Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300" size={13} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amrish Singh"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">Business Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300" size={13} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amrish@enterprise.com"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">Organization / School *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300" size={13} />
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Enterprise Corp or School"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">Corporate Website / Portfolio (Optional)</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300" size={13} />
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.company.com"
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>
            </div>

            {/* Profile Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">Your Profile Segment *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: "student", label: "Student", desc: "LMS Learner" },
                  { id: "beginner", label: "Beginner", desc: "Self-starter" },
                  { id: "professional", label: "Professional", desc: "Industry Expert" },
                  { id: "corporate", label: "Corporate", desc: "Enterprise VP" }
                ].map((prof) => (
                  <button
                    key={prof.id}
                    type="button"
                    onClick={() => setUserProfile(prof.id as any)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      userProfile === prof.id
                        ? "border-neutral-900 bg-neutral-900 text-white shadow-xs"
                        : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50/70"
                    }`}
                  >
                    <span className="block text-[11px] font-bold leading-tight">{prof.label}</span>
                    <span className={`block text-[8px] mt-0.5 leading-none ${userProfile === prof.id ? "text-neutral-300" : "text-neutral-400"}`}>
                      {prof.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">Inquiry Service Type *</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "training", label: "Training Sessions", desc: "Cohorts / Live Team" },
                  { id: "consulting", label: "Consultant Hours", desc: "Bespeak Specialist" },
                  { id: "services", label: "Bespoke Services", desc: "Custom Audits & SEO" }
                ].map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setServiceType(srv.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      serviceType === srv.id
                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500/20"
                        : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50/70"
                    }`}
                  >
                    <span className="block text-xs font-bold leading-tight">{srv.label}</span>
                    <span className="block text-[8.5px] mt-0.5 text-neutral-450 leading-tight">
                      {srv.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">Primary Consultation Interest *</label>
              <select
                required
                value={interest}
                onChange={(e) => setInterest(e.target.value as CRMLead["interest"])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-sans text-neutral-800 bg-white focus:outline-hidden focus:ring-1 focus:ring-neutral-400 cursor-pointer"
              >
                <option value="team-training">Onsite Corporate Team Training (Syllabus Tracks 1-9)</option>
                <option value="aeo-audit">AEO &amp; Conversational Search Engine Compliance Audit</option>
                <option value="seo-strategy">Enterprise SEO &amp; Semantic Site Architecture Strategy</option>
                <option value="custom-project">Custom Paid Consulting Engagement / Project Handover</option>
                <option value="other">Other Collaboration / Training Request</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block font-sans">Brief Project Scope / Message *</label>
                <span className="text-[10px] text-neutral-400 font-sans">Min 10 characters</span>
              </div>
              <textarea
                required
                minLength={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Describe your current organic rank challenges, your target audience, timeline or desired outcomes..."
                className="w-full px-3.5 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-hidden focus:ring-1 focus:ring-neutral-400 placeholder-neutral-300 font-sans"
              />
            </div>

            {/* Submit Action items buttons */}
            <div className="flex justify-end items-center gap-3 pt-3 border-t border-neutral-100 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-850 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5 flex flex-col items-center justify-center flex-1 overflow-y-auto">
            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 animate-scale-up">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h4 className="font-sans font-extrabold text-neutral-900 text-base leading-snug">
                Request Safely Intercepted!
              </h4>
              <p className="text-xs text-neutral-550 max-w-sm mx-auto leading-relaxed font-sans">
                Thank you, <span className="font-bold text-neutral-850">{name}</span>. Your inquiry for <span className="font-semibold text-neutral-850">{organization}</span> (profile: <span className="font-bold capitalize text-neutral-800">{userProfile}</span>) has been saved. Rest assured, your request for custom <span className="font-bold capitalize text-emerald-700">{serviceType}</span> is queued! You can unlock the secure **Admin CRM Console** in the page footer to verify submission logs inside this LMS applet.
              </p>
            </div>

            <button
              onClick={handleResetForm}
              className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-sans font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Continue Browsing Syllabus
            </button>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
