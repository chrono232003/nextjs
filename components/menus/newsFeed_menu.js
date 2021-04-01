import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Link from 'next/link';


export default function NewsFeed({ newsOutlets }) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            News Feeds
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {newsOutlets.map((item) => (
                <MenuItem onClick={handleClose}>
                    <Link href="/newsoutlet/something">
                    <a>{item.name}</a>
                    </Link>
                </MenuItem>
            ))}
        </Menu>
        </>
    )
}