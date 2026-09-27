'use client';

import React, { useRef } from 'react';
import { PRESET_AVATARS } from '@/lib/data';
import { X, Upload, Check, Camera } from 'lucide-react';

interface ChangePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoUrl: string;
  onSelectPhoto: (photo: { url: string; filename: string; size: string; role?: string; name?: string }) => void;
}

export function ChangePhotoModal({
  isOpen,
  onClose,
  currentPhotoUrl,
  onSelectPhoto,
}: ChangePhotoModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      onSelectPhoto({
        url: dataUrl,
        filename: file.name,
        size: `${sizeMB} MB`,
      });
      onClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e2e1] max-w-xl w-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#f0eded] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cde5ff] text-[#004e99] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1c1b1b]">Select Attendee Headshot</h3>
              <p className="text-xs text-[#414752]">
                Choose an executive avatar or upload your verified corporate badge photo.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#e5e2e1] text-[#727783] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          {/* Custom Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-4 border-2 border-dashed border-[#c1c6d4] hover:border-[#0a66c2] rounded-xl bg-[#fcf9f8] hover:bg-[#f6f3f2] cursor-pointer transition-all flex flex-col items-center justify-center gap-2 text-center"
          >
            <Upload className="w-6 h-6 text-[#004e99]" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#1c1b1b]">Upload custom headshot</span>
              <span className="text-[11px] text-[#727783]">PNG, JPG up to 5MB • Square ratio recommended</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-[1px] bg-[#f0eded] flex-1" />
            <span className="text-xs text-[#727783] uppercase tracking-wider font-semibold">Or Choose Preset</span>
            <div className="h-[1px] bg-[#f0eded] flex-1" />
          </div>

          {/* Preset Avatars Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRESET_AVATARS.map((av, idx) => {
              const isSelected = av.url === currentPhotoUrl;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectPhoto({
                      url: av.url,
                      filename: av.filename,
                      size: av.size,
                      name: av.name,
                      role: av.role,
                    });
                    onClose();
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center gap-2 relative ${
                    isSelected
                      ? 'border-[#0a66c2] bg-[#cde5ff]/20 ring-2 ring-[#0a66c2]'
                      : 'border-[#e5e2e1] hover:border-[#0a66c2] bg-white'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={av.url}
                      alt={av.name}
                      className="w-16 h-16 rounded-lg object-cover ring-1 ring-[#e5e2e1]"
                    />
                    {isSelected && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#1c1b1b] truncate">{av.name}</span>
                    <span className="text-[10px] text-[#727783] truncate">{av.size}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#f0eded] bg-[#fcf9f8] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#f0eded] text-xs font-semibold text-[#1c1b1b] hover:bg-[#e5e2e1]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
