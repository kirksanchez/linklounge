import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../navbar';
import { useSelector } from 'react-redux';
import UserWidget from '../widgets/UserWidget.jsx';
import MyPostWidget from '../widgets/MyPostWidget.jsx';
import PostsWidget from '../widgets/PostsWidget.jsx';
import FriendListWidget from '../widgets/FriendListWidget.jsx';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          {/* <MyPostWidget picturePath={picturePath} /> */}
          <MyPostWidget
            picturePath={user.picturePath}
            userId={_id} // Use _id here
            isProfilePage={false}
          />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <Box />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
