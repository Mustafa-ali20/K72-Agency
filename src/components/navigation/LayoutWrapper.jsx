import React from 'react';
import Navbar from './Navbar';
import FullScreenMenu from './FullScreenMenu';
import { useNavigation } from './NavigationProvider';

export default function LayoutWrapper({ children }) {
    const { isMenuOpen, toggleMenu, closeMenu, navigateWithStairs } = useNavigation();

    return (
        <>
            <Navbar onMenuToggle={toggleMenu} />
            <FullScreenMenu 
                isOpen={isMenuOpen}
                onClose={closeMenu}
                onNavigate={navigateWithStairs}
            />
            {children}
        </>
    );
}