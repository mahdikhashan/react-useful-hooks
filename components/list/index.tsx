import * as React from "react";
import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";

export interface ListProps extends FlexProps {
  activeItem: string;
  children: React.ReactNode[] | React.ReactNode;
}

export interface ListContextInterface {
  activeLink: string;
  activeListItem: string;
  setActiveListItem: React.Dispatch<React.SetStateAction<string>>;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
}

export const ListButton = ({ name, render }: { name: any; render: any }) => {
  const context = React.useContext(ListContext);

  const handleClick = () => {
    context?.setActiveListItem(name);
  };

  return render(handleClick, name === context?.activeListItem);
};

export interface ListPanelProps extends BoxProps {
  name: string;
  children: any;
}

export const ListPanel = ({ name, children, ...props }: ListPanelProps) => {
  return <Box {...props}>{children}</Box>;
};

export interface ListHeadProps extends FlexProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const ListHead = ({ children, ...props }: ListHeadProps) => {
  return <Flex {...props}>{children}</Flex>;
};

export const ListBody = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const context = React.useContext(ListContext);
  const childrenArray = React.Children.toArray(children);

  const activeItem = childrenArray.map((child) => {
    if (
      React.isValidElement(child) &&
      child.props.name === context?.activeListItem
    ) {
      return React.cloneElement(child, { ...child.props });
    }
    return null;
  });

  return <Box>{activeItem}</Box>;
};

export const ListContext = React.createContext<ListContextInterface | null>(null);

export const List = ({ activeItem, children, ...props }: ListProps) => {
  const [activeListItem, setActiveListItem] = React.useState(activeItem);
  const [activeLink, setActiveLink] = React.useState("");

  return (
    <ListContext.Provider
      value={{ activeListItem, setActiveListItem, activeLink, setActiveLink }}
    >
      <Flex direction={"column"} {...props}>
        {children}
      </Flex>
    </ListContext.Provider>
  );
};

List.Button = ListButton;
List.Panel = ListPanel;
List.Head = ListHead;
List.Body = ListBody;
