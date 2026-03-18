// CipherTrade-frontend/src/components/common/ui/Table.tsx
import React from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

function Table<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                scope="col"
                className={`
                  px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider
                  ${column.align === 'right' ? 'text-right' : ''}
                  ${column.align === 'center' ? 'text-center' : ''}
                  ${column.width ? `w-${column.width}` : ''}
                `}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
            >
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className={`
                    px-6 py-4 whitespace-nowrap text-sm
                    ${column.align === 'right' ? 'text-right' : ''}
                    ${column.align === 'center' ? 'text-center' : ''}
                  `}
                >
                  {column.render
                    ? column.render(row[column.key as keyof T], row)
                    : row[column.key as keyof T]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;