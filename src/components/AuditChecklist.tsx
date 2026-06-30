/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ChecklistItem } from "../types";
import { 
  AlertTriangle, Lightbulb, CheckCircle, Square, ChevronUp, ChevronDown, 
  Layers, CheckSquare, PlusCircle 
} from "lucide-react";

interface AuditChecklistProps {
  businessImpact: string;
  bestPractice: string;
  filteredItems: ChecklistItem[];
  completedItemIds: string[];
  onToggleItem: (itemId: string) => void;
  expandedItems: Record<string, boolean>;
  toggleExpand: (itemId: string, e: React.MouseEvent) => void;
  getImplementationSteps: (item: ChecklistItem) => {
    category: string;
    steps: string[];
    tools: string[];
    engines: string[];
  };
  filterMode: "all" | "todo" | "completed";
  setFilterMode: (mode: "all" | "todo" | "completed") => void;
  handleCreateChecklistItem: (e: React.FormEvent) => void;
  newChecklistTitle: string;
  setNewChecklistTitle: (text: string) => void;
  errorMessage: string;
  renderDescriptionWithLinks: (text: string) => React.ReactNode;
}

export function AuditChecklist({
  businessImpact,
  bestPractice,
  filteredItems,
  completedItemIds,
  onToggleItem,
  expandedItems,
  toggleExpand,
  getImplementationSteps,
  filterMode,
  setFilterMode,
  handleCreateChecklistItem,
  newChecklistTitle,
  setNewChecklistTitle,
  errorMessage,
  renderDescriptionWithLinks
}: AuditChecklistProps) {
  return (
    <div className="space-y-6 text-left" id="audit-checklist-tab-panel">
      {/* Business Impact & Best Practices guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left" id="guidelines-impact-cards">
        {/* Business Impact Card */}
        <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex gap-3.5 shadow-xs">
          <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-800 border border-emerald-200 shrink-0 h-fit">
            <AlertTriangle size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-sans font-bold text-neutral-900 text-sm">Search Engine Impact</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              {businessImpact}
            </p>
          </div>
        </div>

        {/* Audit Best Practice Card */}
        <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-3.5 shadow-xs">
          <div className="p-2.5 bg-blue-100 rounded-xl text-blue-800 border border-blue-200 shrink-0 h-fit">
            <Lightbulb size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-sans font-bold text-neutral-900 text-sm">Implementation Best Practice</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              {bestPractice}
            </p>
          </div>
        </div>
      </div>

      {/* Checklist header bar */}
      <div className="space-y-4 text-left" id="checklist-checkpoint-feed">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-3">
          <div className="space-y-0.5 text-left">
            <h3 className="font-sans font-bold text-neutral-900 text-lg">Interactive Audit Checkpoints</h3>
            <p className="text-xs text-neutral-400">Mark off items as you verify them on your target product or staging builds.</p>
          </div>

          {/* Filtering buttons */}
          <div className="flex bg-neutral-100 p-1 rounded-lg border border-neutral-200 self-start sm:self-auto shadow-xs">
            {(["all", "todo", "completed"] as const).map((mode) => (
              <button
                key={mode}
                id={`filter-checklist-${mode}`}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1 text-xs font-sans font-semibold rounded-md transition-all uppercase cursor-pointer ${
                  filterMode === mode
                    ? "bg-white text-neutral-900 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {mode === "todo" ? "Pending" : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Checklist list map */}
        <div className="space-y-2" id="checkpoints-items-list">
          {filteredItems.map((item) => {
            const isCompleted = completedItemIds.includes(item.id);
            return (
              <div
                key={item.id}
                id={`checkpoint-item-${item.id}`}
                onClick={() => onToggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer hover:shadow-xs group ${
                  isCompleted 
                    ? "bg-emerald-50/20 border-emerald-200/60" 
                    : "bg-white hover:bg-neutral-50/50 border-neutral-200"
                }`}
              >
                {/* Custom Styled Check Indicator */}
                <div className={`mt-0.5 shrink-0 ${isCompleted ? "text-emerald-600" : "text-neutral-400 group-hover:text-neutral-700"}`}>
                  {isCompleted ? (
                    <CheckCircle size={18} fill="currentColor" className="text-white fill-emerald-500 animate-scale-up" />
                  ) : (
                    <Square size={18} />
                  )}
                </div>

                <div className="space-y-2 flex-1 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-sans font-bold text-sm leading-snug tracking-tight ${isCompleted ? "text-neutral-400 line-through" : "text-neutral-900"}`}>
                      {item.title}
                    </p>
                    
                    {/* Expand/Collapse toggle button strictly prevents click bubbling */}
                    <button
                      id={`expand-toggle-${item.id}`}
                      onClick={(e) => toggleExpand(item.id, e)}
                      className="p-1 text-neutral-400 hover:text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-md border border-neutral-200 transition-all ml-2 shrink-0 flex items-center justify-center cursor-pointer"
                      title="Toggle Technical Guide"
                    >
                      {expandedItems[item.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                  
                  {item.description && (
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans font-medium border-l-2 border-neutral-200/60 pl-2">
                      {renderDescriptionWithLinks(item.description)}
                    </p>
                  )}

                  {/* Expanded technical guidelines */}
                  {expandedItems[item.id] && (() => {
                    const guideData = getImplementationSteps(item);
                    return (
                      <div 
                        className="mt-3 p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl space-y-3 animate-slide-up text-left"
                        onClick={(e) => e.stopPropagation()} // absolute guard against marking box completed when clicked inside the guide card!
                      >
                        <div className="flex items-center justify-between border-b border-emerald-200/40 pb-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                            <Layers size={11} className="text-emerald-600" />
                            Category: {guideData.category}
                          </span>
                        </div>

                        {/* Step by step action elements */}
                        <div className="space-y-1.5 text-left">
                          <p className="text-[10px] font-mono font-bold uppercase text-emerald-700 tracking-wide">Strategic Audit Steps:</p>
                          <ul className="list-disc pl-4 space-y-1.5 text-neutral-800">
                            {guideData.steps.map((st, sidx) => (
                              <li key={sidx} className="text-xs text-neutral-700 leading-relaxed font-sans font-medium">
                                {st}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Associated testing tools */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[10px] font-mono border-t border-emerald-200/30">
                          <div className="space-y-1 text-left">
                            <span className="text-emerald-700 font-bold block uppercase tracking-wider">Verification Tools:</span>
                            <span className="text-neutral-700 font-bold">{guideData.tools.join(" • ")}</span>
                          </div>
                          <div className="space-y-1 text-left">
                            <span className="text-emerald-700 font-bold block uppercase tracking-wider">Impacted Engines:</span>
                            <span className="text-neutral-700 font-bold">{guideData.engines.join(" • ")}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Score weights */}
                <div className="ml-auto shrink-0 select-none">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold uppercase ${
                    isCompleted ? "bg-emerald-100/50 text-emerald-800" : "bg-neutral-100 text-neutral-600"
                  }`}>
                    +{item.points} Pts
                  </span>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="p-8 text-center bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl" id="no-checkpoints-view">
              <CheckSquare size={28} className="mx-auto text-neutral-300 mb-1" />
              <p className="font-sans font-semibold text-neutral-500 text-xs">No matching checkpoints found</p>
              <p className="text-[11px] text-neutral-400">All tasks of this filter are cleared or you have no custom checklists added here yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom checkpoint generator */}
      <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-xs text-left" id="custom-checkpoint-form-box">
        <div className="flex gap-2 items-center mb-4 text-neutral-800">
          <PlusCircle size={18} className="text-neutral-700" />
          <h3 className="font-sans font-bold text-sm">Create &amp; Append Custom Checklist Objectives</h3>
        </div>
        
        <form onSubmit={handleCreateChecklistItem} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                id="custom-item-title-input"
                type="text"
                placeholder="E.g. Analyze hash tags or client-specific API logs..."
                value={newChecklistTitle}
                onChange={(e) => setNewChecklistTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-neutral-800 placeholder:text-neutral-400 font-medium"
              />
            </div>
            
            <button
              id="add-custom-item-btn"
              type="submit"
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-sans font-semibold transition-all shrink-0 hover:scale-[1.01] cursor-pointer"
            >
              Add Checkpoint
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-500 font-mono" id="custom-error-text">{errorMessage}</p>
          )}

          <p className="text-[10px] text-neutral-400 leading-normal font-normal">
            *Customized checkpoints will store instantly inside browser memory, letting you build custom agency audits for client web platforms on-the-fly.
          </p>
        </form>
      </div>
    </div>
  );
}
