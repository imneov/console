import { Skeleton } from '@chakra-ui/react';
import { find, merge } from 'lodash';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  useCartesianGridProps,
  useLegendProps,
  useTooltipProps,
  useXAxisProps,
  useYAxisProps,
} from '@tkeel/console-charts';
import { Empty } from '@tkeel/console-components';
import { useColor } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp, numeral } from '@tkeel/console-utils';

import { TimestampItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';
import { filterHourTimestamp } from '@/tkeel-console-plugin-admin-usage-statistics/utils/data';

const TEMPLATE = 'HH:mm';

interface TimeAreaChartProps {
  data: TimestampItem[];
  dataKeys: {
    key: string;
    label: string;
    fill?: string;
    stroke?: string;
  }[];
  isLoading?: boolean;
  yAxis?: {
    tickFormatter?: (value: number) => string;
  };
  area?: {
    fillOpacity?: number | string;
  };
  tooltip?: {
    formatterString?: string;
    formatterUnit?: string;
  };
}

const DEFAULT_PROPS: Partial<TimeAreaChartProps> = {
  yAxis: {
    tickFormatter: (value: number) =>
      numeral.format({ input: value, formatter: '0 a' }),
  },
  area: {
    fillOpacity: '0.5',
  },
  tooltip: {
    formatterString: '0,0',
    formatterUnit: '',
  },
};

export type { TimeAreaChartProps };

export default function TimeAreaChart(props: TimeAreaChartProps) {
  const defaultFill = useColor('brand.50');
  const defaultStroke = useColor('primary');

  const { data, dataKeys, isLoading, yAxis, area, tooltip } = merge(
    {},
    DEFAULT_PROPS,
    props
  );
  const defaultXAxisProps = useXAxisProps();
  const defaultYAxisProps = useYAxisProps();
  const defaultCartesianGridProps = useCartesianGridProps();
  const defaultLegendProps = useLegendProps();
  const defaultTooltipProps = useTooltipProps();

  if (isLoading) {
    return <Skeleton height="100%" />;
  }

  if (!(data?.length > 0)) {
    return <Empty isFullHeight />;
  }

  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: 15 }}>
        <XAxis
          {...defaultXAxisProps}
          dataKey="timestamp"
          type="number"
          domain={['dataMin', 'dataMax']}
          scale="time"
          tickFormatter={(value: number) =>
            formatDateTimeByTimestamp({
              timestamp: value,
              template: TEMPLATE,
            })
          }
          ticks={filterHourTimestamp({
            data: data.map(({ timestamp }) => timestamp),
          }).slice(1)}
        />
        <YAxis
          {...defaultYAxisProps}
          allowDecimals={false}
          tickFormatter={yAxis?.tickFormatter}
        />
        <CartesianGrid {...defaultCartesianGridProps} />
        <Legend
          {...defaultLegendProps}
          formatter={(value: string) => {
            const dataKeyItem = find(dataKeys, { key: value });
            return dataKeyItem?.label ?? '';
          }}
        />
        {dataKeys.map(({ key, fill = defaultFill, stroke = defaultStroke }) => (
          <Area
            key={key}
            dataKey={key}
            fill={fill}
            fillOpacity={area?.fillOpacity}
            stroke={stroke}
          />
        ))}
        <Tooltip
          {...defaultTooltipProps}
          labelFormatter={(label: number) =>
            formatDateTimeByTimestamp({
              timestamp: label,
              template: TEMPLATE,
            })
          }
          formatter={(value: number, name: string) => {
            const dataKeyItem = find(dataKeys, { key: name });
            const formatterString = tooltip?.formatterString;
            const formatterUnit = tooltip?.formatterUnit;
            const formattedValue = numeral.format({
              input: value,
              formatter: formatterString,
            });
            const formattedValueWithUnit = formatterUnit
              ? [formattedValue, formatterUnit].join(' ')
              : formattedValue;
            return [formattedValueWithUnit, dataKeyItem?.label];
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
