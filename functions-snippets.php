<?php

wp_enqueue_style('wpstart-style', get_template_directory_uri() . '/assets/css/screen.min.css');
wp_enqueue_script('wpstart-js', get_template_directory_uri() . '/assets/js/app.min.js', array('jquery'), '', true);

/*---------------------------------------
    Remove unwanted WP stuff from <head>
---------------------------------------*/
// remove_action('wp_head', 'index_rel_link');
// remove_action('wp_head', 'parent_post_rel_link', 10, 0);
// remove_action('wp_head', 'start_post_rel_link', 10, 0);
// remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
// remove_action('wp_head', 'noindex', 1);
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
remove_action('template_redirect', 'rest_output_link_header', 11, 0);
remove_action('wp_head', 'wp_generator');
global $wpstart;
remove_action( 'wp_head', array( $wpstart, 'meta_generator_tag' ) );

/*---------------------------------------
    JPG 100%
---------------------------------------*/
add_filter('jpeg_quality', function($arg){return 100;});

/*---------------------------------------
    Remove ID from menu
---------------------------------------*/
function wp_nav_menu_remove_attributes( $menu ){
    return $menu = preg_replace('/ id=\"(.*)\"/iU', '', $menu );
}
add_filter( 'wp_nav_menu', 'wp_nav_menu_remove_attributes' );

/*---------------------------------------
    Remove JQuery migrate
---------------------------------------*/
function wpstart_remove_jquery_migrate($scripts) {
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $script = $scripts->registered['jquery'];
        if ($script->deps) {
            $script->deps = array_diff($script->deps, array(
                'jquery-migrate'
            ));
        }
    }
}
add_action('wp_default_scripts', 'wpstart_remove_jquery_migrate');

/*---------------------------------------
    Remove the `wp-block-library.css` file from `wp_head()`
---------------------------------------*/
add_action( 'wp_enqueue_scripts', function() {
    wp_dequeue_style( 'wp-block-library' );
});

/*---------------------------------------
    Enable SVG in media uploader
---------------------------------------*/
function wpstart_mime_types( $mimes ){
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'wpstart_mime_types' );

/*---------------------------------------
    Disable self pingbacks
---------------------------------------*/
function wpstart_disable_self_pingbacks( &$links ) {
    foreach ( $links as $l => $link )
    if ( 0 === strpos( $link, get_option( 'home' ) ) )
    unset($links[$l]);
}
add_action( 'pre_ping', 'wpstart_disable_self_pingbacks' );

/*---------------------------------------
	Remove "type='javascript'"
---------------------------------------*/
function wpstart_remove_type_attr($tag, $handle) {
    return preg_replace("/type=['\"]text\/(javascript|css)['\"]/", '', $tag);
}
add_filter('style_loader_tag', 'wpstart_remove_type_attr', 10, 2);
add_filter('script_loader_tag', 'wpstart_remove_type_attr', 10, 2);

/*---------------------------------------
	Log out to home
---------------------------------------*/
add_action('wp_logout', 'auto_redirect_after_logout');
function auto_redirect_after_logout() {
    wp_redirect(home_url());
    exit();
}

/*---------------------------------------
    Remove Contact form 7 css/js/paragraphs0
---------------------------------------*/
// add_filter( 'wpcf7_load_js', '__return_false' );
add_filter( 'wpcf7_load_css', '__return_false' );
add_filter('wpcf7_autop_or_not', '__return_false');

/*---------------------------------------
    Unregister default widgets
---------------------------------------*/
function wpstart_unregister_widgets() {
    unregister_widget('WP_Widget_Pages');
    unregister_widget('WP_Nav_Menu_Widget');
    unregister_widget('WP_Widget_Calendar');
    unregister_widget( 'WP_Widget_Archives' );
    unregister_widget('WP_Widget_Links');
    unregister_widget( 'WP_Widget_Categories' );
    unregister_widget( 'WP_Widget_Recent_Posts' );
    unregister_widget('WP_Widget_Search');
    unregister_widget('WP_Widget_Tag_Cloud');
    unregister_widget('WP_Widget_Meta');
    unregister_widget('WP_Widget_Recent_Comments');
    unregister_widget('WP_Widget_RSS');
    unregister_widget( 'WP_Widget_Text' );
}
add_action('widgets_init', 'wpstart_unregister_widgets');

/*---------------------------------------
    Disable the emojis
---------------------------------------*/
function disable_emojis() {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
    add_filter( 'wp_resource_hints', 'disable_emojis_remove_dns_prefetch', 10, 2 );
}
add_action( 'init', 'disable_emojis' );
/*
* Filter function used to remove the tinymce emoji plugin.
*/
function disable_emojis_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
        return array();
    }
}
/*
* Remove emoji CDN hostname from DNS prefetching hints.
*/
function disable_emojis_remove_dns_prefetch( $urls, $relation_type ) {
    if ( 'dns-prefetch' == $relation_type ) {
        $emoji_svg_url = apply_filters( 'emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/' );
        $urls = array_diff( $urls, array( $emoji_svg_url ) );
    }
    return $urls;
}
