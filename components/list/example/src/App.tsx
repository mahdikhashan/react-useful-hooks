import * as React from "react";
import { List } from "@mahdikhashan/compound-list";
import { Flex, FlexProps, IconButton, Text, VStack } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

type NavItem = FlexProps & {
  handler: () => void;
  active: boolean;
  text: string;
  icon?: React.ReactElement;
};

export const NavItem = ({ handler, active, icon, text, ...props }: NavItem) => {
  return (
    <>
      <Flex
        {...props}
        width="64"
        onClick={handler}
        direction="row"
        justifyItems="flex-start"
        justifyContent="start"
        alignItems="center"
        gap="2"
        cursor={"pointer"}
      >
        {icon && (
          <IconButton
            aria-label="Community"
            size="xs"
            border={active ? "0px" : "1px"}
            borderColor={"gray.300"}
            backgroundColor={active ? "blue.400" : "transparent"}
            icon={icon}
          />
        )}
        <Text
          as={active ? "b" : "p"}
          fontSize={"sm"}
          textColor={active ? "blue.400" : "black"}
        >
          {text}
        </Text>
      </Flex>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <List activeItem="getting-started">
        <List.Head alignItems={"flex-start"} flexDirection={"column"} gap="3">
          <List.Button
            name="getting-started"
            render={(handler: () => void, active: boolean) => (
              <NavItem
                text="Getting Started"
                active={active}
                handler={handler}
                icon={
                  <BellIcon
                    style={{ width: 16, color: active ? "white" : "black" }}
                  />
                }
              />
            )}
          />
          <List.Button
            name="blog"
            render={(handler: () => void, active: boolean) => (
              <NavItem
                text="Blog"
                active={active}
                handler={handler}
                icon={
                  <BellIcon
                    style={{ width: 16, color: active ? "white" : "black" }}
                  />
                }
              />
            )}
          />
        </List.Head>
        <List.Body>
          <List.Panel name="getting-started">
            <p>my list</p>
          </List.Panel>
          <List.Panel name="blog" mt={4}>
            <VStack spacing={1}>
              <NavItem
                p={2}
                as={"b"}
                borderRadius={4}
                backgroundColor={"blue.100"}
                text="Installation"
                active={false}
                handler={() => {
                  alert("clicked!");
                }}
              />
              <NavItem
                p={2}
                as={"p"}
                borderRadius={4}
                text="Upgrade V2"
                active={false}
                handler={() => {
                  alert("clicked!");
                }}
              />
            </VStack>
          </List.Panel>
        </List.Body>
      </List>
    </div>
  );
}

export default App;
