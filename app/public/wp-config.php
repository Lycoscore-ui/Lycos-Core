<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '[s&oPS60@0]fLtqn)@f{P=;H2y~5}j!?Swxjq*bD7I(aVq<7Lqi<K2iP5jhWxE5M' );
define( 'SECURE_AUTH_KEY',   'quhE@y>yLPP6-0(RWm.2CW~=<Bx0 HMobO!$_/ N= 79!(; YGN?g?N;rBL`97m-' );
define( 'LOGGED_IN_KEY',     '^2L5V^7o? TXf.Ilp9NRP,Em{>rJmgN=L<D+mp/`&>osH6`ko}BufrAh1t_j$nU7' );
define( 'NONCE_KEY',         'B;miC<aPT.#woPP#SmQON&UG/*aB;ZuP_;M5l2`M:oW y4_K72/7W2oOLO+[{SrS' );
define( 'AUTH_SALT',         'eN*HNxr`da4tQ,ooybNQI4FgkZIlT(7b(kC8.9p`E9bat&U^~%+z;|+y^7}l]tA%' );
define( 'SECURE_AUTH_SALT',  'gaO+EYStS}?)sE3m&K8jS!Q7NX@7gdr[KLs`;9GhU:X&6B~8y%=B>;]l.O5e,M_/' );
define( 'LOGGED_IN_SALT',    '9|[*O~b+kkoy;)BE.|Nb{j&D+(CY,U4R27_S9QD_B3<@Owp93;rQ$mP)5< C]J[_' );
define( 'NONCE_SALT',        ']y;*mugiw8ZZw-rvXk2E6#g|8mj{Fc8ur!O)54p82vO4/oY>U1`*f%fR2dwC7`gf' );
define( 'WP_CACHE_KEY_SALT', '/aR]<@zT@bz}ZYF{Tcr3U+~,_u&ZZT<dOh _,u)! dF._bVjkG7RQ&w/IpBm1R5:' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */

// Change the default media upload directory and URL path
define( 'UPLOADS', 'media' );



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';