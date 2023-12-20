import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import {
  Button,
  IconButton,
  InputBase,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { ImageOutlined, DeleteOutlined } from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import UserImage from '../../components/UserImage.jsx';
import WidgetWrapper from '../../components/WidgetWrapper.jsx';
import FlexBetween from '../../components/FlexBetween.jsx';

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [postText, setPostText] = useState('');
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', postText);
    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    try {
      const response = await fetch('https://linklounge.onrender.com/posts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newPosts = await response.json();
      dispatch(setPosts({ posts: newPosts }));
      setImage(null);
      setPostText('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>

      <Box
        mt='1rem'
        p='1rem'
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius='5px'
        display='flex'
        justifyContent='center'
      >
        <Dropzone
          acceptedFiles='.jpg,.jpeg,.png'
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Box {...getRootProps()} sx={{ cursor: 'pointer' }}>
              <input {...getInputProps()} />
              <IconButton color='primary'>
                <ImageOutlined />
              </IconButton>
              <Typography variant='caption' display='block'>
                Add Image
              </Typography>
            </Box>
          )}
        </Dropzone>
      </Box>

      {image && (
        <Box display='flex' justifyContent='center' mt='1rem'>
          <img
            src={URL.createObjectURL(image)}
            alt='Preview'
            style={{ maxWidth: '100%', borderRadius: '5px' }}
          />
          <IconButton
            color='error'
            onClick={() => setImage(null)}
            sx={{ position: 'absolute', right: 0, top: 0 }}
          >
            <DeleteOutlined />
          </IconButton>
        </Box>
      )}

      <Button
        disabled={!postText && !image}
        onClick={handlePost}
        sx={{
          display: 'block',
          width: '100%',
          mt: '1rem',
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: '2rem',
        }}
      >
        POST
      </Button>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
