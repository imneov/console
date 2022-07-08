import { Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Badge } from '@tkeel/console-components';

import { useActive } from '@/tkeel-console-portal-base/containers/Layout/Menus/ExpandMenus/MenuLink';

type Props = {
  path: string;
  name: string;
  isDarkMenu: boolean;
};

function SubMenuLink({ path, name, isDarkMenu }: Props) {
  const active = useActive(path);

  const defaultColor = isDarkMenu ? 'gray.400' : 'gray.600';
  const color = active ? 'primary' : defaultColor;

  const hoverStyle = active
    ? {}
    : {
        color: isDarkMenu ? 'white' : 'primary',
        fontWeight: '600',
      };
  return (
    <Link
      as={ReactRouterLink}
      display="flex"
      alignItems="center"
      paddingLeft="16px"
      height="32px"
      color={color}
      fontWeight={active ? '500' : 'normal'}
      fontSize="12px"
      borderRadius="4px"
      to={path}
      _hover={hoverStyle}
    >
      <Badge dot count={0}>
        <Text height="22px" lineHeight="22px">
          {name}
        </Text>
      </Badge>
    </Link>
  );
}

export default SubMenuLink;
