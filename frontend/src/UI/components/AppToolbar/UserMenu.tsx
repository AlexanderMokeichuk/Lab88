import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks.ts';
import { User } from '../../../type';
import { logout } from '../../../features/Users/usersThunks.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handelLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello {user.username}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={handelLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
