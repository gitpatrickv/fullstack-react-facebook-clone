import { Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ProfileTabList = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);

  const location = useLocation();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabRoutes = [
    `/profile/${userId}`,
    `/profile/${userId}/about`,
    `/profile/${userId}/friends`,
    `/profile/${userId}/photos`,
  ];

  useEffect(() => {
    switch (location.pathname) {
      case `/profile/${userId}`:
        setSelectedIndex(0);
        break;
      case `/profile/${userId}/about`:
        setSelectedIndex(1);
        break;
      case `/profile/${userId}/friends`:
        setSelectedIndex(2);
        break;
      case `/profile/${userId}/photos`:
        setSelectedIndex(3);
        break;
    }
  }, [location.pathname]);

  const handleTabsChange = (index: number) => {
    navigate(tabRoutes[index]);
  };

  return (
    <>
      <Tabs
        position="relative"
        variant="unstyled"
        index={selectedIndex}
        onChange={handleTabsChange}
      >
        <TabList height="50px">
          <Tab color={selectedIndex === 0 ? "blue.500" : "white.500"}>
            Posts
          </Tab>
          <Tab color={selectedIndex === 1 ? "blue.500" : "white.500"}>
            About
          </Tab>
          <Tab color={selectedIndex === 2 ? "blue.500" : "white.500"}>
            Friends
          </Tab>
          <Tab color={selectedIndex === 3 ? "blue.500" : "white.500"}>
            Photos
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg="blue.500"
          borderRadius="1px"
        />
      </Tabs>
    </>
  );
};

export default ProfileTabList;
