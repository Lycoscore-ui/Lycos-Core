<?php
/**
 * Front to the Lycos Core application.
 * Serves V2 Frontend static app for main web requests, falling back to WordPress for admin/API.
 *
 * @package LycosCore
 */

// Force HTML content-type for all frontend web requests
header('Content-Type: text/html; charset=UTF-8', true);
header('X-Lycos-Core-SPA: true');
header_remove('Content-Disposition');

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$queryString = $_SERVER['QUERY_STRING'] ?? '';

// Pass through to WordPress for wp-admin, wp-json, wp-login, or cron
if (
    strpos($requestUri, '/wp-admin') !== false ||
    strpos($requestUri, '/wp-json') !== false ||
    strpos($requestUri, '/wp-login.php') !== false ||
    strpos($requestUri, '/wp-cron.php') !== false ||
    strpos($queryString, 'rest_route=') !== false
) {
    define( 'WP_USE_THEMES', true );
    require __DIR__ . '/wp-blog-header.php';
    exit;
}

// Serve V2 Frontend application
if (file_exists(__DIR__ . '/index.html')) {
    readfile(__DIR__ . '/index.html');
    exit;
}

define( 'WP_USE_THEMES', true );
require __DIR__ . '/wp-blog-header.php';

