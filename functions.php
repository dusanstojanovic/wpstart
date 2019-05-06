<?php

if (!function_exists('wpstart_setup')):
    function wpstart_setup()
{
        load_theme_textdomain('wpstart', get_template_directory() . '/languages');
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
            add_image_size('homepage_slide', 1920, 1080);
        register_nav_menus(array(
            'primary' => esc_html__('Primary menu', 'wpstart'),
            'footer' => esc_html__('Footer menu', 'wpstart'),
        ));
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));
    }
endif;
add_action('after_setup_theme', 'wpstart_setup');

function wpstart_content_width() {
    $GLOBALS['content_width'] = apply_filters('wpstart_content_width', 640);
}
add_action('after_setup_theme', 'wpstart_content_width', 0);



/*---------------------------------------
    Enqueue scripts and styles.
---------------------------------------*/
function wpstart_scripts() {
    wp_enqueue_style('wpstart-style', get_template_directory_uri() . '/css/build/screen.min.css');
    wp_enqueue_script('wpstart-modernizr', get_template_directory_uri() . '/js/modernizr-custom.js', array(''), '', true);
    wp_enqueue_script('wpstart-js', get_template_directory_uri() . '/js/build/app.min.js', array('jquery'), '', true);

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'wpstart_scripts');

// function wpstart_deregister_scripts() {
//     wp_dequeue_script( 'wp-embed' );
// }
// add_action( 'wp_footer', 'wpstart_deregister_scripts' );

require get_template_directory() . '/inc/template-tags.php';
require get_template_directory() . '/inc/template-functions.php';
require get_template_directory() . '/inc/customizer.php';
if (defined('JETPACK__VERSION')) {
    require get_template_directory() . '/inc/jetpack.php';
}
require get_template_directory() . '/inc/gallery.php';



/*---------------------------------------
    Remove unwanted WP stuff from <head>
---------------------------------------*/
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
// remove_action('wp_head', 'index_rel_link');
// remove_action('wp_head', 'parent_post_rel_link', 10, 0);
// remove_action('wp_head', 'start_post_rel_link', 10, 0);
// remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
// remove_action('wp_head', 'noindex', 1);
remove_action('wp_head', 'rest_output_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10);
remove_action('template_redirect', 'rest_output_link_header', 11, 0);
global $sitepress;
remove_action( 'wp_head', array( $sitepress, 'meta_generator_tag' ) );



/*---------------------------------------
    Remove JQuery migrate
---------------------------------------*/
function remove_jquery_migrate($scripts) {
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $script = $scripts->registered['jquery'];
        if ($script->deps) {
            $script->deps = array_diff($script->deps, array(
                'jquery-migrate'
            ));
        }
    }
}

add_action('wp_default_scripts', 'remove_jquery_migrate');



/*---------------------------------------
Remove type="javascript"
---------------------------------------*/
function wpstart_remove_type_attr($tag, $handle) {
    return preg_replace("/type=['\"]text\/(javascript|css)['\"]/", '', $tag);
}
add_filter('style_loader_tag', 'wpstart_remove_type_attr', 10, 2);
add_filter('script_loader_tag', 'wpstart_remove_type_attr', 10, 2);



/*---------------------------------------
#Log out to home
---------------------------------------*/
add_action('wp_logout', 'auto_redirect_after_logout');
function auto_redirect_after_logout() {
    wp_redirect(home_url());
    exit();
}



/*---------------------------------------
    Unregister default widgets
---------------------------------------*/
function my_unregister_widgets() {
    unregister_widget('WP_Widget_Pages');
    unregister_widget('WP_Nav_Menu_Widget');
    unregister_widget('WP_Widget_Calendar');
    // unregister_widget( 'WP_Widget_Archives' );
    unregister_widget('WP_Widget_Links');
    // unregister_widget( 'WP_Widget_Categories' );
    // unregister_widget( 'WP_Widget_Recent_Posts' );
    unregister_widget('WP_Widget_Search');
    unregister_widget('WP_Widget_Tag_Cloud');
    unregister_widget('WP_Widget_Meta');
    unregister_widget('WP_Widget_Recent_Comments');
    unregister_widget('WP_Widget_RSS');
    // unregister_widget( 'WP_Widget_Text' );
}
add_action('widgets_init', 'my_unregister_widgets');
