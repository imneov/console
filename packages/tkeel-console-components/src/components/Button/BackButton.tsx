import { Flex, FlexProps, Text } from '@chakra-ui/react';

import { ChevronLeftFilledIcon } from '@tkeel/console-icons';

type Props = FlexProps & {
  onClick: () => unknown;
};

function BackButton({ onClick, ...rest }: Props) {
  return (
    <Flex
      width="57px"
      paddingLeft="7px"
      paddingRight="10px"
      alignItems="center"
      height="32px"
      cursor="pointer"
      _hover={{
        backgroundColor: 'gray.100',
        borderRadius: '32px',
        '& > p': {
          color: 'gray.700',
        },
      }}
      {...rest}
      onClick={onClick}
    >
      <ChevronLeftFilledIcon color="gray.700" />
      <Text color="gray.700" fontSize="12px" fontWeight="600">
        返回
      </Text>
    </Flex>
  );
}

export default BackButton;
