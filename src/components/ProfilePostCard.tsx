import React, { useState } from 'react';
import { Post } from '../models/postModel';
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
  post: Post;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  editPosts?: boolean;
}

export const ProfilePostCard: React.FC<Props> = ({ post, onEdit, onDelete,editPosts }) => {

  console.log(editPosts);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ width: '250px', aspectRatio: '1 / 1', position: 'relative' }}>
      {post.image_url && (
        <>
        <CardMedia
          component="img"
          height="100%"
          image={post.image_url}
          alt="Post"
          sx={{ objectFit: 'cover', height: '100%' }}
        />
        <label style={{ position: 'absolute', bottom: 0, left: 0, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px',maxHeight: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {post.description} </label>
        </>
        
      )}
      {editPosts &&  <IconButton
          sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
          onClick={handleMenuOpen}> 
        <MoreVertIcon />
      </IconButton>}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onEdit(post._id);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onDelete(post._id);
          }}
          sx={{ color: 'red' }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};
