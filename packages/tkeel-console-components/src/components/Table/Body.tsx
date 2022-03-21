/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-key */
import { StyleProps, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';

type Props<D extends object> = {
  page: Row<D>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<D> | undefined
  ) => TableBodyProps;
  prepareRow: (row: Row<D>) => void;
  scroll:
    | {
        y: string;
      }
    | undefined;
  isShowStripe: boolean;
  styles?: {
    body?: StyleProps;
    tr?: StyleProps;
  };
};

type BodyStyle = {
  height: string;
  overflowY: string;
};

function Body<D extends object>({
  page,
  getTableBodyProps,
  prepareRow,
  scroll,
  isShowStripe,
  styles,
}: Props<D>) {
  const bodyStyle = {};
  if (scroll && scroll.y) {
    (bodyStyle as BodyStyle).height = scroll.y;
    (bodyStyle as BodyStyle).overflowY = 'overlay';
  }

  return (
    <Tbody {...bodyStyle} {...getTableBodyProps()} {...styles?.body}>
      {page.map((row, i) => {
        prepareRow(row);
        let backgroundColor = 'transparent';
        const defaultBorderColor = 'grayAlternatives.50';
        let borderColor = isShowStripe ? 'transparent' : defaultBorderColor;
        if (isShowStripe) {
          if (i % 2 === 1) {
            backgroundColor = 'gray.50';
          } else if (i === page.length - 1) {
            borderColor = defaultBorderColor;
          }
        }
        return (
          <Tr
            backgroundColor={backgroundColor}
            _hover={isShowStripe ? {} : { backgroundColor: 'gray.50' }}
            borderBottom="1px"
            borderColor={borderColor}
            {...row.getRowProps()}
            {...styles?.tr}
          >
            {row.cells.map((cell) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const funcName = (cell.column.Cell as any).name;
              return (
                <Td
                  display="flex"
                  alignItems="center"
                  height="40px"
                  padding="0 20px"
                  color="grayAlternatives.300"
                  fontSize="14px"
                  border="none"
                  {...cell.getCellProps()}
                >
                  {funcName === 'defaultRenderer' ? (
                    <Text title={String(cell.value)} isTruncated>
                      {cell.value}
                    </Text>
                  ) : (
                    cell.render('Cell')
                  )}
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </Tbody>
  );
}

export default Body;
