// CipherTrade-frontend/src/components/risk/ExposureLimits.tsx
import React, { useState } from 'react';

interface ExposureLimitsProps {
  limits: {
    maxPositionSize: number;
    maxLeverage: number;
    maxDailyLoss: number;
    maxDrawdown: number;
    maxConcentration: number;
  };
  editable?: boolean;
  onUpdate?: (limits: any) => void;
}

const ExposureLimits: React.FC<ExposureLimitsProps> = ({
  limits,
  editable = false,
  onUpdate,
}) => {
  const [editedLimits, setEditedLimits] = useState(limits);

  const handleChange = (key: string, value: number) => {
    setEditedLimits({ ...editedLimits, [key]: value });
  };

  const handleSave = () => {
    onUpdate?.(editedLimits);
  };

  return (
    <div className="space-y-4">
      {/* Position Size Limit */}
      <LimitSlider
        label="Max Position Size"
        value={editable ? editedLimits.maxPositionSize : limits.maxPositionSize}
        min={1000}
        max={1000000}
        step={1000}
        unit="$"
        editable={editable}
        onChange={(v) => handleChange('maxPositionSize', v)}
      />

      {/* Leverage Limit */}
      <LimitSlider
        label="Max Leverage"
        value={editable ? editedLimits.maxLeverage : limits.maxLeverage}
        min={1}
        max={10}
        step={0.5}
        unit="x"
        editable={editable}
        onChange={(v) => handleChange('maxLeverage', v)}
      />

      {/* Daily Loss Limit */}
      <LimitSlider
        label="Max Daily Loss"
        value={editable ? editedLimits.maxDailyLoss : limits.maxDailyLoss}
        min={1}
        max={20}
        step={0.5}
        unit="%"
        editable={editable}
        onChange={(v) => handleChange('maxDailyLoss', v)}
      />

      {/* Max Drawdown */}
      <LimitSlider
        label="Max Drawdown"
        value={editable ? editedLimits.maxDrawdown : limits.maxDrawdown}
        min={5}
        max={50}
        step={1}
        unit="%"
        editable={editable}
        onChange={(v) => handleChange('maxDrawdown', v)}
      />

      {/* Concentration Limit */}
      <LimitSlider
        label="Max Concentration per Symbol"
        value={editable ? editedLimits.maxConcentration : limits.maxConcentration}
        min={10}
        max={100}
        step={5}
        unit="%"
        editable={editable}
        onChange={(v) => handleChange('maxConcentration', v)}
      />

      {editable && (
        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Save Limits
        </button>
      )}
    </div>
  );
};

interface LimitSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  editable: boolean;
  onChange: (value: number) => void;
}

const LimitSlider: React.FC<LimitSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  unit,
  editable,
  onChange,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm font-mono">
          {value}
          {unit}
        </span>
      </div>
      {editable ? (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      ) : (
        <div className="w-full h-2 bg-gray-200 rounded-lg dark:bg-gray-700">
          <div
            className="h-2 bg-blue-600 rounded-lg"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ExposureLimits;