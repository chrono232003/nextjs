import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Link from 'next/link';


export default function Coins() {

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
            Coins
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>
                <Link href="/coins/btc">
                <a>Bitcoin</a>
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link href="/coins/eth">
                <a>Etherium</a>
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link href="/coins/xrp">
                <a>Ripple(XRP)</a>
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link href="/coins/usdt">
                <a>Tether</a>
                </Link>
            </MenuItem>
        </Menu>
        </>
    )
}