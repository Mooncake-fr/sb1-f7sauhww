import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { fr } from 'date-fns/locale';

interface WeeklyAverageProps {
  metrics: {
    mentalState?: number;
    sleepQuality?: number;
    physicalCondition?: number;
  };
  historicalData: Array<{
    date: Date;
    mentalState: number;
    sleepQuality: number;
    physicalCondition: number;
  }>;
}

export default function WeeklyAverage({ metrics, historicalData }: WeeklyAverageProps) {
  const currentWeekAverage = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now, { locale: fr });
    const weekEnd = endOfWeek(now, { locale: fr });

    const weekData = historicalData.filter(entry =>
      isWithinInterval(entry.date, { start: weekStart, end: weekEnd })
    );

    if (!weekData.length) return 0;

    const sum = weekData.reduce((acc, entry) => {
      const values = [entry.mentalState, entry.sleepQuality, entry.physicalCondition];
      return acc + (values.reduce((a, b) => a + b, 0) / 3);
    }, 0);

    return sum / weekData.length;
  }, [historicalData]);

  const todayAverage = useMemo(() => {
    const values = Object.values(metrics).filter(v => v !== undefined) as number[];
    if (values.length !== 3) return undefined;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }, [metrics]);

  const getEmojiAndColor = (value?: number) => {
    if (!value) return { emoji: '😶', color: 'text-gray-400' };
    if (value <= 3) return { emoji: '😞', color: 'text-red-500' };
    if (value <= 5) return { emoji: '😐', color: 'text-yellow-500' };
    if (value <= 7.5) return { emoji: '😊', color: 'text-green-500' };
    return { emoji: '🤩', color: 'text-blue-500' };
  };

  const todayMetrics = getEmojiAndColor(todayAverage);
  const weeklyMetrics = getEmojiAndColor(currentWeekAverage);

  return (
    <div className="flex justify-center items-center space-x-8">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 mb-2">Moyenne du jour</p>
        <div className="mb-1">
          <span className="text-4xl">{todayMetrics.emoji}</span>
        </div>
        <div className={cn('font-medium', todayMetrics.color)}>
          <span className="text-sm">{todayAverage?.toFixed(1) || '-'}</span>
        </div>
      </div>
      <div className="h-12 w-px bg-gray-200" />
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 mb-2">Moyenne hebdomadaire</p>
        <div className="mb-1">
          <span className="text-4xl">{weeklyMetrics.emoji}</span>
        </div>
        <div className={cn('font-medium', weeklyMetrics.color)}>
          <span className="text-sm">{currentWeekAverage.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}