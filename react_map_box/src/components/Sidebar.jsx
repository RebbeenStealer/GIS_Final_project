import React from 'react';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="/" className={styles.navLink}>홈</a>
          </li>
          <li className={styles.navItem}>
            <a href="/profile" className={styles.navLink}>프로필</a>
          </li>
          <li className={styles.navItem}>
            <a href="/settings" className={styles.navLink}>설정</a>
          </li>
          <li className={styles.navItem}>
            <a href="/help" className={styles.navLink}>도움말</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
