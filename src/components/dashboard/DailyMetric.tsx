import { cn } from '@/lib/utils';
import MetricSelector from './MetricSelector';

interface DailyMetricProps {
  title: string;
  options: Array<{
    emoji: string;
    label: string;
    value: number;
    color: string;
  }>;
  selectedValue?: number;
  onSelect: (value: number) => void;
}

export default function DailyMetric({ title, options, selectedValue, onSelect }: DailyMetricProps) {
  const getEmojiAndColor = (value?: number) => {
    if (!value) return { emoji: '', color: '' };
    const option = options.find(opt => opt.value === value);
    return {
      emoji: option?.emoji || '',
      color: option?.color || '',
    };
  };

  const { emoji, color } = getEmojiAndColor(selectedValue);

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
      {selectedValue ? (
        <div className="text-center">
          <div className="mb-2">
            <span className="text-4xl">{emoji}</span>
          </div>
          <div className={cn('font-medium', color)}>
            <span className="text-sm">Aujourd'hui</span>
          </div>
        </div>
      ) : (
        <MetricSelector
          options={options}
          onSelect={onSelect}
          selectedValue={selectedValue}
        />
      )}
    </div>
  );
}