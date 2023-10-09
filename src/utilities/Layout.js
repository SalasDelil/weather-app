import React, { useEffect } from 'react';

const Layout = ({ children }) => {
    useEffect(() => {
        document.querySelector('.load-animation').classList.add('animate-linearLoad');
    }, []);

    return (
        <div className="load-animation transition-all">
            <div>{children}</div>
        </div>
    );
};

export default Layout;
