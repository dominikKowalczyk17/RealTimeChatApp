import React from "react";

interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
        checked ? "bg-indigo-600" : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default CustomSwitch;
