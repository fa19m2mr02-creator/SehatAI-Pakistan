import React, { useState, useRef } from 'react';
import { FileText, Sparkles, CheckCircle, RefreshCw, Upload, Stethoscope, ArrowRight, Image as ImageIcon, X, Trash2, RotateCcw } from 'lucide-react';
import { Language, AiLabResponse } from '../types';
import { SAMPLE_LAB_REPORTS } from '../data/pakistanData';

interface AiLabAnalyzerProps {
  language: Language;
  onBookDoctor?: () => void;
}

const REPORT_TYPES = [
  'Complete Blood Count (CBC / Dengue)',
  'Glycated Hemoglobin (HbA1c / Diabetes)',
  'Liver Function Test (LFT)',
  'Renal / Kidney Function Test (RFT)',
  'Typhoid Serology (Typhidot / Widal)',
  'Doctor Prescription Slip (نسخہ)',
  'Lipid Profile / Cholesterol',
  'General Lab / Other Diagnostic'
];

export const AiLabAnalyzer: React.FC<AiLabAnalyzerProps> = ({ language, onBookDoctor }) => {
  const [reportText, setReportText] = useState(SAMPLE_LAB_REPORTS[0].text);
  const [reportType, setReportType] = useState('Complete Blood Count (CBC / Dengue)');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AiLabResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size must be under 10MB.');
      return;
    }

    setFileName(file.name);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target?.result as string;
      setUploadedImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearFile = () => {
    setUploadedImage(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleResetAll = () => {
    setReportText('');
    setUploadedImage(null);
    setFileName(null);
    setAnalysis(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async (overrideText?: string, overrideType?: string) => {
    const textToUse = overrideText !== undefined ? overrideText : reportText;
    const typeToUse = overrideType || reportType;

    if (!textToUse.trim() && !uploadedImage) {
      setErrorMsg('Please upload a photo of your report/prescription or paste report text.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai/analyze-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportText: textToUse,
          reportType: typeToUse,
          imageData: uploadedImage
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAnalysis(json.data);
      } else {
        throw new Error(json.error || 'Failed to analyze lab report');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error processing lab report analysis.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch ((status || '').toUpperCase()) {
      case 'HIGH':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">HIGH</span>;
      case 'LOW':
        return <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">LOW</span>;
      case 'ATTENTION':
        return <span className="bg-orange-950 text-orange-300 border border-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">ATTENTION</span>;
      default:
        return <span className="bg-teal-950 text-teal-300 border border-teal-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">NORMAL</span>;
    }
  };

  return (
    <section id="lab" className="py-16 bg-slate-950 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Prescription & Lab Report Explainer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Understand Your Pakistani Lab Reports & Prescriptions (نسخہ)
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Upload photos or paste test results from Chughtai Lab, Shaukat Khanum, IDC, or Aga Khan Labs. AI translates medical parameters into simple English & Urdu.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Panel */}
          <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                <span>Lab Test / Prescription Input</span>
              </h3>
              <span className="text-[10px] bg-teal-900/80 text-teal-300 border border-teal-700/60 font-bold px-2 py-0.5 rounded font-mono">
                AI Vision & Reader
              </span>
            </div>

            {/* Select Test Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 block">
                Select Lab Test Category / Document Type:
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                {REPORT_TYPES.map((type, idx) => (
                  <option key={idx} value={type} className="bg-slate-900 text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Photo / Image Dropzone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                Upload Photo of Lab Report or Doctor Slip (نسخہ):
              </label>
              
              {!uploadedImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-5 text-center bg-slate-950/60 hover:bg-slate-950 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                      Click to upload report photo or document
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Supports JPG, PNG, WEBP (Max 10MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-700 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 truncate max-w-[200px] font-mono">
                      {fileName || 'Uploaded Image'}
                    </span>
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                      title="Remove Image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative h-28 rounded-xl overflow-hidden border border-slate-800 bg-black/40">
                    <img
                      src={uploadedImage}
                      alt="Uploaded report preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Sample Preset Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                Or Quick Test with Pakistani Sample Reports:
              </label>
              <div className="space-y-2">
                {SAMPLE_LAB_REPORTS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setReportText(preset.text);
                      setReportType(preset.reportType);
                      handleClearFile();
                      handleAnalyze(preset.text, preset.reportType);
                    }}
                    className="w-full text-left p-3 rounded-xl border border-slate-800 hover:border-cyan-500/50 bg-slate-950/60 hover:bg-slate-950 transition-all text-xs font-medium text-slate-200 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-cyan-300">{preset.title}</div>
                      <div className="text-[11px] text-slate-400">{preset.reportType}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Text Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block">
                Type or Paste Lab Values / Prescription Notes:
              </label>
              <textarea
                rows={5}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="e.g. Platelets 78,000 / μL, TLC 2800, Hb 13.5..."
                className="w-full border border-slate-700 rounded-2xl p-3.5 text-xs font-mono text-white bg-slate-950 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-950/80 border border-rose-500 rounded-xl text-xs text-rose-200 font-medium">
                {errorMsg}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleAnalyze()}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI Reading Parameters...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Report with AI</span>
                  </>
                )}
              </button>

              {(reportText || uploadedImage || analysis) && (
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 p-3.5 rounded-2xl transition-all cursor-pointer shrink-0"
                  title="Clear All Inputs"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: AI Analysis Output */}
          <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            
            {!analysis && !loading && (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Ready for AI Report Evaluation</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Upload an image of your prescription or test, select a sample report, or type values on the left to view instant Urdu & English interpretation.
                </p>
              </div>
            )}

            {loading && (
              <div className="text-center py-16 space-y-3">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                <h3 className="text-sm font-bold text-white">SehatAI is processing report parameters...</h3>
                <p className="text-xs text-slate-400">Comparing values against standard Pakistani medical reference ranges.</p>
              </div>
            )}

            {analysis && !loading && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Header */}
                <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                      AI Diagnostic Evaluation
                    </span>
                    <h3 className="text-lg font-black text-white">{analysis.reportName}</h3>
                  </div>
                  <button
                    onClick={handleResetAll}
                    className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Clear Result</span>
                  </button>
                </div>

                {/* Key Findings Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                    Key Lab Values Breakdown:
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800">
                        <tr>
                          <th className="p-3">Test Parameter</th>
                          <th className="p-3">Value</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Plain Meaning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {analysis.keyFindings.map((finding, idx) => (
                          <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                            <td className="p-3 font-semibold text-white">{finding.parameter}</td>
                            <td className="p-3 font-mono text-cyan-300 font-bold">{finding.value}</td>
                            <td className="p-3">{getStatusBadge(finding.status)}</td>
                            <td className="p-3 text-slate-300 leading-normal">{finding.explanation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Summaries in Urdu and English */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-xs font-extrabold text-slate-400 uppercase block">English Summary</span>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">{analysis.summaryEnglish}</p>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-xs font-extrabold text-cyan-300 uppercase block">اردو خلاصہ</span>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium" style={{ direction: 'rtl' }}>
                      {analysis.summaryUrdu}
                    </p>
                  </div>
                </div>

                {/* Lifestyle & Dietary Advice */}
                {analysis.dietaryAndLifestyleAdvice && analysis.dietaryAndLifestyleAdvice.length > 0 && (
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-extrabold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-teal-400" />
                      Recommended Care & Precautions in Pakistan:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-1.5 text-xs text-slate-300 font-medium">
                      {analysis.dietaryAndLifestyleAdvice.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-teal-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommended Next Step & CTA */}
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Next Step</span>
                    <p className="text-xs font-bold text-white">{analysis.recommendedNextStep}</p>
                  </div>
                  <button
                    onClick={onBookDoctor}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>Consult PMDC Doctor</span>
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 italic text-center">
                  {analysis.disclaimer}
                </p>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

