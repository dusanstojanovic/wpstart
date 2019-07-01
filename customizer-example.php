<?php

function wpstart_customize_register($wp_customize)
{
    /*------------------------------------*\
        #Sanitize texts
    \*------------------------------------*/
    function wpstart_sanitize_html($input)
    {
        return wp_kses_post(force_balance_tags($input));
    }
    /*------------------------------------*\
        #Sanitize images
    \*------------------------------------*/
    function wpstart_sanitize_image($image, $setting)
    {
        $mimes = array(
            'jpg|jpeg|jpe' => 'image/jpeg',
            'gif' => 'image/gif',
            'png' => 'image/png',
            'bmp' => 'image/bmp',
            'tif|tiff' => 'image/tiff',
            'ico' => 'image/x-icon'
        );
        $file = wp_check_filetype($image, $mimes);
        return $file['ext'] ? $image : $setting->default;
    }
    if (!isset($wp_customize)) {
        return;
    }

    /*------------------------------------*\
        #Panel - General settings
    \*------------------------------------*/
    $wp_customize->add_panel('website_settings', array(
        'priority' => 1,
        'title' => __('wpstart.com settings', 'wpstart')
    ));
    /**
     *  Section - Social links
     */
    $wp_customize->add_section('social_links', array(
        'priority' => 2,
        'title' => __('Social / Contact', 'wpstart'),
        'panel' => 'website_settings'
    ));
    /* twitter */
    $wp_customize->add_setting('twitter_url', array(
        'default' => __('', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('twitter_url', array(
        'label' => __('Twitter URL', 'wpstart'),
        'description' => __('Don\'t forget http:// or https://', 'wpstart'),
        'section' => 'social_links',
        'type' => 'text'
    ));
    /* facebook */
    $wp_customize->add_setting('facebook_url', array(
        'default' => __('', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('facebook_url', array(
        'label' => __('Facebook URL', 'wpstart'),
        'description' => __('Don\'t forget http:// or https://', 'wpstart'),
        'section' => 'social_links',
        'type' => 'text'
    ));
    /* linkedin */
    $wp_customize->add_setting('linkedin_url', array(
        'default' => __('', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('linkedin_url', array(
        'label' => __('Linkedin URL', 'wpstart'),
        'description' => __('Don\'t forget http:// or https://', 'wpstart'),
        'section' => 'social_links',
        'type' => 'text'
    ));
    /* youtube */
    $wp_customize->add_setting('youtube_url', array(
        'default' => __('', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('youtube_url', array(
        'label' => __('Youtube URL', 'wpstart'),
        'description' => __('Don\'t forget http:// or https://', 'wpstart'),
        'section' => 'social_links',
        'type' => 'text'
    ));
    /* instagram */
    $wp_customize->add_setting('instagram_url', array(
        'default' => __('', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('instagram_url', array(
        'label' => __('Instagram URL', 'wpstart'),
        'description' => __('Don\'t forget http:// or https://', 'wpstart'),
        'section' => 'social_links',
        'type' => 'text'
    ));
    /* email address */
    $wp_customize->add_setting('email_address', array(
        'default' => __('', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('email_address', array(
        'label' => __('Email Address', 'wpstart'),
        'section' => 'social_links',
        'type' => 'text'
    ));
    /* phone number */
    $wp_customize->add_setting('phone_number', array(
        'default' => __('+1 925 302 9396', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('phone_number', array(
        'label' => __('Phone number', 'wpstart'),
        'section' => 'social_links',
        'type' => 'text'
    ));
    /* email address */
    $wp_customize->add_setting('address', array(
        'default' => __('lcozart@wpstartsolutions.com', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('address', array(
        'label' => __('Address', 'wpstart'),
        'section' => 'social_links',
        'type' => 'textarea'
    ));

    /**
     *  Section - Other settings
     */
    $wp_customize->add_section('other_settings', array(
        'priority' => 3,
        'title' => __('Other settings', 'wpstart'),
        'panel' => 'website_settings'
    ));
    /* Google analytics code */
    $wp_customize->add_setting('ga_code', array(
        'default' => __('UA-XXXXX-X', 'wpstart'),
        'sanitize_callback' => 'wpstart_sanitize_html'
    ));
    $wp_customize->add_control('ga_code', array(
        'label' => __('Google analytics ID', 'wpstart'),
        'section' => 'other_settings',
        'type' => 'text'
    ));
}
add_action('customize_register', 'wpstart_customize_register', 20);

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function wpstart_customize_preview_js()
{
    wp_enqueue_script('wpstart_customizer', get_template_directory_uri() . '/js/customizer.js', array('customize-preview'), '20130508', true);
}
add_action('customize_preview_init', 'wpstart_customize_preview_js');
