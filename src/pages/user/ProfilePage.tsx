import { Grid, GridItem, Show } from "@chakra-ui/react";
import AllFriends from "../../components/user/FriendsPage/AllFriends";
import UserProfile from "../../components/user/ProfilePage/UserProfile";
import { useProfileStore } from "../../store/profile-store";

const ProfilePage = () => {
  const { isProfile } = useProfileStore();
  return (
    <>
      {isProfile ? (
        <UserProfile />
      ) : (
        <Grid
          templateColumns={{
            xl: "0.3fr 1.3fr ",
          }}
          templateAreas={{ base: "'main'", lg: "'asideLeft main asideRight'" }}
        >
          <GridItem area="main">
            <UserProfile />
          </GridItem>
          <Show above="xl">
            <GridItem
              area="asideLeft"
              position="fixed"
              width="calc(0.2 * 100vw)"
            >
              <AllFriends />
            </GridItem>
          </Show>
        </Grid>
      )}
    </>
  );
};

export default ProfilePage;
