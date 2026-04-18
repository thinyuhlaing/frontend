"use client";
import React, { useState, useRef, useEffect } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  id: string;
  label: string;
  options: any[];
  value?: any | null;
  onSelect: (option: any) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export default function SingleSelect({
  id,
  label,
  options,
  value,
  onSelect,
  placeholder = "Select option",
  error,
  disabled,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value || null);
  }, [value]);

  const handleSelect = (option: any) => {
    setSelectedValue(option);
    setSearchTerm("");
    setIsOpen(false);
    onSelect(option);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={className} ref={dropdownRef}>
      {/* Label */}
      <label htmlFor={id} className="field-label">
        {label}
      </label>

      {/* Input Box (same style as TextField) */}
      <div
        className={`field-input flex items-center justify-between cursor-pointer ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <input
          id={id}
          type="text"
          value={isOpen ? searchTerm : selectedValue ? selectedValue.name : ""}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={!selectedValue ? placeholder : ""}
          disabled={disabled}
          className="w-full bg-transparent outline-none"
        />

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-2 text-slate-400 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="mt-1 border border-slate-200 rounded-xl bg-white shadow-md max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-slate-100"
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
